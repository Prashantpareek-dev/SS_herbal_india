@echo off
echo ====================================
echo  SS Herbal India - Clean Build
echo ====================================
echo.

REM Step 1: Stop any running processes
echo [1/4] Stopping Node processes...
taskkill /f /im node.exe 2>nul
echo Done!
echo.

REM Step 2: Clean old build
echo [2/4] Removing old build files...
if exist dist rmdir /s /q dist
if exist node_modules\.vite rmdir /s /q node_modules\.vite
echo Done!
echo.

REM Step 3: Build
echo [3/4] Building production files...
call npm run build
echo Done!
echo.

REM Step 4: Create .nojekyll
echo [4/4] Creating .nojekyll file...
type nul > dist\.nojekyll
echo Done!
echo.

echo ====================================
echo  Build Complete!
echo ====================================
echo.
echo Your production files are in the 'dist' folder
echo.
echo To preview locally:
echo   npm run preview
echo.
echo To deploy to GitHub Pages:
echo   npm run deploy
echo.
echo ====================================

pause
