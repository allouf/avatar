import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../utils/mongo-init';
import UserWallet from '../../models/UserWallet';
import Cors from 'cors';
import initMiddleware from '../../../utils/init-middleware';

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

// Utility functions
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isFieldMissing = (field: any) => {
  return !field;
};

export const handleError = (
  res: NextApiResponse,
  statusCode: number,
  message: string
) => {
  res.status(statusCode).json({ error: message });
};

// Function to check if a wallet is connected with an email
export const checkWalletConnectedWithEmail = async (walletId: string) => {
  await connectToDatabase();
  console.log('Database connection was successful');

  if (isFieldMissing(walletId)) {
    throw new Error("'walletId' is required");
  }

  const existingWalletId = await UserWallet.findOne({ walletId });
  return !!existingWalletId;
};

// API route handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  if (req.method === 'GET') {
    try {
      const { walletId } = req.query as { walletId: string };
      const isWalletConnectedWithEmail = await checkWalletConnectedWithEmail(walletId);

      console.log('Database query result:', isWalletConnectedWithEmail);
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
};

export default handler;