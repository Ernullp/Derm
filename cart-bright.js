// ========================================
// Shopping Cart Page - Bright Version
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    updateCartBadge();
});

function renderCart() {
    const container = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartContent = document.getElementById('cartContent');

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 3rem; margin-bottom: 16px;">🛒</div>
                <h2 style="color: #FF69B4; margin-bottom: 16px;">سبد خرید خالی است</h2>
                <p style="color: #666; margin-bottom: 24px;">هنوز هیچ محصولی به سبد خود اضافه نکرده‌اید</p>
                <a href="index-bright.html" class="btn btn-primary">برگشت به فروشگاه</a>
            </div>
        `;
        return;
    }

    const cartHTML = `
        <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="border-bottom: 2px solid #FF69B4;">
                        <th style="text-align: right; padding: 12px; color: #FF69B4;">محصول</th>
                        <th style="text-align: center; padding: 12px; color: #FF69B4;">قیمت</th>
                        <th style="text-align: center; padding: 12px; color: #FF69B4;">تعداد</th>
                        <th style="text-align: left; padding: 12px; color: #FF69B4;">حذف</th>
                    </tr>
                </thead>
                <tbody>
                    ${cart.map((item, index) => `
                        <tr style="border-bottom: 1px solid #f0f0f0;">
                            <td style="padding: 12px; text-align: right;">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <span style="font-size: 2rem;">${item.image}</span>
                                    <div>
                                        <div style="font-weight: 600; color: #333;">${item.name}</div>
                                        <div style="font-size: 12px; color: #999;">${item.brand}</div>
                                    </div>
                                </div>
                            </td>
                            <td style="padding: 12px; text-align: center; color: #FF69B4; font-weight: 600;">
                                ${formatPrice(item.discountedPrice)}
                            </td>
                            <td style="padding: 12px; text-align: center;">
                                <input type="number" value="1" min="1" style="width: 50px; padding: 6px; text-align: center; border: 1px solid #ddd; border-radius: 6px;">
                            </td>
                            <td style="padding: 12px; text-align: left;">
                                <button onclick="removeFromCart(${item.id})" class="btn btn-outline" style="padding: 6px 12px; font-size: 12px;">
                                    حذف
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div style="margin-top: 24px; background: linear-gradient(135deg, #FFE4F0, #E8F0FF); padding: 20px; border-radius: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <span style="font-size: 18px; color: #333;">جمع کل:</span>
                <span style="font-size: 24px; font-weight: bold; color: #FF69B4;">${formatPrice(getCartTotal())} تومان</span>
            </div>
            <button class="btn btn-primary" style="width: 100%; padding: 16px; font-size: 16px;">
                تکمیل خریداری
            </button>
            <a href="index-bright.html" class="btn btn-secondary" style="width: 100%; padding: 12px; margin-top: 12px; text-align: center; text-decoration: none;">
                ادامه خرید
            </a>
        </div>
    `;

    container.innerHTML = cartHTML;
}

function getCartTotal() {
    return cart.reduce((total, item) => total + item.discountedPrice, 0);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartBadge();
    renderCart();
    showNotification('محصول از سبد خرید حذف شد');
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
    } else {
        // Update logic (can be extended)
        renderCart();
    }
}

function clearCart() {
    if (confirm('آیا مطمئن هستید؟')) {
        cart = [];
        updateCartBadge();
        renderCart();
        showNotification('سبد خرید خالی شد');
    }
}

function formatPrice(price) {
    return new Intl.NumberFormat('fa-IR').format(price);
}

function showNotification(message) {
    console.log("Notification:", message);
    alert(message);
}