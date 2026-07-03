# Ana's Cosmetics - Deployment Guide

## Quick Start

This is a **static website** - no backend, no build process, no dependencies. Simply upload the files to any web host.

## Deployment Options

### Option 1: GitHub Pages (Recommended - Free)

**Step 1: Create GitHub Repository**
- Go to https://github.com/new
- Repository name: `anas-cosmetics`
- Description: "Premium cosmetic e-commerce website"
- Choose Public
- Click "Create repository"

**Step 2: Upload Files**
```bash
git clone https://github.com/YOUR-USERNAME/anas-cosmetics.git
cd anas-cosmetics
# Copy all files from the project into this directory
git add .
git commit -m "Initial commit: Ana's Cosmetics website"
git push origin main
```

**Step 3: Enable GitHub Pages**
- Go to your repository on GitHub
- Click Settings → Pages
- Under "Build and deployment", select "Deploy from a branch"
- Select `main` branch
- Click Save

**Step 4: Access Your Site**
- Your site will be live at: `https://YOUR-USERNAME.github.io/anas-cosmetics`
- Wait 1-2 minutes for deployment

### Option 2: Netlify (Free with Git Integration)

**Step 1: Connect Repository**
- Go to https://netlify.com
- Click "Add new site" → "Import an existing project"
- Connect your GitHub account
- Select the `anas-cosmetics` repository

**Step 2: Configure Build**
- Leave build command empty (static site)
- Set publish directory to `.` (root)
- Click Deploy

**Step 3: Access Your Site**
- Netlify will provide a URL like: `https://anas-cosmetics-abc123.netlify.app`

### Option 3: Vercel (Free with Git Integration)

**Step 1: Import Project**
- Go to https://vercel.com
- Click "Add New..." → "Project"
- Import your GitHub repository

**Step 2: Deploy**
- Vercel auto-detects static site
- Click Deploy
- Your site is live at: `https://anas-cosmetics.vercel.app`

### Option 4: Traditional Web Hosting (FTP)

**Step 1: Upload Files**
- Connect via FTP using your hosting provider's credentials
- Upload all files to your public_html or www directory
- Maintain the folder structure (especially `assets/` folder)

**Step 2: Access Your Site**
- Your site will be available at your domain

### Option 5: AWS S3 + CloudFront

**Step 1: Create S3 Bucket**
```bash
aws s3 mb s3://anas-cosmetics
```

**Step 2: Upload Files**
```bash
aws s3 sync . s3://anas-cosmetics --exclude ".git/*"
```

**Step 3: Enable Static Website Hosting**
- Go to S3 bucket properties
- Enable "Static website hosting"
- Set index document to `index.html`
- Set error document to `index.html`

## Custom Domain Setup

### Using GitHub Pages with Custom Domain

**Step 1: Add DNS Records**
- Go to your domain registrar (GoDaddy, Namecheap, etc.)
- Add these DNS records:
  ```
  Type: A
  Name: @
  Value: 185.199.108.153
  
  Type: A
  Name: @
  Value: 185.199.109.153
  
  Type: A
  Name: @
  Value: 185.199.110.153
  
  Type: A
  Name: @
  Value: 185.199.111.153
  ```

**Step 2: Configure GitHub**
- Go to repository Settings → Pages
- Under "Custom domain", enter your domain
- Check "Enforce HTTPS"

### Using Netlify with Custom Domain

**Step 1: Add Domain**
- Go to Site settings → Domain management
- Click "Add custom domain"
- Enter your domain

**Step 2: Update DNS**
- Netlify will provide DNS records to add
- Add them to your domain registrar

## SSL/HTTPS

- **GitHub Pages**: Automatic HTTPS with GitHub's certificate
- **Netlify**: Automatic HTTPS with Let's Encrypt
- **Vercel**: Automatic HTTPS
- **Traditional Hosting**: May require SSL certificate (often free with Let's Encrypt)

## Performance Optimization

### Before Deployment

1. **Compress Images**
   - Use tools like TinyPNG or ImageOptim
   - Aim for <100KB per image

2. **Minify CSS/JS** (Optional)
   - Use online minifiers if desired
   - Current files are already optimized

3. **Test Locally**
   ```bash
   python -m http.server 8000
   # Visit http://localhost:8000
   ```

### After Deployment

1. **Enable Caching**
   - Set cache headers in your hosting provider
   - Static files can cache for 1 year

2. **Enable Gzip Compression**
   - Most hosting providers enable this automatically
   - Reduces file sizes by 70%

3. **Use CDN**
   - Netlify and Vercel include CDN
   - GitHub Pages uses Fastly CDN

## Monitoring & Analytics

### Add Google Analytics

Add this to the `<head>` of each HTML file:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Replace `GA_MEASUREMENT_ID` with your actual ID from Google Analytics.

### Monitor Performance

1. **Google Search Console**
   - Submit sitemap.xml
   - Monitor search performance
   - Fix any crawl errors

2. **Lighthouse**
   - Use Chrome DevTools → Lighthouse
   - Aim for scores >90 on all metrics

3. **PageSpeed Insights**
   - Go to https://pagespeed.web.dev
   - Enter your domain
   - Follow recommendations

## Maintenance

### Regular Updates

1. **Update Products**
   - Edit `assets/js/products.js`
   - Add/remove products as needed
   - Redeploy

2. **Update Content**
   - Edit HTML files directly
   - Commit and push changes
   - Changes deploy automatically

3. **Monitor Performance**
   - Check analytics monthly
   - Review customer feedback
   - Optimize based on data

### Backups

- GitHub automatically maintains version history
- Download backup: `git clone https://github.com/YOUR-USERNAME/anas-cosmetics.git`

## Troubleshooting

### Site Not Loading

1. **Check DNS Propagation**
   - Use https://dnschecker.org
   - Wait up to 48 hours for DNS to propagate

2. **Verify Files Uploaded**
   - Check that all files are in correct directories
   - Ensure index.html is in root directory

3. **Check Browser Cache**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Clear browser cache

### Styling Not Loading

1. **Check File Paths**
   - Ensure CSS files are in `assets/css/`
   - Verify paths in HTML files

2. **Check CORS Issues**
   - Most hosting providers handle this automatically
   - If issues persist, contact hosting support

### Cart Not Working

1. **Check LocalStorage**
   - Open DevTools → Application → Local Storage
   - Verify data is being stored

2. **Check JavaScript Console**
   - Open DevTools → Console
   - Look for any error messages

## Support

For deployment issues:
- GitHub Pages: https://docs.github.com/en/pages
- Netlify: https://docs.netlify.com
- Vercel: https://vercel.com/docs
- Email: hello@anas-cosmetics.com

---

**Your website is ready to go live!** 🚀
