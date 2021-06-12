// import * as mongoose from 'mongoose';

// export const MembershipTypeSchema = new mongoose.Schema(
//   {
//     type: String,
//     description: String,
//     body: String,
//     price: String,
//   },
//   { timestamps: true },
// );


import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MembershipTypeSchema = MembershipType & Document;

@Schema({timestamps:true})
export class MembershipType {
  @Prop()
  type: string;

  @Prop()
  description: string;

  @Prop()
  body: string;
  @Prop()
  price: string;

}

export const MembershipTypeSchema = SchemaFactory.createForClass(MembershipType);