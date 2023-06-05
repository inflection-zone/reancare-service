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

    getUsersByRole = async (filters): Promise<any> => {
        return await this._statisticsRepo.getUsersByRole(filters);
    };

    getUsersByGender = async (filters): Promise<any> => {
        return await this._statisticsRepo.getUsersByGender(filters);
    };

    getUsersByAge = async (filters): Promise<any> => {
        return await this._statisticsRepo.getUsersByAge(filters);
    };

    getUsersByMaritalStatus = async (filters): Promise<any> => {
        return await this._statisticsRepo.getUsersByMaritalStatus(filters);
    };

    getUsersByDeviceDetail = async (filters): Promise<any> => {
        return await this._statisticsRepo.getUsersByDeviceDetail(filters);
    };

    getUsersByEnrollment = async (filters): Promise<any> => {
        return await this._statisticsRepo.getUsersByEnrollment(filters);
    };

    updateAppDownloadCount = async (appDownloadDomainModel: AppDownloadDomainModel ): Promise<AppDownloadDto> => {
        return await this._statisticsRepo.updateAppDownloadCount(appDownloadDomainModel);
    };

    getAppDownlodCount = async (): Promise<any> => {
        return await this._statisticsRepo.getAppDownlodCount();
    };

    getUsersByCountry = async (filters): Promise<any> => {
        return await this._statisticsRepo.getUsersByCountry(filters);
    };

    getUsersByMajorAilment = async (filters): Promise<any> => {
        return await this._statisticsRepo.getUsersByMajorAilment(filters);
    };

    getUsersByObesity = async (filters): Promise<any> => {
        return await this._statisticsRepo.getUsersByObesity(filters);
    };
    
    getUsersCount = async (filters): Promise<any> => {
        return await this._statisticsRepo.getUsersCount(filters);
    };

    getUsersStats = async (filters): Promise<any> => {
        return await this._statisticsRepo.getUsersStats(filters);
    };
    
    getUsersByAddiction = async (filters): Promise<any> => {
        return await this._statisticsRepo.getUsersByAddiction(filters);
    };

    getUsersByHealthPillar = async (filters): Promise<any> => {
        return await this._statisticsRepo.getUsersByHealthPillar(filters);
    };

    getUsersByBiometrics = async (filters): Promise<any> => {
        return await this._statisticsRepo.getUsersByBiometrics(filters);
    };
    
}
