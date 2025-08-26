# WET Irrigation Auto-Save Script
# Run this script to automatically save all changes to GitHub

# Navigate to project directory
Set-Location "c:\Users\Armand\Desktop\4th Year\Semester 2\Entrepreneurship\WET-Irrigation-Website"

# Add Git to PATH
$env:PATH = "C:\Program Files\Git\bin;$env:PATH"

Write-Host "Starting auto-save process..." -ForegroundColor Cyan

# Add all changes
Write-Host "Adding files..." -ForegroundColor Yellow
git add .

# Check if there are changes to commit
$status = git status --porcelain
if ($status) {
    # Commit with timestamp
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "Committing changes..." -ForegroundColor Yellow
    git commit -m "Auto-save: $timestamp"
    
    # Push to GitHub
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    git push
    
    Write-Host "Successfully saved to GitHub at $timestamp" -ForegroundColor Green
    Write-Host "View your website: https://armandorffer.github.io/wet-irrigation-website" -ForegroundColor Blue
} else {
    Write-Host "No changes detected - everything is already saved!" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
