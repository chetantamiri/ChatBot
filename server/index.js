import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = (globalThis.process && globalThis.process.env && globalThis.process.env.PORT) || 5174;

const KEY = (globalThis.process && globalThis.process.env && globalThis.process.env.GEMINI_API_KEY) || '';

app.post('/api/gemini', async (req, res) => {
  if (!KEY) return res.status(500).json({ error: 'Server API key missing' });

  const { text, prompt } = req.body || {};
  const userText = text || prompt;
  if (!userText) return res.status(400).json({ error: 'Missing text/prompt in request body' });

  const body = { contents: [{ parts: [{ text: userText }] }] };

  try {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + encodeURIComponent(KEY);
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await r.json().catch(() => null);
    return res.status(r.status).json(data);
  } catch (err) {
    console.error('Proxy error', err);
    return res.status(500).json({ error: 'Proxy error', detail: String(err) });
  }
});

app.listen(PORT, () => console.log(`Proxy server listening on http://localhost:${PORT}`));
