import { uuid } from "../../../domain.types/miscellaneous/system.types";
import { AppDownloadDomainModel } from "../../../domain.types/statistics/app.download.domain.model";
import { AppDownloadDto } from "../../../domain.types/statistics/app.download.dto";

export interface IStatisticsRepo {

    getTotalUsers(filters): Promise<any>;

    getActiveUsers(filters): Promise<any>;

    getDeletedUsers(filters): Promise<any>;

    getGenderWiseUsers(filters): Promise<any>;

    getAgeWiseUsers(filters): Promise<any>;

    getUsersByMaritalStatus(filters): Promise<any>;

    getDeviceDetailWiseUsers(filters): Promise<any>;

    getEnrollmentUsers(filters): Promise<any>;

    addAppDownloads(appDownloadDomainModel: AppDownloadDomainModel): Promise<AppDownloadDto>;

    getAppDownlods(): Promise<any>;

}
