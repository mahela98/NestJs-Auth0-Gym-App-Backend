import { Document } from 'mongoose';

export interface Member extends Document {
  readonly first_name: string;
  readonly middle_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly mobile: string;
  readonly address: {
    line1:string,
    line2:string,
    city:string
  };
  readonly birthday: Date;
  readonly membershiptype: string;
}
