/* ========================================
   ANA'S COSMETICS - UTILITY FUNCTIONS
   ======================================== */

// ========================================
// 1. STORAGE MANAGEMENT
// ========================================

const Storage = {
  /**
   * Get item from localStorage with fallback
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return defaultValue;
    }
  },

  /**
   * Set item in localStorage
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
      return false;
    }
  },

  /**
   * Remove item from localStorage
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  },

  /**
   * Clear all localStorage
   */
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
};

// ========================================
// 2. THEME MANAGEMENT
// ========================================

const Theme = {
  /**
   * Initialize theme from localStorage or system preference
   */
  init() {
    const savedTheme = Storage.get('theme', null);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    this.set(theme);
  },

  /**
   * Set theme
   */
  set(theme) {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    Storage.set('theme', theme);
    this.updateThemeButton(theme);
  },

  /**
   * Toggle theme
   */
  toggle() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.set(newTheme);
  },

  /**
   * Update theme toggle button
   */
  updateThemeButton(theme) {
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
      themeBtn.innerHTML = theme === 'light' 
        ? '<i class="icon-moon"></i>' 
        : '<i class="icon-sun"></i>';
    }
  },

  /**
   * Get current theme
   */
  get() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }
};

// ========================================
// 3. CART MANAGEMENT
// ========================================

const Cart = {
  storageKey: 'anas_cart',

  /**
   * Get cart from localStorage
   */
  getCart() {
    return Storage.get(this.storageKey, []);
  },

  /**
   * Save cart to localStorage
   */
  saveCart(cart) {
    Storage.set(this.storageKey, cart);
    this.updateCartCount();
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
  },

  /**
   * Add item to cart
   */
  addItem(product, quantity = 1) {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }

    this.saveCart(cart);
    this.showNotification(`${product.name} added to cart!`);
  },

  /**
   * Remove item from cart
   */
  removeItem(productId) {
    const cart = this.getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    this.saveCart(updatedCart);
  },

  /**
   * Update item quantity
   */
  updateQuantity(productId, quantity) {
    const cart = this.getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.saveCart(cart);
      }
    }
  },

  /**
   * Clear cart
   */
  clearCart() {
    Storage.set(this.storageKey, []);
    this.updateCartCount();
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: [] }));
  },

  /**
   * Get cart total
   */
  getTotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  /**
   * Get cart item count
   */
  getItemCount() {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  },

  /**
   * Update cart count in header
   */
  updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      const count = this.getItemCount();
      cartCount.textContent = count;
      cartCount.style.display = count > 0 ? 'flex' : 'none';
    }
  },

  /**
   * Show notification
   */
  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification notification-success';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
};

// ========================================
// 4. WISHLIST MANAGEMENT
// ========================================

const Wishlist = {
  storageKey: 'anas_wishlist',

  /**
   * Get wishlist from localStorage
   */
  getWishlist() {
    return Storage.get(this.storageKey, []);
  },

  /**
   * Save wishlist to localStorage
   */
  saveWishlist(wishlist) {
    Storage.set(this.storageKey, wishlist);
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: wishlist }));
  },

  /**
   * Add item to wishlist
   */
  addItem(product) {
    const wishlist = this.getWishlist();
    if (!wishlist.find(item => item.id === product.id)) {
      wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
      this.saveWishlist(wishlist);
      this.updateWishlistButtons();
      return true;
    }
    return false;
  },

  /**
   * Remove item from wishlist
   */
  removeItem(productId) {
    const wishlist = this.getWishlist();
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    this.saveWishlist(updatedWishlist);
    this.updateWishlistButtons();
  },

  /**
   * Toggle wishlist item
   */
  toggle(product) {
    const wishlist = this.getWishlist();
    const exists = wishlist.find(item => item.id === product.id);
    
    if (exists) {
      this.removeItem(product.id);
    } else {
      this.addItem(product);
    }
  },

  /**
   * Check if item is in wishlist
   */
  isInWishlist(productId) {
    const wishlist = this.getWishlist();
    return wishlist.some(item => item.id === productId);
  },

  /**
   * Update wishlist buttons
   */
  updateWishlistButtons() {
    const buttons = document.querySelectorAll('[data-wishlist-btn]');
    buttons.forEach(btn => {
      const productId = btn.getAttribute('data-product-id');
      const isInWishlist = this.isInWishlist(parseInt(productId));
      btn.classList.toggle('active', isInWishlist);
      btn.setAttribute('aria-label', isInWishlist ? 'Remove from wishlist' : 'Add to wishlist');
    });
  }
};

// ========================================
// 5. RECENTLY VIEWED PRODUCTS
// ========================================

const RecentlyViewed = {
  storageKey: 'anas_recently_viewed',
  maxItems: 10,

  /**
   * Get recently viewed products
   */
  getProducts() {
    return Storage.get(this.storageKey, []);
  },

  /**
   * Add product to recently viewed
   */
  addProduct(product) {
    const products = this.getProducts();
    
    // Remove if already exists
    const filtered = products.filter(p => p.id !== product.id);
    
    // Add to beginning
    filtered.unshift({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      timestamp: Date.now()
    });

    // Keep only last 10
    const limited = filtered.slice(0, this.maxItems);
    Storage.set(this.storageKey, limited);
  },

  /**
   * Clear recently viewed
   */
  clear() {
    Storage.remove(this.storageKey);
  }
};

// ========================================
// 6. SEARCH HISTORY
// ========================================

const SearchHistory = {
  storageKey: 'anas_search_history',
  maxItems: 10,

  /**
   * Get search history
   */
  getHistory() {
    return Storage.get(this.storageKey, []);
  },

  /**
   * Add search term
   */
  addTerm(term) {
    if (!term.trim()) return;

    const history = this.getHistory();
    const filtered = history.filter(t => t.toLowerCase() !== term.toLowerCase());
    filtered.unshift(term);
    const limited = filtered.slice(0, this.maxItems);
    Storage.set(this.storageKey, limited);
  },

  /**
   * Clear search history
   */
  clear() {
    Storage.remove(this.storageKey);
  }
};

// ========================================
// 7. COOKIE CONSENT
// ========================================

const CookieConsent = {
  storageKey: 'anas_cookie_consent',

  /**
   * Check if consent was given
   */
  hasConsent() {
    return Storage.get(this.storageKey, false);
  },

  /**
   * Set consent
   */
  setConsent(value) {
    Storage.set(this.storageKey, value);
  },

  /**
   * Show banner if needed
   */
  showBannerIfNeeded() {
    if (!this.hasConsent()) {
      const banner = document.getElementById('cookie-banner');
      if (banner) {
        banner.style.display = 'block';
      }
    }
  },

  /**
   * Accept cookies
   */
  accept() {
    this.setConsent(true);
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.display = 'none';
    }
  }
};

// ========================================
// 8. NEWSLETTER
// ========================================

const Newsletter = {
  storageKey: 'anas_newsletter_dismissed',

  /**
   * Check if newsletter popup was dismissed
   */
  isDismissed() {
    return Storage.get(this.storageKey, false);
  },

  /**
   * Dismiss newsletter popup
   */
  dismiss() {
    Storage.set(this.storageKey, true);
  },

  /**
   * Subscribe to newsletter
   */
  subscribe(email) {
    if (!this.validateEmail(email)) {
      return { success: false, message: 'Please enter a valid email' };
    }

    // In production, this would send to a backend
    console.log('Newsletter subscription:', email);
    return { success: true, message: 'Thank you for subscribing!' };
  },

  /**
   * Validate email
   */
  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
};

// ========================================
// 9. UTILITIES
// ========================================

/**
 * Format price
 */
function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
}

/**
 * Format date
 */
function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

/**
 * Debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Generate unique ID
 */
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Clone object
 */
function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Scroll to element
 */
function scrollToElement(selector, offset = 0) {
  const element = document.querySelector(selector);
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Lazy load images
 */
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach(img => {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
    });
  }
}

/**
 * Generate WhatsApp message
 */
function generateWhatsAppMessage(cart, total) {
  let message = '*Ana\'s Cosmetics Order*\n\n';
  message += 'Products:\n';
  
  cart.forEach(item => {
    message += `• ${item.name} (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}\n`;
  });
  
  message += `\n*Total: ${formatPrice(total)}*\n\n`;
  message += 'Please confirm this order.';
  
  return encodeURIComponent(message);
}

/**
 * Get WhatsApp link
 */
function getWhatsAppLink(cart, total, phoneNumber = '+14152835219') {
  const message = generateWhatsAppMessage(cart, total);
  return `https://wa.me/${phoneNumber}?text=${message}`;
}

/**
 * Initialize page
 */
document.addEventListener('DOMContentLoaded', function() {
  Theme.init();
  Cart.updateCartCount();
  Wishlist.updateWishlistButtons();
  CookieConsent.showBannerIfNeeded();
  lazyLoadImages();
});
