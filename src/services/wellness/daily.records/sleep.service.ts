import { inject, injectable } from "tsyringe";
import { ISleepRepo } from "../../../database/repository.interfaces/wellness/daily.records/sleep.repo.interface";
import { SleepDomainModel } from '../../../domain.types/wellness/daily.records/sleep/sleep.domain.model';
import { SleepDto } from '../../../domain.types/wellness/daily.records/sleep/sleep.dto';
import { SleepSearchFilters, SleepSearchResults } from '../../../domain.types/wellness/daily.records/sleep/sleep.search.types';

////////////////////////////////////////////////////////////////////////////////////////////////////////

@injectable()
export class SleepService {

    constructor(
        @inject('ISleepRepo') private _sleepRepo: ISleepRepo,
    ) {}

    create = async (sleepDomainModel: SleepDomainModel): Promise<SleepDto> => {
        return await this._sleepRepo.create(sleepDomainModel);
    };

    getById = async (id: string): Promise<SleepDto> => {
        return await this._sleepRepo.getById(id);
    };

    search = async (filters: SleepSearchFilters): Promise<SleepSearchResults> => {
        return await this._sleepRepo.search(filters);
    };

    update = async (id: string, sleepDomainModel: SleepDomainModel): Promise<SleepDto> => {
        return await this._sleepRepo.update(id, sleepDomainModel);
    };

    delete = async (id: string): Promise<boolean> => {
        return await this._sleepRepo.delete(id);
    };

}