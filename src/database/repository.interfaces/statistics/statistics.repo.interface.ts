import { AppDownloadDomainModel } from "../../../domain.types/statistics/app.download.domain.model";
import { AppDownloadDto } from "../../../domain.types/statistics/app.download.dto";

export interface IStatisticsRepo {

    getTotalUsers(filters): Promise<any>;

    getNonDeletedUsers(filters): Promise<any>;
    
    getActiveUsers(filters): Promise<any>;

    getDeletedUsers(filters): Promise<any>;

    getRoleWiseDistribution(filters): Promise<any>;

    getGenderWiseUsers(filters): Promise<any>;

    getAgeWiseUsers(filters): Promise<any>;

    getUsersByMaritalStatus(filters): Promise<any>;

    getDeviceDetailWiseUsers(filters): Promise<any>;

    getEnrollmentUsers(filters): Promise<any>;

    addAppDownloads(appDownloadDomainModel: AppDownloadDomainModel): Promise<AppDownloadDto>;

    getAppDownlods(): Promise<any>;

    getCountryWiseUsers(filters): Promise<any>;

    getMajorAilmentDistributionOfUsers(filters): Promise<any>;

    getObesityDistribution(filters): Promise<any>;

    getOverallUsers(filters): Promise<any>;

    getAddictionDistribution(filters): Promise<any>;

    getHealthPillarDistribution(filters): Promise<any>;

}
