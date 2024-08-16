import mongoose, { Schema, Document } from "mongoose";

export interface IAirdropInfo extends Document {
  airdropTotal: number;
  tokensPerUser: number; // You'll need to define the key logic when this gets changed
}

const AirdropInfoSchema: Schema = new Schema({
  airdropTotal: { type: Number, required: true },
  tokensPerUser: { type: Number, required: true }
}, 
{ timestamps: true }); // Including timestamps for audit trail of when it was last updated

export default mongoose.model<IAirdropInfo>('AirdropInfo', AirdropInfoSchema);