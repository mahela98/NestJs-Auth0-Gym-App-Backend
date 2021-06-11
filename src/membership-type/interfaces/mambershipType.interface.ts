import { Document } from 'mongoose';

export interface MembershipType extends Document {
  readonly type: String;
  readonly description: String;
  readonly body: String;
  readonly price: String;
}
