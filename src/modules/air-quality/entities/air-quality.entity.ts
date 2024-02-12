import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type Pollution = {
    ts : Date,
    aqius: number,
    mainus: string,
    aqicn: number,
    maincn: string
}

@Schema()
export class AirQuality {
    
    @Prop({ type: mongoose.Schema.Types.String })
    city: string;

    @Prop({ type: mongoose.Schema.Types.String })
    country: string;

    @Prop({type: mongoose.Schema.Types.Mixed})
    pollution: Pollution
}

export const AirQualitySchema = SchemaFactory.createForClass(AirQuality); 