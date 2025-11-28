// ========================================
// Product Page JavaScript - Bright Version
// ========================================

let currentProduct = null;
let currentImageIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    initializeProductPage();
    updateCartBadge();
});

function initializeProductPage() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    // Find product (using dummy data if not found in sample)
    currentProduct = products.find(p => p.id === productId) || products[0];

    if (!currentProduct) {
        window.location.href = 'index-bright.html';
        return;
    }

    renderProductDetails();
    renderRelatedProducts();
    updateBreadcrumb();
}

function updateBreadcrumb() {
    const category = categories.find(c => c.id === currentProduct.category);
    const breadcrumb = document.getElementById('breadcrumb');

    if (category && breadcrumb) {
        breadcrumb.innerHTML = `
            <a href="index-bright.html">خانه</a> / 
            <a href="index-bright.html?category=${category.id}">${category.name}</a> / 
            ${currentProduct.name}
        `;
    }
}

function renderProductDetails() {
    const discount = Math.round(((currentProduct.price - currentProduct.discountedPrice) / currentProduct.price) * 100);

    // Main Image
    if (document.getElementById('mainImage')) {
        document.getElementById('mainImage').textContent = currentProduct.image;
    }

    // Product Info
    if (document.getElementById('productName')) {
        document.getElementById('productName').textContent = currentProduct.name;
    }
    if (document.getElementById('productBrand')) {
        document.getElementById('productBrand').textContent = currentProduct.brand;
    }

    // Rating
    const ratingContainer = document.getElementById('productRating');
    if (ratingContainer) {
        ratingContainer.innerHTML = `
            <span style="color: #FFD700;">
                ${'★'.repeat(Math.floor(currentProduct.rating))}${'☆'.repeat(5 - Math.floor(currentProduct.rating))}
            </span>
            (${currentProduct.reviews} نظر)
        `;
    }

    // Prices
    if (document.getElementById('originalPrice')) {
        document.getElementById('originalPrice').textContent = formatPrice(currentProduct.price);
    }
    if (document.getElementById('currentPrice')) {
        document.getElementById('currentPrice').textContent = formatPrice(currentProduct.discountedPrice);
    }
    if (document.getElementById('discountBadge')) {
        document.getElementById('discountBadge').textContent = `${discount}% تخفیف`;
    }

    // Description
    if (document.getElementById('productDescription')) {
        document.getElementById('productDescription').textContent = currentProduct.description;
    }

    // Ingredients
    if (document.getElementById('productIngredients') && currentProduct.ingredients) {
        document.getElementById('productIngredients').textContent = currentProduct.ingredients;
    }

    // Usage
    if (document.getElementById('productUsage') && currentProduct.usage) {
        document.getElementById('productUsage').textContent = currentProduct.usage;
    }

    renderReviews();
}

function updateQuantity(change) {
    const input = document.getElementById('quantityInput');
    let value = parseInt(input.value) || 1;
    value += change;

    if (value < 1) value = 1;
    if (value > 99) value = 99;

    input.value = value;
}

function addToCartFromProduct() {
    const quantity = parseInt(document.getElementById('quantityInput').value) || 1;

    for (let i = 0; i < quantity; i++) {
        addToCart(currentProduct.id);
    }

    showNotification(`${quantity} عدد محصول به سبد خرید اضافه شد`);
}

function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const exists = wishlist.find(item => item.id === productId);

    if (!exists) {
        wishlist.push(product);
        showNotification('محصول به علاقهمندیها اضافه شد');
    } else {
        wishlist = wishlist.filter(item => item.id !== productId);
        showNotification('محصول از علاقهمندیها حذف شد');
    }
}

function renderReviews() {
    const container = document.getElementById('reviewsContainer');
    if (!container) return;

    const mockReviews = [
        {
            name: 'فاطمه م.',
            rating: 5,
            date: '۱۴۰۳/۰۸/۱۵',
            comment: 'محصول عالی با کیفیت عالی. خیلی راضیم.'
        },
        {
            name: 'محمد ر.',
            rating: 4,
            date: '۱۴۰۳/۰۸/۱۲',
            comment: 'برای قیمتی که داره عالیه.'
        },
        {
            name: 'زهرا ا.',
            rating: 5,
            date: '۱۴۰۳/۰۸/۱۰',
            comment: 'دقیقاً همون چیزی بود که میخواستم. پیشنهاد میکنم.'
        }
    ];

    container.innerHTML = mockReviews.map(review => `
        <div style="background: white; padding: 16px; border-radius: 8px; margin-bottom: 12px; border-left: 4px solid #FF69B4;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <strong style="color: #333;">${review.name}</strong>
                <span style="color: #999; font-size: 12px;">${review.date}</span>
            </div>
            <div style="color: #FFD700; margin-bottom: 8px;">
                ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
            </div>
            <p style="color: #666; margin: 0;">${review.comment}</p>
        </div>
    `).join('');
}

function renderRelatedProducts() {
    const container = document.getElementById('relatedProducts');
    if (!container) return;

    const related = products
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);

    container.innerHTML = related.map(product => `
        <div class="product-card">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-brand">${product.brand}</div>
                <div class="product-price">
                    <span class="current-price">${formatPrice(product.discountedPrice)} تومان</span>
                </div>
                <button class="btn btn-primary" onclick="addToCart(${product.id})" style="width: 100%; margin-top: 12px;">
                    افزودن به سبد
                </button>
            </div>
        </div>
    `).join('');
}

function changeMainImage(index, imageSrc) {
    currentImageIndex = index;
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.textContent = imageSrc;
    }

    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Share functionality
function shareProduct() {
    const text = `بررسی کنید: ${currentProduct.name} - ${formatPrice(currentProduct.discountedPrice)} تومان`;
    const url = window.location.href;

    if (navigator.share) {
        navigator.share({
            title: currentProduct.name,
            text: text,
            url: url
        });
    } else {
        showNotification('لینک در کلیپ بورد کپی شد');
        navigator.clipboard.writeText(url);
    }
}

// Utility function for formatting
function formatPrice(price) {
    return new Intl.NumberFormat('fa-IR').format(price);
}

function showNotification(message) {
    console.log("Notification:", message);
    alert(message);
}