# Ana's Cosmetics - Premium E-Commerce Website

A luxury, production-quality cosmetic e-commerce website built with pure HTML5, CSS3, and Vanilla JavaScript. Fully responsive, SEO-optimized, and ready to deploy on GitHub Pages.

## 🌟 Features

### E-Commerce Functionality
- **60+ Premium Products** - Carefully curated cosmetics, skincare, and beauty products
- **Advanced Filtering & Search** - Filter by category, price, rating, and sale status
- **Sorting Options** - Sort by featured, newest, price, rating, and discount
- **Product Quick View** - Modal product previews without page navigation
- **Shopping Cart** - Frontend cart with LocalStorage persistence
- **Wishlist** - Save favorite products for later
- **Product Ratings & Reviews** - Display customer ratings and review counts

### Shopping Experience
- **WhatsApp Checkout** - Direct WhatsApp integration for order confirmation
- **Cart Summary** - Automatic calculation of subtotal, tax, and shipping
- **Free Shipping** - Complimentary shipping on orders over $100
- **Product Recommendations** - Related products and recently viewed items

### Design & UX
- **Luxury Branding** - Premium color palette and typography
- **Dark/Light Mode** - Theme toggle with localStorage persistence
- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **Smooth Animations** - Professional transitions and micro-interactions
- **Accessibility** - ARIA labels, keyboard navigation, semantic HTML

### Pages Included
1. **Home** - Hero section, featured products, collections, testimonials
2. **Shop** - Advanced product catalog with filtering and pagination
3. **About** - Company story, values, team, and journey
4. **Services** - Beauty consultations, tutorials, and packages
5. **Testimonials** - Customer reviews and ratings
6. **FAQ** - Comprehensive frequently asked questions
7. **Contact** - Contact form, business hours, and support channels
8. **Privacy Policy** - Complete privacy and data protection information

### Technical Features
- **SEO Optimized** - Meta tags, structured data, Open Graph, Twitter Cards
- **Performance** - Optimized images, lazy loading, minified assets
- **LocalStorage** - Cart, wishlist, theme, search history persistence
- **No Backend Required** - Pure static site, works with GitHub Pages
- **Cross-Browser Compatible** - Works on all modern browsers
- **Mobile-First** - Optimized for mobile devices first

## 📁 Project Structure

```
anas-cosmetics/
├── index.html                 # Home page
├── shop.html                  # Product catalog
├── about.html                 # About us
├── services.html              # Services page
├── testimonials.html          # Customer testimonials
├── faq.html                   # FAQ
├── contact.html               # Contact page
├── privacy.html               # Privacy policy
├── sitemap.xml                # SEO sitemap
├── robots.txt                 # Search engine directives
├── favicon.ico                # Website icon
│
├── assets/
│   ├── css/
│   │   ├── styles.css         # Global styles and design system
│   │   └── components.css     # Component-specific styles
│   ├── js/
│   │   ├── utils.js           # Utility functions and storage
│   │   ├── products.js        # Product database
│   │   └── main.js            # Main interactive features
│   ├── images/                # Product and content images
│   ├── icons/                 # Icon assets
│   └── logo/                  # Logo files
│
└── README.md                  # This file
```

## 🚀 Getting Started

### Local Development

1. **Clone or Download** the project files
2. **Open in Browser** - Simply open `index.html` in your web browser
3. **No Build Process** - No npm, webpack, or build tools required

### Live Preview
- Open `index.html` directly in your browser
- Or use a local server: `python -m http.server 8000`
- Visit `http://localhost:8000`

## 🔧 Customization Guide

### Change WhatsApp Number
1. Open `assets/js/utils.js`
2. Find the function `getWhatsAppLink()`
3. Replace `+14152835219` with your WhatsApp number

### Update Brand Colors
1. Open `assets/css/styles.css`
2. Modify CSS variables in `:root` section:
   ```css
   --accent-gold: #d4af37;
   --secondary-purple: #8b5a8e;
   --accent-rose: #e8b4c8;
   ```

### Add/Edit Products
1. Open `assets/js/products.js`
2. Add new product objects to the `PRODUCTS` array:
   ```javascript
   {
     id: 61,
     name: 'Product Name',
     category: 'Category',
     price: 49.99,
     oldPrice: 59.99,
     image: 'image-url',
     rating: 4.8,
     reviews: 150,
     description: 'Product description',
     availability: 'In Stock',
     sku: 'SKU-061',
     brand: 'Ana\'s Cosmetics',
     tags: ['tag1', 'tag2'],
     discount: 17
   }
   ```

### Replace Images
1. Place new images in `assets/images/`
2. Update image URLs in product data or HTML
3. Ensure images are optimized (compress before uploading)

### Update Contact Information
1. Open any HTML file
2. Search for phone number: `+1 (415) 283-5219`
3. Search for email: `hello@anas-cosmetics.com`
4. Replace with your contact details

### Customize Business Hours
1. Open `contact.html`
2. Update the "Business Hours" section
3. Modify times and days as needed

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: Below 768px

## 🎨 Design System

### Color Palette
- **Primary Gold**: `#d4af37` - Accent and highlights
- **Primary Dark**: `#1a1a1a` - Text and backgrounds
- **Secondary Purple**: `#8b5a8e` - Complementary accent
- **Neutral Gray**: `#6b6b6b` - Secondary text
- **Cream**: `#faf8f6` - Light backgrounds

### Typography
- **Primary Font**: Segoe UI, Tahoma, Geneva, Verdana
- **Secondary Font**: Georgia, Garamond (serif for headings)
- **Font Sizes**: Responsive scale from 0.75rem to 3rem

### Spacing Scale
- xs: 0.25rem
- sm: 0.5rem
- md: 1rem
- lg: 1.5rem
- xl: 2rem
- 2xl: 3rem
- 3xl: 4rem
- 4xl: 6rem

## 🔍 SEO Optimization

- **Meta Tags** - Title, description, keywords on all pages
- **Open Graph** - Social media sharing optimization
- **Twitter Cards** - Twitter-specific sharing
- **Structured Data** - Schema.org JSON-LD markup
- **Sitemap** - XML sitemap for search engines
- **Robots.txt** - Search engine crawling directives
- **Canonical URLs** - Prevent duplicate content issues
- **Semantic HTML** - Proper heading hierarchy and structure

## ♿ Accessibility Features

- **ARIA Labels** - Screen reader support
- **Keyboard Navigation** - Full keyboard accessibility
- **Focus Indicators** - Visible focus states
- **Color Contrast** - WCAG AA compliant
- **Alt Text** - All images have descriptive alt text
- **Semantic HTML** - Proper heading and landmark elements

## 📊 Performance

### Optimization Techniques
- **Lazy Loading** - Images load only when needed
- **CSS Optimization** - Minified and organized
- **JavaScript Modules** - Organized into logical files
- **Efficient Animations** - GPU-accelerated transforms
- **Image Optimization** - Compressed and properly sized

### Lighthouse Targets
- Performance: >90
- Accessibility: >95
- Best Practices: >95
- SEO: >95

## 🌐 Deployment

### GitHub Pages

1. **Create Repository**
   - Go to github.com and create a new repository
   - Name it `anas-cosmetics` (or your preferred name)

2. **Upload Files**
   - Clone the repository locally
   - Copy all project files into the repository
   - Commit and push to GitHub

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "GitHub Pages" section
   - Select `main` branch as source
   - Click Save

4. **Access Your Site**
   - Your site will be available at: `https://yourusername.github.io/anas-cosmetics`
   - Or use a custom domain if configured

### Other Hosting Options
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **AWS S3**: Static site hosting
- **Cloudflare Pages**: Edge deployment
- **Any Web Host**: FTP upload of files

## 🛠️ Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project is provided as-is for personal and commercial use.

## 🤝 Support

For questions or issues:
- Email: hello@anas-cosmetics.com
- Phone: +1 (415) 283-5219
- Website: https://anas-cosmetics.com

## 📚 Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **Vanilla JavaScript (ES6)** - No frameworks or dependencies
- **LocalStorage API** - Client-side data persistence
- **Responsive Design** - Mobile-first approach

## ✨ Features Highlights

### Frontend Shopping Cart
- Add/remove items
- Update quantities
- Automatic total calculation
- Tax and shipping estimates
- Persistent storage

### Product Management
- 60+ products with full details
- Advanced filtering system
- Search functionality
- Sorting options
- Product recommendations

### User Experience
- Smooth animations
- Dark/light mode toggle
- Wishlist functionality
- Recently viewed products
- Newsletter signup
- Cookie consent banner

## 🎯 Future Enhancements

Potential additions for future versions:
- Product reviews and ratings submission
- User accounts and order history
- Email notifications
- Advanced analytics
- Inventory management
- Multi-language support
- Payment gateway integration

## 📄 Files Overview

### HTML Files
- `index.html` - Home page with hero, featured products, testimonials
- `shop.html` - Product catalog with advanced filtering
- `about.html` - Company information and team
- `services.html` - Beauty services and packages
- `testimonials.html` - Customer reviews and ratings
- `faq.html` - Frequently asked questions
- `contact.html` - Contact form and information
- `privacy.html` - Privacy policy

### CSS Files
- `styles.css` - Global styles, design system, utilities
- `components.css` - Component-specific styles

### JavaScript Files
- `utils.js` - Storage, theme, cart, wishlist management
- `products.js` - Product database and search functions
- `main.js` - Interactive features and event handlers

## 🔐 Security

- SSL encryption ready (when deployed with HTTPS)
- No sensitive data stored locally
- XSS protection through proper escaping
- CSRF protection through form handling
- Secure payment processing (WhatsApp integration)

## 📞 Contact Information

**Ana's Cosmetics**
- Email: hello@anas-cosmetics.com
- Phone: +1 (415) 283-5219
- WhatsApp: +1 (415) 283-5219
- Address: San Francisco, CA 94102, United States

---

**Built with ❤️ for beauty enthusiasts everywhere**

*Last Updated: January 2025*
