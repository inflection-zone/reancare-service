import express from 'express';
import { uuid } from '../../../../domain.types/miscellaneous/system.types';
import { ApiError } from '../../../../common/api.error';
import { ResponseHandler } from '../../../../common/response.handler';
import { PulseService } from '../../../../services/clinical/biometrics/pulse.service';
import { Loader } from '../../../../startup/loader';
import { PulseValidator } from '../../../validators/clinical/biometrics/pulse.validator';
import { BaseController } from '../../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class PulseController extends BaseController{

    //#region member variables and constructors

    _service: PulseService = null;

    _validator: PulseValidator = new PulseValidator();

    constructor() {
        super();
        this._service = Loader.container.resolve(PulseService);
    }

    //#endregion

    //#region Action methods

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            
            this.setContext('Biometrics.Pulse.Create', request, response);

            const model = await this._validator.create(request);
            const pulse = await this._service.create(model);
            if (pulse == null) {
                throw new ApiError(400, 'Cannot create record for pulse!');
            }

            ResponseHandler.success(request, response, 'Pulse record created successfully!', 201, {
                Pulse : pulse,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            
            this.setContext('Biometrics.Pulse.GetById', request, response);

            const id: uuid = await this._validator.getParamUuid(request, 'id');
            const pulse = await this._service.getById(id);
            if (pulse == null) {
                throw new ApiError(404, 'Pulse record not found.');
            }

            ResponseHandler.success(request, response, 'Pulse record retrieved successfully!', 200, {
                Pulse : pulse,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            
            this.setContext('Biometrics.Pulse.Search', request, response);

            const filters = await this._validator.search(request);
            const searchResults = await this._service.search(filters);

            const count = searchResults.Items.length;

            const message =
                count === 0
                    ? 'No records found!'
                    : `Total ${count} pulse records retrieved successfully!`;
                    
            ResponseHandler.success(request, response, message, 200, {
                PulseRecords : searchResults });

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            
            this.setContext('Biometrics.Pulse.Update', request, response);

            const domainModel = await this._validator.update(request);
            const id: uuid = await this._validator.getParamUuid(request, 'id');
            const existingRecord = await this._service.getById(id);
            if (existingRecord == null) {
                throw new ApiError(404, 'Pulse record not found.');
            }

            const updated = await this._service.update(domainModel.id, domainModel);
            if (updated == null) {
                throw new ApiError(400, 'Unable to update pulse record!');
            }

            ResponseHandler.success(request, response, 'Pulse record updated successfully!', 200, {
                Pulse : updated,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            
            this.setContext('Biometrics.Pulse.Delete', request, response);

            const id: uuid = await this._validator.getParamUuid(request, 'id');
            const existingRecord = await this._service.getById(id);
            if (existingRecord == null) {
                throw new ApiError(404, 'Pulse record not found.');
            }

            const deleted = await this._service.delete(id);
            if (!deleted) {
                throw new ApiError(400, 'Pulse record cannot be deleted.');
            }

            ResponseHandler.success(request, response, 'Pulse record deleted successfully!', 200, {
                Deleted : true,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    //#endregion

}
