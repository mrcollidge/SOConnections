// Admin panel logic

// Encoding functions
function encode(str) {
    return btoa(str);
}

// Check if configuration exists
function checkConfig() {
    const config = localStorage.getItem('github-config');
    if (config) {
        document.getElementById('config-section').style.display = 'none';
        document.getElementById('puzzle-form').style.display = 'block';
        
        // Set today's date as default
        document.getElementById('puzzle-date').valueAsDate = new Date();
    } else {
        document.getElementById('config-section').style.display = 'block';
        document.getElementById('puzzle-form').style.display = 'none';
    }
}

// Save GitHub configuration
function saveConfig() {
    const username = document.getElementById('github-username').value.trim();
    const repo = document.getElementById('github-repo').value.trim();
    const branch = document.getElementById('github-branch').value.trim();
    const token = document.getElementById('github-token').value.trim();

    if (!username || !repo || !branch || !token) {
        showStatus('Please fill in all fields', 'error');
        return;
    }

    const config = { username, repo, branch, token };
    localStorage.setItem('github-config', JSON.stringify(config));
    
    showStatus('Configuration saved! You can now create puzzles.', 'success');
    
    setTimeout(() => {
        checkConfig();
    }, 1500);
}

// Toggle configuration section
function toggleConfig() {
    const configSection = document.getElementById('config-section');
    const puzzleForm = document.getElementById('puzzle-form');
    
    if (configSection.style.display === 'none') {
        // Load existing config
        const config = JSON.parse(localStorage.getItem('github-config'));
        if (config) {
            document.getElementById('github-username').value = config.username;
            document.getElementById('github-repo').value = config.repo;
            document.getElementById('github-branch').value = config.branch;
            document.getElementById('github-token').value = config.token;
        }
        
        configSection.style.display = 'block';
        puzzleForm.style.display = 'none';
    } else {
        configSection.style.display = 'none';
        puzzleForm.style.display = 'block';
    }
}

// Show status message
function showStatus(message, type) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = `status ${type} show`;
    
    setTimeout(() => {
        status.className = 'status';
    }, 5000);
}

// Encode puzzle data
function encodePuzzle(date, groups) {
    const colors = ['green', 'blue', 'yellow', 'purple'];
    
    const encodedGroups = groups.map((g, i) => ({
        cat: encode(g.category),
        wds: encode(g.words.join(',')),
        color: colors[i],
        difficulty: i + 1
    }));

    return {
        [date]: {
            groups: encodedGroups
        }
    };
}

// Publish puzzle to GitHub
async function publishPuzzle() {
    const config = JSON.parse(localStorage.getItem('github-config'));
    if (!config) {
        showStatus('Please configure GitHub settings first', 'error');
        return;
    }

    // Get form data
    const date = document.getElementById('puzzle-date').value;
    if (!date) {
        showStatus('Please select a date', 'error');
        return;
    }

    const groups = [];
    for (let i = 1; i <= 4; i++) {
        const category = document.getElementById('cat' + i).value.trim();
        const wordsInput = document.getElementById('words' + i).value.trim();
        
        if (!category || !wordsInput) {
            showStatus(`Please fill in all fields for Group ${i}`, 'error');
            return;
        }

        const words = wordsInput.split(',').map(w => w.trim().toUpperCase());
        
        if (words.length !== 4) {
            showStatus(`Group ${i} must have exactly 4 words`, 'error');
            return;
        }

        groups.push({ category, words });
    }

    // Disable publish button
    const publishBtn = document.getElementById('publish-btn');
    publishBtn.disabled = true;
    publishBtn.textContent = 'Publishing...';

    try {
        // Get current puzzles.json file
        showStatus('Fetching current puzzles...', 'info');
        
        const getUrl = `https://api.github.com/repos/${config.username}/${config.repo}/contents/puzzles.json?ref=${config.branch}`;
        const getResponse = await fetch(getUrl, {
            headers: {
                'Authorization': `token ${config.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        let currentPuzzles = {};
        let sha = null;

        if (getResponse.ok) {
            const data = await getResponse.json();
            sha = data.sha;
            const content = atob(data.content);
            try {
                currentPuzzles = JSON.parse(content);
            } catch (e) {
                console.log('No existing puzzles found, creating new file');
            }
        }

        // Add new puzzle
        const newPuzzle = encodePuzzle(date, groups);
        const updatedPuzzles = { ...currentPuzzles, ...newPuzzle };

        // Create file content
        const fileContent = JSON.stringify(updatedPuzzles, null, 2);
        const encodedContent = btoa(fileContent);

        // Update file on GitHub
        showStatus('Publishing to GitHub...', 'info');
        
        const updateUrl = `https://api.github.com/repos/${config.username}/${config.repo}/contents/puzzles.json`;
        const updateResponse = await fetch(updateUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${config.token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Add puzzle for ${date}`,
                content: encodedContent,
                sha: sha,
                branch: config.branch
            })
        });

        if (!updateResponse.ok) {
            const errorData = await updateResponse.json();
            throw new Error(errorData.message || 'Failed to publish puzzle');
        }

        showStatus('✅ Puzzle published successfully!', 'success');
        
        // Clear form
        for (let i = 1; i <= 4; i++) {
            document.getElementById('cat' + i).value = '';
            document.getElementById('words' + i).value = '';
        }
        
        // Reset date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.getElementById('puzzle-date').valueAsDate = tomorrow;

    } catch (error) {
        console.error('Error publishing puzzle:', error);
        showStatus(`Error: ${error.message}`, 'error');
    } finally {
        publishBtn.disabled = false;
        publishBtn.textContent = '🚀 Publish Puzzle';
    }
}

// Initialize on load
checkConfig();
