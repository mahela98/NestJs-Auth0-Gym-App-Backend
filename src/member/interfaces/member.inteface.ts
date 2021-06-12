import { Document } from 'mongoose';
import { MembershipType } from '../../membership-type/interfaces/mambershipType.interface'
    
export interface Member extends Document {
  readonly name: string;
  readonly email: string;
  readonly mobile: string;
  readonly address: string;
  readonly date_posted: string;
  readonly membershiptype: string;

}