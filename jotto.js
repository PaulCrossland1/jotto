document.addEventListener('DOMContentLoaded', function() {
    // Game variables
    let secretWord = "";
    let guesses = [];
    let gameOver = false;
    let currentGuess = "";
    const MAX_GUESSES = 10; // Reduced from 20 to 10
    let revealedLetters = []; // Track which letters have been revealed as hints
    
    // Cache for word validation results
    const wordValidationCache = {};
    
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
    
    /**
     * Checks if a word is valid using Dictionary API
     */
    async function isValidWord(word) {
        // Normalize the word for consistent checking
        word = word.toUpperCase().trim();
        
        // Quick validation - if it's in our curated list, it's valid
        if (WORD_LIST.includes(word)) {
            return true;
        }
        
        // Check cache to avoid duplicate API calls
        if (wordValidationCache.hasOwnProperty(word)) {
            return wordValidationCache[word];
        }
        
        try {
            // Make API call to dictionary service
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
            
            // Update cache with the result
            const isValid = response.ok;
            wordValidationCache[word] = isValid;
            
            return isValid;
        } catch (e) {
            console.error('Dictionary API error:', e);
            // If API fails, fall back to our word list
            return WORD_LIST.includes(word);
        }
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
                revealedLetters = gameData.revealedLetters || [];
                
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
            gameOver: gameOver,
            revealedLetters: revealedLetters
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
    
    // Get letter positions for hints (right letter, right spot or right letter, wrong spot)
    function getLetterPositions(guess) {
        // Only store the positions; we'll use them when hints are revealed
        const positions = Array(5).fill('none'); // Default no match
        
        // Make a copy of the secret word to track matched letters
        const secretLetters = secretWord.split('');
        const guessLetters = guess.split('');
        
        // First pass: find exact matches (green)
        for (let i = 0; i < 5; i++) {
            if (guessLetters[i] === secretLetters[i]) {
                positions[i] = 'correct';
                // Mark as used to avoid double counting
                secretLetters[i] = null;
                guessLetters[i] = null;
            }
        }
        
        // Second pass: find partial matches (yellow)
        for (let i = 0; i < 5; i++) {
            if (guessLetters[i] !== null) {
                const index = secretLetters.indexOf(guessLetters[i]);
                if (index !== -1) {
                    positions[i] = 'present';
                    secretLetters[index] = null; // Mark as used
                }
            }
        }
        
        return positions;
    }
    
    // Get a new hint letter that hasn't been revealed yet
    function getNextHintLetter() {
        // Filter out letters that have already been revealed
        const availableLetters = secretWord.split('').filter(letter => 
            !revealedLetters.includes(letter)
        );
        
        if (availableLetters.length === 0) return null;
        
        // Pick a random letter from the available ones
        const randomIndex = Math.floor(Math.random() * availableLetters.length);
        return availableLetters[randomIndex];
    }
    
    // Check if a hint should be revealed based on guess number
    function checkForHintReveal() {
        const guessNumber = guesses.length;
        
        // Reveal hints at 3rd, 6th, and 9th guesses
        if ((guessNumber === 3 || guessNumber === 6 || guessNumber === 9) && 
            revealedLetters.length < 3) {
            
            const hintLetter = getNextHintLetter();
            if (hintLetter) {
                revealedLetters.push(hintLetter);
                showMessage(`Hint: The secret word contains the letter "${hintLetter}"`);
                
                // Re-render guesses to show the new hint
                renderGuesses();
                
                // Save the updated game state
                saveGame();
                
                return true;
            }
        }
        return false;
    }
    
    // Handle guess submission
    async function submitGuess() {
        const guess = currentGuess.toUpperCase().trim();
        
        // Clear input field immediately regardless of outcome
        currentGuess = '';
        updateDisplayedGuess();
        
        if (gameOver) {
            showMessage("Game over! Refresh for a new game.");
            return;
        }
        
        if (guess.length !== 5) {
            showMessage("Please enter a 5-letter word.");
            return;
        }
        
        // Check if the word has already been guessed
        if (guesses.some(g => g.word === guess)) {
            showMessage("You already guessed that word.");
            return;
        }
        
        // For daily puzzle mode, only allow words from WORD_LIST
        // Uncomment this if you want to restrict to only your curated word list
        /*
        if (!WORD_LIST.includes(guess)) {
            showMessage("Not in word list. Try again.");
            return;
        }
        */
        
        // Show loading message while we check the word
        showMessage("Checking word...");
        
        // Validate the word using the dictionary API
        const isValid = await isValidWord(guess);
        
        if (!isValid) {
            showMessage("Not a valid English word. Try again.");
            return;
        }
        
        // Word is valid, process the guess
        const common = commonLetters(guess, secretWord);
        guesses.push({ word: guess, common: common });
        
        renderGuesses();
        
        if (guess === secretWord) {
            gameOver = true;
            showSuccessMessage();
        } else if (guesses.length >= MAX_GUESSES) {
            gameOver = true;
            showFailureMessage();
        } else {
            // Check if we need to reveal a hint after this guess
            const hintRevealed = checkForHintReveal();
            
            if (!hintRevealed) {
                showMessage("");  // Clear any previous messages if no hint
            }
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
    
    // Get score color class based on common letter count
    function getScoreColorClass(commonCount) {
        if (commonCount === 0) {
            return 'score-red';     // 🟥 Red for 0
        } else if (commonCount <= 2) {
            return 'score-yellow';  // 🟨 Yellow for 1-2
        } else if (commonCount <= 4) {
            return 'score-blue';    // 🟦 Blue for 3-4
        } else {
            return 'score-green';   // 🟩 Green for 5
        }
    }
    
    function renderGuesses() {
        guessesContainer.innerHTML = '';
        
        // Update guess counter and change color based on progress
        guessCounterElement.textContent = `${guesses.length}/${MAX_GUESSES}`;
        updateCounterColor();
        
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
            
            // Create a span for each letter with hint styling if applicable
            const wordHTML = Array.from(guess.word).map((letter, index) => {
                let letterClass = '';
                
                // Check if this letter is one of the revealed hint letters
                if (revealedLetters.includes(letter) && secretWord.includes(letter)) {
                    // Apply position-based styling
                    if (secretWord[index] === letter) {
                        // Correct position - green
                        letterClass = 'correct';
                    } else {
                        // Correct letter but wrong position - yellow
                        letterClass = 'present';
                    }
                }
                
                return `<span class="${letterClass}">${letter}</span>`;
            }).join('');
            
            guessWord.innerHTML = wordHTML;
            
            const guessScore = document.createElement('div');
            guessScore.className = `guess-score ${getScoreColorClass(guess.common)}`;
            guessScore.textContent = guess.common;
            
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
4. Letters can be in any position.
5. Hints are revealed on your 3rd, 6th, and 9th guesses. Each hint reveals one letter from the secret word.
6. Hint letters are highlighted in all guesses:
   - Green: correct letter in the correct position
   - Yellow: correct letter in the wrong position
7. Score colors: 🟥 (0 letters), 🟨 (1-2 letters), 🟦 (3-4 letters), 🟩 (5 letters).`);
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
            color = '#B91C1C'; // Dark red for 10/10
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