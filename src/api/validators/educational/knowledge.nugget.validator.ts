import express from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { Helper } from '../../../common/helper';
import { KnowledgeNuggetDomainModel } from '../../../domain.types/educational/knowledge.nugget/knowledge.nugget.domain.model';
import { KnowledgeNuggetSearchFilters } from '../../../domain.types/educational/knowledge.nugget/knowledge.nugget.search.types';

///////////////////////////////////////////////////////////////////////////////////////

export class KnowledgeNuggetValidator {

    static getDomainModel = (request: express.Request): KnowledgeNuggetDomainModel => {

        const KnowledgeNuggetModel: KnowledgeNuggetDomainModel = {
            TopicName           : request.body.TopicName ?? null,
            BriefInformation    : request.body.BriefInformation ?? null,
            DetailedInformation : request.body.DetailedInformation ?? null,
            AdditionalResources : request.body.AdditionalResources ?? [],
            Tags                : request.body.Tags ?? [],
        };

        return KnowledgeNuggetModel;
    };

    static create = async (request: express.Request): Promise<KnowledgeNuggetDomainModel> => {
        await KnowledgeNuggetValidator.validateBody(request);
        return KnowledgeNuggetValidator.getDomainModel(request);
    };

    static getById = async (request: express.Request): Promise<string> => {
        return await KnowledgeNuggetValidator.getParamId(request);
    };

    static delete = async (request: express.Request): Promise<string> => {
        return await KnowledgeNuggetValidator.getParamId(request);
    };

    static search = async (request: express.Request): Promise<KnowledgeNuggetSearchFilters> => {

        await query('TopicName').optional()
            .trim()
            .escape()
            .run(request);

        await query('Tag').optional()
            .trim()
            .run(request);

        await query('orderBy').optional()
            .trim()
            .escape()
            .run(request);

        await query('order').optional()
            .trim()
            .escape()
            .run(request);

        await query('pageIndex').optional()
            .trim()
            .escape()
            .isInt()
            .run(request);

        await query('itemsPerPage').optional()
            .trim()
            .escape()
            .isInt()
            .run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }

        return KnowledgeNuggetValidator.getFilter(request);
    };

    static update = async (request: express.Request): Promise<KnowledgeNuggetDomainModel> => {

        const id = await KnowledgeNuggetValidator.getParamId(request);
        await KnowledgeNuggetValidator.validateBody(request);

        const domainModel = KnowledgeNuggetValidator.getDomainModel(request);
        domainModel.id = id;

        return domainModel;
    };

    private static async validateBody(request) {

        await body('TopicName').optional()
            .trim()
            .escape()
            .run(request);

        await body('BriefInformation').optional()
            .trim()
            .run(request);

        await body('DetailedInformation').optional()
            .trim()
            .run(request);

        await body('AdditionalResources').optional()
            .isArray()
            .run(request);

        await body('Tags').optional()
            .isArray()
            .run(request);

        const result = validationResult(request);
        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
    }

    private static getFilter(request): KnowledgeNuggetSearchFilters {
        const pageIndex = request.query.PageIndex !== 'undefined' ? parseInt(request.query.PageIndex as string, 10) : 0;

        const itemsPerPage =
            request.query.ItemsPerPage !== 'undefined' ? parseInt(request.query.ItemsPerPage as string, 10) : 25;

        const filters: KnowledgeNuggetSearchFilters = {
            TopicName    : request.query.topicName ?? null,
            Tag          : request.query.tag ?? null,
            OrderBy      : request.query.orderBy ?? 'CreatedAt',
            Order        : request.query.order ?? 'descending',
            PageIndex    : pageIndex,
            ItemsPerPage : itemsPerPage,
        };
        return filters;
    }

    private static async getParamId(request) {

        await param('id').trim()
            .escape()
            .isUUID()
            .run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return request.params.id;
    }

    static async getPatientUserId(request) {

        await param('patientUserId').trim()
            .escape()
            .isUUID()
            .run(request);

        const result = validationResult(request);

        if (!result.isEmpty()) {
            Helper.handleValidationError(result);
        }
        return request.params.patientUserId;
    }

}