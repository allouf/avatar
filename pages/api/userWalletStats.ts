import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/mongo-init';
import UserWallet from '../../models/UserWallet';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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