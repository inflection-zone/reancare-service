import express from 'express';
import { BaseValidator, Where } from '../base.validator';

///////////////////////////////////////////////////////////////////////////////////////

export class StatistcsValidator extends BaseValidator {

    constructor() {
        super();
    }

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

}
