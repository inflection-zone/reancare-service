// import path from 'path';
// import * as defaultConfiguration from '../../reancare.config.json';
// import * as localConfiguration from '../reanbgworker.config.local.json';
// import {
//     Configurations,
//     DatabaseORM,
//     DatabaseType,
// } from './configuration.types';

// ////////////////////////////////////////////////////////////////////////////////////////////////////////

// export class ConfigurationManager {

//     static _config: Configurations;

//     public static loadConfigurations = (): void => {

//         const configuration = process.env.NODE_ENV === 'local' 
//             || process.env.NODE_ENV === 'test' 
//             ? localConfiguration : defaultConfiguration;

//         ConfigurationManager._config = {
//             SystemIdentifier : configuration.SystemIdentifier,
//             BaseUrl          : process.env.BASE_URL,
//             Database : {
//                 Type : configuration.Database.Type as DatabaseType,
//                 ORM  : configuration.Database.ORM as DatabaseORM,
//             },
//     };

//     public static BaseUrl = (): string => {
//         return ConfigurationManager._config.BaseUrl;
//     };

//     public static SystemIdentifier = (): string => {
//         return ConfigurationManager._config.SystemIdentifier;
//     };


//     public static DatabaseType = (): DatabaseType => {
//         return ConfigurationManager._config.Database.Type;
//     };

//     public static DatabaseORM = (): DatabaseORM => {
//         return ConfigurationManager._config.Database.ORM;
//     };


//     private static checkConfigSanity() {

//         //Check database configurations

//         if (ConfigurationManager._config.Database.Type === 'SQL') {
//             var orm = ConfigurationManager._config.Database.ORM;
//             if (orm !== 'Sequelize' && orm !== 'TypeORM') {
//                 throw new Error('Database configuration error! - Unspported/non-matching ORM');
//             }
//         }
//         if (ConfigurationManager._config.Database.Type === 'NoSQL') {
//             var orm = ConfigurationManager._config.Database.ORM;
//             const dialect = process.env.DB_DIALECT;
//             if (dialect === 'MongoDB') {
//                 if (orm !== 'Mongoose') {
//                     throw new Error('Database configuration error! - Unspported/non-matching ORM');
//                 }
//             }
//         }
//     }

// };
