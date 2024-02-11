import { IsLatitude, IsLongitude } from "class-validator";

export class NearestCityQueryDto {
    @IsLatitude()
    latitude: number;
    
    @IsLongitude()
    longitude: number;
}