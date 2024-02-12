export type EnvVariables = {
    port: number,
    IqAirBaseURL: string,
    IqAirApiKey: string,
    dbName: string,
    dbHost: string,
    dbPort: string
} 

export type INearestCityResponse = {
    country: string,
    city: string,
    state:string,
    current: {
        pollution: {
            ts : Date,
            aqius: number,
            mainus: string,
            aqicn: number,
            maincn: string
        }
    }
}

export type INearestCityResponseMapper = {
    result: {
        pollution: {
            ts : Date,
            aqius: number,
            mainus: string,
            aqicn: number,
            maincn: string
        }
    }
}

export type ErrorResponse = { 
    code: string,
    message: string
}