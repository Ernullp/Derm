// ========================================
// Wishlist Page - Bright Version
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    renderWishlist();
    updateCartBadge();
});

function renderWishlist() {
    const container = document.getElementById('wishlistItems');

    if (!container) return;

    if (wishlist.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 3rem; margin-bottom: 16px;">💔</div>
                <h2 style="color: #FF69B4; margin-bottom: 16px;">علاقهمندیها خالی است</h2>
                <p style="color: #666; margin-bottom: 24px;">هنوز هیچ محصولی به علاقهمندیهای خود اضافه نکرده‌اید</p>
                <a href="index-bright.html" class="btn btn-primary">بازگشت به فروشگاه</a>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px;">
            ${wishlist.map(product => `
                <div class="product-card">
                    <div class="product-image">${product.image}</div>
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-brand">${product.brand}</div>
                        <div class="product-rating">⭐ ${product.rating}</div>
                        <div class="product-price">
                            <span class="current-price">${formatPrice(product.discountedPrice)} تومان</span>
                        </div>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})" style="width: 100%; margin-top: 12px; margin-bottom: 8px;">
                            افزودن به سبد
                        </button>
                        <button class="btn btn-outline" onclick="removeFromWishlist(${product.id})" style="width: 100%;">
                            حذف
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    renderWishlist();
    showNotification('محصول از علاقهمندیها حذف شد');
}

function addToCartFromWishlist(productId) {
    addToCart(productId);
    removeFromWishlist(productId);
    showNotification('محصول به سبد خرید منتقل شد');
}

function formatPrice(price) {
    return new Intl.NumberFormat('fa-IR').format(price);
}

function showNotification(message) {
    console.log("Notification:", message);
    alert(message);
}