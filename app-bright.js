// ========================================
// BeautyHub - Main Application Logic
// ========================================

// Note: 'products' and 'categories' are loaded from data-bright.js

let currentFilter = "all";
let sortOrder = "popular";

// ===== UTILITY FUNCTIONS =====
function formatPrice(price) {
    return new Intl.NumberFormat('fa-IR').format(price);
}

function calculateDiscount(original, discounted) {
    return Math.round(((original - discounted) / original) * 100);
}

function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.textContent = cart.length;
    }
}

// ===== CART FUNCTIONS (Basic) =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartBadge();
        alert('محصول به سبد خرید اضافه شد: ' + product.name);
    }
}

// ===== SEARCH & FILTER FUNCTIONS =====
function searchProducts(keyword) {
    return products.filter(product => 
        product.name.includes(keyword) || 
        product.brand.includes(keyword) ||
        product.description.includes(keyword)
    );
}

function filterByCategory(categoryId) {
    if (categoryId === 'all') {
        return products;
    }
    return products.filter(p => p.category === categoryId);
}

function sortProducts(productsList, sortType) {
    const sorted = [...productsList];
    switch(sortType) {
        case 'price-low':
            return sorted.sort((a, b) => a.discountedPrice - b.discountedPrice);
        case 'price-high':
            return sorted.sort((a, b) => b.discountedPrice - a.discountedPrice);
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'newest':
            return sorted.reverse();
        default:
            return sorted; // Popular logic (default order in data)
    }
}

// ===== RENDER FUNCTIONS =====
function renderProducts(productsList = products) {
    const container = document.getElementById('products-container');
    if (!container) return;

    const html = productsList.map(product => `
        <div class="product-card">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-brand">${product.brand}</div>
                <div class="product-rating">
                    ${'★'.repeat(Math.floor(product.rating))} (${product.reviews})
                </div>
                <div class="product-price">
                    <span class="original-price">${formatPrice(product.price)} تومان</span>
                    <span class="current-price">${formatPrice(product.discountedPrice)} تومان</span>
                </div>
                <div class="discount-badge">${calculateDiscount(product.price, product.discountedPrice)}% تخفیف</div>
                <button class="btn btn-primary" onclick="addToCart(${product.id})" style="width: 100%; margin-top: 12px;">
                    افزودن به سبد
                </button>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;
}

function renderCategories() {
    const container = document.getElementById('categories-container');
    if (!container) return;

    const html = categories.map(cat => `
        <div class="category-card" onclick="filterAndRender('${cat.id}')">
            <div class="category-icon">${cat.icon}</div>
            <h3>${cat.name}</h3>
        </div>
    `).join('');

    container.innerHTML = html;
}

// ===== EVENT HANDLERS =====
function filterAndRender(categoryId) {
    currentFilter = categoryId;
    const filtered = filterByCategory(categoryId);
    renderProducts(filtered);
    
    // Smooth scroll to products
    document.getElementById('products').scrollIntoView({behavior: 'smooth'});
}

function handleSearch(keyword) {
    if (!keyword || keyword.length === 0) {
        renderProducts(products);
    } else {
        const results = searchProducts(keyword);
        renderProducts(results);
    }
}

function handleSort(sortType) {
    sortOrder = sortType;
    // Apply current filter then sort
    let list = currentFilter === 'all' ? products : filterByCategory(currentFilter);
    const sorted = sortProducts(list, sortType);
    renderProducts(sorted);
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    renderCategories();
    updateCartBadge();

    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
    }

    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => handleSort(e.target.value));
    }
});
