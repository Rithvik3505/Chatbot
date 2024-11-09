const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Replace this with your Cohere API Key
const API_KEY = 'NK4h8IVzlYZzRyNybgiS534ktVwAX1eMLNVrPsD6';

app.post('/api/chat', async (req, res) => {
  const userInput = req.body.message;

  try {
    const response = await axios.post(
      'https://api.cohere.ai/v1/generate', // Cohere's API endpoint
      {
        prompt: userInput,
        max_tokens: 50,         // Adjust max tokens as needed for response length
        temperature: 0.7,       // Adjust for response randomness (0 to 1)
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const botResponse = response.data.generations[0].text;
    res.json({ response: botResponse });
  } catch (error) {
    console.error('Error communicating with Cohere API:', error);
    res.status(500).send('Error communicating with LLM API');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
