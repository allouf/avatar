import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/mongo-init';
import UserWallet from '../../models/UserWallet';

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
  if (req.method === 'POST') {
    try {
      console.log(
        'connecting to db...',
        process.env.NEXT_PUBLIC_MONGO_CONNECTION_URL
      );
      await connectToDatabase();
      console.log('connected to db');

      const { email, walletId } = req.body;

      if (isFieldMissing(email) || isFieldMissing(walletId)) {
        return handleError(res, 400, "'email' and 'walletId' are required");
      }

      if (!validateEmail(email)) {
        return handleError(res, 400, 'Email is invalid');
      }

      // Check if the email or walletId already exists in the database
      const existingUser = await UserWallet.findOne({ email });
      const existingWalletId = await UserWallet.findOne({ walletId });

      if (existingUser || existingWalletId) {
        const errorMsg = existingUser ? 'Email' : 'Wallet Id';

        if (existingUser && existingWalletId) {
          return res.status(200).json({
            emailAlreadyRegisteredWithWallet: true,
            message: `Email is already connected with wallet id`,
          });
        }

        return handleError(res, 400, `${errorMsg} is already registered`);
      }

      const userWallet = new UserWallet({ email, walletId });
      await userWallet.save();

      res.status(201).json({ message: 'User wallet data stored successfully' });
    } catch (error) {
      console.error('Error storing user wallet data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
