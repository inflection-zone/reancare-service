import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { Loader } from '../../startup/loader';
import { BaseController } from '../base.controller';
import { StatisticsService } from '../../services/statistics/statistics.service';
import { StatistcsValidator } from './statistics.validator';
import { ApiError } from '../../common/api.error';

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
            const filters = await this._validator.searchFilter(request);
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
            const filters = await this._validator.searchFilter(request);
            const deviceDetailWiseUsers = await this._service.getDeviceDetailWiseUsers(filters);
            const message = 'Device detail wise users retrieved successfully!';
            ResponseHandler.success(request, response,message, 200, {
                DeviceDetailWiseUsers : deviceDetailWiseUsers });

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getEnrollmentUsers = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('Statistics.GetEnrollmentUsers', request, response);
            const filters = await this._validator.searchFilter(request);
            const enrollmentUsers = await this._service.getEnrollmentUsers(filters);
            const message = 'Enrollment users retrieved successfully!';
            ResponseHandler.success(request, response,message, 200, {
                EnrollmentUsers : enrollmentUsers });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    addAppDownloads = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            
            await this.setContext('Statistics.AddAppDownloads', request, response);

            const model = await this._validator.addAppDownloads(request);
            const appDownload = await this._service.addAppDownloads(model);
            if (appDownload == null) {
                throw new ApiError(400, 'Could not add a app downloads!');
            }

            ResponseHandler.success(request, response, 'App downloads added successfully!', 201, {
                AppDownload : appDownload,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getAppDownlods = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            
            await this.setContext('Statistics.GetAppDownlods', request, response);

            const appDownload = await this._service.getAppDownlods();
            if (appDownload == null) {
                throw new ApiError(404, 'App Download  not found.');
            }

            ResponseHandler.success(request, response, 'App Download retrieved successfully!', 200, {
                AppDownload : appDownload,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getCountryWiseUsers = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            await this.setContext('Statistics.GetCountryWiseUsers', request, response);
            const filters = await this._validator.searchFilter(request);
            const countryWiseUsers = await this._service.getCountryWiseUsers(filters);
            const message = 'Country wise users retrieved successfully!';
            ResponseHandler.success(request, response,message, 200, {
                CountryWiseUsers : countryWiseUsers });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
