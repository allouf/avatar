import connectToDatabase from '../../../utils/mongo-init';
import PrivateSaleEmail from '../../models/PrivateSaleEmail';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

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
      const existingEmail = await PrivateSaleEmail.findOne({ email });
      if (existingEmail) {
        console.log('Email already exists in the database');
        return res.status(400).json({ message: `The email address ${email} is already registered. Please try a different email address.` });
      }

      // Start a transaction
      const session = await db.startSession();
      session.startTransaction();

      try {
        console.log('Creating a new PrivateSaleEmail document...');
        const privateSaleEmail = new PrivateSaleEmail({ email });

        console.log('Saving the new document to the database...');
        await privateSaleEmail.save({ session });

        console.log('Sending email notification via MailerSend...');
        const mailToken = process.env.mailToken;
        if (!mailToken) {
          throw new Error('MailerSend API key is not set');
        }
        
        const mailerSend = new MailerSend({
          apiKey: mailToken,
        });

        const sentFrom = new Sender("MS_YdY58I@trial-zr6ke4no7x3lon12.mlsender.net", "Incentives");

        //A.blazaitiss@gmail.com
        const recipients = [
          new Recipient("A.blazaitiss@gmail.com", "Admin")
        ];
        
        const emailParams = new EmailParams()
          .setFrom(sentFrom)
          .setTo(recipients)
          .setReplyTo(sentFrom)
          .setSubject("Notification from idea engin")
          .setHtml(`<strong>New registration in Private sale: </strong>${email}`)
          .setText(`New registration in Private sale ${email}`);
        
        await mailerSend.email.send(emailParams);
        

        // Commit the transaction
        await session.commitTransaction();

        console.log('Email sent successfully');
        return res.status(201).json({ message: `Thank you for submitting your email address ${email}. We will be in touch soon.` });
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