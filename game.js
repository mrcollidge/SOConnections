// Game state
let puzzle = null;
let allWords = [];
let selectedWords = [];
let solvedGroups = [];
let mistakes = 4;

// Initialize game
async function initGame() {
    // Load today's puzzle
    puzzle = await getTodaysPuzzle();
    
    // Flatten all words from groups
    allWords = puzzle.groups.flatMap(group => group.words);
    
    // Shuffle words
    shuffleArray(allWords);
    
    // Render grid
    renderGrid();
    
    // Update mistakes display
    updateMistakesDisplay();
}

// Shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Render the word grid
function renderGrid() {
    const grid = document.getElementById('game-grid');
    grid.innerHTML = '';
    
    allWords.forEach(word => {
        const button = document.createElement('button');
        button.className = 'word-button';
        button.textContent = word;
        button.onclick = () => toggleWord(word, button);
        grid.appendChild(button);
    });
}

// Toggle word selection
function toggleWord(word, button) {
    if (selectedWords.includes(word)) {
        selectedWords = selectedWords.filter(w => w !== word);
        button.classList.remove('selected');
    } else {
        if (selectedWords.length < 4) {
            selectedWords.push(word);
            button.classList.add('selected');
        }
    }
    
    updateSubmitButton();
}

// Update submit button state
function updateSubmitButton() {
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = selectedWords.length !== 4;
}

// Check if selected words form a valid group
function checkSubmission() {
    if (selectedWords.length !== 4) return;
    
    // Find matching group
    const matchingGroup = puzzle.groups.find(group => {
        return group.words.every(word => selectedWords.includes(word)) &&
               selectedWords.every(word => group.words.includes(word));
    });
    
    if (matchingGroup) {
        // Correct group!
        handleCorrectGuess(matchingGroup);
    } else {
        // Check if 3 out of 4 are correct
        const almostCorrect = puzzle.groups.find(group => {
            const matches = selectedWords.filter(word => group.words.includes(word));
            return matches.length === 3;
        });
        
        if (almostCorrect) {
            showMessage('One away...', 'error');
        } else {
            showMessage('Not quite! Try again.', 'error');
        }
        
        handleIncorrectGuess();
    }
}

// Handle correct guess
function handleCorrectGuess(group) {
    // Add to solved groups
    solvedGroups.push(group);
    
    // Remove words from grid
    allWords = allWords.filter(word => !group.words.includes(word));
    selectedWords = [];
    
    // Show completed group
    renderCompletedGroup(group);
    
    // Re-render grid
    renderGrid();
    
    // Check if won
    if (solvedGroups.length === 4) {
        showMessage('Congratulations! You solved it! 🎉', 'win');
        disableGame();
    } else {
        showMessage('Correct! 🎉', 'success');
    }
}

// Handle incorrect guess
function handleIncorrectGuess() {
    mistakes--;
    updateMistakesDisplay();
    
    // Deselect all
    deselectAll();
    
    if (mistakes === 0) {
        showMessage('Game Over! Better luck next time.', 'error');
        disableGame();
        revealAnswers();
    }
}

// Render completed group
function renderCompletedGroup(group) {
    const container = document.getElementById('completed-groups');
    const div = document.createElement('div');
    div.className = `completed-group ${group.color}`;
    
    const title = document.createElement('h3');
    title.textContent = group.category;
    
    const words = document.createElement('p');
    words.textContent = group.words.join(', ');
    
    div.appendChild(title);
    div.appendChild(words);
    container.appendChild(div);
}

// Show message
function showMessage(text, type) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
    
    if (type !== 'win') {
        setTimeout(() => {
            messageEl.textContent = '';
            messageEl.className = 'message';
        }, 2000);
    }
}

// Update mistakes display
function updateMistakesDisplay() {
    document.getElementById('mistakes-count').textContent = mistakes;
}

// Deselect all words
function deselectAll() {
    selectedWords = [];
    document.querySelectorAll('.word-button').forEach(btn => {
        btn.classList.remove('selected');
    });
    updateSubmitButton();
}

// Shuffle remaining words
function shuffleWords() {
    shuffleArray(allWords);
    renderGrid();
    deselectAll();
}

// Disable game after win/loss
function disableGame() {
    document.querySelectorAll('.word-button').forEach(btn => {
        btn.disabled = true;
    });
    document.getElementById('submit-btn').disabled = true;
    document.getElementById('shuffle-btn').disabled = true;
    document.getElementById('deselect-btn').disabled = true;
}

// Reveal answers on game over
function revealAnswers() {
    const remainingGroups = puzzle.groups.filter(g => !solvedGroups.includes(g));
    remainingGroups.forEach(group => {
        renderCompletedGroup(group);
    });
    
    // Clear grid
    document.getElementById('game-grid').innerHTML = '';
}

// Event listeners
document.getElementById('submit-btn').addEventListener('click', checkSubmission);
document.getElementById('shuffle-btn').addEventListener('click', shuffleWords);
document.getElementById('deselect-btn').addEventListener('click', deselectAll);

// Initialize game on load
initGame();
