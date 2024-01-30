
export type DatabaseType = 'SQL' | 'NoSQL';
export type DatabaseORM = 'Sequelize' | 'TypeORM' | 'Mongoose';

///////////////////////////////////////////////////////////////////////////////////////////

export interface DatabaseConfig {
    Type   : DatabaseType;
    ORM    : DatabaseORM;
}

export interface Configurations {
    SystemIdentifier    : string;
    BaseUrl             : string;
    Database            : DatabaseConfig;
}