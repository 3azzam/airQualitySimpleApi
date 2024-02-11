export type EnvVariables = {
    port: number,
    IqAirBaseURL: string,
    IqAirApiKey: string,
    dbName: string,
    dbHost: string,
    dbPort: string
} 

export type INearestCityResponse = {
    pollution: {
        ts : Date,
        aqius: number,
        mainus: string,
        aqicn: number,
        maincn: string
    }
}

export type ErrorResponse = { 
    code: string,
    message: string
}