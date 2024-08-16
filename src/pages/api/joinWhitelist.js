import connectToDatabase from '../../../utils/mongo-init'; 
import UserWallet from '../../models/UserWallet';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { walletId, email } = req.body;

    // Validate input
    if (!email || !walletId) {
      return res.status(400).json({ message: 'Email and wallet ID are required.' });
    }

    try {
      await connectToDatabase();
      
      // Check if the wallet is already registered
      const existingUser = await UserWallet.findOne({ walletId });
      if (existingUser) {
        return res.status(409).json({ message: 'Wallet is already registered.' });
      }

      // Create a new whitelist entry
      const newUser = await UserWallet.create({
        walletId: walletId.toLowerCase(), // Normalize walletId
        email: email.toLowerCase(), // Normalize email
      });
      return res.status(201).json(newUser);
    } catch (error) {
      console.error('Error joining whitelist:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    // Method Not Allowed
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}