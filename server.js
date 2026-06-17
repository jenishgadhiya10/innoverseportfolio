const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const dataFile = path.join(__dirname, 'messages.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

function readMessages() {
  if (!fs.existsSync(dataFile)) return [];
  try {
    return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  } catch {
    return [];
  }
}

function saveMessages(messages) {
  fs.writeFileSync(dataFile, JSON.stringify(messages, null, 2), 'utf8');
}

app.post('/api/contact', (req, res) => {
  const { name, email, service, message } = req.body || {};

  if (!name || !email || !service || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const messages = readMessages();
  const record = {
    id: Date.now(),
    name,
    email,
    service,
    message,
    createdAt: new Date().toISOString()
  };

  messages.unshift(record);
  saveMessages(messages);

  res.json({ message: 'Inquiry saved successfully in backend.', record });
});

app.get('/api/messages', (req, res) => {
  res.json(readMessages());
});

app.listen(PORT, () => {
  console.log(`JD Enterprise backend running on http://localhost:${PORT}`);
});
