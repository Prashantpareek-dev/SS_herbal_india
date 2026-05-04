@echo off
echo ====================================
echo  SS Herbal India - GitHub Pages Deploy
echo ====================================
echo.

REM Step 1: Build the project
echo [1/4] Building production files...
call npm run build
if errorlevel 1 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo Build complete!
echo.

REM Step 2: Create .nojekyll file
echo [2/4] Creating .nojekyll file...
type nul > dist\.nojekyll
echo .nojekyll file created!
echo.

REM Step 3: Initialize git in dist folder
echo [3/4] Preparing git repository...
cd dist
git init
git add -A
git commit -m "Deploy to GitHub Pages"
echo Git repository prepared!
echo.

REM Step 4: Push to GitHub Pages
echo [4/4] Deploying to GitHub Pages...
echo.
echo NEXT STEPS:
echo 1. Run this command to deploy:
echo    git push -f https://github.com/prashantpareek-dev/prashantpareek-dev.github.io.git main:gh-pages
echo.
echo 2. Or if you have the remote set up:
echo    git push -f origin main:gh-pages
echo.
echo ====================================

cd ..
pause
