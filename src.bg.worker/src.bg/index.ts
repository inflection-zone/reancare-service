import dotenv from 'dotenv';
dotenv.config({path:'../.env'});

import Application from './app';

(async () => {
    const app = Application.instance();
    await app.start();
})();
