import express from 'express';
import { StatisticsController } from './statistics.controller';
import { Loader } from '../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.authenticator;
    const controller = new StatisticsController();

    router.get('/users', authenticator.authenticateClient, authenticator.authenticateUser, controller.getTotalUsers);
    router.get('/active-users', authenticator.authenticateClient, authenticator.authenticateUser, controller.getActiveUsers);
    router.get('/gender-wise-users', authenticator.authenticateClient, authenticator.authenticateUser, controller.getGenderWiseUsers);
    router.get('/age-wise-users', authenticator.authenticateClient, authenticator.authenticateUser, controller.getAgeWiseUsers);

    app.use('/api/v1/statistics', router);
};
