document.addEventListener('DOMContentLoaded', () => {
    const messages = document.getElementById('messages');
    const messageInput = document.getElementById('message');
    const sendButton = document.getElementById('sendButton');
    const ws = new WebSocket('ws://localhost:8080');

    // Handle incoming messages
    ws.addEventListener('message', (event) => {
        const message = event.data;
        appendMessage(message);
    });

    // Send a message when the "Send" button is clicked
    sendButton.addEventListener('click', () => {
        sendMessage();
    });

    // Send a message when Enter key is pressed
    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    // Function to append a message to the chat window
    function appendMessage(message) {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight;
    }

    // Function to send a message to the server
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            ws.send(message);
            messageInput.value = '';
        }
    }
});
