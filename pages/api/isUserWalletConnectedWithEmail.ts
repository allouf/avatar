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
      console.log('Database connection was successful');

      const { walletId } = req.query as { walletId: string };

      if (isFieldMissing(walletId)) {
        console.error('No walletId provided')
        return handleError(res, 400, "'walletId' is required");
      }

      const existingWalletId = await UserWallet.findOne({ walletId });
      const isWalletConnectedWithEmail = !!existingWalletId;

      console.log('Database query result:', existingWalletId);
      res.status(200).json({
        isWalletConnectedWithEmail,
        message: 'User wallet record is fetched successfully.',
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        res.status(500).json({ error: 'Internal server error', details: error.message });
      } else {
        console.error('An unknown error occurred:', error);
        res.status(500).json({ error: 'Internal server error', details: JSON.stringify(error) });
      }
    }
  } else {
    console.error(`Method ${req.method} not allowed`)
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
