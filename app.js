// Substring Scramble Game - Educational String Matching Algorithm Demonstration
// This game implements Horspool's algorithm to demonstrate efficient string searching

class SubstringScrambleGame {
    constructor() {
        // Game data embedded directly
        this.gameData = {
            easy: {
                name: "Easy",
                timeLimit: 60,
                textBlock: "The quick brown fox jumps over the lazy dog. Cats and dogs are popular pets. Birds fly in the blue sky. Fish swim in the clear water. Bees make honey in their hive.",
                words: ["fox", "dog", "cat", "bird", "fish", "bee"],
                scrambledWords: ["xof", "god", "tac", "drib", "hsif", "eeb"]
            },
            medium: {
                name: "Medium", 
                timeLimit: 60,
                textBlock: "Programming languages include Python, JavaScript, and Java. Algorithms solve complex problems efficiently. Data structures organize information systematically. Software development requires careful planning and testing.",
                words: ["python", "javascript", "java", "algorithm", "data", "software", "development", "testing"],
                scrambledWords: ["nohtyp", "tpircsavaj", "avaj", "mhtirogla", "atad", "erawtfos", "tnempoleved", "gnitset"]
            },
            hard: {
                name: "Hard",
                timeLimit: 60, 
                textBlock: "Artificial intelligence revolutionizes technology through machine learning and neural networks. Deep learning algorithms process massive datasets to identify complex patterns. Natural language processing enables computers to understand human communication. Computer vision systems can recognize objects and interpret visual information with remarkable accuracy.",
                words: ["artificial", "intelligence", "machine", "learning", "neural", "networks", "deep learning", "algorithms", "datasets", "patterns", "natural language", "processing"],
                scrambledWords: ["laicifitra", "ecnegilletni", "enihcam", "gninrael", "laruen", "skrowten", "gninrael peed", "smhtirogla", "stesatad", "snrettap", "egaugnal larutan", "gnissecorp"]
            }
        };

        // Initialize game state
        this.resetGameState();
        
        // Wait for DOM to be ready, then initialize
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    initialize() {
        this.initializeElements();
        this.initializeEventListeners();
        this.loadHighScore();
        this.updateDisplay();
        console.log('Game initialized successfully');
    }

    resetGameState() {
        this.gameState = {
            isPlaying: false,
            currentDifficulty: 'easy',
            score: 0,
            timeRemaining: 60,
            wordsFound: [],
            wordsRemaining: [],
            scrambledWordsRemaining: [],
            timer: null,
            currentText: '',
            foundPositions: []
        };
    }

    // Initialize DOM element references
    initializeElements() {
        this.elements = {
            difficulty: document.getElementById('difficulty'),
            startBtn: document.getElementById('startBtn'),
            gameArea: document.getElementById('gameArea'),
            mainText: document.getElementById('mainText'),
            searchInput: document.getElementById('searchInput'),
            submitBtn: document.getElementById('submitBtn'),
            scrambledWordsList: document.getElementById('scrambledWordsList'),
            wordsRemaining: document.getElementById('wordsRemaining'),
            currentScore: document.getElementById('currentScore'),
            timer: document.getElementById('timer'),
            highScore: document.getElementById('highScore'),
            gameOverModal: document.getElementById('gameOverModal'),
            gameOverTitle: document.getElementById('gameOverTitle'),
            finalScore: document.getElementById('finalScore'),
            wordsFound: document.getElementById('wordsFound'),
            newHighScore: document.getElementById('newHighScore'),
            playAgainBtn: document.getElementById('playAgainBtn'),
            closeModalBtn: document.getElementById('closeModalBtn'),
            visualText: document.getElementById('visualText'),
            visualPattern: document.getElementById('visualPattern'),
            horspoolComparisons: document.getElementById('horspoolComparisons'),
            naiveComparisons: document.getElementById('naiveComparisons'),
            searchTime: document.getElementById('searchTime'),
            efficiencyGain: document.getElementById('efficiencyGain')
        };

        // Verify all elements exist
        for (const [key, element] of Object.entries(this.elements)) {
            if (!element) {
                console.error(`Element not found: ${key}`);
            }
        }
    }

    // Set up event listeners
    initializeEventListeners() {
        if (this.elements.startBtn) {
            this.elements.startBtn.addEventListener('click', () => {
                console.log('Start button clicked');
                this.startGame();
            });
        }

        if (this.elements.submitBtn) {
            this.elements.submitBtn.addEventListener('click', () => this.handleSubmit());
        }

        if (this.elements.searchInput) {
            this.elements.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleSubmit();
            });
        }

        if (this.elements.playAgainBtn) {
            this.elements.playAgainBtn.addEventListener('click', () => this.playAgain());
        }

        if (this.elements.closeModalBtn) {
            this.elements.closeModalBtn.addEventListener('click', () => this.closeModal());
        }
    }

    // Load high score from localStorage
    loadHighScore() {
        try {
            const saved = localStorage.getItem('substringScrambleHighScore');
            const highScore = saved ? parseInt(saved) : 0;
            if (this.elements.highScore) {
                this.elements.highScore.textContent = highScore;
            }
        } catch (e) {
            console.log('LocalStorage not available, using default high score');
            if (this.elements.highScore) {
                this.elements.highScore.textContent = '0';
            }
        }
    }

    // Save high score to localStorage
    saveHighScore(score) {
        try {
            const currentHigh = parseInt(this.elements.highScore.textContent) || 0;
            if (score > currentHigh) {
                localStorage.setItem('substringScrambleHighScore', score.toString());
                this.elements.highScore.textContent = score;
                return true;
            }
        } catch (e) {
            console.log('LocalStorage not available for saving high score');
        }
        return false;
    }

    // Start a new game
    startGame() {
        console.log('Starting game...');
        
        // Get difficulty
        const difficulty = this.elements.difficulty ? this.elements.difficulty.value : 'easy';
        const difficultyData = this.gameData[difficulty];
        
        if (!difficultyData) {
            console.error('Invalid difficulty data');
            return;
        }

        console.log(`Starting ${difficulty} difficulty with ${difficultyData.words.length} words`);
        
        // Reset and set up game state
        this.gameState = {
            isPlaying: true,
            currentDifficulty: difficulty,
            score: 0,
            timeRemaining: difficultyData.timeLimit,
            wordsFound: [],
            wordsRemaining: [...difficultyData.words],
            scrambledWordsRemaining: [...difficultyData.scrambledWords],
            currentText: difficultyData.textBlock,
            foundPositions: [],
            timer: null
        };

        // Show game area and disable controls
        if (this.elements.gameArea) {
            this.elements.gameArea.classList.remove('hidden');
        }
        if (this.elements.startBtn) {
            this.elements.startBtn.disabled = true;
        }
        if (this.elements.difficulty) {
            this.elements.difficulty.disabled = true;
        }
        
        // Initialize game display
        this.displayMainText();
        this.displayScrambledWords();
        this.startTimer();
        this.updateDisplay();
        this.clearVisualization();
        
        // Focus on search input
        setTimeout(() => {
            if (this.elements.searchInput) {
                this.elements.searchInput.focus();
            }
        }, 100);

        console.log('Game started successfully');
    }

    // Display the main text block
    displayMainText() {
        if (this.elements.mainText && this.gameState.currentText) {
            this.elements.mainText.innerHTML = '';
            this.elements.mainText.textContent = this.gameState.currentText;
            console.log('Main text displayed:', this.gameState.currentText.substring(0, 50) + '...');
        }
    }

    // Display scrambled words
    displayScrambledWords() {
        if (!this.elements.scrambledWordsList) return;
        
        this.elements.scrambledWordsList.innerHTML = '';
        
        this.gameState.scrambledWordsRemaining.forEach((word, index) => {
            const wordElement = document.createElement('div');
            wordElement.className = 'scrambled-word';
            wordElement.textContent = word;
            wordElement.setAttribute('role', 'listitem');
            wordElement.setAttribute('data-index', index);
            this.elements.scrambledWordsList.appendChild(wordElement);
        });
        
        if (this.elements.wordsRemaining) {
            this.elements.wordsRemaining.textContent = this.gameState.scrambledWordsRemaining.length;
        }
        
        console.log(`Displayed ${this.gameState.scrambledWordsRemaining.length} scrambled words`);
    }

    // Start the game timer
    startTimer() {
        if (this.gameState.timer) {
            clearInterval(this.gameState.timer);
        }
        
        this.updateTimerDisplay();
        this.gameState.timer = setInterval(() => {
            this.gameState.timeRemaining--;
            this.updateTimerDisplay();
            
            if (this.gameState.timeRemaining <= 10 && this.elements.timer) {
                this.elements.timer.classList.add('timer-warning');
            }
            
            if (this.gameState.timeRemaining <= 0) {
                this.endGame('Time\'s up!');
            }
        }, 1000);
    }

    // Update timer display
    updateTimerDisplay() {
        if (this.elements.timer) {
            this.elements.timer.textContent = this.gameState.timeRemaining;
        }
    }

    // Handle word submission
    handleSubmit() {
        if (!this.gameState.isPlaying) return;
        
        const inputWord = this.elements.searchInput ? this.elements.searchInput.value.trim().toLowerCase() : '';
        if (!inputWord) {
            this.showFeedback('Please enter a word!', false);
            return;
        }

        console.log('Searching for word:', inputWord);

        // Check if word is in the remaining words list (case insensitive)
        const wordIndex = this.gameState.wordsRemaining.findIndex(word => 
            word.toLowerCase() === inputWord.toLowerCase()
        );

        if (wordIndex === -1) {
            this.showFeedback('Word not found or already discovered!', false);
            if (this.elements.searchInput) {
                this.elements.searchInput.value = '';
            }
            return;
        }

        // Perform search using Horspool algorithm
        const startTime = performance.now();
        const searchResult = this.horspoolSearch(this.gameState.currentText.toLowerCase(), inputWord.toLowerCase());
        const endTime = performance.now();
        
        // Also perform naive search for comparison
        const naiveResult = this.naiveSearch(this.gameState.currentText.toLowerCase(), inputWord.toLowerCase());
        
        // Update algorithm statistics
        this.updateAlgorithmStats(searchResult, naiveResult, endTime - startTime);

        if (searchResult.found) {
            this.handleWordFound(wordIndex, searchResult.position, inputWord);
        } else {
            this.showFeedback('Word not found in text!', false);
        }

        if (this.elements.searchInput) {
            this.elements.searchInput.value = '';
        }
    }

    // Handle when a word is found
    handleWordFound(wordIndex, position, inputWord) {
        // Remove from remaining words
        const foundWord = this.gameState.wordsRemaining.splice(wordIndex, 1)[0];
        const scrambledWord = this.gameState.scrambledWordsRemaining.splice(wordIndex, 1)[0];
        
        this.gameState.wordsFound.push(foundWord);
        this.gameState.foundPositions.push({word: foundWord, position: position});
        
        // Calculate score (bonus for speed)
        const timeBonus = Math.max(0, this.gameState.timeRemaining);
        const wordScore = foundWord.length * 10 + Math.floor(timeBonus / 2);
        this.gameState.score += wordScore;
        
        // Update display
        this.highlightWordInText(foundWord, position);
        this.displayScrambledWords();
        this.updateDisplay();
        
        this.showFeedback(`Found "${foundWord}"! +${wordScore} points`, true);
        
        console.log(`Word found: ${foundWord} at position ${position}`);
        
        // Check win condition
        if (this.gameState.wordsRemaining.length === 0) {
            setTimeout(() => this.endGame('Congratulations! All words found!'), 1000);
        }
    }

    // Highlight found word in main text
    highlightWordInText(word, position) {
        if (!this.elements.mainText) return;
        
        const text = this.gameState.currentText;
        
        // Find the actual word in the text (preserve original case)
        const actualWord = text.substr(position, word.length);
        
        // Replace in the text with highlighted version
        const before = text.substring(0, position);
        const after = text.substring(position + word.length);
        
        const highlightedText = before + 
            `<span class="highlight word-found-animation">${actualWord}</span>` + 
            after;
        
        this.elements.mainText.innerHTML = highlightedText;
    }

    // Show feedback message
    showFeedback(message, isSuccess) {
        const feedback = document.createElement('div');
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 1001;
            transition: all 0.3s ease;
            ${isSuccess ? 
                'background: rgba(33, 128, 141, 0.2); color: var(--color-success); border: 2px solid var(--color-success);' : 
                'background: rgba(192, 21, 47, 0.2); color: var(--color-error); border: 2px solid var(--color-error);'
            }
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => {
                if (document.body.contains(feedback)) {
                    document.body.removeChild(feedback);
                }
            }, 300);
        }, 2000);
    }

    // Update game display
    updateDisplay() {
        if (this.elements.currentScore) {
            this.elements.currentScore.textContent = this.gameState.score;
        }
        if (this.elements.wordsFound) {
            this.elements.wordsFound.textContent = this.gameState.wordsFound.length;
        }
    }

    // End the game
    endGame(message) {
        this.gameState.isPlaying = false;
        if (this.gameState.timer) {
            clearInterval(this.gameState.timer);
        }
        
        if (this.elements.timer) {
            this.elements.timer.classList.remove('timer-warning');
        }
        
        // Check for new high score
        const isNewHigh = this.saveHighScore(this.gameState.score);
        
        // Show game over modal
        if (this.elements.gameOverTitle) {
            this.elements.gameOverTitle.textContent = message;
        }
        if (this.elements.finalScore) {
            this.elements.finalScore.textContent = this.gameState.score;
        }
        if (this.elements.newHighScore) {
            this.elements.newHighScore.classList.toggle('hidden', !isNewHigh);
        }
        if (this.elements.gameOverModal) {
            this.elements.gameOverModal.classList.remove('hidden');
        }
    }

    // Play again
    playAgain() {
        this.closeModal();
        setTimeout(() => this.startGame(), 100);
    }

    // Close modal
    closeModal() {
        if (this.elements.gameOverModal) {
            this.elements.gameOverModal.classList.add('hidden');
        }
        this.resetGame();
    }

    // Reset game state
    resetGame() {
        this.gameState.isPlaying = false;
        if (this.gameState.timer) {
            clearInterval(this.gameState.timer);
            this.gameState.timer = null;
        }
        
        if (this.elements.gameArea) {
            this.elements.gameArea.classList.add('hidden');
        }
        if (this.elements.startBtn) {
            this.elements.startBtn.disabled = false;
        }
        if (this.elements.difficulty) {
            this.elements.difficulty.disabled = false;
        }
        if (this.elements.timer) {
            this.elements.timer.classList.remove('timer-warning');
            this.elements.timer.textContent = '60';
        }
        if (this.elements.currentScore) {
            this.elements.currentScore.textContent = '0';
        }
        if (this.elements.searchInput) {
            this.elements.searchInput.value = '';
        }
        
        this.clearVisualization();
        this.resetGameState();
    }

    // Clear visualization
    clearVisualization() {
        if (this.elements.visualText) this.elements.visualText.innerHTML = '';
        if (this.elements.visualPattern) this.elements.visualPattern.innerHTML = '';
        if (this.elements.horspoolComparisons) this.elements.horspoolComparisons.textContent = '0';
        if (this.elements.naiveComparisons) this.elements.naiveComparisons.textContent = '0';
        if (this.elements.searchTime) this.elements.searchTime.textContent = '0';
        if (this.elements.efficiencyGain) this.elements.efficiencyGain.textContent = '0%';
    }

    /**
     * HORSPOOL'S ALGORITHM IMPLEMENTATION
     * 
     * Horspool's algorithm is an efficient string matching algorithm that preprocesses
     * the pattern to create a "bad character shift" table. This allows the algorithm
     * to skip characters when a mismatch occurs, making it much faster than naive search.
     */
    horspoolSearch(text, pattern) {
        const result = {
            found: false,
            position: -1,
            comparisons: 0,
            shifts: []
        };

        if (!pattern || pattern.length === 0) return result;
        if (pattern.length > text.length) return result;

        // Phase 1: Preprocessing - Build bad character shift table
        const shiftTable = this.buildShiftTable(pattern);
        
        // Phase 2: Searching
        let textPos = 0;
        const patternLength = pattern.length;
        const textLength = text.length;
        
        while (textPos <= textLength - patternLength) {
            let patternPos = patternLength - 1;
            
            // Compare pattern with text from right to left
            while (patternPos >= 0 && 
                   text[textPos + patternPos] === pattern[patternPos]) {
                result.comparisons++;
                patternPos--;
            }
            
            // If we matched the entire pattern
            if (patternPos < 0) {
                result.found = true;
                result.position = textPos;
                this.visualizeSearch(text, pattern, textPos, 'found');
                return result;
            }
            
            // Mismatch occurred
            result.comparisons++;
            
            // Calculate shift using the bad character rule
            const rightmostChar = text[textPos + patternLength - 1];
            const shift = shiftTable[rightmostChar] || patternLength;
            
            textPos += shift;
        }
        
        return result;
    }

    /**
     * Build the bad character shift table for Horspool's algorithm
     */
    buildShiftTable(pattern) {
        const table = {};
        const patternLength = pattern.length;
        
        for (let i = 0; i < patternLength - 1; i++) {
            const char = pattern[i];
            table[char] = patternLength - 1 - i;
        }
        
        return table;
    }

    /**
     * NAIVE SEARCH ALGORITHM FOR COMPARISON
     */
    naiveSearch(text, pattern) {
        const result = {
            found: false,
            position: -1,
            comparisons: 0
        };

        if (!pattern || pattern.length === 0) return result;
        if (pattern.length > text.length) return result;

        const textLength = text.length;
        const patternLength = pattern.length;

        for (let i = 0; i <= textLength - patternLength; i++) {
            let j = 0;
            
            while (j < patternLength && 
                   text[i + j] === pattern[j]) {
                result.comparisons++;
                j++;
            }
            
            if (j < patternLength) {
                result.comparisons++;
            }
            
            if (j === patternLength) {
                result.found = true;
                result.position = i;
                return result;
            }
        }
        
        return result;
    }

    // Visualize the search process
    visualizeSearch(text, pattern, textPos, state) {
        if (!this.elements.visualText || !this.elements.visualPattern) return;
        
        const startPos = Math.max(0, textPos - 10);
        const endPos = Math.min(text.length, textPos + pattern.length + 10);
        const textSegment = text.substring(startPos, endPos);
        const relativeTextPos = textPos - startPos;
        
        // Create visual representation of text
        let textHtml = '';
        for (let i = 0; i < textSegment.length; i++) {
            let className = 'char';
            if (state === 'found' && i >= relativeTextPos && i < relativeTextPos + pattern.length) {
                className += ' matching';
            }
            textHtml += `<span class="${className}">${textSegment[i]}</span>`;
        }
        
        // Create visual representation of pattern
        const paddingSpaces = ' '.repeat(Math.max(0, relativeTextPos));
        let patternHtml = paddingSpaces;
        
        for (let i = 0; i < pattern.length; i++) {
            let className = 'char';
            if (state === 'found') {
                className += ' matching';
            }
            patternHtml += `<span class="${className}">${pattern[i]}</span>`;
        }
        
        this.elements.visualText.innerHTML = textHtml;
        this.elements.visualPattern.innerHTML = patternHtml;
    }

    // Update algorithm statistics display
    updateAlgorithmStats(horspoolResult, naiveResult, timeMs) {
        if (this.elements.horspoolComparisons) {
            this.elements.horspoolComparisons.textContent = horspoolResult.comparisons;
        }
        if (this.elements.naiveComparisons) {
            this.elements.naiveComparisons.textContent = naiveResult.comparisons;
        }
        if (this.elements.searchTime) {
            this.elements.searchTime.textContent = timeMs.toFixed(2);
        }
        if (this.elements.efficiencyGain) {
            const efficiency = naiveResult.comparisons > 0 ? 
                Math.round(((naiveResult.comparisons - horspoolResult.comparisons) / naiveResult.comparisons) * 100) : 0;
            this.elements.efficiencyGain.textContent = Math.max(0, efficiency) + '%';
        }
    }
}

// Initialize the game
new SubstringScrambleGame();