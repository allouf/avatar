import mongoose, { Schema, Document } from "mongoose";

interface PrivateSaleEmail extends Document {
  email: string;
}

const PrivateSaleEmailSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true }
},
{ collection: "privateSaleEmails", timestamps: true });

export default mongoose.models.PrivateSaleEmail || mongoose.model<PrivateSaleEmail>("PrivateSaleEmail", PrivateSaleEmailSchema);