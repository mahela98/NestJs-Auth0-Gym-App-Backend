import * as mongoose from 'mongoose';
    
export const MemberSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  address: String,
  date_posted: String,
});