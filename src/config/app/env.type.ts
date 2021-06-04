export enum EnvironmentVariables {
    port = 'APP_PORT',
    host = 'APP_HOST',
    dbUsername = 'DB_USERNAME',
    dbPassword = 'DB_PASSWORD',
    dbDatabaseName = 'DB_DATABASE_NAME',
    dbHost = 'DB_HOST',
    dbPort = 'DB_PORT',
    dbSchema = 'DB_SCHEMA',
    dbUrl = 'DB_URL',
    jwtSecret = 'JWT_SECRET',
}

export interface EnvType {
    [EnvironmentVariables.port]: number;
    [EnvironmentVariables.host]: string;
    [EnvironmentVariables.dbUsername]: string;
    [EnvironmentVariables.dbPassword]: string;
    [EnvironmentVariables.dbDatabaseName]: string;
    [EnvironmentVariables.dbHost]: string;
    [EnvironmentVariables.dbPort]: string;
    [EnvironmentVariables.dbSchema]: string;
    [EnvironmentVariables.dbUrl]: string;
    [EnvironmentVariables.jwtSecret]: string;
}
