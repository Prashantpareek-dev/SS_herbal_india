@echo off
echo ====================================
echo  DEPLOY TO GITHUB PAGES
echo ====================================
echo.

REM Check if dist exists
if not exist dist (
    echo ERROR: dist folder not found!
    echo Please run rebuild.bat first to build the project.
    echo.
    pause
    exit /b 1
)

REM Check if gh-pages is installed
echo [1/3] Checking gh-pages package...
call npm list gh-pages >nul 2>&1
if errorlevel 1 (
    echo gh-pages not found. Installing...
    call npm install --save-dev gh-pages
    if errorlevel 1 (
        echo ERROR: Failed to install gh-pages
        pause
        exit /b 1
    )
)
echo Done!
echo.

REM Make sure .nojekyll exists
echo [2/3] Ensuring .nojekyll exists...
if not exist dist\.nojekyll type nul > dist\.nojekyll
echo Done!
echo.

REM Deploy
echo [3/3] Deploying to GitHub Pages...
echo This may take 1-2 minutes...
echo.
call npm run deploy
if errorlevel 1 (
    echo.
    echo ERROR: Deployment failed!
    echo.
    echo Alternative: Push to GitHub and use GitHub Actions
    echo    git add .
    echo    git commit -m "Deploy to GitHub Pages"
    echo    git push origin main
    echo.
    pause
    exit /b 1
)

echo.
echo ====================================
echo  DEPLOYMENT COMPLETE!
echo ====================================
echo.
echo Your site is deploying to:
echo https://prashantpareek-dev.github.io/
echo.
echo Wait 1-2 minutes, then check the URL.
echo.
echo ====================================

pause
