// PUZZLE DATA LOADER
// Fetches puzzles from puzzles.json file (managed via admin panel)

// Simple decoding function
function decode(str) {
    return atob(str);
}

function decodePuzzle(encoded) {
    return {
        groups: encoded.groups.map(g => ({
            category: decode(g.cat),
            words: decode(g.wds).split(','),
            color: g.color,
            difficulty: g.difficulty
        }))
    };
}

// Get today's puzzle from puzzles.json
async function getTodaysPuzzle() {
    try {
        // Fetch puzzles from JSON file
        const response = await fetch('puzzles.json');
        
        if (!response.ok) {
            throw new Error('Could not load puzzles');
        }
        
        const PUZZLES = await response.json();
        const today = new Date().toISOString().split('T')[0];
        
        // If today's puzzle exists, decode and use it
        if (PUZZLES[today]) {
            return decodePuzzle(PUZZLES[today]);
        }
        
        // Otherwise, use the most recent puzzle
        const dates = Object.keys(PUZZLES).sort().reverse();
        if (dates.length > 0) {
            return decodePuzzle(PUZZLES[dates[0]]);
        }
        
        // If no puzzles exist, return a default puzzle
        return getDefaultPuzzle();
        
    } catch (error) {
        console.error('Error loading puzzle:', error);
        return getDefaultPuzzle();
    }
}

// Default puzzle (fallback)
function getDefaultPuzzle() {
    return {
        groups: [
            {
                category: 'Gemstones/Precious',
                words: ['RUBY', 'JADE', 'AMBER', 'GEMMA'],
                color: 'green',
                difficulty: 1
            },
            {
                category: 'Plants',
                words: ['LILY', 'ROSE', 'FERN', 'HAZEL'],
                color: 'blue',
                difficulty: 2
            },
            {
                category: 'Occupations',
                words: ['HUNTER', 'ARCHER', 'TAYLOR', 'FLETCHER'],
                color: 'yellow',
                difficulty: 3
            },
            {
                category: 'Places',
                words: ['ADELAIDE', 'DEVON', 'GEORGIA', 'JORDAN'],
                color: 'purple',
                difficulty: 4
            }
        ]
    };
}
