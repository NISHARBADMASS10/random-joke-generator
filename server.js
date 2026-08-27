const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Joke APIs
const JOKE_APIS = {
  official: 'https://official-joke-api.appspot.com/random_joke',
  jokesApi: 'https://v2.jokeapi.dev/joke/Any',
  uselessFacts: 'https://uselessfacts.jsongenerator.com/api/v2/facts?limit=1',
  programmerJokes: 'https://official-joke-api.appspot.com/jokes/programming/random'
};

// Get random joke from Official Joke API
app.get('/api/joke/official', async (req, res) => {
  try {
    const response = await axios.get(JOKE_APIS.official);
    res.json({
      success: true,
      joke: response.data.setup + ' ' + response.data.punchline,
      source: 'Official Joke API',
      type: 'Two-part',
      data: response.data
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get random joke from JokeAPI
app.get('/api/joke/jokesapi', async (req, res) => {
  try {
    const response = await axios.get(JOKE_APIS.jokesApi);
    if (response.data.type === 'twopart') {
      res.json({
        success: true,
        joke: response.data.setup + ' ' + response.data.delivery,
        source: 'JokeAPI',
        type: 'Two-part',
        data: response.data
      });
    } else {
      res.json({
        success: true,
        joke: response.data.joke,
        source: 'JokeAPI',
        type: 'Single-part',
        data: response.data
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get random programmer joke
app.get('/api/joke/programmer', async (req, res) => {
  try {
    const response = await axios.get(JOKE_APIS.programmerJokes);
    const randomJoke = response.data[Math.floor(Math.random() * response.data.length)];
    res.json({
      success: true,
      joke: randomJoke.setup + ' ' + randomJoke.punchline,
      source: 'Programmer Jokes API',
      type: 'Programming',
      data: randomJoke
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get random fact
app.get('/api/joke/fact', async (req, res) => {
  try {
    const response = await axios.get(JOKE_APIS.uselessFacts);
    res.json({
      success: true,
      joke: response.data.data[0].text,
      source: 'Useless Facts API',
      type: 'Fact',
      data: response.data.data[0]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get joke from random source
app.get('/api/joke/random', async (req, res) => {
  try {
    const sources = ['official', 'jokesapi', 'programmer'];
    const randomSource = sources[Math.floor(Math.random() * sources.length)];
    const response = await axios.get(`http://localhost:${PORT}/api/joke/${randomSource}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🎭 Joke Generator API running on http://localhost:${PORT}`);
  console.log(`📝 Available endpoints:`);
  console.log(`   - GET /api/joke/official`);
  console.log(`   - GET /api/joke/jokesapi`);
  console.log(`   - GET /api/joke/programmer`);
  console.log(`   - GET /api/joke/fact`);
  console.log(`   - GET /api/joke/random`);
});
