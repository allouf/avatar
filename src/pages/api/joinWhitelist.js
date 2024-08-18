import connectToDatabase from '../../../utils/mongo-init'; 
import UserWallet from '../../models/UserWallet';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { walletId, email } = req.body;

    try {
      await connectToDatabase();
      
      const newUser = await UserWallet.create({
        walletId: walletId.toLowerCase(), // Normalize walletId
        email: email.toLowerCase(), // Normalize email
      });
      return res.status(201).json(newUser);
    } catch (error) {
      if (error.code === 11000) {
        // Handle duplicate key error
        return res.status(409).json({ message: 'This wallet is already registered.' });
      }
      console.error('Error joining whitelist:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}