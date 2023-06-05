import { AppDownloadDomainModel } from "../../../domain.types/statistics/app.download.domain.model";
import { AppDownloadDto } from "../../../domain.types/statistics/app.download.dto";

export interface IStatisticsRepo {

    getTotalUsers(filters): Promise<any>;

    getNonDeletedUsers(filters): Promise<any>;
    
    getActiveUsers(filters): Promise<any>;

    getDeletedUsers(filters): Promise<any>;

    getUsersByRole(filters): Promise<any>;

    getUsersByGender(filters): Promise<any>;

    getUsersByAge(filters): Promise<any>;

    getUsersByMaritalStatus(filters): Promise<any>;

    getUsersByDeviceDetail(filters): Promise<any>;

    getUsersByEnrollment(filters): Promise<any>;

    updateAppDownloadCount(appDownloadDomainModel: AppDownloadDomainModel): Promise<AppDownloadDto>;

    getAppDownlodCount(): Promise<any>;

    getUsersByCountry(filters): Promise<any>;

    getUsersByMajorAilment(filters): Promise<any>;

    getUsersByObesity(filters): Promise<any>;

    getUsersCount(filters): Promise<any>;
    
    getUsersStats(filters): Promise<any>;

    getUsersByAddiction(filters): Promise<any>;

    getUsersByHealthPillar(filters): Promise<any>;

    getUsersByBiometrics(filters): Promise<any>;

}
