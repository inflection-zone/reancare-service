import { inject, injectable } from "tsyringe";
import { IStatisticsRepo } from "../../database/repository.interfaces/statistics/statistics.repo.interface";
import { AppDownloadDto } from "../../domain.types/statistics/app.download.dto";
import { AppDownloadDomainModel } from "../../domain.types/statistics/app.download.domain.model";

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

    getDeletedUsers = async (filters): Promise<any> => {
        return await this._statisticsRepo.getDeletedUsers(filters);
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

    getDeviceDetailWiseUsers = async (filters): Promise<any> => {
        return await this._statisticsRepo.getDeviceDetailWiseUsers(filters);
    };

    getEnrollmentUsers = async (filters): Promise<any> => {
        return await this._statisticsRepo.getEnrollmentUsers(filters);
    };

    addAppDownloads = async (appDownloadDomainModel: AppDownloadDomainModel ): Promise<AppDownloadDto> => {
        return await this._statisticsRepo.addAppDownloads(appDownloadDomainModel);
    };

    getAppDownlods = async (): Promise<any> => {
        return await this._statisticsRepo.getAppDownlods();
    };

}
