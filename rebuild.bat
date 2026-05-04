@echo off
echo ====================================
echo  COMPLETE REBUILD - SS Herbal India
echo ====================================
echo.

REM Kill all node processes
echo [1/5] Stopping all Node processes...
taskkill /f /im node.exe 2>nul
timeout /t 2 /nobreak >nul
echo Done!
echo.

REM Clear all caches
echo [2/5] Clearing caches...
if exist node_modules\.vite rmdir /s /q node_modules\.vite
if exist dist rmdir /s /q dist
echo Done!
echo.

REM Force clean build
echo [3/5] Running clean build (this may take 30-60 seconds)...
call npm run build
if errorlevel 1 (
    echo.
    echo ERROR: Build failed! Check the output above.
    echo.
    pause
    exit /b 1
)
echo Done!
echo.

REM Create .nojekyll
echo [4/5] Creating .nojekyll file...
type nul > dist\.nojekyll
echo Done!
echo.

REM List what was built
echo [5/5] Verifying build...
echo.
echo Files in dist/assets:
dir /b dist\assets
echo.

echo ====================================
echo  BUILD COMPLETE!
echo ====================================
echo.
echo Next steps:
echo 1. Test locally: npm run preview
echo 2. Deploy to GitHub Pages: npm run deploy
echo.
echo OR push to GitHub to auto-deploy:
echo    git add .
echo    git commit -m "Rebuild with vendor chunks"
echo    git push origin main
echo.
echo ====================================

pause
