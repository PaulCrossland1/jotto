document.addEventListener('DOMContentLoaded', function() {
    // Game variables
    let secretWord = "";
    let guesses = [];
    let gameOver = false;
    let currentGuess = "";
    const MAX_GUESSES = 20;
    
    // DOM elements
    const guessInput = document.getElementById('guess');
    const guessesContainer = document.getElementById('guesses');
    const messageElement = document.getElementById('message');
    const howToPlayButton = document.getElementById('how-to-play');
    const keyboard = document.getElementById('keyboard');
    const keys = document.querySelectorAll('.key');
    const guessCounterElement = document.getElementById('guess-counter');
    
    // Check if dictionary is loaded
    if (typeof WORD_LIST === 'undefined') {
        console.error('Error: WORD_LIST not found. Make sure dictionary.js is loaded before this script.');
    }
    
    // Set up game
    function initGame() {
        const today = new Date();
        const daysSinceEpoch = Math.floor(today / 86400000);
        const dailyWordIndex = daysSinceEpoch % WORD_LIST.length;
        
        secretWord = WORD_LIST[dailyWordIndex];
        
        // Load saved game if exists
        const savedGame = localStorage.getItem('jottoDaily');
        if (savedGame) {
            const gameData = JSON.parse(savedGame);
            
            if (gameData.date === new Date().toDateString()) {
                guesses = gameData.guesses;
                gameOver = gameData.gameOver;
                
                if (gameOver) {
                    if (guesses.some(g => g.word === secretWord)) {
                        showSuccessMessage();
                    } else {
                        showFailureMessage();
                    }
                }
            }
        }
        
        renderGuesses();
        console.log("Game initialized with secret word: " + secretWord);
    }
    
    function saveGame() {
        const gameData = {
            date: new Date().toDateString(),
            guesses: guesses,
            gameOver: gameOver
        };
        localStorage.setItem('jottoDaily', JSON.stringify(gameData));
    }
    
    // Calculate common letters between two words
    function commonLetters(word1, word2) {
        const letters1 = word1.split('');
        const letters2 = [...word2]; // Clone to modify
        
        let common = 0;
        
        for (let letter of letters1) {
            const index = letters2.indexOf(letter);
            if (index !== -1) {
                common++;
                letters2.splice(index, 1); // Remove the matched letter
            }
        }
        
        return common;
    }
    
    // Handle guess submission
    function submitGuess() {
        const guess = currentGuess.toUpperCase().trim();
        
        if (gameOver) {
            showMessage("Game over! Refresh for a new game.");
            return;
        }
        
        if (guess.length !== 5) {
            showMessage("Please enter a 5-letter word.");
            return;
        }
        
        if (!WORD_LIST.includes(guess)) {
            showMessage("Not in word list. Try again.");
            return;
        }
        
        if (guesses.some(g => g.word === guess)) {
            showMessage("You already guessed that word.");
            return;
        }
        
        const common = commonLetters(guess, secretWord);
        guesses.push({ word: guess, common: common });
        
        renderGuesses();
        guessInput.value = '';
        currentGuess = '';
        updateDisplayedGuess();
        
        if (guess === secretWord) {
            gameOver = true;
            showSuccessMessage();
        } else if (guesses.length >= MAX_GUESSES) {
            gameOver = true;
            showFailureMessage();
        }
        
        saveGame();
    }
    
    // Update the displayed guess in the input field
    function updateDisplayedGuess() {
        guessInput.value = currentGuess;
        // Force visual update
        setTimeout(() => {
            guessInput.value = currentGuess;
        }, 10);
    }
    
    // Handle keyboard input
    function handleKeyPress(key) {
        if (gameOver) return;
        
        if (key === 'DELETE') {
            // Delete the last character
            if (currentGuess.length > 0) {
                currentGuess = currentGuess.slice(0, -1);
                updateDisplayedGuess();
            }
        } else if (key === 'ENTER') {
            // Submit the guess
            submitGuess();
        } else if (/^[A-Z]$/.test(key)) {
            // Add letter to current guess if less than 5 characters
            if (currentGuess.length < 5) {
                currentGuess += key;
                updateDisplayedGuess();
            }
        }
    }
    
    function renderGuesses() {
        guessesContainer.innerHTML = '';
        
        // Update guess counter and change color based on progress
        guessCounterElement.textContent = `${guesses.length}/${MAX_GUESSES}`;
        updateCounterColor();
        
        // We want most recent guesses at the top
        // Process guesses from newest to oldest
        for (let i = guesses.length - 1; i >= 0; i--) {
            const guess = guesses[i];
            const guessRow = document.createElement('div');
            guessRow.className = 'guess-row';
            
            // Add highlight class for the most recent guess
            if (i === guesses.length - 1) {
                guessRow.classList.add('latest-guess');
            }
            
            const guessWord = document.createElement('div');
            guessWord.className = 'guess-word';
            guessWord.textContent = guess.word;
            
            const guessScore = document.createElement('div');
            guessScore.className = 'guess-score';
            guessScore.textContent = guess.common;
            
            // If all letters match, color the score green
            if (guess.common === 5) {
                guessScore.style.backgroundColor = 'var(--correct-color)';
            }
            
            guessRow.appendChild(guessWord);
            guessRow.appendChild(guessScore);
            guessesContainer.appendChild(guessRow);
        }
    }
    
    function showMessage(text, isSuccess = false) {
        messageElement.textContent = text;
        messageElement.className = isSuccess ? 'message success' : 'message';
    }
    
    function showSuccessMessage() {
        const attempts = guesses.length;
        showMessage(`Congratulations! Found in ${attempts}/${MAX_GUESSES} tries.`, true);
    }
    
    function showFailureMessage() {
        showMessage(`Game over! The word was ${secretWord}.`);
    }
    
    function showHowToPlay() {
        alert(`HOW TO PLAY JOTTO.DAY:

1. Guess the secret 5-letter word in ${MAX_GUESSES} tries.
2. After each guess, you'll see how many letters your word has in common with the secret word.
3. Letters are only counted once. For example, if the secret word is "SNAKE" and you guess "KEEPS", you'd get a score of 3 (for S, K, E).
4. Letters can be in any position.`);
    }
    
    // Function to update counter color based on number of guesses
    function updateCounterColor() {
        const numGuesses = guesses.length;
        const percentage = numGuesses / MAX_GUESSES;
        
        let color;
        if (percentage === 0) {
            color = '#10B981'; // Green for 0 guesses
        } else if (percentage < 0.25) {
            color = '#34D399'; // Light green
        } else if (percentage < 0.5) {
            color = '#FBBF24'; // Yellow
        } else if (percentage < 0.75) {
            color = '#F97316'; // Orange
        } else if (percentage < 1) {
            color = '#EF4444'; // Red
        } else {
            color = '#B91C1C'; // Dark red for 20/20
        }
        
        guessCounterElement.style.color = color;
    }
    
    // Event listeners for keyboard
    keys.forEach(key => {
        // Use a single touchstart/click event handler
        key.addEventListener('mousedown', handleKeyboardEvent);
        key.addEventListener('touchstart', handleKeyboardEvent);
        
        // Prevent default touch behaviors
        key.addEventListener('touchend', function(e) {
            e.preventDefault();
        });
    });
    
    function handleKeyboardEvent(e) {
        e.preventDefault();
        
        const keyValue = this.getAttribute('data-key');
        
        // Add visual feedback
        this.classList.add('active');
        setTimeout(() => {
            this.classList.remove('active');
        }, 150);
        
        handleKeyPress(keyValue);
    }
    
    // Support physical keyboard for desktop
    document.addEventListener('keydown', function(event) {
        if (gameOver) return;
        
        const key = event.key.toUpperCase();
        
        if (key === 'ENTER') {
            event.preventDefault();
            handleKeyPress('ENTER');
        } else if (key === 'BACKSPACE') {
            event.preventDefault();
            handleKeyPress('DELETE');
        } else if (/^[A-Z]$/.test(key)) {
            event.preventDefault();
            handleKeyPress(key);
            
            // Add visual feedback to the corresponding key
            const keyElement = document.querySelector(`.key[data-key="${key}"]`);
            if (keyElement) {
                keyElement.classList.add('active');
                setTimeout(() => {
                    keyElement.classList.remove('active');
                }, 150);
            }
        }
    });
    
    // Prevent mobile keyboard from appearing
    guessInput.addEventListener('click', function(e) {
        e.preventDefault();
        this.blur();
    });
    
    // Prevent zoom on double tap and other touch behaviors
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    howToPlayButton.onclick = showHowToPlay;
    
    // Initialize the game
    initGame();
});