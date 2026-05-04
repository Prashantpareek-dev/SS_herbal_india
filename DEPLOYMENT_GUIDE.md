# 🚀 GitHub Pages Deployment Guide

## ✅ What I Fixed

1. **Added base path** to `vite.config.js` for GitHub Pages
2. **Added CSP meta tag** to allow Google Fonts and external resources
3. **Created `.nojekyll` file** to prevent Jekyll processing
4. **Created GitHub Actions workflow** for automatic deployment
5. **Created deployment scripts** for manual deployment

---

## 📦 Deployment Methods

### **Method 1: Automatic Deployment with GitHub Actions (RECOMMENDED)**

This will auto-deploy whenever you push to the `main` branch.

#### Setup Steps:

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages in Repository Settings:**
   - Go to: `https://github.com/prashantpareek-dev/prashantpareek-dev.github.io/settings/pages`
   - Under **Source**, select: `GitHub Actions`
   - Save changes

3. **That's it!** Every push to `main` will automatically build and deploy.

---

### **Method 2: Manual Deployment with gh-pages Package**

#### One-Time Setup:
```cmd
npm install --save-dev gh-pages
```

#### Deploy:
```cmd
npm run deploy
```

This will:
- Build your project
- Create `.nojekyll` file
- Deploy to `gh-pages` branch
- Site will be live at: `https://prashantpareek-dev.github.io/`

---

### **Method 3: Manual Deployment with Git**

Use the provided `deploy.bat` script:

1. **Double-click:** `deploy.bat`
2. **Follow the instructions** in the terminal
3. **Run the git push command** shown

---

## 🌐 Your Live Site

After deployment, your site will be available at:
**https://prashantpareek-dev.github.io/**

---

## 🔧 Configuration Changes Made

### `vite.config.js`
- Added `base: '/'` for root path deployment

### `index.html`
- Added Content Security Policy meta tag to allow:
  - Google Fonts from `fonts.googleapis.com` and `fonts.gstatic.com`
  - Inline styles and scripts
  - External images

### `.github/workflows/deploy.yml`
- Automatic build and deployment workflow
- Triggers on push to `main` branch
- Builds with Node.js 20
- Uploads to GitHub Pages

### `package.json`
- Added `predeploy` script (builds + creates .nojekyll)
- Added `deploy` script (uses gh-pages package)

---

## 🐛 Troubleshooting

### "404 Not Found" Error
- **Cause:** Site not deployed yet or base path wrong
- **Fix:** Run deployment (Method 1, 2, or 3 above)

### "CSP Blocking Fonts" Error
- **Cause:** Strict Content Security Policy
- **Fix:** Already fixed! CSP meta tag added to `index.html`

### "PowerShell Error 80070002"
- **Cause:** Windows PowerShell issue
- **Fix:** Use CMD instead, or double-click `.bat` files

---

## 📝 Quick Deploy Commands

```cmd
# Build only
npm run build

# Build and preview locally
npm run build
npm run preview

# Deploy to GitHub Pages
npm run deploy

# Or use automatic deployment (push to GitHub)
git add .
git commit -m "Update site"
git push origin main
```

---

## ✨ Next Steps

1. **Choose a deployment method** (recommend Method 1 - GitHub Actions)
2. **Follow the setup steps** for your chosen method
3. **Wait 1-2 minutes** for GitHub Pages to build
4. **Visit:** https://prashantpareek-dev.github.io/

Your site is ready to go live! 🎉
