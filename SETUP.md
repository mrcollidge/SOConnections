# 🎮 SOC Connections - Complete Setup Guide

## 📦 What's Included

- `index.html` - Public game page (students use this)
- `admin.html` - Admin panel (you use this to create puzzles)
- `admin.js` - Admin panel logic
- `style.css` - Game styling
- `game.js` - Game logic
- `puzzle.js` - Puzzle loader
- `puzzles.json` - Puzzle database (auto-updated by admin panel)

## 🚀 Quick Setup (GitHub Pages)

### Step 1: Upload to GitHub

1. Go to [github.com](https://github.com) and create a new repository
2. Name it something like `soc-connections`
3. Make it **Public**
4. Upload all 7 files above
5. Go to Settings → Pages
6. Select "main" branch as source
7. Save

Your game will be live at: `https://yourusername.github.io/soc-connections/`

### Step 2: Create GitHub Personal Access Token

1. Go to [GitHub Settings → Developer Settings → Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "SOC Connections Admin"
4. Expiration: Choose "No expiration" or set your preference
5. **Check the `repo` scope** (this is crucial!)
6. Click "Generate token"
7. **Copy the token** (starts with `ghp_`) - you won't see it again!

### Step 3: Configure Admin Panel

1. Go to `https://yourusername.github.io/soc-connections/admin.html`
2. Enter your:
   - GitHub Username: `yourusername`
   - Repository Name: `soc-connections` (or whatever you named it)
   - Branch Name: `main`
   - Personal Access Token: `ghp_xxxxxxxxxxxx` (paste your token)
3. Click "Save Configuration"

**Done!** Your configuration is saved in your browser.

## 📝 How to Create Daily Puzzles

1. Go to your admin panel: `yoursite.com/admin.html`
2. Select the date
3. Fill in 4 categories with 4 words each
4. Click "🚀 Publish Puzzle"
5. Done! The puzzle is now live on the public site

## 🔗 Share With Students

Give students this link:
```
https://yourusername.github.io/soc-connections/
```

Keep the admin link private:
```
https://yourusername.github.io/soc-connections/admin.html
```

## 🔐 Security Features

✅ Puzzle data is encoded (students can't easily see answers)
✅ Admin panel is just a URL - only you know it exists
✅ GitHub token is stored locally in your browser only
✅ Students can't access the admin panel without the token

## ⚙️ Advanced: Update Your Token

If you need to change your GitHub token:
1. Go to the admin panel
2. Click "⚙️ Change GitHub Configuration" at the bottom
3. Update your settings

## 🎯 Tips for Creating Good Puzzles

**Green (Easiest):** Very obvious once you see it
- Example: Gemstones (RUBY, JADE, AMBER, GEMMA)

**Blue:** Clear but requires thought
- Example: Plants (LILY, ROSE, FERN, HAZEL)

**Yellow:** Trickier, might overlap with other categories
- Example: Occupations (HUNTER, ARCHER, TAYLOR, FLETCHER)

**Purple (Hardest):** Most abstract or specific
- Example: Places (ADELAIDE, DEVON, GEORGIA, JORDAN)

## 🐛 Troubleshooting

**"Could not load puzzles"**
- Make sure `puzzles.json` is uploaded to your repository
- Check that the file is in the root folder (not in a subfolder)

**"Failed to publish puzzle"**
- Verify your GitHub token has `repo` scope
- Check that username, repo name, and branch are correct
- Make sure the repository is public

**Admin panel won't save**
- Clear your browser cache and try again
- Try a different browser

## 📱 Mobile Friendly

Both the game and admin panel work perfectly on phones and tablets!

## ❓ Need Help?

The admin panel shows detailed error messages if something goes wrong.
Check the browser console (F12) for technical details.

---

Enjoy your SOC Connections game! 🎉
