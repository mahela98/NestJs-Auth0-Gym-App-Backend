import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { MembershipType } from '../../membership-type/schemas/membershipType.schema';

export type MemberSchema = Member & Document;

@Schema({timestamps:true})
export class Member {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop()
  mobile: string;
  @Prop()
  address: string;
  @Prop()
  date_posted: string;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'MembershipType' }] })
  membershiptype: MembershipType;
}
export const MemberSchema = SchemaFactory.createForClass(Member);
