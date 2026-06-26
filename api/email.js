export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Vercel securely pulls this from your dashboard settings
  const resendApiKey = process.env.VITE_RESEND_API_KEY;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    return response.ok ? res.status(200).json(data) : res.status(400).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
