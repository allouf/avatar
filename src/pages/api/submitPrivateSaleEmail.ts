import connectToDatabase from '../../../utils/mongo-init';
import PrivateSaleEmail from '../../models/PrivateSaleEmail';

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

        console.log('Sending email notification via Infobip...');
        const infobipApiKey = "App 410b47b96dc7f27b675002164088bb75-e69fbaf5-eb94-404b-b712-55a7034ddf3d"; // Use your Infobip API key
        const infobipUrl = "https://pe12re.api.infobip.com/email/3/send";

        const formdata = new FormData();
        formdata.append("from", "Incentives <sales@idea-engine.ai>"); // Changed sender name
        formdata.append("subject", "New registration in Private sale");
        formdata.append("to", "sales@idea-engine.ai");
        //formdata.append("to", JSON.stringify({ to: email, placeholders: { firstName: "User " } })); // Use the actual email and set a placeholder
        formdata.append("text", `Hi User, this is a new registration from ${email}.`); // Changed to use "User "

        const requestOptions: RequestInit = {
          method: "POST",
          headers: {
            "Authorization": infobipApiKey,
            "Accept": "application/json"
          },
          body: formdata,
          redirect: "follow"
        };

        const response = await fetch(infobipUrl, requestOptions);
        const result = await response.json();

        console.log('Infobip response status:', response.status);
        console.log('Infobip response body:', result);
        
        if (!response.ok) {
          console.error('Validation errors:', result.requestError?.validationErrors);
          throw new Error(`Infobip error: ${result.requestError?.serviceException?.text || 'Unknown error'}`);
        }

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
    } 
    catch (err) {
      console.error('Error in processing the request:', err.message);
      if (err.message.includes('ETIMEOUT')) {
        return res.status(500).json({ message: 'DATABASE_CONNECTION_ERROR: Our database is currently unavailable. Please try again later.' });
      }
      return res.status(500).json({ message: 'Error submitting email. Please try again later.' });
    }
  } else {
    console.log(`Received unsupported method ${req.method}`);
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}