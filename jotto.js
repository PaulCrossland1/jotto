// Word list - common 5-letter words
const WORD_LIST = [
    "ABOUT", "ABOVE", "ABUSE", "ACTOR", "ADAPT", "ADMIT", "ADOPT", "AFTER", "AGAIN", "AGREE",
    "AHEAD", "ALBUM", "ALLOW", "ALONE", "ALONG", "ALTER", "AMONG", "ANGER", "ANGLE", "ANGRY",
    "ANKLE", "APART", "APPLE", "APPLY", "ARENA", "ARGUE", "ARISE", "ARMOR", "ARRAY", "ARROW",
    "ASSET", "AVOID", "AWARD", "AWARE", "BADLY", "BAKER", "BASES", "BASIC", "BASIS", "BEACH",
    "BEGIN", "BEING", "BELOW", "BENCH", "BIRTH", "BLACK", "BLAME", "BLANK", "BLAST", "BLEED",
    "BLEND", "BLESS", "BLIND", "BLOCK", "BLOOD", "BOARD", "BOOST", "BOOTH", "BOUND", "BRAIN",
    "BRAND", "BRAVE", "BREAD", "BREAK", "BREED", "BRIEF", "BRING", "BROAD", "BROWN", "BUILD",
    "BURST", "BUYER", "CABLE", "CALIF", "CARRY", "CATCH", "CAUSE", "CHAIN", "CHAIR", "CHART",
    "CHASE", "CHEAP", "CHECK", "CHEST", "CHIEF", "CHILD", "CHINA", "CHOSE", "CIVIL", "CLAIM",
    "CLASS", "CLEAN", "CLEAR", "CLICK", "CLOCK", "CLOSE", "COACH", "COAST", "COULD", "COUNT",
    "COURT", "COVER", "CRAFT", "CRASH", "CREAM", "CRIME", "CROSS", "CROWD", "CROWN", "CURVE",
    "CYCLE", "DAILY", "DANCE", "DATED", "DEALT", "DEATH", "DEBUT", "DELAY", "DEPTH", "DOING",
    "DOUBT", "DOZEN", "DRAFT", "DRAMA", "DRAWN", "DREAM", "DRESS", "DRILL", "DRINK", "DRIVE",
    "DROVE", "DYING", "EAGER", "EARLY", "EARTH", "EIGHT", "ELITE", "EMPTY", "ENEMY", "ENJOY",
    "ENTER", "ENTRY", "EQUAL", "ERROR", "EVENT", "EVERY", "EXACT", "EXIST", "EXTRA", "FAITH",
    "FALSE", "FAUNA", "FAVOR", "FEAST", "FIELD", "FIFTH", "FIFTY", "FIGHT", "FINAL", "FIRST",
    "FIXED", "FLASH", "FLEET", "FLOOR", "FLUID", "FOCUS", "FORCE", "FORTH", "FORTY", "FORUM",
    "FOUND", "FRAME", "FRANK", "FRAUD", "FRESH", "FRONT", "FRUIT", "FULLY", "FUNNY", "GIANT",
    "GIVEN", "GLASS", "GLOBE", "GOING", "GRACE", "GRADE", "GRAND", "GRANT", "GRASS", "GREAT",
    "GREEN", "GROSS", "GROUP", "GROWN", "GUARD", "GUESS", "GUEST", "GUIDE", "HAPPY", "HARRY",
    "HEART", "HEAVY", "HENCE", "HENRY", "HORSE", "HOTEL", "HOUSE", "HUMAN", "IDEAL", "IMAGE",
    "INDEX", "INNER", "INPUT", "ISSUE", "JAPAN", "JIMMY", "JOINT", "JONES", "JUDGE", "KNOWN",
    "LABEL", "LARGE", "LASER", "LATER", "LAUGH", "LAYER", "LEARN", "LEASE", "LEAST", "LEAVE",
    "LEGAL", "LEVEL", "LEWIS", "LIGHT", "LIMIT", "LINKS", "LINUX", "LIVER", "LIVES", "LOCAL",
    "LOGIC", "LOOSE", "LOWER", "LUCKY", "LUNCH", "LYING", "MAGIC", "MAJOR", "MAKER", "MARCH",
    "MARIA", "MATCH", "MAYBE", "MAYOR", "MEANT", "MEDIA", "METAL", "MIGHT", "MINOR", "MINUS",
    "MIXED", "MODEL", "MONEY", "MONTH", "MORAL", "MOTOR", "MOUNT", "MOUSE", "MOUTH", "MOVIE",
    "MUSIC", "NEEDS", "NEVER", "NEWLY", "NIGHT", "NOISE", "NORTH", "NOTED", "NOVEL", "NURSE",
    "OCCUR", "OCEAN", "OFFER", "OFTEN", "ORDER", "OTHER", "OUGHT", "PAINT", "PANEL", "PAPER",
    "PARTY", "PEACE", "PETER", "PHASE", "PHONE", "PHOTO", "PIECE", "PILOT", "PITCH", "PLACE",
    "PLAIN", "PLANE", "PLANT", "PLATE", "POINT", "POUND", "POWER", "PRESS", "PRICE", "PRIDE",
    "PRIME", "PRINT", "PRIOR", "PRIZE", "PROOF", "PROUD", "PROVE", "QUEEN", "QUICK", "QUIET",
    "QUITE", "RADIO", "RAISE", "RANGE", "RAPID", "RATIO", "REACH", "READY", "REFER", "RIGHT",
    "RIVAL", "RIVER", "ROBIN", "ROGER", "ROMAN", "ROUGH", "ROUND", "ROUTE", "ROYAL", "RURAL",
    "SCALE", "SCENE", "SCOPE", "SCORE", "SENSE", "SERVE", "SEVEN", "SHALL", "SHAPE", "SHARE",
    "SHARP", "SHEET", "SHELF", "SHELL", "SHIFT", "SHIRT", "SHOCK", "SHOOT", "SHORT", "SHOWN",
    "SIGHT", "SINCE", "SIXTH", "SIXTY", "SIZED", "SKILL", "SLEEP", "SLIDE", "SMALL", "SMART",
    "SMILE", "SMITH", "SMOKE", "SOLID", "SOLVE", "SORRY", "SOUND", "SOUTH", "SPACE", "SPARE",
    "SPEAK", "SPEED", "SPEND", "SPENT", "SPLIT", "SPOKE", "SPORT", "STAFF", "STAGE", "STAKE",
    "STAND", "START", "STATE", "STEAM", "STEEL", "STICK", "STILL", "STOCK", "STONE", "STOOD",
    "STORE", "STORM", "STORY", "STRIP", "STUCK", "STUDY", "STUFF", "STYLE", "SUGAR", "SUITE",
    "SUPER", "SWEET", "TABLE", "TAKEN", "TASTE", "TAXES", "TEACH", "TEETH", "TEXAS", "THANK",
    "THEFT", "THEIR", "THEME", "THERE", "THESE", "THICK", "THING", "THINK", "THIRD", "THOSE",
    "THREE", "THREW", "THROW", "TIGHT", "TIMES", "TIRED", "TITLE", "TODAY", "TOPIC", "TOTAL",
    "TOUCH", "TOUGH", "TOWER", "TRACK", "TRADE", "TRAIN", "TREAT", "TREND", "TRIAL", "TRIED",
    "TRIES", "TRUCK", "TRULY", "TRUST", "TRUTH", "TWICE", "UNDER", "UNDUE", "UNION", "UNITY",
    "UNTIL", "UPPER", "UPSET", "URBAN", "USAGE", "USUAL", "VALID", "VALUE", "VIDEO", "VIRUS",
    "VISIT", "VITAL", "VOICE", "WASTE", "WATCH", "WATER", "WEIGH", "WEIRD", "WENT", "WERE",
    "WEST", "WHALE", "WHEEL", "WHERE", "WHICH", "WHILE", "WHITE", "WHOLE", "WHOSE", "WOMAN",
    "WOMEN", "WORLD", "WORRY", "WORSE", "WORST", "WORTH", "WOULD", "WOUND", "WRITE", "WRONG",
    "WROTE", "YIELD", "YOUNG", "YOUTH"
];

document.addEventListener('DOMContentLoaded', function() {
    // Game variables
    let secretWord = "";
    let guesses = [];
    let gameOver = false;
    let currentGuess = "";
    
    // DOM elements
    const guessInput = document.getElementById('guess');
    const guessesContainer = document.getElementById('guesses');
    const messageElement = document.getElementById('message');
    const shareContainer = document.getElementById('share-container');
    const shareButton = document.getElementById('share-btn');
    const dailyIndicator = document.getElementById('daily-word-indicator');
    const statsContainer = document.getElementById('stats-container');
    const playedElement = document.getElementById('played');
    const winPercentElement = document.getElementById('win-percent');
    const streakElement = document.getElementById('streak');
    const maxStreakElement = document.getElementById('max-streak');
    const howToPlayButton = document.getElementById('how-to-play');
    const keyboard = document.getElementById('keyboard');
    const keys = document.querySelectorAll('.key');
    const guessCounterElement = document.getElementById('guess-counter');
    
    // Stats object
    let stats = {
        played: 0,
        won: 0,
        currentStreak: 0,
        maxStreak: 0,
        lastPlayed: null,
        lastCompletedDaily: null
    };
    
    // Set up daily word based on date
    function initGame() {
        loadStats();
        
        const today = new Date();
        const daysSinceEpoch = Math.floor(today / 86400000);
        const dailyWordIndex = daysSinceEpoch % WORD_LIST.length;
        
        secretWord = WORD_LIST[dailyWordIndex];
        
        // Check if already played today
        const lastPlayedDate = stats.lastCompletedDaily ? new Date(stats.lastCompletedDaily).toDateString() : null;
        if (lastPlayedDate === today.toDateString()) {
            loadSavedDailyGame();
        } else {
            guesses = [];
            gameOver = false;
        }
        
        // Format the date as "1st March 2025"
        const formattedDate = formatDate(today);
        
        // Calculate time until next puzzle
        const nextPuzzleTime = calculateNextPuzzleTime();
        
        dailyIndicator.innerHTML = `Daily Puzzle <strong>${formattedDate}</strong><br>Next puzzle in <span id="countdown">${nextPuzzleTime}</span>`;
        
        // Start countdown timer
        startCountdown();
        
        renderGuesses();
        updateStats();
        
        console.log("Game initialized with secret word: " + secretWord);
    }
    
    // Format date as "1st March 2025"
    function formatDate(date) {
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        
        // Add ordinal suffix to day
        let suffix = 'th';
        if (day % 10 === 1 && day !== 11) {
            suffix = 'st';
        } else if (day % 10 === 2 && day !== 12) {
            suffix = 'nd';
        } else if (day % 10 === 3 && day !== 13) {
            suffix = 'rd';
        }
        
        return `${day}${suffix} ${month} ${year}`;
    }
    
    // Calculate time until next puzzle
    function calculateNextPuzzleTime() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const timeRemaining = tomorrow - now;
        
        return formatTimeRemaining(timeRemaining);
    }
    
    // Format time remaining as HH:MM:SS
    function formatTimeRemaining(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Start countdown timer
    function startCountdown() {
        const countdownElement = document.getElementById('countdown');
        
        // Update countdown every second
        const countdownInterval = setInterval(() => {
            const timeRemaining = calculateNextPuzzleTime();
            countdownElement.textContent = timeRemaining;
            
            // If countdown reaches zero, refresh for new puzzle
            if (timeRemaining === '00:00:00') {
                clearInterval(countdownInterval);
                location.reload();
            }
        }, 1000);
    }
    
    function loadSavedDailyGame() {
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
    }
    
    function loadStats() {
        const savedStats = localStorage.getItem('jottoStats');
        if (savedStats) {
            stats = JSON.parse(savedStats);
        }
    }
    
    function updateStats() {
        playedElement.textContent = stats.played;
        winPercentElement.textContent = stats.played > 0 
            ? Math.round((stats.won / stats.played) * 100) + '%' 
            : '0%';
        streakElement.textContent = stats.currentStreak;
        maxStreakElement.textContent = stats.maxStreak;
        
        localStorage.setItem('jottoStats', JSON.stringify(stats));
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
        console.log("submitGuess function called");
        
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
            updateStatsForWin();
        } else if (guesses.length >= 6) {
            gameOver = true;
            showFailureMessage();
            updateStatsForLoss();
        }
        
        saveGame();
    }
    
    // Update the displayed guess in the input field
    function updateDisplayedGuess() {
        guessInput.value = currentGuess;
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
    
    function updateStatsForWin() {
        stats.played++;
        stats.won++;
        stats.currentStreak++;
        stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
        stats.lastPlayed = new Date().toISOString();
        stats.lastCompletedDaily = new Date().toISOString();
        
        updateStats();
    }
    
    function updateStatsForLoss() {
        stats.played++;
        stats.currentStreak = 0;
        stats.lastPlayed = new Date().toISOString();
        stats.lastCompletedDaily = new Date().toISOString();
        
        updateStats();
    }
    
    function renderGuesses() {
        guessesContainer.innerHTML = '';
        
        // Update guess counter
        guessCounterElement.textContent = `${guesses.length}/6`;
        
        // Create a reversed copy of guesses to display newest first
        const displayGuesses = [...guesses];
        
        // Only show up to 3 most recent guesses
        const recentGuesses = displayGuesses.slice(-3);
        
        recentGuesses.forEach((guess, index) => {
            const guessRow = document.createElement('div');
            guessRow.className = 'guess-row';
            
            // Add highlight class for latest guess
            if (index === recentGuesses.length - 1 && recentGuesses.length === displayGuesses.length) {
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
        });
    }
    
    function showMessage(text, isSuccess = false) {
        messageElement.textContent = text;
        messageElement.className = isSuccess ? 'message success' : 'message';
    }
    
    function showSuccessMessage() {
        const attempts = guesses.length;
        showMessage(`Congratulations! Found in ${attempts}/6 tries.`, true);
        shareContainer.style.display = 'block';
        statsContainer.style.display = 'flex';
    }
    
    function showFailureMessage() {
        showMessage(`Game over! The word was ${secretWord}.`);
        shareContainer.style.display = 'block';
        statsContainer.style.display = 'flex';
    }
    
    function getShareText() {
        let shareText = `Jotto.day #${Math.floor(new Date() / 86400000) % 1000} ${guesses.length}/6\n\n`;
        
        guesses.forEach(guess => {
            // Use emojis to represent the score
            let scoreEmoji = '';
            if (guess.word === secretWord) {
                scoreEmoji = '🟩';
            } else {
                // Green circle for 5, blue for others based on closeness
                if (guess.common === 5) {
                    scoreEmoji = '🟩';
                } else if (guess.common === 4) {
                    scoreEmoji = '🟦';
                } else if (guess.common === 3) {
                    scoreEmoji = '🟦';
                } else if (guess.common === 2) {
                    scoreEmoji = '🟦';
                } else if (guess.common === 1) {
                    scoreEmoji = '🟦';
                } else {
                    scoreEmoji = '⬜';
                }
            }
            
            shareText += `${scoreEmoji} ${guess.common}/5\n`;
        });
        
        shareText += '\nhttps://jotto.day';
        return shareText;
    }
    
    function shareResults() {
        const shareText = getShareText();
        
        if (navigator.share) {
            navigator.share({
                title: 'My Jotto.day Results',
                text: shareText
            }).catch(error => {
                console.log('Error sharing:', error);
                fallbackShare(shareText);
            });
        } else {
            fallbackShare(shareText);
        }
    }
    
    function fallbackShare(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Results copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }
    
    function showHowToPlay() {
        alert(`HOW TO PLAY JOTTO.DAY:

1. Guess the secret 5-letter word in 6 tries.
2. After each guess, you'll see how many letters your word has in common with the secret word.
3. Letters are only counted once. For example, if the secret word is "SNAKE" and you guess "KEEPS", you'd get a score of 3 (for S, K, E).
4. Letters can be in any position.
5. Daily mode gives everyone the same word each day!`);
    }
    
    // Event listeners for keyboard
    keys.forEach(key => {
        key.addEventListener('click', function() {
            const keyValue = this.getAttribute('data-key');
            
            // Add visual feedback
            this.classList.add('active');
            setTimeout(() => {
                this.classList.remove('active');
            }, 100);
            
            handleKeyPress(keyValue);
        });
    });
    
    // Support physical keyboard for desktop
    document.addEventListener('keydown', function(event) {
        if (gameOver) return;
        
        const key = event.key.toUpperCase();
        
        if (key === 'ENTER') {
            handleKeyPress('ENTER');
        } else if (key === 'BACKSPACE') {
            handleKeyPress('DELETE');
        } else if (/^[A-Z]$/.test(key)) {
            handleKeyPress(key);
            
            // Add visual feedback to the corresponding key
            const keyElement = document.querySelector(`.key[data-key="${key}"]`);
            if (keyElement) {
                keyElement.classList.add('active');
                setTimeout(() => {
                    keyElement.classList.remove('active');
                }, 100);
            }
        }
    });
    
    shareButton.onclick = shareResults;
    howToPlayButton.onclick = showHowToPlay;
    
    // Initialize the game
    initGame();
    
    // Prevent focus and native keyboard on mobile
    guessInput.addEventListener('focus', function(e) {
        // Prevent default focus behavior
        e.preventDefault();
        guessInput.blur();
        return false;
    });
    
    guessInput.addEventListener('click', function(e) {
        e.preventDefault();
        guessInput.blur();
        return false;
    });
    
    // Log that everything loaded successfully
    console.log("Jotto game initialized successfully");
    
    // DEBUG: Print the secret word to console for testing
    console.log("Today's secret word is: " + secretWord);
});