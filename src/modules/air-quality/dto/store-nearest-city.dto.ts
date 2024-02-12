import { IsNotEmptyObject, IsString } from "class-validator";
import { Pollution } from "../entities/air-quality.entity";

export class StoreNearestCityDto {
    @IsString()
    country: string;

    @IsString()
    city:string;

    @IsNotEmptyObject()
    pollution: Pollution;
}