import connectToDatabase from '../../../utils/mongo-init';
import WhitelistEmail from '../../models/WhitelistEmail';
import axios from 'axios';

export default async function handler(req, res) {
  console.log('Received request:', req.body); // Log the incoming request body

  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      console.log('Connecting to database...');
      const db = await connectToDatabase();
      console.log('Connected to database successfully');

      if (!email) {
        console.log('Email is missing in the request');
        return res.status(400).json({ message: 'Please enter a valid email address' });
      }

      console.log(`Checking if email ${email} already exists in the database...`);
      const existingEmail = await WhitelistEmail.findOne({ email: email.toLowerCase() });
      if (existingEmail) {
        console.log('Email already exists in the database');
        return res.status(400).json({ message: `The email address ${email} is already registered. Please try a different email address.` });
      }

      // Start a transaction
      const session = await db.startSession();
      session.startTransaction();

      try {
        console.log('Creating a new WhitelistEmail document...');
        const whitelistEmail = new WhitelistEmail({ email: email.toLowerCase() });

        console.log('Saving the new document to the database...');
        await whitelistEmail.save({ session });

        // Commit the transaction
        await session.commitTransaction();

        console.log('Email saved successfully');
        // Return a redirect response to the frontend
        res.status(201).json({ redirect: 'https://incentives101.substack.com/subscribe' });
      } catch (err) {
        // Roll back the transaction if an error occurs
        await session.abortTransaction();
        console.error('Error in processing the request:', err);
        return res.status(500).json({ message: 'Error submitting email. Please try again later.' });
      } finally {
        // Close the session
        session.endSession();
      }
    } catch (err) {
      console.error('Error in processing the request:', err.message);
      return res.status(500).json({ message: 'Error submitting email. Please try again later.' });
    }
  } else {
    console.log(`Received unsupported method ${req.method}`);
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}