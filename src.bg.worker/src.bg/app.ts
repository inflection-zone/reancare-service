import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import "reflect-metadata";
import { ConfigurationManager } from "../../src/config/configuration.manager";
import { EHRDbConnector } from '../../src/modules/ehr.analytics/ehr.db.connector';
import { AwardsFactsDBConnector } from '../../src/modules/awards.facts/awards.facts.db.connector';
import { Loader } from '../../src/startup/loader';
import { AwardsFactsService } from '../../src/modules/awards.facts/awards.facts.service';
import * as amqp from 'amqplib';
import { rabbitmqConfig } from '../rabbitmq/config'
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

        //Load configurations
        ConfigurationManager.loadConfigurations();

        //Load the modules
        await Loader.init();

        if (ConfigurationManager.EHRAnalyticsEnabled()) {
            await connectDatabase_EHRInsights();
        }
        
        if (ConfigurationManager.GamificationEnabled()) {
            await connectDatabase_AwardsFacts();
        }

        // RabbitMQ connection
        await connectToRabbitMQ();

        //Start listening
        await this.listen();

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

async function connectDatabase_EHRInsights() {
    //Connect with EHR insights database
    await EHRDbConnector.connect();
}

async function connectDatabase_AwardsFacts() {
    //Connect with Awards facts database
    await AwardsFactsDBConnector.connect();
    //Fetch the event types from awards service
    await AwardsFactsService.initialize();
}

async function connectToRabbitMQ() {
    try {
        const connection = await amqp.connect(rabbitmqConfig);
        const channel = await connection.createChannel();

        // Example: Declare a queue for cron job messages
        await channel.assertQueue('cronJobQueue');

        console.log('Connected to RabbitMQ');
        return channel;
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
        throw error;
    }
}