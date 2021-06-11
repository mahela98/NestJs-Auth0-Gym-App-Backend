import * as mongoose from 'mongoose';

export const MembershipTypeSchema = new mongoose.Schema(
  {
    type: String,
    description: String,
    body: String,
    price: String,
  },
  { timestamps: true },
);
