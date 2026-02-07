# NaimBot Backend Server

Simple Node.js/Express server that proxies requests to OpenAI ChatGPT API for your portfolio chatbot.

## Setup

### 1. Install Node.js (if not already installed)
Download from https://nodejs.org/

### 2. Install Dependencies
```bash
cd server
npm install
```

### 3. Create .env file
Copy `.env.example` to `.env` and add your OpenAI API key:
```bash
cp .env.example .env
```

Then edit `.env` and paste your OpenAI API key:
```
OPENAI_API_KEY=sk-your-actual-api-key-here
PORT=3001
```

**Get your API key here:** https://platform.openai.com/account/api-keys

### 4. Start the Server
```bash
npm start
```

You should see:
```
🚀 NaimBot server running on http://localhost:3001
```

## How It Works

1. Frontend sends a message to `POST http://localhost:3001/api/chat`
2. Backend receives the message and system prompt
3. Backend calls OpenAI's ChatGPT API with the message
4. ChatGPT generates a response about Naim
5. Response is sent back to frontend and displayed

## Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `PORT` - Server port (default: 3001)

## Testing the API

You can test the endpoint using curl:
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Tell me about Naim"}'
```

## For Development

If you want auto-reload when you make changes:
```bash
npm run dev
```

This uses `nodemon` to watch for file changes.
