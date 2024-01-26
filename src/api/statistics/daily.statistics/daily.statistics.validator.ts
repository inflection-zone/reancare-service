import express from 'express';
import { DailyStatisticsSearchFilters } from '../../../domain.types/statistics/daily.statistics/daily.statistics.search.types';
import { DailySystemStatisticsDomainModel } from '../../../domain.types/statistics/daily.statistics/daily.statistics.domain.model';
import { BaseValidator, Where } from '../../../api/base.validator';

///////////////////////////////////////////////////////////////////////////////////////

export class DailyStatisticsValidator extends BaseValidator {

    constructor() {
        super();
    }

    getCreateDomainModel = (requestBody: any): DailySystemStatisticsDomainModel => {
        const createModel: DailySystemStatisticsDomainModel = {
            ReportDate      : requestBody.ReportDate ?? new Date(),
            ReportTimestamp : requestBody.ReportTimestamp ?? new Date(),
            DashboardStats  : requestBody.DashboardStats ? JSON.stringify(requestBody.DashboardStats) : null,
            UserStats       : requestBody.UserStats ? JSON.stringify(requestBody.UserStats) : null,
            AHAStats        : requestBody.AHAStats ? JSON.stringify(requestBody.AHAStats) : null,
        };
        return createModel;
    };

    create = async (request: express.Request): Promise<DailySystemStatisticsDomainModel> => {
        await this.validateCreateBody(request);
        return this.getCreateDomainModel(request.body);
    };

    search = async (request: express.Request): Promise<DailyStatisticsSearchFilters> => {
        await this.validateUuid(request, 'id', Where.Query, false, false);
        await this.validateDate(request,'ReportDate',Where.Query,false,false);
        await this.validateDate(request,'ReportTimestamp',Where.Query,false,false);
        
        await this.validateBaseSearchFilters(request);

        this.validateRequest(request);

        return this.getFilter(request);
    };

    private async validateCreateBody(request) {
        await this.validateDate(request,'ReportDate',Where.Body,false,false);
        await this.validateDate(request,'ReportTimestamp',Where.Body,false,false);
        await this.validateString(request,'Statistics',Where.Body,true,false);
        await this.validateRequest(request);
    }

    private getFilter(request): DailyStatisticsSearchFilters {
        const filters: DailyStatisticsSearchFilters = {
            id              : request.query.id ?? null,
            ReportDate      : request.query.ReportDate ?? null,
            ReportTimestamp : request.query.ReportTimestamp ?? null,
        };

        return this.updateBaseSearchFilters(request, filters);
    }

}
