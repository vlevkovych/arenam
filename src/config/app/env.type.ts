export enum EnvironmentVariables {
    port = 'APP_PORT',
    host = 'APP_HOST',
    dbUsername = 'DB_USERNAME',
    dbPassword = 'DB_PASSWORD',
    dbDatabaseName = 'DB_DATABASE_NAME',
}

export interface EnvType {
    [EnvironmentVariables.port]: number;
    [EnvironmentVariables.host]: string;
    [EnvironmentVariables.dbUsername]: string;
    [EnvironmentVariables.dbPassword]: string;
    [EnvironmentVariables.dbDatabaseName]: string;
}
