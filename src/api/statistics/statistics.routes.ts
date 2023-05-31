import express from 'express';
import { StatisticsController } from './statistics.controller';
import { Loader } from '../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.authenticator;
    const controller = new StatisticsController();

    router.get('/users', authenticator.authenticateClient, authenticator.authenticateUser, controller.getTotalUsers);
    router.get('/non-deleted-users', authenticator.authenticateClient, authenticator.authenticateUser, controller.getNonDeletedUsers);
    router.get('/active-users', authenticator.authenticateClient, authenticator.authenticateUser, controller.getActiveUsers);
    router.get('/deleted-users', authenticator.authenticateClient, authenticator.authenticateUser, controller.getDeletedUsers);
    router.get('/role-wise-users', authenticator.authenticateClient, authenticator.authenticateUser, controller.getRoleWiseDistribution);
    router.get('/gender-wise-users', authenticator.authenticateClient, authenticator.authenticateUser, controller.getGenderWiseUsers);
    router.get('/age-wise-users', authenticator.authenticateClient, authenticator.authenticateUser, controller.getAgeWiseUsers);
    router.get('/marital-status-wise-users', authenticator.authenticateClient, authenticator.authenticateUser, controller.getUsersByMaritalStatus);
    router.get('/device-detail-wise-users', authenticator.authenticateClient, authenticator.authenticateUser, controller.getDeviceDetailWiseUsers);
    router.get('/enrollment-users', authenticator.authenticateClient, authenticator.authenticateUser, controller.getEnrollmentUsers);
    router.post('/app-downloads/add', authenticator.authenticateClient, authenticator.authenticateUser, controller.addAppDownloads);
    router.get('/app-downloads', authenticator.authenticateClient, authenticator.authenticateUser, controller.getAppDownlods);
    router.get('/country-wise-users', authenticator.authenticateClient, authenticator.authenticateUser, controller.getCountryWiseUsers);
    router.get('/major-ailment-wise-users', authenticator.authenticateClient, authenticator.authenticateUser, controller.getMajorAilmentDistributionOfUsers);
    router.get('/obesity-distribution', authenticator.authenticateClient, authenticator.authenticateUser, controller.getObesityDistribution);
    router.get('/overall-users', authenticator.authenticateClient, authenticator.authenticateUser, controller.getOverallUsers);
    router.get('/addiction-distribution', authenticator.authenticateClient, authenticator.authenticateUser, controller.getAddictionDistribution);
    router.get('/health-pillar-distribution', authenticator.authenticateClient, authenticator.authenticateUser, controller.getHealthPillarDistribution);
    router.get('/users-stats', authenticator.authenticateClient, authenticator.authenticateUser, controller.getUsersStats);

    app.use('/api/v1/statistics', router);
};
