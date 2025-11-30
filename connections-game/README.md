# SOC Connections Game

A daily word connection puzzle game for students, similar to NYT Connections.

## Setup Instructions

### Option 1: GitHub Pages (Recommended)

1. **Create a new repository on GitHub:**
   - Go to github.com and click "New repository"
   - Name it something like `soc-connections` or `connections-game`
   - Make it Public
   - Don't add README, .gitignore, or license (we have our files)

2. **Upload these files:**
   - Click "uploading an existing file"
   - Drag and drop all 4 files:
     - `index.html`
     - `style.css`
     - `puzzle.js`
     - `game.js`
   - Click "Commit changes"

3. **Enable GitHub Pages:**
   - Go to repository Settings
   - Click "Pages" in the left sidebar
   - Under "Source", select "main" branch
   - Click Save
   - Your site will be live at: `https://yourusername.github.io/repository-name/`

### Option 2: Neocities (Even Easier)

1. Go to neocities.org and sign up (free)
2. Delete the default `index.html` 
3. Upload all 4 files
4. Your site is live at `https://yourusername.neocities.org`

## How to Update Daily Puzzles

### Easy Way (Using the Encoder Tool):

1. **Open `encoder.html` in your browser** (just double-click it)
2. **Fill in the form:**
   - Set the date
   - Enter category names and words for each group
   - Click "Encode Puzzle"
3. **Copy the encoded output**
4. **Paste it into `puzzle.js`** in the PUZZLES section
5. **Upload the updated `puzzle.js`** to your website

### Manual Way:

If you prefer to edit `puzzle.js` directly, the data is lightly encoded. The encoder tool makes this much easier!

## Features

- ✅ Mobile-friendly responsive design
- ✅ Shuffle button to rearrange words
- ✅ 4 mistakes allowed (just like NYT)
- ✅ "One away" hint when 3/4 correct
- ✅ Automatically shows today's puzzle
- ✅ Clean, professional interface
- ✅ No external dependencies - works offline!
- ✅ 🔐 Light encoding to prevent casual answer inspection

## Tips for Creating Good Puzzles

1. **Green (Easiest)**: Very obvious category once you see it
2. **Blue**: Clear but requires some thought
3. **Yellow**: Trickier, might overlap with other categories
4. **Purple (Hardest)**: Most abstract or specific connection

## Support

The game works entirely in the browser - no server needed!
Students just visit the URL and play.
