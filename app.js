const express = require('express');
const app = express();

// Configuration - Set your verify token here
const verifyToken = process.env.VERIFY_TOKEN;
const PORT = process.env.PORT || 3000;

// Check if VERIFY_TOKEN is configured
if (!verifyToken) {
  console.error('ERROR: VERIFY_TOKEN environment variable is required');
  process.exit(1);
}

// Webhook verification endpoint
app.get('/', (req, res) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;

  if (mode === 'subscribe' && token === verifyToken && challenge && typeof challenge === 'string') {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});

// Webhook event handler endpoint
app.post('/', express.json({ limit: '1mb' }), (req, res) => {
  console.log('Webhook event received:', JSON.stringify(req.body, null, 2));
  res.status(200).send('EVENT_RECEIVED');
});

// Start server
app.listen(PORT, () => {
  console.log(`Webhook server is listening on port ${PORT}`);
});

module.exports = app;
