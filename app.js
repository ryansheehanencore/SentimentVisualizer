window.onload = function() {
    const promptElement = document.getElementById('prompt');

    // Display the "Press 'M' to unmute transcription" after 1 second
    setTimeout(() => {
        promptElement.textContent = "Press 'M' to unmute transcription.";
    }, 1000);

    // Listen for 'M' key press
    window.addEventListener('keydown', function(event) {
        if (event.key === 'M' || event.key === 'm') {
            startTranscription();
        }
    });
}

function startTranscription() {
    // Request microphone permission and start transcription
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;

        recognition.onstart = () => {
            document.getElementById('prompt').textContent = 'Listening...';
        };

        recognition.onresult = (event) => {
            let transcript = event.results[event.resultIndex][0].transcript;
            processTranscription(transcript);
        };

        recognition.onerror = (event) => {
            console.error(event.error);
            document.getElementById('prompt').textContent = 'Error: Unable to start transcription.';
        };

        recognition.start();
    } else {
        alert('Speech Recognition is not supported in your browser.');
    }
}




const positiveWords = ["amazing", "awesome", "beautiful", "brilliant", "calm", "charming", "cheerful", "confident", "cool", "courageous", "creative", "cute", "delightful", "easy", "elegant", "energetic", "enthusiastic", "excellent", "exciting", "fabulous", "fantastic", "friendly", "fun", "funny", "generous", "gentle", "good", "graceful", "grateful", "great", "happy", "helpful", "honest", "incredible", "inspirational", "joyful", "kind", "likable", "lovely", "lucky", "marvelous", "nice", "optimistic", "outstanding", "passionate", "patient", "peaceful", "perfect", "pleasant", "positive", "powerful", "pretty", "radiant", "remarkable", "respectful", "smart", "spectacular", "strong", "successful", "super", "sweet", "talented", "thankful", "thoughtful", "trustworthy", "vibrant", "victorious", "warm", "wonderful", "worthy", "wow", "yes", "yummy", "admirable", "adorable", "affectionate", "agreeable", "amusing", "bubbly", "breathtaking", "careful", "cheery", "clean", "clever", "content", "cuddly", "dazzling", "dependable", "determined", "dreamy", "dynamic", "eager", "effortless", "engaging", "enjoyable", "excellent", "extraordinary", "fair", "fearless", "flawless", "glorious", "gracious", "hardworking", "hilarious", "hopeful", "humble", "impressive", "jolly", "jovial", "just", "keen", "knowledgeable", "loving", "magical", "neat", "nice", "optimistic", "organized", "peaceful", "perfect", "playful", "positive", "precious", "quick", "radiant", "reliable", "resilient", "safe", "sincere", "smiling", "smooth", "special", "steady", "supportive", "terrific", "thankful", "trustworthy", "uplifting", "victorious", "wise", "youthful", "zealous", "adored", "ambitious", "authentic", "balanced", "blissful", "bold", "brave", "bubbly", "calm", "capable", "carefree", "celebrated", "centered", "chic", "compassionate", "composed", "confident", "connected", "considerate", "courageous", "creative", "daring", "dedicated", "diligent", "diplomatic", "disciplined", "dynamic", "earnest", "efficient", "encouraging", "engaged", "enthusiastic", "ethical", "evolved", "fearless", "festive", "flourishing", "focused", "forgiving", "free", "friendly", "fulfilled", "fun-loving", "generous", "genuine", "giving", "glowing", "gracious", "grounded", "harmonious", "heroic", "honorable", "humorous", "influential", "innovative", "inspiring", "intelligent", "intuitive", "inventive", "joyous", "just", "kindhearted", "leader", "limitless", "lovable", "loyal", "magnanimous", "merry", "mindful", "motivated", "noble", "open-hearted", "original", "passionate", "peace-loving", "peppy", "persevering", "philanthropic", "playful", "positive", "powerful", "proactive", "productive", "protective", "purposeful", "radiant", "reassuring", "relaxed", "resourceful", "respected", "responsible", "safe", "satisfied", "secure", "self-assured", "selfless", "sensitive", "serene", "shining", "sincere", "skillful", "smart", "soulful", "spirited", "spontaneous", "steadfast", "stunning", "successful", "sunny", "thoughtful", "thriving", "trusting", "uplifted", "vigilant", "visionary", "wise", "witty", "zesty"];
const negativeWords = ['sad', 'bad', 'terrible', 'hate'];
const neutralWords = ['okay', 'fine', 'neutral'];

function processTranscription(transcript) {
    const words = transcript.split(' ');
    words.forEach(word => {
        const sanitizedWord = word.toLowerCase().replace(/[.,]/g, ''); // Clean up punctuation
        if (positiveWords.includes(sanitizedWord)) {
            displayWord(sanitizedWord, 'green');
        } else if (negativeWords.includes(sanitizedWord)) {
            displayWord(sanitizedWord, 'red');
        } else if (neutralWords.includes(sanitizedWord)) {
            displayWord(sanitizedWord, 'yellow');
        }
    });
}

function displayWord(word, color) {
    const wordCloud = document.getElementById('word-cloud');
    
    // Check if the word already exists
    let existingWordElement = document.querySelector(`.word[data-word="${word}"]`);
    if (existingWordElement) {
        // Increase font size if word already exists
        let currentFontSize = parseInt(window.getComputedStyle(existingWordElement).fontSize);
        existingWordElement.style.fontSize = (currentFontSize + 5) + 'px';
    } else {
        // Create a new word element
        const wordElement = document.createElement('span');
        wordElement.className = 'word';
        wordElement.textContent = word;
        wordElement.style.color = color;
        wordElement.style.fontSize = '20px';
        wordElement.style.top = Math.random() * 50 + '%';
        wordElement.style.left = Math.random() * 80 + '%';
        wordElement.setAttribute('data-word', word);
        
        wordCloud.appendChild(wordElement);

        // Fade-in and out effect
        setTimeout(() => wordElement.style.opacity = 1, 100);
        setTimeout(() => wordElement.style.opacity = 0, 5000); // Adjust fade-out duration as needed
    }
}


let fontSizeModifier = 0;
let fadeSpeedModifier = 0;

window.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
        fontSizeModifier += 2;
    } else if (event.key === 'ArrowDown') {
        fontSizeModifier -= 2;
    } else if (event.key === 'ArrowLeft') {
        fadeSpeedModifier -= 500;
    } else if (event.key === 'ArrowRight') {
        fadeSpeedModifier += 500;
    }
});



