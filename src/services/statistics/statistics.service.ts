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

    getNonDeletedUsers = async (filters): Promise<any> => {
        return await this._statisticsRepo.getNonDeletedUsers(filters);
    };

    getActiveUsers = async (filters): Promise<any> => {
        return await this._statisticsRepo.getActiveUsers(filters);
    };

    getDeletedUsers = async (filters): Promise<any> => {
        return await this._statisticsRepo.getDeletedUsers(filters);
    };

    getRoleWiseDistribution = async (filters): Promise<any> => {
        return await this._statisticsRepo.getRoleWiseDistribution(filters);
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

    getCountryWiseUsers = async (filters): Promise<any> => {
        return await this._statisticsRepo.getCountryWiseUsers(filters);
    };

    getMajorAilmentDistributionOfUsers = async (filters): Promise<any> => {
        return await this._statisticsRepo.getMajorAilmentDistributionOfUsers(filters);
    };

    getObesityDistribution = async (filters): Promise<any> => {
        return await this._statisticsRepo.getObesityDistribution(filters);
    };
    
    getOverallUsers = async (filters): Promise<any> => {
        return await this._statisticsRepo.getOverallUsers(filters);
    };
    
    getAddictionDistribution = async (filters): Promise<any> => {
        return await this._statisticsRepo.getAddictionDistribution(filters);
    };

    getHealthPillarDistribution = async (filters): Promise<any> => {
        return await this._statisticsRepo.getHealthPillarDistribution(filters);
    };
    
}
