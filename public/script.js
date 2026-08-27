let jokeCount = localStorage.getItem('jokeCount') || 0;
document.getElementById('jokeCount').textContent = jokeCount;

const BASE_URL = 'http://localhost:5000';

async function getJoke(type) {
    const jokeBox = document.getElementById('jokeBox');
    const jokeText = document.getElementById('jokeText');
    const source = document.getElementById('source');
    const spinner = document.getElementById('loadingSpinner');

    spinner.classList.remove('hidden');
    jokeBox.style.opacity = '0.5';

    try {
        const endpoint = type === 'random' ? '/api/joke/random' : `/api/joke/${type}`;
        const response = await fetch(`${BASE_URL}${endpoint}`);
        const data = await response.json();

        if (data.success) {
            jokeText.textContent = data.joke;
            source.textContent = `📍 Source: ${data.source} | Type: ${data.type}`;

            jokeCount++;
            localStorage.setItem('jokeCount', jokeCount);
            document.getElementById('jokeCount').textContent = jokeCount;

            jokeBox.style.opacity = '1';
            showNotification('Joke loaded successfully! 😂');
        } else {
            jokeText.textContent = 'Oops! Could not fetch joke. Try again!';
            source.textContent = '';
        }
    } catch (error) {
        jokeText.textContent = 'Error: ' + error.message + '\n\nMake sure the server is running on http://localhost:5000';
        source.textContent = '';
        console.error('Error:', error);
    } finally {
        spinner.classList.add('hidden');
    }
}

function copyToClipboard() {
    const jokeText = document.getElementById('jokeText').textContent;
    navigator.clipboard.writeText(jokeText).then(() => {
        showNotification('Joke copied to clipboard! 📋');
    }).catch(err => {
        console.error('Could not copy:', err);
    });
}

function resetCounter() {
    localStorage.setItem('jokeCount', 0);
    jokeCount = 0;
    document.getElementById('jokeCount').textContent = jokeCount;
    showNotification('Counter reset! 🔄');
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Auto-load a joke on page load
window.addEventListener('load', () => {
    getJoke('random');
});
