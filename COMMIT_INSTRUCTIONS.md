# Instructions to Commit and Push to GitHub

## Prerequisites
1. Make sure Git is installed on your system
   - Download from: https://git-scm.com/downloads
   - Or install via: `winget install Git.Git`

2. Make sure you're authenticated with GitHub
   - You can use GitHub CLI: `gh auth login`
   - Or use a Personal Access Token

## Option 1: Use the PowerShell Script (Recommended)

1. Open PowerShell in the project directory
2. Run: `.\commit-and-push.ps1`

## Option 2: Manual Commands

Run these commands in your terminal (PowerShell or Git Bash):

```bash
# Initialize git (if not already initialized)
git init

# Add remote repository
git remote add origin https://github.com/bugfree-kartik/kartik.codes.git

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Portfolio website with certifications, projects, and experience"

# Push to GitHub
git branch -M main
git push -u origin main
```

## If you encounter authentication issues:

1. Use GitHub CLI:
   ```bash
   gh auth login
   ```

2. Or use a Personal Access Token:
   - Go to GitHub Settings > Developer settings > Personal access tokens
   - Create a token with `repo` permissions
   - Use the token as password when prompted

## Note:
- The `.gitignore` file will exclude `node_modules`, `dist`, and other build artifacts
- Only source files will be committed

