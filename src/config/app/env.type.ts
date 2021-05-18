export enum EnvironmentVariables {
    port = 'APP_PORT',
    host = 'APP_HOST',
}

export interface EnvType {
    [EnvironmentVariables.port]: number;
    [EnvironmentVariables.host]: string;
}
