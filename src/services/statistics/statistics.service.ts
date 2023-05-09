import { inject, injectable } from "tsyringe";
import { IStatisticsRepo } from "../../database/repository.interfaces/statistics/statistics.repo.interface";

////////////////////////////////////////////////////////////////////////////////////////////////////////

@injectable()
export class StatisticsService {

    constructor(
        @inject('IStatisticsRepo') private _statisticsRepo: IStatisticsRepo,
    ) {}

    getTotalUsers = async (filters): Promise<any> => {
        return await this._statisticsRepo.getTotalUsers(filters);
    };

    getActiveUsers = async (filters): Promise<any> => {
        return await this._statisticsRepo.getActiveUsers(filters);
    };

    getGenderWiseUsers = async (filters): Promise<any> => {
        return await this._statisticsRepo.getGenderWiseUsers(filters);
    };

    getAgeWiseUsers = async (filters): Promise<any> => {
        return await this._statisticsRepo.getAgeWiseUsers(filters);
    };

    getUsersByMaritalStatus = async (filters): Promise<any> => {
        return await this._statisticsRepo.getUsersByMaritalStatus(filters);
    };

}
