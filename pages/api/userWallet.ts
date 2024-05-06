import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/mongo-init';
import UserWallet from '../../models/UserWallet';
import AirdropInfo from '../../models/AirdropInfo';
import { IAirdropInfo } from '../../models/AirdropInfo';

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isFieldMissing = (field: any) => {
  return !field;
};

const handleError = (
  res: NextApiResponse,
  statusCode: number,
  message: string,
  extra?: Record<string, unknown>
) => {
  res.status(statusCode).json({ error: message });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      await connectToDatabase();
      const estimatedTotalWallets = await UserWallet.estimatedDocumentCount() as unknown as number;
      const airdropShare = estimatedTotalWallets > 0
        ? 1000000 / estimatedTotalWallets
        : 0;

      res.json({
        totalWalletsCount: estimatedTotalWallets,
        airdropSharePerUser: airdropShare
      });
      
    } catch (error) {
      console.error('Error getting user wallet count:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error });
    }
  }
  else if (req.method === 'POST') {
      try {
        await connectToDatabase();
  
        const { email, walletId } = req.body;
        if (isFieldMissing(email) || isFieldMissing(walletId)) {
          return handleError(res, 400, "'email' and 'walletId' are required");
        }
  
        if (!validateEmail(email)) {
          return handleError(res, 400, 'Email is invalid');
        }
  
        // Check if the email is already registered
        const existingUserWallet = await UserWallet.findOne({ email: email });
        if (existingUserWallet) {
          return handleError(res, 409, 'Email is already registered.');
        }

        // Check if the wallet ID is already registered
        const existingWalletId = await UserWallet.findOne({ walletId: walletId });
        if (existingWalletId) {
          return handleError(res, 409, 'Wallet ID is already registered.');
        }
  
        // If neither the email nor wallet ID is registered, proceed to save the new user wallet
        await new UserWallet({ email, walletId }).save();

      let airdropInfoDocument = await AirdropInfo.findOne();

      if (!airdropInfoDocument) {
        airdropInfoDocument = new AirdropInfo({
          airdropTotal: 1000000,
          tokensPerUser: 0
        });
        await airdropInfoDocument.save();
      } else {
        const totalUsers = await UserWallet.countDocuments();
        airdropInfoDocument.tokensPerUser = totalUsers > 0 ? 1000000 / totalUsers : airdropInfoDocument.tokensPerUser;
        await airdropInfoDocument.save();
      }
      res.status(201).json({ success: true, message: 'User wallet registered successfully.'});
    } catch (error) {
      console.error('Error on registering user wallet data:', error);
      if (error instanceof Error) {
        // Pass the error message if it's an instance of Error
        handleError(res, 500, 'Internal server error', { details: error.message });
      } else {
        // If it's not an Error instance, log the entire error object
        console.error(error);
        handleError(res, 500, 'Internal server error', { details: 'An unexpected error occurred' });
      }
    }
  }
  else {
    handleError(res, 405, 'Method Not Allowed');
  }
}
