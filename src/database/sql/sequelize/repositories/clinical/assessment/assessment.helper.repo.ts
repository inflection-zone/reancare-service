//import { Op } from 'sequelize';
import { ApiError } from '../../../../../../common/api.error';
import { Logger } from '../../../../../../common/logger';
import { AssessmentTemplateDto } from '../../../../../../domain.types/clinical/assessment/assessment.template.dto';
import { IAssessmentHelperRepo } from '../../../../../repository.interfaces/clinical/assessment/assessment.helper.repo.interface';
import { AssessmentTemplateMapper } from '../../../mappers/clinical/assessment/assessment.template.mapper';
import {
    SAssessmentTemplate,
    SAssessmentNode,
    AssessmentNodeType,
    SAssessmentListNode,
    SAssessmentMessageNode,
    SAssessmentQuestionNode,
    SAssessmentQueryOption,
    SAssessmentNodePath,
    SAssessmentPathCondition,
    ConditionOperandDataType
} from '../../../../../../domain.types/clinical/assessment/assessment.types';
import { AssessmentTemplateDomainModel } from '../../../../../../domain.types/clinical/assessment/assessment.template.domain.model';
import AssessmentTemplate from '../../../models/clinical/assessment/assessment.template.model';
import AssessmentNode from '../../../models/clinical/assessment/assessment.node.model';
import { uuid } from '../../../../../../domain.types/miscellaneous/system.types';
import AssessmentQueryOption from '../../../models/clinical/assessment/assessment.query.option.model';
import AssessmentNodePath from '../../../models/clinical/assessment/assessment.node.path.model';
import AssessmentPathCondition from '../../../models/clinical/assessment/assessment.path.condition.model';

///////////////////////////////////////////////////////////////////////

export class AssessmentHelperRepo implements IAssessmentHelperRepo {

    addTemplate = async (t: SAssessmentTemplate): Promise<AssessmentTemplateDto> => {
        try {

            const existing = await AssessmentTemplate.findOne({
                where : {
                    Provider               : t.Provider,
                    ProviderAssessmentCode : t.ProviderAssessmentCode
                }
            });
            if (existing) {
                return AssessmentTemplateMapper.toDto(existing);
            }

            const templateModel: AssessmentTemplateDomainModel = {
                DisplayCode            : t.DisplayCode,
                Title                  : t.Title,
                Description            : t.Description,
                Type                   : t.Type,
                Provider               : t.Provider,
                ProviderAssessmentCode : t.ProviderAssessmentCode
            };
            var template = await AssessmentTemplate.create(templateModel);

            const rootNodeDisplayCode: string = t.RootNodeDisplayCode;
            const sRootNode = t.getNodeByDisplayCode(rootNodeDisplayCode);

            const rootNode = await this.createNewNode(t, template.id, null, sRootNode);
            template.RootNodeId = rootNode.id;
            await template.save();

            const templateDto = AssessmentTemplateMapper.toDto(template);
            return templateDto;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    getNodeById = async (nodeId: string): Promise<SAssessmentNode> => {
        throw new Error('Method not implemented.');
    }

    private async createNewNode(
        sTemplate: SAssessmentTemplate,
        templateId: uuid,
        parentNodeId: uuid,
        snode: SAssessmentNode): Promise<AssessmentNode> {

        const existingNode = await AssessmentNode.findOne({
            where : {
                DisplayCode : snode.DisplayCode
            }
        });
        if (existingNode) {
            return existingNode;
        }
        
        const nodeEntity = {
            DisplayCode     : snode.DisplayCode,
            TemplateId      : templateId,
            ParentId        : parentNodeId,
            NodeType        : snode.NodeType,
            ProviderGivenId : snode.ProviderGivenId,
            Title           : snode.Title,
            Description     : snode.Description,
            Sequence        : snode.Sequence,
            Score           : snode.Score,
        };

        var thisNode = await AssessmentNode.create(nodeEntity);
        const currentNodeId = thisNode.id;

        if (snode.NodeType === AssessmentNodeType.NodeList) {

            var listNode: SAssessmentListNode = snode as SAssessmentListNode;
            var childrenDisplayCodes = listNode.ChildrenNodeDisplayCodes;

            for await (var childDisplayCode of childrenDisplayCodes) {
                const child = sTemplate.getNodeByDisplayCode(childDisplayCode);
                if (child) {
                    var childNode = await this.createNewNode(sTemplate, templateId, currentNodeId, child);
                    if (childNode) {
                        Logger.instance().log(childNode.DisplayCode);
                    }
                }
            }
        }
        else if (snode.NodeType === AssessmentNodeType.Message) {
            const messageNode = snode as SAssessmentMessageNode;
            thisNode.Message = messageNode.Message;
            thisNode.Acknowledged = false;
            await thisNode.save();
        }
        else {
            //thisNode.NodeType === AssessmentNodeType.Question
            const questionNode = snode as SAssessmentQuestionNode;
            thisNode.QueryResponseType = questionNode.QueryResponseType;
            await thisNode.save();

            await this.updateQuestionNode(sTemplate, questionNode, thisNode, templateId);
        }
        return thisNode;
    }

    private async updateQuestionNode(
        sTemplate: SAssessmentTemplate,
        questionNode: SAssessmentQuestionNode,
        thisNode: AssessmentNode,
        templateId: string) {

        //Create question answer options...
        const options: SAssessmentQueryOption[] = questionNode.Options;

        for await (var option of options) {
            const optEntity = {
                DisplayCode       : option.DisplayCode,
                ProviderGivenCode : option.ProviderGivenCode,
                NodeId            : thisNode.id,
                Text              : option.Text,
                ImageUrl          : option.ImageUrl,
                Sequence          : option.Sequence
            };
            const queryOption = await AssessmentQueryOption.create(optEntity);
            Logger.instance().log(`QueryOption - ${queryOption.DisplayCode}`);
        }

        //Create paths conditions
        const paths: SAssessmentNodePath[] = questionNode.Paths;

        for await (var sPath of paths) {
            const pathEntity = {
                DisplayCode  : sPath.DisplayCode,
                ParentNodeId : thisNode.id,
            };

            var path = await AssessmentNodePath.create(pathEntity);
            Logger.instance().log(`QueryOption - ${path.DisplayCode}`);

            //Create condition for the path
            const condition = await this.createNewPathCondition(sPath.Condition, thisNode.id, path.id, null);
            path.ConditionId = condition.id;

            //Create the next node
            const sNextNode = sTemplate.getNodeByDisplayCode(sPath.NextNodeDisplayCode);
            if (sNextNode) {
                var nextNode = await this.createNewNode(sTemplate, templateId, thisNode.id, nextNode);
                if (!nextNode) {
                    path.NextNodeId = nextNode.id;
                    path.NextNodeDisplayCode = sPath.NextNodeDisplayCode;
                    await path.save();
                }
            }

        }
    }

    private getOperandValueString(operand, dataType: ConditionOperandDataType): string {
        if (!operand) {
            return null;
        }
        if (dataType === ConditionOperandDataType.Text ||
            dataType === ConditionOperandDataType.Float ||
            dataType === ConditionOperandDataType.Integer) {
            return operand.ToString();
        }
        if (dataType === ConditionOperandDataType.Array) {
            return JSON.stringify(operand);
        }
        if (dataType === ConditionOperandDataType.Boolean) {
            if (operand === true) {
                return 'true';
            }
            return 'false';
        }
        return null;
    }

    private async createNewPathCondition(
        sCondition: SAssessmentPathCondition,
        currentNodeId: string,
        pathId: string,
        parentConditionId: any) {
        
        const firstOperandValue = this.getOperandValueString(
            sCondition.FirstOperandValue, sCondition.FirstOperandDataType);
        const secondOperandValue = this.getOperandValueString(
            sCondition.SecondOperandValue, sCondition.SecondOperandDataType);
        const thirdOperandValue = this.getOperandValueString(
            sCondition.ThirdOperandValue, sCondition.ThirdOperandDataType);
            
        var conditionEntity = {
            NodeId                : currentNodeId,
            PathId                : pathId,
            DisplayCode           : sCondition.DisplayCode,
            IsCompositeCondition  : sCondition.IsCompositeCondition,
            CompositionType       : sCondition.CompositionType,
            ParentConditionId     : parentConditionId,
            OperatorType          : sCondition.OperatorType,
            FirstOperandName      : sCondition.FirstOperandName,
            FirstOperandValue     : firstOperandValue,
            FirstOperandDataType  : sCondition.FirstOperandDataType,
            SecondOperandName     : sCondition.SecondOperandName,
            SecondOperandValue    : secondOperandValue,
            SecondOperandDataType : sCondition.SecondOperandDataType,
            ThirdOperandName      : sCondition.ThirdOperandName,
            ThirdOperandValue     : thirdOperandValue,
            ThirdOperandDataType  : sCondition.ThirdOperandDataType,
        };

        const condition = await AssessmentPathCondition.create(conditionEntity);

        for await (var childCondition of sCondition.Children) {

            const parentConditionId = condition.id;

            var child = await this.createNewPathCondition(
                childCondition, pathId, currentNodeId, parentConditionId);

            Logger.instance().log(`Operator type: ${child.OperatorType}`);
            Logger.instance().log(`Composition type: ${child.CompositionType}`);
        }
        return condition;
    }

}