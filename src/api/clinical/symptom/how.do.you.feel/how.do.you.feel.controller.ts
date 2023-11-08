import express from 'express';
import { uuid } from '../../../../domain.types/miscellaneous/system.types';
import { ApiError } from '../../../../common/api.error';
import { ResponseHandler } from '../../../../common/response.handler';
import { HowDoYouFeelService } from '../../../../services/clinical/symptom/how.do.you.feel.service';
import { Loader } from '../../../../startup/loader';
import { HowDoYouFeelValidator } from './how.do.you.feel.validator';
import { BaseController } from '../../../base.controller';
import { PatientService } from '../../../../services/users/patient/patient.service';
import { EHRAnalyticsHandler } from '../../../../modules/ehr.analytics/ehr.analytics.handler';
import { HowDoYouFeelDomainModel } from '../../../../domain.types/clinical/symptom/how.do.you.feel/how.do.you.feel.domain.model';
import { EHRRecordTypes } from '../../../../modules/ehr.analytics/ehr.record.types';

///////////////////////////////////////////////////////////////////////////////////////

export class HowDoYouFeelController extends BaseController{

    //#region member variables and constructors

    _service: HowDoYouFeelService = null;

    _validator: HowDoYouFeelValidator = new HowDoYouFeelValidator();

    _patientService: PatientService = null;

    constructor() {
        super();
        this._service = Loader.container.resolve(HowDoYouFeelService);
        this._patientService = Loader.container.resolve(PatientService);

    }

    //#endregion

    //#region Action methods

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {

            await this.setContext('HowDoYouFeel.Create', request, response);

            const model = await this._validator.create(request);
            const howDoYouFeel = await this._service.create(model);
            if (howDoYouFeel == null) {
                throw new ApiError(400, 'Cannot create record for how do you feel!');
            }

            // get user details to add records in ehr database
            const userDetails = await this._patientService.getByUserId(howDoYouFeel.PatientUserId);
            if (userDetails.User.IsTestUser == false) {
                this.addEHRRecord(model.PatientUserId, howDoYouFeel.id, model);
            }

            ResponseHandler.success(request, response, 'How do you feel record created successfully!', 201, {
                HowDoYouFeel : howDoYouFeel,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {

            await this.setContext('HowDoYouFeel.GetById', request, response);

            const id: uuid = await this._validator.getParamUuid(request, 'id');
            const howDoYouFeel = await this._service.getById(id);
            if (howDoYouFeel == null) {
                throw new ApiError(404, 'How do you feel record not found.');
            }

            ResponseHandler.success(request, response, 'How do you feel record retrieved successfully!', 200, {
                HowDoYouFeel : howDoYouFeel,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise<void> => {
        try {

            await this.setContext('HowDoYouFeel.Search', request, response);

            const filters = await this._validator.search(request);
            const searchResults = await this._service.search(filters);
            const count = searchResults.Items.length;
            const message =
                count === 0
                    ? 'No records found!'
                    : `Total ${count} how do you feel records retrieved successfully!`;

            ResponseHandler.success(request, response, message, 200, { HowDoYouFeelRecords: searchResults });

        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise<void> => {
        try {

            await this.setContext('HowDoYouFeel.Update', request, response);

            const domainModel = await this._validator.update(request);
            const id: uuid = await this._validator.getParamUuid(request, 'id');
            const existingRecord = await this._service.getById(id);
            if (existingRecord == null) {
                throw new ApiError(404, 'How do you feel record not found.');
            }

            const updated = await this._service.update(domainModel.id, domainModel);
            if (updated == null) {
                throw new ApiError(400, 'Unable to update how do you feel record!');
            }

            ResponseHandler.success(request, response, 'How do you feel record updated successfully!', 200, {
                HowDoYouFeel : updated,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {

            await this.setContext('Nutrition.FoodConsumption.Delete', request, response);

            const id: uuid = await this._validator.getParamUuid(request, 'id');
            const existingRecord = await this._service.getById(id);
            if (existingRecord == null) {
                throw new ApiError(404, 'How do you feel record not found.');
            }

            const deleted = await this._service.delete(id);
            if (!deleted) {
                throw new ApiError(400, 'How do you feel record cannot be deleted.');
            }

            ResponseHandler.success(request, response, 'How do you feel record deleted successfully!', 200, {
                Deleted : true,
            });
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    private addEHRRecord = (patientUserId: uuid, recordId: uuid, model: HowDoYouFeelDomainModel) => {
        if (model.Feeling === 'Better') {
            EHRAnalyticsHandler.addStringRecord(
                patientUserId,
                recordId,
                EHRRecordTypes.Symptom,
                model.Feeling,
                'Better'
            );
        }

        if (model.Feeling === 'Same') {
            EHRAnalyticsHandler.addStringRecord(
                patientUserId,
                recordId,
                EHRRecordTypes.Symptom,
                model.Feeling,
                'Same'
            );
        }

        if (model.Feeling === 'Worse') {
            EHRAnalyticsHandler.addStringRecord(
                patientUserId,
                recordId,
                EHRRecordTypes.Symptom,
                model.Feeling,
                'Worse'
            );
        }
    };

    //#endregion

}
