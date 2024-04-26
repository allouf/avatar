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
  message: string
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

      const { walletId } = req.query as {
        walletId: string;
      };

      if (isFieldMissing(walletId)) {
        return handleError(res, 400, "'walletId' are required");
      }

      // Check if the email or walletId already exists in the database
      const existingWalletId = await UserWallet.findOne({ walletId });
      const isWalletConnectedWithEmail = !!existingWalletId;

      console.log('is wallet connected with email', isWalletConnectedWithEmail);

      res.status(201).json({
        isWalletConnectedWithEmail,
        message: 'User wallet and email record is fetched successfully.',
      });
    } catch (error) {
      console.error('Error getting user wallet and email records:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
