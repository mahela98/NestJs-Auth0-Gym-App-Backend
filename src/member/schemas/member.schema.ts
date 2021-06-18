import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDateString, IsDefined } from 'class-validator';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { MembershipType } from '../../membership-type/schemas/membershipType.schema';

export type MemberSchema = Member & Document;

@Schema({ timestamps: true })
export class Member {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop()
  mobile: string;
  @Prop()
  address: string;

  
  @Prop({ default: new Date(Date.now()) })
  @IsDateString()
  birthday: Date;
  
  @Prop({ type: [{ type: Types.ObjectId, ref: 'MembershipType' }] })
  membershiptype: MembershipType;
}

export const MemberSchema = SchemaFactory.createForClass(Member);

// MemberSchema.pre<Member>('save', async function (next) {
//   console.log(this.membershiptype);
//   console.log(this.membershiptype.toString() === '');

//   if (this.membershiptype.toString() != '') {

//   }
// });
