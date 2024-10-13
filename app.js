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
