
export interface IStatisticsRepo {

    getTotalUsers(filters): Promise<any>;

    getActiveUsers(filters): Promise<any>;

    getDeletedUsers(filters): Promise<any>;

    getGenderWiseUsers(filters): Promise<any>;

    getAgeWiseUsers(filters): Promise<any>;

    getUsersByMaritalStatus(filters): Promise<any>;

    getDeviceDetailWiseUsers(filters): Promise<any>;

}
