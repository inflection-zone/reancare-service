import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { Loader } from '../../startup/loader';
import { BaseController } from '../base.controller';
import { StatisticsService } from '../../services/statistics/statistics.service';
import { StatistcsValidator } from './statistics.validator';

///////////////////////////////////////////////////////////////////////////////////////

export class StatisticsController extends BaseController {

    //#region member variables and constructors
    _service: StatisticsService = null;

    _validator = new StatistcsValidator();

    constructor() {
        super();
        this._service = Loader.container.resolve(StatisticsService);
    }

    //#endregion

    //#region Action methods

    getTotalUsers = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('Statistics.GetTotalUsers', request, response);
            const filters = await this._validator.searchFilter(request);
            const totalUsers = await this._service.getTotalUsers(filters);
            const message = 'Total users retrieved successfully!';
            ResponseHandler.success(request, response,message, 200, {
                TotalUsers : totalUsers });

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getActiveUsers = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('Statistics.GetActiveUsers', request, response);
            const filters = await this._validator.searchFilter(request);
            const activeUsers = await this._service.getActiveUsers(filters);
            const message = 'Active users retrieved successfully!';
            ResponseHandler.success(request, response,message, 200, {
                ActiveUsers : activeUsers });

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getDeletedUsers = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('Statistics.GetDeletdUsers', request, response);
            const filters = await this._validator.searchFilter(request);
            const deletedUsers = await this._service.getDeletedUsers(filters);
            const message = 'Deleted users retrieved successfully!';
            ResponseHandler.success(request, response,message, 200, {
                DeletedUsers : deletedUsers });

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getGenderWiseUsers = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('Statistics.GetGenderWiseUsers', request, response);
            const filters = await this._validator.searchFilter(request);
            const genderWiseUsers = await this._service.getGenderWiseUsers(filters);
            const message = 'Gender wise users retrieved successfully!';
            ResponseHandler.success(request, response,message, 200, {
                GenderWiseUsers : genderWiseUsers });

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getAgeWiseUsers = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('Statistics.GetAgeWiseUsers', request, response);
            const filters = await this._validator.searchFilterForAge(request);
            const ageWiseUsers = await this._service.getAgeWiseUsers(filters);
            const message = 'Age wise users retrieved successfully!';
            ResponseHandler.success(request, response,message, 200, {
                AgeWiseUsers : ageWiseUsers });

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getUsersByMaritalStatus = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('Statistics.GetUsersByMaritalStatus', request, response);
            const filters = await this._validator.searchFilterForAge(request);
            const maritalStatusWiseUsers = await this._service.getUsersByMaritalStatus(filters);
            const message = 'Marital status wise users retrieved successfully!';
            ResponseHandler.success(request, response,message, 200, {
                MaritalStatusWiseUsers : maritalStatusWiseUsers });

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getDeviceDetailWiseUsers = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('Statistics.GetDeviceDetailWiseUsers', request, response);
            const filters = await this._validator.searchFilterForAge(request);
            const deviceDetailWiseUsers = await this._service.getDeviceDetailWiseUsers(filters);
            const message = 'Device detail wise users retrieved successfully!';
            ResponseHandler.success(request, response,message, 200, {
                DeviceDetailWiseUsers : deviceDetailWiseUsers });

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
