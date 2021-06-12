import * as mongoose from 'mongoose';
import { MembershipTypeSchema } from '../../membership-type/schemas/membershipType.schema';

// export const MemberSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   mobile: String,
//   address: String,
//   date_posted: String,

//   membershiptype: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'MembershipTypeSchema',
//     default: ''
// },

// }
// ,{timestamps:true}
// );


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document , Types, Schema as MongooseSchema} from 'mongoose';
import { MembershipType } from '../../membership-type/schemas/membershipType.schema';


export type MemberSchema = Member & Document;

@Schema()
export class Member {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  mobile: string;
  @Prop()
  address: string;
  @Prop()
  date_posted: string;

  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'MembershipTypeSchema' })
  // membershiptype: MongooseSchema.Types.ObjectId ;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'MembershipType' }] })
  membershiptype: MembershipType;


}

export const MemberSchema = SchemaFactory.createForClass(Member);
