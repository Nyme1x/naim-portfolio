const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { message, systemPrompt } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Message is required' })
      };
    }

    if (!process.env.OPENAI_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'OpenAI API key not configured' })
      };
    }

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
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

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ response: botResponse })
    };
  } catch (error) {
    console.error('Error calling OpenAI API:', error);

    if (error.status === 401) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid OpenAI API key' })
      };
    }

    if (error.status === 429) {
      return {
        statusCode: 429,
        body: JSON.stringify({ error: 'Rate limited. Please try again in a moment.' })
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to get response from ChatGPT',
        details: error.message
      })
    };
  }
};
