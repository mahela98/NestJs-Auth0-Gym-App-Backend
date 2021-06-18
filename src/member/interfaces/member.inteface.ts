import { Document } from 'mongoose';

export interface Member extends Document {
  readonly name: string;
  readonly email: string;
  readonly mobile: string;
  readonly address: string;
  readonly birthday: Date;
  readonly membershiptype: string;
}
