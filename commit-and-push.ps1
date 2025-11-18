# PowerShell script to commit and push to GitHub
# Make sure Git is installed and you're authenticated

Write-Host "Checking Git installation..." -ForegroundColor Cyan
git --version

if ($LASTEXITCODE -ne 0) {
    Write-Host "Git is not installed or not in PATH. Please install Git first." -ForegroundColor Red
    exit 1
}

Write-Host "`nInitializing Git repository (if not already initialized)..." -ForegroundColor Cyan
if (-not (Test-Path .git)) {
    git init
}

Write-Host "`nAdding remote repository..." -ForegroundColor Cyan
git remote remove origin 2>$null
git remote add origin https://github.com/bugfree-kartik/kartik.codes.git

Write-Host "`nAdding all files..." -ForegroundColor Cyan
git add .

Write-Host "`nCommitting changes..." -ForegroundColor Cyan
git commit -m "Initial commit: Portfolio website with certifications, projects, and experience"

Write-Host "`nPushing to GitHub..." -ForegroundColor Cyan
Write-Host "Note: You may need to authenticate. If prompted, use a Personal Access Token." -ForegroundColor Yellow
git branch -M main
git push -u origin main

Write-Host "`nDone! Your code has been pushed to GitHub." -ForegroundColor Green

