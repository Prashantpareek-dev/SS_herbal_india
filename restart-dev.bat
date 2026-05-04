@echo off
echo ========================================
echo SS Herbal India - Dev Server Restart
echo ========================================
echo.

echo [1/4] Stopping all Node processes...
taskkill /f /im node.exe 2>nul
if %errorlevel% == 0 (
    echo Node processes stopped successfully!
) else (
    echo No running Node processes found.
)
echo.

echo [2/4] Cleaning Vite cache...
if exist "node_modules\.vite" (
    rmdir /s /q "node_modules\.vite"
    echo Vite cache cleared!
) else (
    echo No Vite cache to clear.
)
echo.

echo [3/4] Cleaning dist folder...
if exist "dist" (
    rmdir /s /q "dist"
    echo Dist folder cleared!
) else (
    echo No dist folder to clear.
)
echo.

echo [4/4] Starting development server...
echo ========================================
echo.
npm run dev

