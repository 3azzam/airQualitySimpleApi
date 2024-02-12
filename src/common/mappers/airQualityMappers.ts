import { INearestCityResponse, INearestCityResponseMapper } from "../types";

export const getAirQualityNearestCityMapper = (response:INearestCityResponse): INearestCityResponseMapper => {
    return {
        result: {
            pollution: response.current.pollution
        }
    }
}