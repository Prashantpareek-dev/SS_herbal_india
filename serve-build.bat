@echo off
echo ====================================
echo  SS Herbal India - Production Preview
echo ====================================
echo.
echo Starting preview server...
echo Server will open at: http://localhost:4173
echo.
echo Press Ctrl+C to stop the server
echo ====================================
echo.

cd /d "%~dp0"
call npm run preview

pause
