// ==UserScript==
// @name         Ollama Event-Based Emoji Display
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Display different emojis based on responses from Ollama LLM
// @author       Your Name
// @match        *://*/*
// @grant        none
// ==/UserScript==

// TODO 

// make proper ollama response
// make UI cool like have a chibi pngtuber
// add fucntions 
// more emotions
// more stuff to think about


(function() {
    'use strict';

    // Emojis corresponding to events
    const emojis = {
        smile: '😊',
        sad: '😢',
        default: '🤔'
    };

    // Create an element to display the emoji
    const emojiDisplay = document.createElement('div');
    emojiDisplay.style.position = 'fixed';
    emojiDisplay.style.bottom = '10px';
    emojiDisplay.style.right = '10px';
    emojiDisplay.style.fontSize = '48px';
    emojiDisplay.style.zIndex = '10000';
    emojiDisplay.style.display = 'none'; // Initially hidden
    document.body.appendChild(emojiDisplay);

    // Create an input box
    const inputBox = document.createElement('input');
    inputBox.type = 'text';
    inputBox.placeholder = 'Type something...';
    inputBox.style.position = 'fixed';
    inputBox.style.bottom = '70px';
    inputBox.style.right = '10px';
    inputBox.style.zIndex = '10000';
    document.body.appendChild(inputBox);

    // Create a response text display
    const responseText = document.createElement('div');
    responseText.style.position = 'fixed';
    responseText.style.bottom = '120px';
    responseText.style.right = '10px';
    responseText.style.zIndex = '10000';
    responseText.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    responseText.style.color = 'white';
    responseText.style.padding = '10px';
    responseText.style.borderRadius = '5px';
    responseText.style.display = 'none'; // Initially hidden
    document.body.appendChild(responseText);

    // Function to display the emoji and text based on the event
    function displayEmojiAndText(event, text) {
        if (event in emojis) {
            emojiDisplay.textContent = emojis[event];
            emojiDisplay.style.display = 'block';
        } else {
            emojiDisplay.textContent = emojis['default'];
            emojiDisplay.style.display = 'block';
        }
        responseText.textContent = text;
        responseText.style.display = 'block';
    }

    // Mock function to simulate Ollama response
    async function getMockResponse(input) {
        // Simulate different responses based on the input
        let mockResponse;
        if (input.toLowerCase().includes('happy')) {
            mockResponse = { event: 'smile', text: 'You seem happy!' };
        } else if (input.toLowerCase().includes('sad')) {
            mockResponse = { event: 'sad', text: 'Oh no, you seem sad!' };
        } else {
            mockResponse = { event: 'default', text: 'I am not sure how you feel.' };
        }
        return new Promise((resolve) => setTimeout(() => resolve(mockResponse), 1000)); // Simulate network delay
    }

    // Event listener for input box
    inputBox.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter' && inputBox.value.trim() !== '') {
            const input = inputBox.value.trim();
            inputBox.value = ''; // Clear the input box
            const response = await getMockResponse(input);
            if (response) {
                displayEmojiAndText(response.event, response.text);
            }
        }
    });

})();
