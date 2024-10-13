// Define sentiment word lists
const positiveWords = ["happy", "love", "excellent", "good", "great"];
const negativeWords = ["sad", "angry", "terrible", "bad", "awful"];
const neutralWords = ["okay", "fine", "normal", "average", "standard"];

// Variables for font size, fade rate, and delay
let fontSize = 20;
let fadeRate = 1000; // Default fade speed in ms
let fadeDelay = 2000; // Default duration before fading

document.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('title');
    const prompt = document.getElementById('prompt');
    const wordCloud = document.getElementById('word-cloud');

    // Fade in initial prompt
    setTimeout(() => {
        prompt.style.opacity = 1;
    }, 1000);

    // Listen for 'M' key press to start transcription
    document.addEventListener('keydown', (e) => {
        if (e.key === 'm' || e.key === 'M') {
            startTranscription();
        }
    });

    // Handle transcription and sentiment analysis
    function startTranscription() {
        prompt.textContent = "Listening...";
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        const recognition = new SpeechRecognition();
        recognition.interimResults = true;
        recognition.continuous = true;

        recognition.start();

        recognition.addEventListener('result', (e) => {
            const transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join(' ');

            const words = transcript.split(' ');

            words.forEach(word => {
                const cleanWord = word.toLowerCase().replace(/[^\w\s]/gi, '');
                if (positiveWords.includes(cleanWord)) {
                    displayWord(cleanWord, 'green');
                } else if (negativeWords.includes(cleanWord)) {
                    displayWord(cleanWord, 'red');
                } else if (neutralWords.includes(cleanWord)) {
                    displayWord(cleanWord, 'yellow');
                }
            });
        });

        recognition.addEventListener('end', recognition.start); // Ensure continuous listening
    }

    // Display words in word cloud with animation
    function displayWord(word, sentimentClass) {
        const wordElement = document.createElement('span');
        wordElement.textContent = word;
        wordElement.className = `word ${sentimentClass}`;
        wordElement.style.fontSize = `${fontSize}px`;
        wordCloud.appendChild(wordElement);

        // Position word randomly in the word cloud
        wordElement.style.top = `${Math.random() * 80}%`;
        wordElement.style.left = `${Math.random() * 80}%`;

        // Fade in and out logic
        setTimeout(() => {
            wordElement.style.opacity = 1;
        }, 100);

        setTimeout(() => {
            wordElement.style.opacity = 0;
            setTimeout(() => wordElement.remove(), fadeRate); // Remove after fade out
        }, fadeDelay);
    }

    // Key bindings for user interaction
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            fontSize += 2;
        } else if (e.key === 'ArrowDown') {
            fontSize = Math.max(10, fontSize - 2); // Minimum font size 10px
        } else if (e.key === 'ArrowLeft') {
            fadeRate = Math.max(500, fadeRate - 500); // Minimum fade rate 500ms
        } else if (e.key === 'ArrowRight') {
            fadeRate += 500;
        } else if (e.key === 't' || e.key === 'T') {
            const userDelay = prompt('Enter fade delay in ms:', fadeDelay);
            fadeDelay = parseInt(userDelay) || fadeDelay;
        }
    });
});
