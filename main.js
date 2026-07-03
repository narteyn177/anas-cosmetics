/* ========================================
   ANA'S COSMETICS - MAIN JAVASCRIPT
   ======================================== */

// ========================================
// 1. INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  // Initialize all components
  initializeHeader();
  initializeSearch();
  initializeCart();
  initializeWishlist();
  initializeTheme();
  initializeScrollEffects();
  initializeBackToTop();
  initializeCookieBanner();
  initializeNewsletterPopup();
  initializeFloatingWhatsApp();
  
  // Update cart count on page load
  Cart.updateCartCount();
  Wishlist.updateWishlistButtons();
}

// ========================================
// 2. HEADER & NAVIGATION
// ========================================

function initializeHeader() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navPrimary = document.querySelector('.nav-primary');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navPrimary.classList.toggle('active');
    });
  }

  // Close mobile menu when link is clicked
  const navLinks = document.querySelectorAll('.nav-primary a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navPrimary.classList.remove('active');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('nav') && !e.target.closest('#mobile-menu-btn')) {
      navPrimary?.classList.remove('active');
    }
  });
}

// ========================================
// 3. SEARCH FUNCTIONALITY
// ========================================

function initializeSearch() {
  const searchInput = document.getElementById('search-input');
  
  if (searchInput) {
    searchInput.addEventListener('input', debounce(function(e) {
      const query = e.target.value.trim();
      
      if (query.length > 2) {
        SearchHistory.addTerm(query);
        performSearch(query);
      }
    }, 300));

    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query.length > 0) {
          SearchHistory.addTerm(query);
          window.location.href = `/shop.html?search=${encodeURIComponent(query)}`;
        }
      }
    });
  }
}

function performSearch(query) {
  const results = searchProducts(query);
  // This would typically update a dropdown with results
  console.log('Search results:', results);
}

// ========================================
// 4. CART FUNCTIONALITY
// ========================================

function initializeCart() {
  const cartBtn = document.getElementById('cart-btn');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartClose = document.querySelector('.cart-close');
  
  if (cartBtn) {
    cartBtn.addEventListener('click', function() {
      cartSidebar?.classList.add('active');
      renderCart();
    });
  }

  if (cartClose) {
    cartClose.addEventListener('click', function() {
      cartSidebar?.classList.remove('active');
    });
  }

  // Close cart when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.cart-sidebar') && !e.target.closest('#cart-btn')) {
      cartSidebar?.classList.remove('active');
    }
  });

  // Listen for cart updates
  window.addEventListener('cartUpdated', function() {
    renderCart();
  });
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cart = Cart.getCart();
  
  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; color: var(--neutral-gray);">Your cart is empty</p>';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
      </div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
        <div class="quantity-selector">
          <button onclick="Cart.updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
          <input type="number" value="${item.quantity}" readonly>
          <button onclick="Cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
        </div>
        <button class="cart-remove" onclick="Cart.removeItem(${item.id})">Remove</button>
      </div>
    </div>
  `).join('');

  updateCartSummary();
}

function updateCartSummary() {
  const cart = Cart.getCart();
  const total = Cart.getTotal();
  const subtotal = total;
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = (subtotal * 0.1).toFixed(2);
  const grandTotal = (parseFloat(subtotal) + parseFloat(shipping) + parseFloat(tax)).toFixed(2);

  const summaryHtml = `
    <div class="cart-summary-row">
      <span>Subtotal:</span>
      <span>${formatPrice(subtotal)}</span>
    </div>
    <div class="cart-summary-row">
      <span>Shipping:</span>
      <span>${shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
    </div>
    <div class="cart-summary-row">
      <span>Tax (10%):</span>
      <span>${formatPrice(tax)}</span>
    </div>
    <div class="cart-summary-row total">
      <span>Total:</span>
      <span class="price">${formatPrice(grandTotal)}</span>
    </div>
  `;

  const cartSummary = document.querySelector('.cart-summary');
  if (cartSummary) {
    cartSummary.innerHTML = summaryHtml;
  }

  // Update checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    if (cart.length === 0) {
      checkoutBtn.disabled = true;
      checkoutBtn.style.opacity = '0.5';
    } else {
      checkoutBtn.disabled = false;
      checkoutBtn.style.opacity = '1';
      checkoutBtn.onclick = function() {
        proceedToCheckout(cart, grandTotal);
      };
    }
  }
}

function proceedToCheckout(cart, total) {
  const whatsappLink = getWhatsAppLink(cart, total);
  window.open(whatsappLink, '_blank');
}

// ========================================
// 5. WISHLIST FUNCTIONALITY
// ========================================

function initializeWishlist() {
  window.addEventListener('wishlistUpdated', function() {
    Wishlist.updateWishlistButtons();
  });
}

function toggleWishlist(productId) {
  const product = getProductById(productId);
  if (product) {
    Wishlist.toggle(product);
  }
}

// ========================================
// 6. THEME TOGGLE
// ========================================

function initializeTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      Theme.toggle();
    });
  }
}

// ========================================
// 7. SCROLL EFFECTS
// ========================================

function initializeScrollEffects() {
  // Sticky header effect
  const header = document.querySelector('header');
  let lastScrollTop = 0;

  window.addEventListener('scroll', throttle(function() {
    const scrollTop = window.scrollY;
    
    if (header) {
      if (scrollTop > 100) {
        header.style.boxShadow = 'var(--shadow-lg)';
      } else {
        header.style.boxShadow = 'var(--shadow-sm)';
      }
    }

    lastScrollTop = scrollTop;
  }, 100));

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.product-card, .section').forEach(el => {
    observer.observe(el);
  });
}

// ========================================
// 8. BACK TO TOP BUTTON
// ========================================

function initializeBackToTop() {
  let backToTopBtn = document.getElementById('back-to-top');
  
  if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.className = 'btn btn-icon btn-primary';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.title = 'Back to top';
    backToTopBtn.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 999;
      display: none;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    `;
    document.body.appendChild(backToTopBtn);
  }

  window.addEventListener('scroll', throttle(function() {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'flex';
    } else {
      backToTopBtn.style.display = 'none';
    }
  }, 100));

  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========================================
// 9. COOKIE BANNER
// ========================================

function initializeCookieBanner() {
  const acceptBtn = document.getElementById('cookie-accept');
  
  if (acceptBtn) {
    acceptBtn.addEventListener('click', function() {
      CookieConsent.accept();
    });
  }

  CookieConsent.showBannerIfNeeded();
}

// ========================================
// 10. NEWSLETTER POPUP
// ========================================

function initializeNewsletterPopup() {
  if (Newsletter.isDismissed()) return;

  // Show newsletter popup after 5 seconds
  setTimeout(function() {
    const newsletterPopup = document.getElementById('newsletter-popup');
    if (newsletterPopup) {
      newsletterPopup.classList.add('active');
    }
  }, 5000);

  // Newsletter form submission
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      const result = Newsletter.subscribe(email);
      
      if (result.success) {
        Cart.showNotification(result.message);
        Newsletter.dismiss();
        const popup = document.getElementById('newsletter-popup');
        if (popup) {
          popup.classList.remove('active');
        }
      }
    });
  }

  // Newsletter dismiss button
  const dismissBtn = document.getElementById('newsletter-dismiss');
  if (dismissBtn) {
    dismissBtn.addEventListener('click', function() {
      Newsletter.dismiss();
      const popup = document.getElementById('newsletter-popup');
      if (popup) {
        popup.classList.remove('active');
      }
    });
  }
}

// ========================================
// 11. FLOATING WHATSAPP BUTTON
// ========================================

function initializeFloatingWhatsApp() {
  let whatsappBtn = document.getElementById('floating-whatsapp');
  
  if (!whatsappBtn) {
    whatsappBtn = document.createElement('a');
    whatsappBtn.id = 'floating-whatsapp';
    whatsappBtn.href = 'https://wa.me/14152835219';
    whatsappBtn.target = '_blank';
    whatsappBtn.title = 'Chat with us on WhatsApp';
    whatsappBtn.className = 'btn btn-icon btn-primary';
    whatsappBtn.innerHTML = '💬';
    whatsappBtn.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 30px;
      z-index: 999;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      box-shadow: var(--shadow-lg);
      animation: bounce 2s infinite;
    `;
    document.body.appendChild(whatsappBtn);
  }
}

// ========================================
// 12. PRODUCT QUICK VIEW
// ========================================

function openQuickView(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const modal = document.getElementById('quick-view-modal');
  if (!modal) return;

  const modalContent = modal.querySelector('.modal-content');
  modalContent.innerHTML = `
    <button class="modal-close" onclick="closeQuickView()">×</button>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 2rem;">
      <div>
        <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 0.75rem;">
      </div>
      <div>
        <h2>${product.name}</h2>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.floor(product.rating))}</span>
          <span>${product.rating}</span>
          <span class="review-count">(${product.reviews} reviews)</span>
        </div>
        <div class="product-price" style="margin: 1rem 0;">
          <span class="price-current">${formatPrice(product.price)}</span>
          ${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ''}
        </div>
        <p>${product.description}</p>
        <div style="margin: 1.5rem 0;">
          <p><strong>Availability:</strong> ${product.availability}</p>
          <p><strong>SKU:</strong> ${product.sku}</p>
          <p><strong>Brand:</strong> ${product.brand}</p>
        </div>
        <div style="display: flex; gap: 1rem;">
          <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
          <button class="btn btn-outline" onclick="toggleWishlist(${product.id})">♥ Wishlist</button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function closeQuickView() {
  const modal = document.getElementById('quick-view-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// ========================================
// 13. ADD TO CART
// ========================================

function addToCart(productId) {
  const product = getProductById(productId);
  if (product) {
    Cart.addItem(product, 1);
    closeQuickView();
  }
}

// ========================================
// 14. MODAL CLOSE ON OUTSIDE CLICK
// ========================================

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
  }
});

// ========================================
// 15. KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', function(e) {
  // Escape key closes modals and cart
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.active').forEach(modal => {
      modal.classList.remove('active');
    });
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar) {
      cartSidebar.classList.remove('active');
    }
  }

  // Ctrl/Cmd + K opens search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.focus();
    }
  }
});

// ========================================
// 16. EXPORT FUNCTIONS FOR GLOBAL USE
// ========================================

window.addToCart = addToCart;
window.toggleWishlist = toggleWishlist;
window.openQuickView = openQuickView;
window.closeQuickView = closeQuickView;
window.Cart = Cart;
window.Wishlist = Wishlist;
window.Theme = Theme;
