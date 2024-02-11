import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class AirQuality {
    
    @Prop({ type: mongoose.Schema.Types.String })
    city: string;

    @Prop({ type: mongoose.Schema.Types.String })
    country: string;

    pollution: {
        ts : Date,
        aqius: number,
        mainus: string,
        aqicn: number,
        maincn: string
    } 
}

export const AirQualitySchema = SchemaFactory.createForClass(AirQuality); 