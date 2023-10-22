import { inject, injectable } from 'tsyringe';
import { IBridgeRepo } from '../../../database/repository.interfaces/assorted/blood.donation/bridge.repo.interface';
import { IPatientRepo } from '../../../database/repository.interfaces/users/patient/patient.repo.interface';
import { IDonationCommunicationRepo } from '../../../database/repository.interfaces/assorted/blood.donation/communication.repo.interface';
import { DonationCommunicationDomainModel } from '../../../domain.types/assorted/blood.donation/communication/communication.domain.model';
import { DonationCommunicationDto } from '../../../domain.types/assorted/blood.donation/communication/communication.dto';
import { DonationCommunicationSearchFilters, DonationCommunicationSearchResults } from '../../../domain.types/assorted/blood.donation/communication/communication.search.types';

////////////////////////////////////////////////////////////////////////////////////////////////////////

@injectable()
export class DonationCommunicationService {

    constructor(
        @inject('IDonationCommunicationRepo') private _DonationCommunicationRepo: IDonationCommunicationRepo,
        @inject('IPatientDonorsRepo') private _patientDonorsRepo: IBridgeRepo,
        @inject('IPatientRepo') private _patientRepo: IPatientRepo,
    ) {}

    //#region Publics

    public create = async (donationCommunicationDomainModel: DonationCommunicationDomainModel):
        Promise<DonationCommunicationDto> => {

        var dto = await this._DonationCommunicationRepo.create(donationCommunicationDomainModel);
        // if (dto.PatientUserId !== null) {
        //     await this._patientRepo.updateByUserId( dto.PatientUserId ,{ "DonorAcceptance": DonorAcceptance.Send });
        // }
        return dto;
    };

    public getById = async (id: string): Promise<DonationCommunicationDto> => {
        var dto = await this._DonationCommunicationRepo.getById(id);
        return dto;
    };

    public search = async (
        filters: DonationCommunicationSearchFilters
    ): Promise<DonationCommunicationSearchResults> => {
        var items = [];
        var results = await this._DonationCommunicationRepo.search(filters);
        for await (var dto of results.Items) {
            items.push(dto);
        }
        results.Items = items;
        return results;
    };

    public update = async (
        id: string,
        updateModel: DonationCommunicationDomainModel
    ): Promise<DonationCommunicationDto> => {
        var dto = await this._DonationCommunicationRepo.update(id, updateModel);
        // if (updateModel.DonorAcceptedDate !== null) {
        //     await this._patientRepo.updateByUserId( dto.PatientUserId ,{ "DonorAcceptance": DonorAcceptance.Accepted });
        // }
        return dto;
    };

    public delete = async (id: string): Promise<boolean> => {
        return await this._DonationCommunicationRepo.delete(id);
    };

    public getByPatientUserId = async (patientUserId: string): Promise<DonationCommunicationDto> => {
        var dto = await this._DonationCommunicationRepo.getByPatientUserId(patientUserId);
        return dto;
    };

    //#endregion

}
