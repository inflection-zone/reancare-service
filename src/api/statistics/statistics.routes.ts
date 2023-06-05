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
    router.get('/roles', authenticator.authenticateClient, authenticator.authenticateUser, controller.getUsersByRole);
    router.get('/genders', authenticator.authenticateClient, authenticator.authenticateUser, controller.getUsersByGender);
    router.get('/ages', authenticator.authenticateClient, authenticator.authenticateUser, controller.getUsersByAge);
    router.get('/marital-statuses', authenticator.authenticateClient, authenticator.authenticateUser, controller.getUsersByMaritalStatus);
    router.get('/device-details', authenticator.authenticateClient, authenticator.authenticateUser, controller.getUsersByDeviceDetail);
    router.get('/enrollments', authenticator.authenticateClient, authenticator.authenticateUser, controller.getUsersByEnrollment);
    router.post('/app-downloads', authenticator.authenticateClient, authenticator.authenticateUser, controller.updateAppDownloadCount);
    router.get('/app-downloads', authenticator.authenticateClient, authenticator.authenticateUser, controller.getAppDownlodCount);
    router.get('/countries', authenticator.authenticateClient, authenticator.authenticateUser, controller.getUsersByCountry);
    router.get('/major-ailments', authenticator.authenticateClient, authenticator.authenticateUser, controller.getUsersByMajorAilment);
    router.get('/obesities', authenticator.authenticateClient, authenticator.authenticateUser, controller.getUsersByObesity);
    router.get('/users-count', authenticator.authenticateClient, authenticator.authenticateUser, controller.getUsersCount);
    router.get('/users-stats', authenticator.authenticateClient, authenticator.authenticateUser, controller.getUsersStats);
    router.get('/addictions', authenticator.authenticateClient, authenticator.authenticateUser, controller.getUsersByAddiction);
    router.get('/health-pillars', authenticator.authenticateClient, authenticator.authenticateUser, controller.getUsersByHealthPillar);
    router.get('/biometrics', authenticator.authenticateClient, authenticator.authenticateUser, controller.getUsersByBiometrics);

    app.use('/api/v1/users-statistics', router);
};
