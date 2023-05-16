import express from 'express';
import { BaseValidator, Where } from '../base.validator';
import { AppDownloadDomainModel } from '../../domain.types/statistics/app.download.domain.model';

///////////////////////////////////////////////////////////////////////////////////////

export class StatistcsValidator extends BaseValidator {

    constructor() {
        super();
    }

    getDomainModel = (request: express.Request): AppDownloadDomainModel => {

        const AppDownloadModel: AppDownloadDomainModel = {
            AppName          : request.body.AppName,
            TotalDownloads   : request.body.TotalDownloads,
            IOSDownloads     : request.body.IOSDownloads,
            AndroidDownloads : request.body.AndroidDownloads,
           
        };

        return AppDownloadModel;
    };

    addAppDownloads = async (request: express.Request): Promise<AppDownloadDomainModel> => {
        await this.validateCreateBody(request);
        return this.getDomainModel(request);
    };

    searchFilter = async (request: express.Request): Promise<any> => {

        await this.validateDecimal(request, 'year', Where.Query, false, false);
       
        this.validateRequest(request);

        return this.getFilter(request);
    };

    private getFilter(request) {

        const filters = {
            Year : request.query.year ?? null,
        };

        return this.updateBaseSearchFilters(request, filters);
    }

    searchFilterForAge = async (request: express.Request): Promise<any> => {

        await this.validateDecimal(request, 'year', Where.Query, false, false);
        await this.validateDecimal(request, 'ageFrom', Where.Query, false, false);
        await this.validateDecimal(request, 'ageTo', Where.Query, false, false);
     
        this.validateRequest(request);

        return this.getFilterForAge(request);
    };

    private getFilterForAge(request) {

        const filters = {
            Year    : request.query.year ?? null,
            AgeFrom : request.query.ageFrom ?? null,
            AgeTo   : request.query.ageTo ?? null,
        };

        return this.updateBaseSearchFilters(request, filters);
    }

    private  async validateCreateBody(request) {

        await this.validateString(request, 'AppName', Where.Body, false, true);
        await this.validateDecimal(request, 'TotalDownloads', Where.Body, false, true);
        await this.validateDecimal(request, 'IOSDownloads', Where.Body, false, true);
        await this.validateDecimal(request, 'AndroidDownloads', Where.Body, false, true);
        this.validateRequest(request);
    }

}
