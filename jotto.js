document.addEventListener('DOMContentLoaded', function() {
    // Helper functions for date formatting and sharing
    function getFormattedDate() {
        const today = new Date();
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return today.toLocaleDateString('en-US', options);
    }

    function copyToClipboard(text) {
        // Create temporary element
        const tempElement = document.createElement('textarea');
        tempElement.value = text;
        tempElement.setAttribute('readonly', '');
        tempElement.style.position = 'absolute';
        tempElement.style.left = '-9999px';
        document.body.appendChild(tempElement);
        
        // Select and copy
        tempElement.select();
        document.execCommand('copy');
        
        // Clean up
        document.body.removeChild(tempElement);
    }

    function ordinalSuffix(num) {
        const j = num % 10,
              k = num % 100;
        if (j == 1 && k != 11) {
            return num + "st";
        }
        if (j == 2 && k != 12) {
            return num + "nd";
        }
        if (j == 3 && k != 13) {
            return num + "rd";
        }
        return num + "th";
    }

    function updateTitleWithDate() {
        const formattedDate = getFormattedDate();
        const titleElement = document.querySelector('h1');
        if (titleElement) {
            titleElement.textContent = `Jotto.Day: ${formattedDate}`;
        }
    }
    
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
        
        // Update the title with today's date
        updateTitleWithDate();
        
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
        
        // Reveal hints at 2nd, 4th, 6th, and 8th guesses
        if ((guessNumber === 2 || guessNumber === 4 || guessNumber === 6 || guessNumber === 8) && 
            revealedLetters.length < 4) {
            
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
        if (commonCount <= 4) {
            return 'score-blue';
        } else {
            return 'score-green';
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
        showMessage(`Congratulations! Found in ${attempts}/${MAX_GUESSES} tries. Come back tomorrow for a new word.`, true);
        
        // Show the completion modal after a short delay
        setTimeout(() => {
            createCompletionModal(true, attempts);
        }, 500);
    }
    
    function showFailureMessage() {
        showMessage(`Game over! The word was ${secretWord}. Come back tomorrow for a new word.`);
        
        // Show the completion modal after a short delay
        setTimeout(() => {
            createCompletionModal(false, MAX_GUESSES);
        }, 500);
    }
    
    // Modal elements and functions
    function createIntroModal() {
        // Create modal container
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
        
        // Modal header
        const modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';
        
        const modalTitle = document.createElement('h2');
        modalTitle.textContent = 'HOW TO PLAY';
        
        const closeButton = document.createElement('button');
        closeButton.className = 'modal-close';
        closeButton.textContent = '×';
        closeButton.onclick = closeModal;
        
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);
        
        // Modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        modalContent.innerHTML = `
            <p1>Guess the secret 5-letter word in ${MAX_GUESSES} tries.</p1>
            <br>
            <br>
            <div class="rule-section">
                <div class="rule-number">1                </div>
                <div class="rule-text">
                    <p1>After each guess, you'll see how many letters your word has in common with the secret word.</p1>
                    <div class="example">
                        <div class="example-word">EARTH</div>
                        <div class="example-score score-blue">2</div>
                    </div>
                    <p2 class="example-caption">This guess has 2 letters in common with the secret word "LIGHT"</p2>
                </div>
            </div>
            <br>
            <div class="rule-section">
                <div class="rule-number">2</div>
                <div class="rule-text">
                    <p1>Hints are revealed on your 2nd, 4th, 6th and 8th guesses. Each hint reveals one letter from the secret word.</p1>
                    <div class="example">
                        <div class="example-word">L<span class="present">I</span>GHT</div>
                    </div>
                    <p2 class="example-caption">Yellow means the letter is in the secret word but in the wrong position.</p2>
                    <div class="example">
                        <div class="example-word">L<span class="correct">I</span>GHT</div>
                    </div>
                    <p2 class="example-caption">Green means the letter is in the correct position.</p2>
                </div>
            </div>
        `;
        
        // Modal footer
        const modalFooter = document.createElement('div');
        modalFooter.className = 'modal-footer';
        
        const playButton = document.createElement('button');
        playButton.className = 'modal-play-button';
        playButton.textContent = 'PLAY';
        playButton.onclick = closeModal;
        
        modalFooter.appendChild(playButton);
        
        // Assemble modal
        modalContainer.appendChild(modalHeader);
        modalContainer.appendChild(modalContent);
        modalContainer.appendChild(modalFooter);
        modalOverlay.appendChild(modalContainer);
        
        document.body.appendChild(modalOverlay);
        
        // Prevent scrolling when modal is open
        document.body.style.overflow = 'hidden';
    }

    function createCompletionModal(isSuccess, guessCount) {
        // Create modal container
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
        
        // Modal header
        const modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header completion-modal-header';
        
        const modalTitle = document.createElement('h2');
        modalTitle.textContent = isSuccess ? 'Success!' : 'Game Over!';
        modalTitle.className = isSuccess ? 'success-title' : 'failure-title';
        
        const closeButton = document.createElement('button');
        closeButton.className = 'modal-close';
        closeButton.textContent = '×';
        closeButton.onclick = closeModal;
        
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);
        
        // Modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        // Generate score visualization
        const scoreGraph = document.createElement('div');
        scoreGraph.className = 'score-graph';
        
        // Generate emoji sequence
        let emojiSequence = '';
        for (let i = 0; i < MAX_GUESSES; i++) {
            if (i < guessCount && isSuccess && i === guessCount - 1) {
                // Last successful guess is green
                emojiSequence += '🟩';
            } else if (i < guessCount) {
                // Previous guesses are blue
                emojiSequence += '🟦';
            } else {
                // Unused guesses are white/empty
                emojiSequence += '⬜';
            }
        }
        
        scoreGraph.textContent = emojiSequence;
        
        // Create text for share message
        const formattedDate = getFormattedDate();
        const shareText = isSuccess
            ? `Jotto.Day: ${formattedDate}\n${emojiSequence}`
            : `Jotto.Day: ${formattedDate}\n${emojiSequence}\n`;
        
        // Create share button
        const shareButton = document.createElement('button');
        shareButton.textContent = 'SHARE RESULTS';
        shareButton.className = 'share-button';
        shareButton.onclick = function() {
            copyToClipboard(shareText);
            const originalText = this.textContent;
            this.textContent = 'COPIED!';
            setTimeout(() => {
                this.textContent = originalText;
            }, 2000);
        };
        
        // Configure message text
        const messageText = document.createElement('p');
        messageText.className = 'result-message';
        
        if (isSuccess) {
            messageText.textContent = `🎉 Great job! You found the word in ${guessCount}/${MAX_GUESSES} guesses. 🎉`;
        } else {
            messageText.textContent = `📝 Sorry! The word was ${secretWord}. Try again tomorrow! 📝`;
        }
        
        // Add message and score graph to content
        modalContent.appendChild(messageText);
        modalContent.appendChild(scoreGraph);
        modalContent.appendChild(shareButton);
        
        // Modal footer
        const modalFooter = document.createElement('div');
        modalFooter.className = 'modal-footer';
        
        const playAgainButton = document.createElement('button');
        playAgainButton.className = 'modal-play-button';
        playAgainButton.textContent = 'CLOSE';
        playAgainButton.onclick = closeModal;
        
        modalFooter.appendChild(playAgainButton);
        
        // Assemble modal
        modalContainer.appendChild(modalHeader);
        modalContainer.appendChild(modalContent);
        modalContainer.appendChild(modalFooter);
        modalOverlay.appendChild(modalContainer);
        
        document.body.appendChild(modalOverlay);
        
        // Prevent scrolling when modal is open
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        const modalOverlay = document.querySelector('.modal-overlay');
        if (modalOverlay) {
            // Add closing animation
            modalOverlay.classList.add('closing');
            
            // Wait for animation to complete before removing
            setTimeout(() => {
                document.body.removeChild(modalOverlay);
                document.body.style.overflow = '';
                
                // Set localStorage to remember that user has seen the tutorial
                localStorage.setItem('jottoTutorialSeen', 'true');
            }, 300);
        }
    }

    // Show the tutorial modal on first visit
    function checkAndShowTutorial() {
        const hasSeenTutorial = localStorage.getItem('jottoTutorialSeen') === 'true';
        if (!hasSeenTutorial) {
            createIntroModal();
        }
    }
    
    function showHowToPlay() {
        createIntroModal();
    }
    
    // Function to update counter color based on number of guesses
    function updateCounterColor() {
        const numGuesses = guesses.length;
        const percentage = numGuesses / MAX_GUESSES;
        
        let color;
        if (percentage === 0) {
            color = '#10B981'; // Green for 0 guesses
        } else if (percentage < 0.1) {
            color = '#4BBB6A'; 
        } else if (percentage < 0.2) {
            color = '#69BC5F'; 
        } else if (percentage < 0.3) {
            color = '#86BC53'; 
        } else if (percentage < 0.4) {
            color = '#FBBF24'; 
        } else if (percentage < 0.5) {
            color = '#F7B524'; 
        } else if (percentage < 0.6) {
            color = '#F3AB23'; 
        } else if (percentage < 0.7) {
            color = '#EB9722'; 
        } else if (percentage < 0.8) {
            color = '#F3AB23'; 
        } else if (percentage < 0.9) {
            color = '#EB9722'; 
        } else if (percentage < 1) {
            color = '#B91C1C'; 
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
    
    // Connect the "How to Play" button to the modal
    howToPlayButton.onclick = showHowToPlay;
    
    // Check and show tutorial before initializing the game
    checkAndShowTutorial();
    
    // Initialize the game
    initGame();
});