# Git Setup Guide for WET Irrigation Website

## 🎯 Complete Setup Instructions

### Step 1: Restart Terminal
After Git installation, **close this terminal and open a new one**, or restart VS Code.

### Step 2: Configure Git (First Time Only)
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 3: Initialize Git Repository
```powershell
cd "c:\Users\Armand\Desktop\4th Year\Semester 2\Entrepreneurship\WET-Irrigation-Website"
git init
```

### Step 4: Connect to Your GitHub Repository
```powershell
git remote add origin https://github.com/armandorffer/wet-irrigation-website.git
```

### Step 5: Add All Files and Make Initial Commit
```powershell
git add .
git commit -m "Initial commit: WET Irrigation website with team section"
git branch -M main
git push -u origin main
```

## 🔄 Daily Workflow - Auto-Save Commands

### Option A: Manual Commands (Run these whenever you want to save)
```powershell
# Add all changes
git add .

# Commit with a message
git commit -m "Updated website content"

# Push to GitHub
git push
```

### Option B: One-Line Auto-Save Command
```powershell
git add . && git commit -m "Auto-save: $(Get-Date -Format 'yyyy-MM-dd HH:mm')" && git push
```

## 🚀 VS Code Integration (Recommended)

### Enable Auto-Save in VS Code:
1. **File** → **Auto Save** (check this option)
2. **File** → **Preferences** → **Settings**
3. Search for "auto save"
4. Set **Auto Save** to "afterDelay"
5. Set **Auto Save Delay** to 1000ms (1 second)

### Use VS Code Git Integration:
1. **View** → **Source Control** (or Ctrl+Shift+G)
2. **Stage changes** (+ button next to files)
3. **Write commit message** in the text box
4. **Commit** (✓ button)
5. **Push** (sync button)

## 🔧 Advanced: PowerShell Auto-Save Script

Create this file as `auto-git.ps1`:
```powershell
# Navigate to project directory
Set-Location "c:\Users\Armand\Desktop\4th Year\Semester 2\Entrepreneurship\WET-Irrigation-Website"

# Add all changes
git add .

# Check if there are changes to commit
$status = git status --porcelain
if ($status) {
    # Commit with timestamp
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "Auto-save: $timestamp"
    
    # Push to GitHub
    git push
    Write-Host "✅ Changes saved to GitHub at $timestamp" -ForegroundColor Green
} else {
    Write-Host "ℹ️ No changes to commit" -ForegroundColor Yellow
}
```

**To run the script:**
```powershell
PowerShell -ExecutionPolicy Bypass -File auto-git.ps1
```

## 📱 GitHub Desktop Alternative (Easier Option)

If you prefer a visual interface:
1. Download **GitHub Desktop**: https://desktop.github.com/
2. **Clone** your repository: `https://github.com/armandorffer/wet-irrigation-website`
3. **Drag your files** into the cloned folder
4. GitHub Desktop will **auto-detect changes**
5. **Commit** and **push** with the GUI

## 🎯 Quick Start Checklist

- [ ] Restart terminal/VS Code after Git installation
- [ ] Configure Git with your name and email
- [ ] Initialize repository (`git init`)
- [ ] Connect to GitHub (`git remote add origin`)
- [ ] Make initial commit and push
- [ ] Set up auto-save workflow (VS Code or script)

## 🆘 Troubleshooting

### If you get authentication errors:
1. Go to GitHub → **Settings** → **Developer settings** → **Personal access tokens**
2. Generate a **new token** with repository permissions
3. Use the token as your password when Git asks for credentials

### If files are too large:
```powershell
# Add .gitignore file to exclude large files
echo "*.mp4" >> .gitignore
echo "*.mov" >> .gitignore
echo "node_modules/" >> .gitignore
```

## 🔗 Useful Links

- **Your Repository**: https://github.com/armandorffer/wet-irrigation-website
- **GitHub Desktop**: https://desktop.github.com/
- **Git Documentation**: https://git-scm.com/docs
- **VS Code Git Tutorial**: https://code.visualstudio.com/docs/sourcecontrol/intro-to-git

---
*Last updated: August 26, 2025*
