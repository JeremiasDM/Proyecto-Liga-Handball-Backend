import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Escudo extends Document {
  @Prop()
  filename: string;

  @Prop()
  mimetype: string;

  @Prop()
  size: number;

  @Prop()
  data: Buffer;
}

export const EscudoSchema = SchemaFactory.createForClass(Escudo);
