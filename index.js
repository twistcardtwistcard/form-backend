import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your actual Zapier webhook URL
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/XXXXX/YYYYY';

app.use(cors());
app.use(express.json());

app.post('/submit-payment', async (req, res) => {
  const data = req.body;

  if (!data.email || !data.amount || !data.orderno) {
    return res.status(400).json({ success: false, error: 'Missing fields' });
  }

  try {
    await fetch(ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/', (req, res) => res.send('Form backend is running.'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
