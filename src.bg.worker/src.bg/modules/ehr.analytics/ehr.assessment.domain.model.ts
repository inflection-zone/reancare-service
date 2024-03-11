import { UserTaskCategory } from "../../../../src/domain.types/users/user.task/user.task.types";
import { uuid } from "../../../../src/domain.types/miscellaneous/system.types";

export interface EHRAssessmentDomainModel {
    AppName?       : string;
    PatientUserId? : uuid;
    AssessmentId?  : uuid;
    TemplateId?    : uuid;
    NodeId?        : uuid;
    Title?         : string;
    Question?      : string;
    SubQuestion?   : string;
    QuestionType?  : string;
    AnswerOptions? : string;
    AnswerValue?   : string;
    AnswerReceived?: string;
    AnsweredOn?    : Date;
    Status?        : string;
    Score?         : string;
    AdditionalInfo?: string;
    StartedAt?     : Date;
    FinishedAt?    : Date;
    RecordDate?    : Date;
}
