import mongoose, { Schema, Document } from "mongoose";

interface UserWallet extends Document {
  email: string;
  walletId: string;
  hasClaimed?: boolean;
}

const UserWalletSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  walletId: { type: String, required: true, unique: true },
  hasClaimed: { type: Boolean, default: false }
},
{ collection: "UserWallet", timestamps: true });

export default mongoose.models.UserWallet || mongoose.model<UserWallet>("UserWallet", UserWalletSchema);