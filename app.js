
class AlgorithmMaster {
    constructor() {
        this.currentScreen = 'splashScreen';
        this.gameState = {
            playerLevel: 1,
            playerXP: 0,
            totalGames: 0,
            bestScore: 0,
            totalWords: 0,
            achievements: [],
            unlockedCategories: ['science', 'technology', 'literature', 'history', 'geography'],
            selectedCategory: null,
            selectedDifficulty: null,
            selectedAlgorithm: 'horspool',
            currentGame: null
        };

        this.gameData = {
            "categories": {
                "science": {
                    "name": "Science & Discovery",
                    "icon": "🔬",
                    "color": "#7C3AED",
                    "difficulties": {
                        "beginner": {
                            "name": "Lab Assistant",
                            "timeLimit": 120,
                            "textBlock": "Scientists study atoms and molecules in laboratory environments using sophisticated equipment. They conduct experiments with chemical reactions involving acids and bases to understand matter. Researchers analyze cellular structures and genetic material like dna and rna sequences under powerful microscopes. Biology labs contain various organisms and bacteria samples for detailed examination. Chemistry involves studying elements, compounds, and their complex interactions. Physics explores matter, energy, and fundamental forces throughout the universe. Medical research teams work tirelessly to develop new treatments, medicines, and vaccines.",
                            "words": ["atom", "molecule", "laboratory", "chemical", "acid", "base", "cell", "genetic", "dna", "rna", "microscope", "organism", "bacteria", "element", "compound"]
                        },
                        "intermediate": {
                            "name": "Researcher",
                            "timeLimit": 100,
                            "textBlock": "Quantum physics revolutionizes our understanding of subatomic particles like photons, electrons, and neutrons. Advanced particle accelerators enable scientists to study fundamental forces and energy interactions. Biochemistry researchers investigate protein structures and enzymatic reactions in living systems. Spectroscopy techniques reveal molecular compositions and chemical bonding patterns. Nuclear physics examines radioactive decay and fusion processes in stellar environments. Theoretical physicists develop mathematical models to explain complex phenomena and predict experimental outcomes.",
                            "words": ["quantum", "photon", "electron", "neutron", "particle", "energy", "biochemistry", "protein", "enzymatic", "spectroscopy", "molecular", "nuclear", "radioactive", "fusion", "theoretical"]
                        },
                        "advanced": {
                            "name": "Professor", 
                            "timeLimit": 80,
                            "textBlock": "Nanotechnology enables manipulation of materials at the molecular level for revolutionary applications. Biotechnology combines biological systems with engineering principles to create innovative solutions. Genetic engineering allows scientists to modify organisms and develop new therapeutic approaches. Crystallography reveals three-dimensional structures of complex macromolecules and pharmaceutical compounds. Computational biology uses advanced algorithms to analyze genomic sequences and protein folding patterns. Interdisciplinary research integrates multiple scientific disciplines to solve challenging global problems.",
                            "words": ["nanotechnology", "biotechnology", "engineering", "therapeutic", "crystallography", "macromolecules", "pharmaceutical", "computational", "algorithms", "genomic", "interdisciplinary", "manipulation", "innovative", "revolutionary", "applications"]
                        }
                    }
                },
                "technology": {
                    "name": "Technology & Computing",
                    "icon": "💻",
                    "color": "#F97316",
                    "difficulties": {
                        "beginner": {
                            "name": "User",
                            "timeLimit": 120,
                            "textBlock": "Computer users interact with software applications through keyboards, mice, and touchscreen interfaces. They save important data files on hard drives, solid state drives, and cloud storage systems. Web browsers provide access to internet websites and various online applications. Programming involves writing code in popular languages like python, javascript, and java. Mobile developers create smartphone apps for android and ios platforms. Computer networks connect different systems and enable global communication through the internet.",
                            "words": ["computer", "software", "application", "keyboard", "mouse", "touchscreen", "data", "file", "storage", "browser", "website", "code", "python", "javascript", "mobile"]
                        },
                        "intermediate": {
                            "name": "Developer",
                            "timeLimit": 100, 
                            "textBlock": "Software developers design algorithms and implement database systems for complex applications. They utilize frameworks, libraries, and integrated development environments to streamline programming workflows. Version control systems like git help teams collaborate on large codebases effectively. Web developers create responsive websites using html, css, and modern javascript frameworks. Backend engineers build scalable server architectures and application programming interfaces. Quality assurance teams perform extensive testing to ensure software reliability and performance optimization.",
                            "words": ["algorithm", "database", "framework", "library", "development", "version", "control", "collaborate", "responsive", "html", "css", "backend", "scalable", "server", "optimization"]
                        },
                        "advanced": {
                            "name": "Architect",
                            "timeLimit": 80,
                            "textBlock": "System architects design distributed microservices using containerization technologies like docker and kubernetes orchestration platforms. They implement load balancing, fault tolerance, and horizontal scaling strategies for high-availability systems. DevOps engineers automate deployment pipelines and infrastructure provisioning through configuration management tools. Machine learning engineers develop artificial intelligence models using deep learning frameworks and neural networks. Cybersecurity specialists implement encryption protocols and authentication mechanisms to protect sensitive data and prevent unauthorized access.",
                            "words": ["microservices", "containerization", "kubernetes", "orchestration", "balancing", "tolerance", "scaling", "devops", "deployment", "infrastructure", "learning", "intelligence", "networks", "cybersecurity", "encryption"]
                        }
                    }
                },
                "literature": {
                    "name": "Literature & Arts",
                    "icon": "📚",
                    "color": "#3B82F6",
                    "difficulties": {
                        "beginner": {
                            "name": "Reader",
                            "timeLimit": 120,
                            "textBlock": "Authors write engaging stories and novels featuring memorable characters and intricate plots. Readers enjoy poetry that explores human emotions through beautiful language and imagery. Classic literature includes works by shakespeare, dickens, and other renowned writers. Book clubs discuss themes, symbolism, and literary techniques used by various authors. Libraries contain vast collections of fiction and non-fiction books across multiple genres. Creative writing workshops help aspiring writers develop their storytelling skills and narrative techniques.",
                            "words": ["author", "story", "novel", "character", "plot", "poetry", "emotion", "imagery", "literature", "shakespeare", "theme", "symbolism", "fiction", "genre", "narrative"]
                        },
                        "intermediate": {
                            "name": "Scholar",
                            "timeLimit": 100,
                            "textBlock": "Literary criticism analyzes texts through various theoretical frameworks including feminist, marxist, and postcolonial perspectives. Renaissance writers like shakespeare created masterpiece tragedies and comedies that explore universal human experiences. Romantic poets emphasized emotion, nature, and individual expression in their revolutionary works. Modernist authors experimented with stream-of-consciousness techniques and fragmented narrative structures. Contemporary literature reflects current social issues and cultural diversity through innovative storytelling approaches and multimedia integration.",
                            "words": ["criticism", "theoretical", "framework", "feminist", "marxist", "postcolonial", "renaissance", "masterpiece", "tragedy", "romantic", "modernist", "consciousness", "fragmented", "contemporary", "multimedia"]
                        },
                        "advanced": {
                            "name": "Critic",
                            "timeLimit": 80,
                            "textBlock": "Postmodern literary theory deconstructs traditional narratives through intertextuality and metafictional techniques. Comparative literature examines cross-cultural influences and translation studies across different linguistic traditions. Digital humanities utilizes computational methods to analyze large literary corpora and identify patterns in textual data. Ecocriticism explores relationships between literature and environmental consciousness in contemporary ecological discourse. Psychoanalytic criticism applies freudian and lacanian theories to understand unconscious motivations in literary characters and authorial intentions.",
                            "words": ["postmodern", "deconstruct", "intertextuality", "metafictional", "comparative", "cultural", "translation", "linguistic", "computational", "corpora", "ecocriticism", "ecological", "psychoanalytic", "unconscious", "authorial"]
                        }
                    }
                },
                "history": {
                    "name": "History & Culture", 
                    "icon": "🏛️",
                    "color": "#EF4444",
                    "difficulties": {
                        "beginner": {
                            "name": "Student",
                            "timeLimit": 120,
                            "textBlock": "Ancient civilizations built magnificent pyramids, temples, and monuments that survive today. Powerful kings and queens ruled vast empires from fortified castles and palaces. Medieval warriors fought epic battles using swords, shields, and other weapons of war. Trade routes connected distant cultures and facilitated exchange of goods, ideas, and technologies. Archaeological discoveries reveal fascinating details about daily life in historical societies. Museums preserve important artifacts and cultural treasures from different time periods around the world.",
                            "words": ["civilization", "pyramid", "temple", "monument", "king", "queen", "empire", "castle", "warrior", "battle", "sword", "shield", "trade", "archaeological", "artifact"]
                        },
                        "intermediate": {
                            "name": "Historian",
                            "timeLimit": 100,
                            "textBlock": "The industrial revolution transformed society through mechanization and urbanization processes. Steam engines powered factories and railroad transportation systems across continents. Democratic movements challenged absolute monarchies and established constitutional governments. Colonial expansion spread european influence while indigenous populations faced displacement and cultural suppression. Technological innovations including the telegraph and photography revolutionized communication and documentation. Social reforms addressed labor conditions, education access, and women's rights in developing nations.",
                            "words": ["industrial", "revolution", "mechanization", "urbanization", "steam", "railroad", "democratic", "constitutional", "colonial", "indigenous", "technological", "telegraph", "photography", "reforms", "women"]
                        },
                        "advanced": {
                            "name": "Professor",
                            "timeLimit": 80,
                            "textBlock": "Historiography examines how historical interpretations evolve through archaeological evidence and primary source analysis. Socioeconomic factors including class struggle and economic inequality shaped political revolutions and social movements. Cultural anthropology studies belief systems, rituals, and traditions within specific historical contexts. Interdisciplinary approaches combine archaeological, linguistic, and genetic research to understand human migration patterns. Postcolonial studies analyze the lasting impact of imperialism on contemporary global politics and cultural identity formation.",
                            "words": ["historiography", "interpretations", "archaeological", "socioeconomic", "inequality", "anthropology", "belief", "rituals", "interdisciplinary", "linguistic", "migration", "postcolonial", "imperialism", "contemporary", "identity"]
                        }
                    }
                },
                "geography": {
                    "name": "Geography & Nature",
                    "icon": "🌍", 
                    "color": "#10B981",
                    "difficulties": {
                        "beginner": {
                            "name": "Explorer",
                            "timeLimit": 120,
                            "textBlock": "Explorers climb tall mountains and cross rushing rivers to discover new territories. Vast oceans surround continents and isolated islands with unique ecosystems. Dense forests contain diverse wildlife including mammals, birds, and countless insect species. Arid deserts feature sand dunes and specialized plant adaptations for water conservation. Freshwater lakes provide essential resources for surrounding communities and agricultural development. Climate variations create different environments from tropical rainforests to arctic tundra regions worldwide.",
                            "words": ["mountain", "river", "territory", "ocean", "continent", "island", "ecosystem", "forest", "wildlife", "mammal", "desert", "dunes", "lake", "climate", "tropical"]
                        },
                        "intermediate": {
                            "name": "Cartographer", 
                            "timeLimit": 100,
                            "textBlock": "Cartographers create detailed topographical maps showing elevation changes through contour lines and coordinate systems. Meteorologists study atmospheric pressure, temperature patterns, and precipitation cycles affecting regional climates. Geological surveys examine rock formations, mineral deposits, and tectonic plate movements causing earthquakes. Hydrological systems include watersheds, groundwater aquifers, and river basin management for sustainable development. Urban planners analyze population density, transportation networks, and infrastructure development in metropolitan areas.",
                            "words": ["topographical", "elevation", "contour", "coordinate", "meteorologist", "atmospheric", "precipitation", "geological", "mineral", "tectonic", "hydrological", "watershed", "aquifer", "urban", "metropolitan"]
                        },
                        "advanced": {
                            "name": "Geologist",
                            "timeLimit": 80,
                            "textBlock": "Geomorphological processes shape landscapes through weathering, erosion, and sedimentary deposition over geological timescales. Biogeographical distribution patterns reflect evolutionary adaptations and historical migration events across continental barriers. Climatology investigates paleoclimate records preserved in ice cores, tree rings, and sedimentary layers. Environmental geography examines human-environment interactions including deforestation, desertification, and biodiversity conservation efforts. Geospatial analysis utilizes satellite imagery and geographic information systems for natural resource management and disaster preparedness.",
                            "words": ["geomorphological", "weathering", "sedimentary", "deposition", "biogeographical", "evolutionary", "climatology", "paleoclimate", "environmental", "deforestation", "desertification", "biodiversity", "geospatial", "satellite", "preparedness"]
                        }
                    }
                }
            },
            "achievements": [
                {"id": "first_word", "name": "First Discovery", "desc": "Find your first word", "icon": "🎯", "points": 100},
                {"id": "speed_demon", "name": "Speed Demon", "desc": "Find 10 words in under 30 seconds", "icon": "⚡", "points": 500},
                {"id": "algorithm_master", "name": "Algorithm Master", "desc": "Compare all algorithm types", "icon": "🧠", "points": 1000},
                {"id": "category_expert", "name": "Category Expert", "desc": "Complete all levels in one category", "icon": "👑", "points": 2000},
                {"id": "perfect_game", "name": "Perfectionist", "desc": "Complete a game with 100% accuracy", "icon": "💎", "points": 1500}
            ],
            "algorithms": {
                "horspool": {"name": "Horspool", "color": "#7C3AED", "efficiency": "O(mn)", "description": "Simplified Boyer-Moore with single bad character heuristic"},
                "boyermoore": {"name": "Boyer-Moore", "color": "#F97316", "efficiency": "O(n/m)", "description": "Advanced pattern matching with two heuristics"}, 
                "kmp": {"name": "KMP", "color": "#3B82F6", "efficiency": "O(n+m)", "description": "Knuth-Morris-Pratt with failure function"},
                "naive": {"name": "Naive", "color": "#EF4444", "efficiency": "O(nm)", "description": "Simple character-by-character comparison"}
            }
        };

        // Initialize the game directly (no loading)
        this.init();
    }

    init() {
        // Load saved game state
        this.loadGameState();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Start directly with splash screen - FIXED: Use correct screen name
        this.showScreen('splashScreen');
    }

    // Proper word scrambling algorithm (not just reversal)
    scrambleWord(word) {
        if (word.length < 3) return word;
        
        const letters = word.toLowerCase().split('');
        let scrambled;
        let attempts = 0;
        const maxAttempts = 50;
        
        do {
            scrambled = [...letters].sort(() => Math.random() - 0.5).join('');
            attempts++;
        } while (
            (scrambled === word.toLowerCase() || 
             scrambled === word.split('').reverse().join('')) && 
            attempts < maxAttempts
        );
        
        return scrambled;
    }

    setupEventListeners() {
        // Splash screen - FIXED: Make sure button works
        const enterGameBtn = document.getElementById('enterGameBtn');
        if (enterGameBtn) {
            enterGameBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Enter game button clicked!');
                this.showScreen('mainMenu');
            });
        }

        // Main menu mode selection
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                this.selectGameMode(mode);
            });
        });

        // Category selection back button
        const backToMenu = document.getElementById('backToMenu');
        if (backToMenu) {
            backToMenu.addEventListener('click', () => this.showScreen('mainMenu'));
        }

        // Start game button
        const startGameBtn = document.getElementById('startGameBtn');
        if (startGameBtn) {
            startGameBtn.addEventListener('click', () => this.startGame());
        }

        // Game play controls
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        if (searchInput && searchBtn) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.submitWord();
            });
            searchBtn.addEventListener('click', () => this.submitWord());
        }

        // Results screen
        const playAgainBtn = document.getElementById('playAgainBtn');
        const mainMenuBtn = document.getElementById('mainMenuBtn');
        if (playAgainBtn) {
            playAgainBtn.addEventListener('click', () => this.playAgain());
        }
        if (mainMenuBtn) {
            mainMenuBtn.addEventListener('click', () => this.showScreen('mainMenu'));
        }

        // Back to categories
        const backToCategories = document.getElementById('backToCategories');
        if (backToCategories) {
            backToCategories.addEventListener('click', () => this.showScreen('categorySelect'));
        }

        // Hint button
        const hintBtn = document.getElementById('hintBtn');
        if (hintBtn) {
            hintBtn.addEventListener('click', () => this.useHint());
        }
    }

    showScreen(screenName) {
        console.log(`Showing screen: ${screenName}`);
        
        // Hide all screens
        const screens = ['splashScreen', 'mainMenu', 'categorySelect', 'gamePlay', 'resultsScreen'];
        screens.forEach(screen => {
            const element = document.getElementById(screen);
            if (element) {
                element.classList.add('hidden');
                console.log(`Hiding ${screen}`);
            }
        });

        // Show current screen
        this.currentScreen = screenName;
        
        const targetElement = document.getElementById(screenName);
        if (targetElement) {
            targetElement.classList.remove('hidden');
            console.log(`Showing ${screenName}`);
        } else {
            console.error(`Element with id ${screenName} not found!`);
        }

        // Initialize screen-specific content
        if (screenName === 'mainMenu') {
            this.initMainMenu();
        } else if (screenName === 'categorySelect') {
            this.initCategorySelect();
        }
    }

    initMainMenu() {
        // Update player stats
        this.updateElement('playerLevel', this.gameState.playerLevel);
        this.updateElement('playerXP', this.gameState.playerXP);
        this.updateElement('achievementCount', `${this.gameState.achievements.length}/5`);
        this.updateElement('totalGames', this.gameState.totalGames);
        this.updateElement('bestScore', this.gameState.bestScore);
        this.updateElement('totalWords', this.gameState.totalWords);
    }

    initCategorySelect() {
        const categoryGrid = document.getElementById('categoryGrid');
        if (!categoryGrid) return;

        categoryGrid.innerHTML = '';
        
        Object.entries(this.gameData.categories).forEach(([key, category]) => {
            const isUnlocked = this.gameState.unlockedCategories.includes(key);
            const card = document.createElement('div');
            card.className = `category-card ${!isUnlocked ? 'locked' : ''}`;
            card.dataset.category = key;
            
            card.innerHTML = `
                <div class="category-header">
                    <span class="category-icon">${category.icon}</span>
                    <h3 class="category-name">${category.name}</h3>
                </div>
                <p class="category-description">${category.difficulties.beginner.textBlock.substring(0, 150)}...</p>
                ${!isUnlocked ? '<div class="lock-overlay">🔒 Complete previous categories to unlock</div>' : ''}
            `;

            if (isUnlocked) {
                card.addEventListener('click', () => this.selectCategory(key));
            }

            categoryGrid.appendChild(card);
        });

        // Initialize difficulty and algorithm options
        this.initDifficultyOptions();
        this.initAlgorithmOptions();
    }

    initDifficultyOptions() {
        const container = document.getElementById('difficultyOptions');
        if (!container) return;

        const difficulties = ['beginner', 'intermediate', 'advanced'];
        container.innerHTML = '';

        difficulties.forEach(diff => {
            const option = document.createElement('div');
            option.className = 'difficulty-option';
            option.dataset.difficulty = diff;
            option.textContent = diff.charAt(0).toUpperCase() + diff.slice(1);
            
            option.addEventListener('click', () => this.selectDifficulty(diff));
            container.appendChild(option);
        });
    }

    initAlgorithmOptions() {
        const container = document.getElementById('algorithmOptions');
        if (!container) return;

        container.innerHTML = '';

        Object.entries(this.gameData.algorithms).forEach(([key, algorithm]) => {
            const option = document.createElement('div');
            option.className = 'algorithm-option';
            option.dataset.algorithm = key;
            option.innerHTML = `
                <strong>${algorithm.name}</strong><br>
                <small>${algorithm.description}</small>
            `;
            
            option.addEventListener('click', () => this.selectAlgorithm(key));
            container.appendChild(option);
        });

        // Select default algorithm
        this.selectAlgorithm('horspool');
    }

    selectGameMode(mode) {
        this.gameState.selectedMode = mode;
        
        if (mode === 'classic') {
            this.showScreen('categorySelect');
        } else {
            this.showNotification('Coming soon! Classic mode is available now.', 'info');
        }
    }

    selectCategory(categoryKey) {
        // Remove previous selection
        document.querySelectorAll('.category-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Select new category
        const card = document.querySelector(`[data-category="${categoryKey}"]`);
        if (card) card.classList.add('selected');
        
        this.gameState.selectedCategory = categoryKey;
        this.updateStartButton();
    }

    selectDifficulty(difficulty) {
        document.querySelectorAll('.difficulty-option').forEach(option => {
            option.classList.remove('selected');
        });

        const option = document.querySelector(`[data-difficulty="${difficulty}"]`);
        if (option) option.classList.add('selected');
        
        this.gameState.selectedDifficulty = difficulty;
        this.updateStartButton();
    }

    selectAlgorithm(algorithm) {
        document.querySelectorAll('.algorithm-option').forEach(option => {
            option.classList.remove('selected');
        });

        const option = document.querySelector(`[data-algorithm="${algorithm}"]`);
        if (option) option.classList.add('selected');
        
        this.gameState.selectedAlgorithm = algorithm;
        this.updateStartButton();
    }

    updateStartButton() {
        const startBtn = document.getElementById('startGameBtn');
        if (!startBtn) return;

        const isReady = this.gameState.selectedCategory && 
                       this.gameState.selectedDifficulty && 
                       this.gameState.selectedAlgorithm;
        
        startBtn.disabled = !isReady;
    }

    startGame() {
        if (!this.gameState.selectedCategory || !this.gameState.selectedDifficulty) {
            this.showNotification('Please select a category and difficulty first!', 'error');
            return;
        }

        const categoryData = this.gameData.categories[this.gameState.selectedCategory];
        const difficultyData = categoryData.difficulties[this.gameState.selectedDifficulty];

        // Generate scrambled words using proper scrambling algorithm
        const scrambledWords = difficultyData.words.map(word => this.scrambleWord(word));

        console.log('=== GAME START DEBUG ===');
        console.log('Text:', difficultyData.textBlock);
        console.log('Words to find:', difficultyData.words);
        console.log('Scrambled words:', scrambledWords);

        this.gameState.currentGame = {
            category: this.gameState.selectedCategory,
            difficulty: this.gameState.selectedDifficulty,
            algorithm: this.gameState.selectedAlgorithm,
            textBlock: difficultyData.textBlock,
            words: difficultyData.words,
            scrambledWords: scrambledWords,
            wordsFound: [],
            scrambledFound: [],
            timeLimit: difficultyData.timeLimit,
            timeRemaining: difficultyData.timeLimit,
            score: 0,
            comparisons: 0,
            hintsUsed: 0,
            hintsRemaining: 3,
            gameStartTime: Date.now()
        };

        this.showScreen('gamePlay');
        this.initGamePlay();
    }

    initGamePlay() {
        const game = this.gameState.currentGame;
        const categoryData = this.gameData.categories[game.category];
        
        // Update header info
        this.updateElement('gameCategory', categoryData.name);
        this.updateElement('gameDifficulty', game.difficulty);
        this.updateElement('currentScore', game.score);
        this.updateElement('gameTimer', game.timeRemaining);
        this.updateElement('wordsRemaining', game.words.length);

        // Display game text
        this.updateElement('gameText', game.textBlock);

        // Display scrambled words
        this.displayScrambledWords();

        // Update algorithm display
        const algorithmData = this.gameData.algorithms[game.algorithm];
        this.updateElement('currentAlgorithm', `${algorithmData.name} Algorithm`);

        // Start timer
        this.startGameTimer();

        // Focus on search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
            searchInput.value = '';
        }

        // Reset metrics
        this.updateElement('comparisons', 0);
        this.updateElement('searchTime', 0);
        this.updateElement('efficiency', '--');
        this.clearVisualization();

        // Update hint counter
        const hintCounter = document.querySelector('.hint-counter');
        if (hintCounter) {
            hintCounter.textContent = `${game.hintsRemaining} hints remaining`;
        }
    }

    displayScrambledWords() {
        const container = document.getElementById('scrambledWordsList');
        if (!container) return;

        container.innerHTML = '';
        const game = this.gameState.currentGame;
        
        game.scrambledWords.forEach((scrambled, index) => {
            const found = game.scrambledFound.includes(index);
            
            const wordElement = document.createElement('div');
            wordElement.className = `scrambled-word ${found ? 'found' : ''}`;
            wordElement.textContent = scrambled;
            wordElement.dataset.index = index;
            
            if (!found) {
                wordElement.addEventListener('click', () => this.fillSearchInput(scrambled));
            }
            
            container.appendChild(wordElement);
        });
    }

    fillSearchInput(scrambled) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = scrambled;
            searchInput.focus();
        }
    }

    startGameTimer() {
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
        }

        this.gameTimer = setInterval(() => {
            this.gameState.currentGame.timeRemaining--;
            this.updateElement('gameTimer', this.gameState.currentGame.timeRemaining);
            
            const timerElement = document.getElementById('gameTimer');
            if (this.gameState.currentGame.timeRemaining <= 10 && timerElement) {
                timerElement.classList.add('warning');
            }
            
            if (this.gameState.currentGame.timeRemaining <= 0) {
                this.endGame('timeUp');
            }
        }, 1000);
    }

    submitWord() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;

        const inputWord = searchInput.value.trim().toLowerCase();
        if (!inputWord) {
            this.showNotification('Please enter a word!', 'error');
            return;
        }

        const game = this.gameState.currentGame;
        
        console.log('=== SEARCH DEBUG ===');
        console.log('Input word:', inputWord);
        console.log('Available words:', game.words);
        console.log('Words found so far:', game.wordsFound);
        
        // Find the word in remaining words (case-insensitive)
        const wordIndex = game.words.findIndex((word, index) => {
            const isMatch = word.toLowerCase() === inputWord;
            const alreadyFound = game.wordsFound.includes(index);
            console.log(`Checking "${word.toLowerCase()}" vs "${inputWord}": match=${isMatch}, found=${alreadyFound}`);
            return isMatch && !alreadyFound;
        });
        
        console.log('Word index found:', wordIndex);
        
        if (wordIndex === -1) {
            // Check if word was already found
            const alreadyFoundIndex = game.words.findIndex((word, index) => {
                return word.toLowerCase() === inputWord && game.wordsFound.includes(index);
            });
            
            if (alreadyFoundIndex !== -1) {
                this.showNotification('Word already found!', 'error');
            } else {
                this.showNotification('Word not found in the word list!', 'error');
            }
            searchInput.value = '';
            return;
        }

        // Perform search in text to verify word actually exists
        const startTime = performance.now();
        const result = this.performSearch(game.textBlock.toLowerCase(), inputWord, game.algorithm);
        const endTime = performance.now();

        console.log('Search result:', result);
        console.log('===================');

        // Update metrics
        game.comparisons += result.comparisons;
        this.updateElement('comparisons', game.comparisons);
        this.updateElement('searchTime', (endTime - startTime).toFixed(2));

        if (result.found) {
            this.foundWord(wordIndex, result.position, inputWord);
            
            // Calculate efficiency
            const naiveResult = this.naiveSearch(game.textBlock.toLowerCase(), inputWord);
            const efficiency = naiveResult.comparisons > 0 ? 
                Math.round((1 - result.comparisons / naiveResult.comparisons) * 100) : 0;
            this.updateElement('efficiency', `${Math.max(0, efficiency)}%`);
            
        } else {
            this.showNotification('Word not found in text!', 'error');
        }

        searchInput.value = '';
    }

    foundWord(wordIndex, position, word) {
        const game = this.gameState.currentGame;
        
        // Mark word as found
        game.wordsFound.push(wordIndex);
        game.scrambledFound.push(wordIndex);
        
        // Calculate score
        const baseScore = word.length * 10;
        const timeBonus = Math.floor(game.timeRemaining / 2);
        const difficultyMultiplier = game.difficulty === 'beginner' ? 1 : 
                                   game.difficulty === 'intermediate' ? 1.5 : 2;
        const totalScore = Math.floor((baseScore + timeBonus) * difficultyMultiplier);
        
        game.score += totalScore;
        
        // Update display
        this.updateElement('currentScore', game.score);
        this.updateElement('wordsRemaining', game.words.length - game.wordsFound.length);
        
        // Highlight word in text
        this.highlightWordInText(word, position);
        
        // Update scrambled words display
        this.displayScrambledWords();
        
        // Show success notification
        this.showNotification(`Found "${word}"! +${totalScore} points`, 'success');
        
        // Create particle effect
        this.createParticleEffect();
        
        // Check for achievements
        this.checkAchievements();
        
        // Check win condition
        if (game.wordsFound.length === game.words.length) {
            setTimeout(() => this.endGame('completed'), 1000);
        }
    }

    highlightWordInText(word, position) {
        const textElement = document.getElementById('gameText');
        if (!textElement) return;

        const text = this.gameState.currentGame.textBlock;
        const beforeText = text.substring(0, position);
        const wordText = text.substring(position, position + word.length);
        const afterText = text.substring(position + word.length);

        textElement.innerHTML = beforeText + 
            `<span class="highlight">${wordText}</span>` + 
            afterText;
    }

    // Search algorithms
    performSearch(text, pattern, algorithm) {
        switch (algorithm) {
            case 'horspool':
                return this.horspoolSearch(text, pattern);
            case 'boyermoore':
                return this.boyerMooreSearch(text, pattern);
            case 'kmp':
                return this.kmpSearch(text, pattern);
            case 'naive':
            default:
                return this.naiveSearch(text, pattern);
        }
    }

    horspoolSearch(text, pattern) {
        const result = { found: false, position: -1, comparisons: 0 };
        
        if (pattern.length === 0 || pattern.length > text.length) return result;

        // Build shift table
        const shiftTable = {};
        for (let i = 0; i < pattern.length - 1; i++) {
            shiftTable[pattern[i]] = pattern.length - 1 - i;
        }

        let pos = 0;
        while (pos <= text.length - pattern.length) {
            let i = pattern.length - 1;
            
            // Compare from right to left
            while (i >= 0 && text[pos + i] === pattern[i]) {
                result.comparisons++;
                i--;
            }
            
            if (i < 0) {
                result.found = true;
                result.position = pos;
                this.visualizeSearch(text, pattern, pos, 'found');
                return result;
            }
            
            result.comparisons++;
            
            // Calculate shift
            const rightChar = text[pos + pattern.length - 1];
            const shift = shiftTable[rightChar] || pattern.length;
            pos += shift;
        }
        
        return result;
    }

    boyerMooreSearch(text, pattern) {
        // Simplified Boyer-Moore (using just bad character heuristic)
        return this.horspoolSearch(text, pattern);
    }

    kmpSearch(text, pattern) {
        const result = { found: false, position: -1, comparisons: 0 };
        
        if (pattern.length === 0 || pattern.length > text.length) return result;

        // Build failure function
        const failure = this.buildKMPFailure(pattern);
        
        let i = 0; // text index
        let j = 0; // pattern index
        
        while (i < text.length) {
            if (text[i] === pattern[j]) {
                result.comparisons++;
                i++;
                j++;
                
                if (j === pattern.length) {
                    result.found = true;
                    result.position = i - j;
                    return result;
                }
            } else {
                result.comparisons++;
                if (j > 0) {
                    j = failure[j - 1];
                } else {
                    i++;
                }
            }
        }
        
        return result;
    }

    buildKMPFailure(pattern) {
        const failure = new Array(pattern.length).fill(0);
        let i = 1;
        let j = 0;
        
        while (i < pattern.length) {
            if (pattern[i] === pattern[j]) {
                failure[i] = j + 1;
                i++;
                j++;
            } else if (j > 0) {
                j = failure[j - 1];
            } else {
                failure[i] = 0;
                i++;
            }
        }
        
        return failure;
    }

    naiveSearch(text, pattern) {
        const result = { found: false, position: -1, comparisons: 0 };
        
        for (let i = 0; i <= text.length - pattern.length; i++) {
            let j = 0;
            
            while (j < pattern.length && text[i + j] === pattern[j]) {
                result.comparisons++;
                j++;
            }
            
            if (j < pattern.length) {
                result.comparisons++;
            }
            
            if (j === pattern.length) {
                result.found = true;
                result.position = i;
                return result;
            }
        }
        
        return result;
    }

    visualizeSearch(text, pattern, position, state) {
        const visualText = document.getElementById('visualText');
        const visualPattern = document.getElementById('visualPattern');
        
        if (!visualText || !visualPattern) return;

        const startPos = Math.max(0, position - 10);
        const endPos = Math.min(text.length, position + pattern.length + 10);
        const segment = text.substring(startPos, endPos);
        const relativePos = position - startPos;

        // Visualize text
        let textHtml = '';
        for (let i = 0; i < segment.length; i++) {
            let className = 'char';
            if (state === 'found' && i >= relativePos && i < relativePos + pattern.length) {
                className += ' matching';
            }
            textHtml += `<span class="${className}">${segment[i]}</span>`;
        }

        // Visualize pattern
        const padding = ' '.repeat(Math.max(0, relativePos));
        let patternHtml = padding;
        for (let i = 0; i < pattern.length; i++) {
            let className = 'char';
            if (state === 'found') className += ' matching';
            patternHtml += `<span class="${className}">${pattern[i]}</span>`;
        }

        visualText.innerHTML = textHtml;
        visualPattern.innerHTML = patternHtml;
    }

    clearVisualization() {
        const visualText = document.getElementById('visualText');
        const visualPattern = document.getElementById('visualPattern');
        
        if (visualText) visualText.innerHTML = '';
        if (visualPattern) visualPattern.innerHTML = '';
    }

    useHint() {
        const game = this.gameState.currentGame;
        
        if (game.hintsRemaining <= 0) {
            this.showNotification('No hints remaining!', 'error');
            return;
        }

        game.hintsRemaining--;
        game.hintsUsed++;
        
        // Get a random unfound word
        const unfoundIndices = game.words.map((_, i) => i).filter(i => !game.wordsFound.includes(i));
        if (unfoundIndices.length === 0) return;
        
        const randomIndex = unfoundIndices[Math.floor(Math.random() * unfoundIndices.length)];
        const word = game.words[randomIndex];
        const scrambled = game.scrambledWords[randomIndex];
        
        this.showNotification(`Hint: "${scrambled}" unscrambles to a ${word.length}-letter word starting with "${word[0].toUpperCase()}"`, 'info');
        
        // Update hint counter
        const hintCounter = document.querySelector('.hint-counter');
        if (hintCounter) {
            hintCounter.textContent = `${game.hintsRemaining} hints remaining`;
        }
    }

    endGame(reason) {
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
        }

        const game = this.gameState.currentGame;
        const isCompleted = reason === 'completed';
        const isTimeUp = reason === 'timeUp';
        
        // Update game statistics
        this.gameState.totalGames++;
        this.gameState.totalWords += game.wordsFound.length;
        if (game.score > this.gameState.bestScore) {
            this.gameState.bestScore = game.score;
        }

        // Calculate final metrics
        const accuracy = Math.round((game.wordsFound.length / game.words.length) * 100);
        const timeBonus = Math.max(0, game.timeRemaining * 5);
        const finalScore = game.score + timeBonus;
        
        // Award XP
        const xpGained = Math.floor(finalScore / 10) + (isCompleted ? 50 : 0);
        this.gameState.playerXP += xpGained;
        
        // Check for level up
        const newLevel = Math.floor(this.gameState.playerXP / 1000) + 1;
        const leveledUp = newLevel > this.gameState.playerLevel;
        if (leveledUp) {
            this.gameState.playerLevel = newLevel;
        }

        // Save game state
        this.saveGameState();

        // Show results
        this.showResults({
            status: isCompleted ? 'Excellent Work!' : isTimeUp ? 'Time\'s Up!' : 'Good Try!',
            icon: isCompleted ? '🎉' : isTimeUp ? '⏰' : '👍',
            finalScore,
            wordsFound: game.wordsFound.length,
            totalWords: game.words.length,
            timeBonus,
            accuracy,
            xpGained,
            leveledUp
        });
    }

    showResults(results) {
        // Update result display
        this.updateElement('resultStatus', results.status);
        const statusIcon = document.querySelector('.status-icon');
        if (statusIcon) statusIcon.textContent = results.icon;

        this.updateElement('finalScore', results.finalScore);
        this.updateElement('finalWordsFound', `${results.wordsFound}/${results.totalWords}`);
        this.updateElement('timeBonus', `+${results.timeBonus}`);
        this.updateElement('accuracy', `${results.accuracy}%`);
        this.updateElement('xpGained', `+${results.xpGained}`);

        // Show achievements if any
        this.displayNewAchievements();

        // Show results screen
        this.showScreen('resultsScreen');

        // Show level up notification if applicable
        if (results.leveledUp) {
            setTimeout(() => {
                this.showNotification(`Level Up! You are now level ${this.gameState.playerLevel}!`, 'success');
            }, 500);
        }
    }

    checkAchievements() {
        const game = this.gameState.currentGame;
        const newAchievements = [];

        // First Discovery
        if (!this.gameState.achievements.includes('first_word') && game.wordsFound.length === 1) {
            this.gameState.achievements.push('first_word');
            newAchievements.push('first_word');
        }

        // Perfect Game
        if (!this.gameState.achievements.includes('perfect_game') && 
            game.wordsFound.length === game.words.length && game.hintsUsed === 0) {
            this.gameState.achievements.push('perfect_game');
            newAchievements.push('perfect_game');
        }

        // Show achievement popups
        newAchievements.forEach(achievementId => {
            const achievement = this.gameData.achievements.find(a => a.id === achievementId);
            if (achievement) {
                setTimeout(() => this.showAchievementPopup(achievement), 1000);
            }
        });
    }

    showAchievementPopup(achievement) {
        const popup = document.getElementById('achievementPopup');
        const title = popup.querySelector('.achievement-title');
        const description = popup.querySelector('.achievement-description');
        
        if (popup && title && description) {
            title.textContent = achievement.name;
            description.textContent = achievement.desc;
            popup.classList.remove('hidden');
            
            setTimeout(() => {
                popup.classList.add('hidden');
            }, 3000);
        }
    }

    displayNewAchievements() {
        const container = document.getElementById('newAchievements');
        if (!container) return;

        container.innerHTML = '';
        
        // Show recently earned achievements
        this.gameState.achievements.slice(-2).forEach(achievementId => {
            const achievement = this.gameData.achievements.find(a => a.id === achievementId);
            if (achievement) {
                const item = document.createElement('div');
                item.className = 'achievement-item';
                item.innerHTML = `${achievement.icon} ${achievement.name}`;
                container.appendChild(item);
            }
        });
    }

    playAgain() {
        this.startGame();
    }

    createParticleEffect() {
        const container = document.getElementById('particleContainer');
        if (!container) return;

        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = Math.random() * 100 + 'vh';
            
            container.appendChild(particle);
            
            setTimeout(() => {
                if (container.contains(particle)) {
                    container.removeChild(particle);
                }
            }, 3000);
        }
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notifications');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <p>${message}</p>
            </div>
        `;

        container.appendChild(notification);

        setTimeout(() => {
            if (container.contains(notification)) {
                container.removeChild(notification);
            }
        }, 4000);
    }

    updateElement(id, content) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = content;
        }
    }

    loadGameState() {
        try {
            const saved = localStorage.getItem('algorithmMasterSave');
            if (saved) {
                const data = JSON.parse(saved);
                this.gameState = { ...this.gameState, ...data };
            }
        } catch (e) {
            console.log('Could not load saved game state');
        }
    }

    saveGameState() {
        try {
            const saveData = {
                playerLevel: this.gameState.playerLevel,
                playerXP: this.gameState.playerXP,
                totalGames: this.gameState.totalGames,
                bestScore: this.gameState.bestScore,
                totalWords: this.gameState.totalWords,
                achievements: this.gameState.achievements,
                unlockedCategories: this.gameState.unlockedCategories
            };
            localStorage.setItem('algorithmMasterSave', JSON.stringify(saveData));
        } catch (e) {
            console.log('Could not save game state');
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AlgorithmMaster();
});

