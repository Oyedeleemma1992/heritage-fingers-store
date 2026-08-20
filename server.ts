import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const app = express();
const PORT = 3000;

app.use(express.json());

// API route for Contact Form
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
});

app.post('/api/contact', async (req, res) => {
  try {
    const data = contactSchema.parse(req.body);
    // Log the received data
    console.log('Received Contact Form:', data);

    // In a real application, you would configure an SMTP server here
    // const transporter = nodemailer.createTransport({ ... });
    // await transporter.sendMail({ ... });
    
    // Simulating delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    res.json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Contact Form Error:', error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, errors: (error as any).errors });
    } else {
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  }
});

// API route for Order Request
const orderSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  deliveryPreference: z.enum(['Delivery', 'Collection']),
  address: z.string().optional(),
  notes: z.string().optional(),
  items: z.array(z.object({
    id: z.string(),
    name: z.string(),
    quantity: z.number().min(1),
    price: z.number().optional(),
    size: z.string().optional(),
  })).min(1, 'Order must contain at least one item'),
});

app.post('/api/order', async (req, res) => {
  try {
    const data = orderSchema.parse(req.body);
    
    console.log('Received Order Request:', JSON.stringify(data, null, 2));

    // Simulate sending email
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    res.json({ success: true, message: 'Order request submitted successfully.' });
  } catch (error) {
    console.error('Order Request Error:', error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, errors: (error as any).errors });
    } else {
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
