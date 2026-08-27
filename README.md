# 😂 Random Joke Generator

A modern web application that fetches random jokes from multiple external APIs. Built with Express.js backend and interactive HTML/CSS/JavaScript frontend.

## Features

✨ **Multiple Joke Sources**
- Official Joke API
- JokeAPI (Any category)
- Programmer Jokes
- Fun Facts
- Random Source (Surprise Mode)

🎨 **Modern UI**
- Responsive design
- Beautiful gradients and animations
- Smooth transitions
- Mobile-friendly interface

📊 **Tracking**
- Joke counter (stored in localStorage)
- Source attribution
- Joke type display

📋 **Utilities**
- Copy joke to clipboard
- Reset counter
- Loading spinner
- Toast notifications

## Project Structure

```
random-joke-generator/
├── server.js           # Express backend
├── package.json        # Dependencies
├── .env.example        # Environment variables template
├── public/
│   ├── index.html      # Main HTML
│   ├── style.css       # Styling
│   └── script.js       # Frontend logic
└── README.md           # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/NISHARBADMASS10/random-joke-generator.git
   cd random-joke-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Start the server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5000
   ```

## API Endpoints

### Get Official Joke
```
GET /api/joke/official
```
Returns a two-part joke from the Official Joke API.

### Get Random Joke from JokeAPI
```
GET /api/joke/jokesapi
```
Returns a random joke from any category.

### Get Programmer Joke
```
GET /api/joke/programmer
```
Returns a programming-related joke.

### Get Random Fact
```
GET /api/joke/fact
```
Returns a random useless fact.

### Get Random Source Joke
```
GET /api/joke/random
```
Returns a joke from a randomly selected source.

### Health Check
```
GET /api/health
```
Returns server status.

## External APIs Used

1. **Official Joke API**
   - URL: `https://official-joke-api.appspot.com/`
   - Free, no authentication required
   - Provides programming and general jokes

2. **JokeAPI**
   - URL: `https://v2.jokeapi.dev/`
   - Free, no authentication required
   - Multiple categories and languages

3. **Useless Facts API**
   - URL: `https://uselessfacts.jsongenerator.com/`
   - Free, no authentication required
   - Returns random interesting facts

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **API Communication**: Axios
- **CORS**: Enabled for cross-origin requests
- **Environment**: dotenv for configuration

## Usage

1. Click any button to fetch a joke from the selected source
2. The joke will display with its source and type
3. Use "Surprise Me!" for a random source
4. Copy jokes to clipboard with "📋 Copy Joke" button
5. Track total jokes generated
6. Reset counter anytime

## Customization

### Add More Joke APIs

Edit `server.js` and add to `JOKE_APIS`:

```javascript
const JOKE_APIS = {
  // existing APIs...
  newSource: 'https://api.example.com/joke'
};
```

Then create a new endpoint:

```javascript
app.get('/api/joke/newsource', async (req, res) => {
  try {
    const response = await axios.get(JOKE_APIS.newSource);
    res.json({
      success: true,
      joke: response.data.text,
      source: 'New Source API',
      data: response.data
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

### Styling

Modify `public/style.css` to change colors, fonts, or layout.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Error Handling

- Server errors return 500 status with error message
- Network errors display user-friendly message
- Loading spinner prevents multiple simultaneous requests

## Performance Optimizations

- Lightweight dependencies (only Express, CORS, Axios, dotenv)
- Static file serving with Express
- Client-side caching with localStorage
- Optimized CSS animations

## Future Enhancements

- [ ] Database to store favorite jokes
- [ ] User accounts and preferences
- [ ] Joke categories and filtering
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Mobile app (React Native/Flutter)
- [ ] PWA support
- [ ] Rating system
- [ ] Share to social media

## Troubleshooting

### "Cannot fetch jokes" error
- Ensure server is running on `http://localhost:5000`
- Check if port 5000 is available
- Verify internet connection

### CORS errors
- CORS is enabled in server.js
- Make sure you're accessing from `http://localhost:5000`

### API is slow
- External APIs may have rate limits
- Some APIs are free and may have slower response times

## License

MIT License - feel free to use for personal or commercial projects.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Created with ❤️ by NISHARBADMASS10

## Support

If you find any issues or have suggestions, please open an issue on GitHub.

---

**Happy Joking! 😂**
