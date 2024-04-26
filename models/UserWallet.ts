import mongoose, { Schema, Document } from "mongoose";

interface UserWallet extends Document {
  email: string;
  walletId: string;
}

const UserWalletSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    walletId: { type: String, required: true },
  },
  { collection: "UserWallet", timestamps: true }
);

export default mongoose.models.UserWallet ||
  mongoose.model<UserWallet>("UserWallet", UserWalletSchema);
