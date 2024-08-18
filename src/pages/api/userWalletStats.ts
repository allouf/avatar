import  connectToDatabase  from '../../../utils/mongo-init';
import UserWallet from '../../models/UserWallet';
import Cors from 'cors';
import initMiddleware from '../../../utils/init-middleware';
import { NextApiRequest, NextApiResponse } from 'next';
// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);
  if (req.method === 'GET') {
    try {
      await connectToDatabase();
      const estimatedTotalWallets = await UserWallet.estimatedDocumentCount() as unknown as number;
      const airdropAmountPerWallet = estimatedTotalWallets > 0
        ? 1000000 / estimatedTotalWallets
        : 0;

      res.json({
        estimatedTotalWallets: estimatedTotalWallets, 
        airdropAmountPerWallet: airdropAmountPerWallet
      });
      
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', details: error });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}