const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

// Chat endpoint - receives user message and returns ChatGPT response
app.post('/api/chat', async (req, res) => {
  try {
    const { message, systemPrompt } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using the cheaper, faster model
      messages: [
        {
          role: 'system',
          content: systemPrompt || `You are NaimBot, an AI assistant representing Naim Albadawi. Provide helpful, friendly responses in character. Use emojis appropriately. If you don't know something, make educated guesses based on Naim's values and engineering background.`
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const botResponse = response.choices[0].message.content;

    res.json({ response: botResponse });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    
    if (error.status === 401) {
      return res.status(401).json({ error: 'Invalid OpenAI API key' });
    }
    if (error.status === 429) {
      return res.status(429).json({ error: 'Rate limited. Please try again in a moment.' });
    }
    
    res.status(500).json({ 
      error: 'Failed to get response from ChatGPT',
      details: error.message 
    });
  }
});

// Serve static files from parent directory (your website)
app.use(express.static('../'));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 NaimBot server running on http://localhost:${PORT}`);
  console.log(`📝 Make sure OPENAI_API_KEY is set in your .env file`);
});
