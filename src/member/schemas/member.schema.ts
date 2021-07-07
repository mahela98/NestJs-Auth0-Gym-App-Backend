import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDateString, IsDefined } from 'class-validator';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { MembershipType } from '../../membership-type/schemas/membershipType.schema';
import * as uniqueValidator from 'mongoose-unique-validator';

export type MemberSchema = Member & Document;

@Schema({ timestamps: true })
export class Member {
  @Prop({ required: true })
  first_name: string;

  @Prop()
  middle_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true , unique: true})
  email: string;

  @Prop({ required: true })
  mobile: string;

  @Prop()
  occupation: string;

  @Prop(
    raw({
      line1: { type: String },
      line2: { type: String },
      city: { type: String },
    }),
  )
  address: Record<string, any>;

  @Prop(
    raw({
      passport_number: { type: String },
      nic_number: { type: String ,unique: true},
    }),
  )
  nationality: Record<string, any>;

  @Prop({ default: new Date(Date.now()) })
  @IsDateString()
  birthday: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'MembershipType' }] })
  membershiptype: MembershipType;
}

export const MemberSchema = SchemaFactory.createForClass(Member).plugin(uniqueValidator,{ message: 'Error, expected {PATH} to be unique.' });
