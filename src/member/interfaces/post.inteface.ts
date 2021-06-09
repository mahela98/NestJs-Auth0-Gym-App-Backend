import { Document } from 'mongoose';
    
export interface Post extends Document {
  readonly name: string;
  readonly email: string;
  readonly mobile: string;
  readonly address: string;
  readonly date_posted: string;
}