const express = require('express');
const axios = require('axios');
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://127.0.0.1:5500"
}))

app.get("/", async(req,res) => {
    res.sendFile(__dirname + "/deep.html");
});

app.post('/search', async (req, res) => {
  const query = req.body.query;
  const apiEndpoint = 'https://openrouter.ai/api/v1/chat/completions';
  const apiKey = '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';

  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  };

  const data = {
    "model": "deepseek/deepseek-r1",
    "messages": [
      {
        "role": "user",
        "content": query
      }
    ]
  };

  try {
    const response = await axios.post(apiEndpoint, data, { headers });
    const answer = response.data.choices[0].message.content;
    res.json({ answer });
    console.log(answer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
