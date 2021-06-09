import * as mongoose from 'mongoose';
    
export const BlogSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  address: String,
  date_posted: String,
});