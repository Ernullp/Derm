// ========================================
// Category & Filtering - Bright Version
// ========================================

let currentCategory = 'all';
let currentSort = 'popular';
let currentPriceFilter = { min: 0, max: 1500000 };

document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    updateCategoryDisplay();
});

function initializeFilters() {
    // Category filter
    const categoryButtons = document.querySelectorAll('[data-category]');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.dataset.category;
            applyFilters();
        });
    });

    // Sort filter
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            applyFilters();
        });
    }

    // Price filter
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    
    if (minPrice) {
        minPrice.addEventListener('input', (e) => {
            currentPriceFilter.min = parseInt(e.target.value);
            updatePriceDisplay();
            applyFilters();
        });
    }

    if (maxPrice) {
        maxPrice.addEventListener('input', (e) => {
            currentPriceFilter.max = parseInt(e.target.value);
            updatePriceDisplay();
            applyFilters();
        });
    }
}

function updatePriceDisplay() {
    const minDisplay = document.getElementById('minPriceDisplay');
    const maxDisplay = document.getElementById('maxPriceDisplay');
    
    if (minDisplay) {
        minDisplay.textContent = formatPrice(currentPriceFilter.min);
    }
    if (maxDisplay) {
        maxDisplay.textContent = formatPrice(currentPriceFilter.max);
    }
}

function applyFilters() {
    let filtered = [...products];

    // Apply category filter
    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }

    // Apply price filter
    filtered = filtered.filter(p => 
        p.discountedPrice >= currentPriceFilter.min && 
        p.discountedPrice <= currentPriceFilter.max
    );

    // Apply sorting
    filtered = applySorting(filtered);

    // Render results
    renderFilteredProducts(filtered);
    updateResultCount(filtered.length);
}

function applySorting(productsList) {
    const sorted = [...productsList];
    
    switch(currentSort) {
        case 'price-low':
            return sorted.sort((a, b) => a.discountedPrice - b.discountedPrice);
        case 'price-high':
            return sorted.sort((a, b) => b.discountedPrice - a.discountedPrice);
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'newest':
            return sorted.reverse();
        case 'popular':
        default:
            return sorted.sort((a, b) => b.reviews - a.reviews);
    }
}

function renderFilteredProducts(productsList) {
    const container = document.getElementById('productsGrid');
    
    if (!container) return;

    if (productsList.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <div style="font-size: 3rem; margin-bottom: 16px;">🔍</div>
                <h2 style="color: #FF69B4; margin-bottom: 16px;">هیچ محصولی یافت نشد</h2>
                <p style="color: #666;">فیلترهای خود را تغییر دهید و دوباره امتحان کنید</p>
            </div>
        `;
        return;
    }

    container.innerHTML = productsList.map(product => `
        <div class="product-card">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-brand">${product.brand}</div>
                <div class="product-rating">
                    ⭐ ${product.rating} (${product.reviews})
                </div>
                <div class="product-price">
                    <span class="original-price">${formatPrice(product.price)}</span>
                    <span class="current-price">${formatPrice(product.discountedPrice)}</span>
                </div>
                <div class="discount-badge">${calculateDiscount(product.price, product.discountedPrice)}% تخفیف</div>
                <button class="btn btn-primary" onclick="addToCart(${product.id})" style="width: 100%; margin-top: 12px;">
                    افزودن به سبد
                </button>
            </div>
        </div>
    `).join('');
}

function updateCategoryDisplay() {
    const categoryDisplay = document.getElementById('categoryDisplay');
    if (categoryDisplay) {
        const cat = categories.find(c => c.id === currentCategory);
        categoryDisplay.textContent = cat ? cat.name : 'تمام محصولات';
    }
}

function updateResultCount(count) {
    const countDisplay = document.getElementById('resultCount');
    if (countDisplay) {
        countDisplay.textContent = `${count} محصول`;
    }
}

function clearFilters() {
    currentCategory = 'all';
    currentSort = 'popular';
    currentPriceFilter = { min: 0, max: 1500000 };
    
    // Reset UI
    document.querySelectorAll('[data-category]').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.value = 'popular';
    }

    applyFilters();
    showNotification('فیلترها پاک شدند');
}

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('fa-IR').format(price);
}

function calculateDiscount(original, discounted) {
    return Math.round(((original - discounted) / original) * 100);
}

function showNotification(message) {
    console.log("Notification:", message);
    alert(message);
}

// Search within filtered results
function searchInCategory(keyword) {
    let results = [...products];

    if (currentCategory !== 'all') {
        results = results.filter(p => p.category === currentCategory);
    }

    results = results.filter(p =>
        p.name.toLowerCase().includes(keyword.toLowerCase()) ||
        p.brand.toLowerCase().includes(keyword.toLowerCase()) ||
        p.description.toLowerCase().includes(keyword.toLowerCase())
    );

    results = applySorting(results);
    renderFilteredProducts(results);
    updateResultCount(results.length);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        applyFilters,
        clearFilters,
        searchInCategory,
        currentCategory,
        currentSort,
        currentPriceFilter
    };
}