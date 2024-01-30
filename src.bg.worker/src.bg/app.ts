import express from 'express';
import dotenv from 'dotenv';
dotenv.config({path:'../.env'});

/////////////////////////////////////////////////////////////////////////

export default class MainApplication {

    public _app: express.Application;

    private static _instance: MainApplication;

    private constructor() {
        this._app = express();
    }

    public static instance(): MainApplication {
        return this._instance || (this._instance = new this());
    }

    public app(): express.Application {
        return this._app;
    }

    public start = async (): Promise<void> => {
        //Start listening
        await this.listen();

        //Connect databases
       // await connectDatabase_Primary();
    };

    private listen = () => {
        return new Promise((resolve, reject) => {
            try {
                const port = process.env.PORT_BG;
                this._app.listen(port, () => {
                    console.log(`Server is running on port ${port}`);
                    resolve(this._app);
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}