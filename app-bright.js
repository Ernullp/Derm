// ========================================
// BeautyHub - Enhanced Beauty E-Commerce App
// With Bright & Light Color Scheme
// ========================================

// ===== PRODUCT DATA =====
const products = [
    {
        id: 1,
        name: "کریم پودر Pro Finish",
        brand: "MAC",
        category: "face",
        price: 850000,
        discountedPrice: 595000,
        rating: 4.8,
        reviews: 234,
        image: "💄",
        description: "فاندیشن حرفهای با پوشش کامل و ماندگاری بالا",
        ingredients: "Water, Glycerin, Dimethicone",
        usage: "صبح و عصر بر روی صورت تمیز شده بمالید"
    },
    {
        id: 2,
        name: "ریمل Volume Express",
        brand: "Maybelline",
        category: "eyes",
        price: 180000,
        discountedPrice: 126000,
        rating: 4.5,
        reviews: 512,
        image: "✨",
        description: "ریمل حجمدهنده با فرمول ویژه"
    },
    {
        id: 3,
        name: "کرم مرطوبکننده Ultimate",
        brand: "Olay",
        category: "skincare",
        price: 420000,
        discountedPrice: 336000,
        rating: 4.7,
        reviews: 890,
        image: "🧴",
        description: "کرم مرطوبکننده قوی با ویتامین B3"
    },
    {
        id: 4,
        name: "شامپو Silky",
        brand: "Pantene",
        category: "hair",
        price: 95000,
        discountedPrice: 71000,
        rating: 4.6,
        reviews: 1200,
        image: "💇",
        description: "شامپو تقویتکننده و نرمکننده مو"
    },
    {
        id: 5,
        name: "عطر Midnight Rose",
        brand: "Chanel",
        category: "fragrance",
        price: 1200000,
        discountedPrice: 960000,
        rating: 4.9,
        reviews: 456,
        image: "🌸",
        description: "عطر لوکس با رایحه گل رز و وانیل"
    },
    {
        id: 6,
        name: "صابون بدن Luxe",
        brand: "Dove",
        category: "personal",
        price: 65000,
        discountedPrice: 48000,
        rating: 4.4,
        reviews: 678,
        image: "🧼",
        description: "صابون مرطوبکننده نرمکننده بدن"
    },
    {
        id: 7,
        name: "ست بهداشتی Beauty Box",
        brand: "DermaRokh",
        category: "gifts",
        price: 890000,
        discountedPrice: 623000,
        rating: 4.5,
        reviews: 234,
        image: "🎁",
        description: "پکیج کامل محصولات بهداشتی و آرایشی"
    },
    {
        id: 8,
        name: "افتر شیو Smooth",
        brand: "Gillette",
        category: "mens",
        price: 125000,
        discountedPrice: 93000,
        rating: 4.3,
        reviews: 345,
        image: "👨",
        description: "افتر شیو آرامشبخش و نرمکننده"
    }
];

// ===== CATEGORIES DATA =====
const categories = [
    { id: "face", name: "آرایش صورت", icon: "💄" },
    { id: "eyes", name: "چشم و ابرو", icon: "👁️" },
    { id: "skincare", name: "مراقبت از پوست", icon: "🧴" },
    { id: "hair", name: "مراقبت از مو", icon: "💇" },
    { id: "fragrance", name: "عطر و ادکلن", icon: "✨" },
    { id: "personal", name: "محصولات بهداشتی", icon: "🧼" },
    { id: "gifts", name: "پکیج هدیه", icon: "🎁" },
    { id: "mens", name: "محصولات آقایان", icon: "👨" }
];

// ===== STATE MANAGEMENT =====
let cart = [];
let wishlist = [];
let currentFilter = "all";
let sortOrder = "popular";

// ===== UTILITY FUNCTIONS =====
function formatPrice(price) {
    return new Intl.NumberFormat('fa-IR').format(price);
}

function calculateDiscount(original, discounted) {
    return Math.round(((original - discounted) / original) * 100);
}

function showNotification(message) {
    // Simple notification (can be enhanced)
    console.log("Notification:", message);
    alert(message);
}

function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.textContent = cart.length;
    }
}

// ===== CART FUNCTIONS =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartBadge();
        showNotification('محصول به سبد خرید اضافه شد');
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartBadge();
    showNotification('محصول از سبد خرید حذف شد');
}

function getCartTotal() {
    return cart.reduce((total, item) => total + item.discountedPrice, 0);
}

// ===== WISHLIST FUNCTIONS =====
function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        if (!wishlist.find(item => item.id === productId)) {
            wishlist.push(product);
            showNotification('محصول به علاقهمندیها اضافه شد');
        } else {
            showNotification('محصول قبلاً اضافه شده است');
        }
    }
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    showNotification('محصول از علاقهمندیها حذف شد');
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

function filterByPrice(minPrice, maxPrice) {
    return products.filter(p => 
        p.discountedPrice >= minPrice && p.discountedPrice <= maxPrice
    );
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
            return sorted;
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
                    ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                    (${product.reviews})
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
    const sorted = sortProducts(filtered, sortOrder);
    renderProducts(sorted);
}

function handleSearch(keyword) {
    if (keyword.length === 0) {
        renderProducts(products);
    } else {
        const results = searchProducts(keyword);
        renderProducts(results);
    }
}

function handleSort(sortType) {
    sortOrder = sortType;
    const filtered = filterByCategory(currentFilter);
    const sorted = sortProducts(filtered, sortType);
    renderProducts(sorted);
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initial render
    renderProducts();
    renderCategories();
    updateCartBadge();

    // Event listeners
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
    }

    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => handleSort(e.target.value));
    }

    // Add keyboard shortcut for search (Ctrl+/)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            if (searchInput) searchInput.focus();
        }
    });
});

// ===== EXPORT FOR EXTERNAL USE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        products,
        categories,
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        searchProducts,
        filterByCategory,
        sortProducts,
        formatPrice
    };
}