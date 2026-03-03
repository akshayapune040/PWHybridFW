/**
 * ComponentModule.js
 * Hybrid Playwright Test Automation Framework
 * Contains all test cases, methods, and integrates test data
 * Main component file for E-commerce application testing
 */

const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Import Locators
const {
    LoginLocators,
    ProductLocators,
    CartLocators,
    CheckoutLocators,
    OrderHistoryLocators,
    CommonLocators
} = require('../Locators/locators');

// Import Common Methods
const PlaywrightCommon = require('../CommonMethods/PlaywrightCommon');

// ============================================
// TEST DATA LOADING
// ============================================

/**
 * Load test data from JSON file
 * @param {string} fileName - Name of the JSON file
 * @returns {Object} Test data object
 */
function loadTestData(fileName) {
    const filePath = path.join(__dirname, '..', 'TestData', fileName);
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error loading test data from ${fileName}:`, error.message);
        return {};
    }
}

// Load all test data
const loginData = loadTestData('login.json');
const productsData = loadTestData('products.json');
const cartData = loadTestData('cart.json');
const checkoutData = loadTestData('checkout.json');
const ordersData = loadTestData('orders.json');

// ============================================
// COMPONENT MODULE CLASS
// ============================================

class ComponentModule {
    constructor(page) {
        this.page = page;
        this.common = new PlaywrightCommon(page);
    }

    // ============================================
    // LOGIN METHODS
    // ============================================

    /**
     * Navigate to login page
     */
    async navigateToLoginPage() {
        const url = loginData.urls?.loginPage || '/login';
        await this.common.goto(url);
        console.log('[LOGIN] Navigated to login page');
    }

    /**
     * Enter username/email
     * @param {string} email - Email address
     */
    async enterEmail(email) {
        await this.common.waitForVisible(LoginLocators.emailInput.xpath);
        await this.common.fill(LoginLocators.emailInput.xpath, email);
    }

    /**
     * Enter password
     * @param {string} password - Password
     */
    async enterPassword(password) {
        await this.common.waitForVisible(LoginLocators.passwordInput.xpath);
        await this.common.fill(LoginLocators.passwordInput.xpath, password);
    }

    /**
     * Click login button
     */
    async clickLoginButton() {
        await this.common.click(LoginLocators.loginButton.xpath);
        await this.common.waitForNavigation();
    }

    /**
     * Perform complete login
     * @param {string} email - Email address
     * @param {string} password - Password
     */
    async login(email, password) {
        await this.navigateToLoginPage();
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLoginButton();
        console.log(`[LOGIN] Attempted login with: ${email}`);
    }

    /**
     * Check if logged in successfully
     * @returns {Promise<boolean>}
     */
    async isLoggedIn() {
        try {
            await this.common.waitForVisible(CommonLocators.userMenu.xpath, 5000);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Get error message text
     * @returns {Promise<string>}
     */
    async getErrorMessage() {
        return await this.common.getText(LoginLocators.errorMessage.xpath);
    }

    /**
     * Click forgot password link
     */
    async clickForgotPassword() {
        await this.common.click(LoginLocators.forgotPasswordLink.xpath);
    }

    /**
     * Check remember me checkbox
     */
    async checkRememberMe() {
        const isChecked = await this.common.isVisible(LoginLocators.rememberMe.xpath);
        if (isChecked) {
            await this.common.check(LoginLocators.rememberMe.xpath);
        }
    }

    /**
     * Logout
     */
    async logout() {
        try {
            await this.common.click(CommonLocators.userMenu.xpath);
            await this.common.click(LoginLocators.logoutButton.xpath);
            console.log('[LOGOUT] Logged out successfully');
        } catch (error) {
            console.error('[LOGOUT ERROR]', error.message);
        }
    }

    // ============================================
    // PRODUCT METHODS
    // ============================================

    /**
     * Navigate to products page
     */
    async navigateToProductsPage() {
        const url = productsData.urls?.productListPage || '/products';
        await this.common.goto(url);
        console.log('[PRODUCT] Navigated to products page');
    }

    /**
     * Search for a product
     * @param {string} searchTerm - Search keyword
     */
    async searchProduct(searchTerm) {
        await this.common.waitForVisible(ProductLocators.searchInput.xpath);
        await this.common.fill(ProductLocators.searchInput.xpath, searchTerm);
        await this.common.click(ProductLocators.searchButton.xpath);
        await this.common.waitForNavigation();
        console.log(`[PRODUCT] Searched for: ${searchTerm}`);
    }

    /**
     * Clear search
     */
    async clearSearch() {
        await this.common.click(ProductLocators.clearSearch.xpath);
    }

    /**
     * Filter by category
     * @param {string} category - Category name
     */
    async filterByCategory(category) {
        await this.common.selectByLabel(ProductLocators.filterCategory.xpath, category);
        console.log(`[PRODUCT] Filtered by category: ${category}`);
    }

    /**
     * Filter by brand
     * @param {string} brand - Brand name
     */
    async filterByBrand(brand) {
        await this.common.selectByLabel(ProductLocators.filterBrand.xpath, brand);
        console.log(`[PRODUCT] Filtered by brand: ${brand}`);
    }

    /**
     * Sort products
     * @param {string} sortOption - Sort option value
     */
    async sortProducts(sortOption) {
        await this.common.selectByValue(ProductLocators.sortDropdown.xpath, sortOption);
        await this.common.waitForNavigation();
        console.log(`[PRODUCT] Sorted by: ${sortOption}`);
    }

    /**
     * Get product names from list
     * @returns {Promise<string[]>}
     */
    async getProductNames() {
        const count = await this.common.getCount(ProductLocators.productItem.xpath);
        const names = [];
        for (let i = 0; i < count; i++) {
            const name = await this.common.getText(`${ProductLocators.productItem.xpath}[${i + 1}]${ProductLocators.productName.xpath}`);
            names.push(name);
        }
        return names;
    }

    /**
     * Get product prices from list
     * @returns {Promise<string[]>}
     */
    async getProductPrices() {
        const count = await this.common.getCount(ProductLocators.productItem.xpath);
        const prices = [];
        for (let i = 0; i < count; i++) {
            const price = await this.common.getText(`${ProductLocators.productItem.xpath}[${i + 1}]${ProductLocators.productPrice.xpath}`);
            prices.push(price);
        }
        return prices;
    }

    /**
     * Add product to cart by index
     * @param {number} index - Product index in list
     */
    async addProductToCart(index = 0) {
        const addButton = `${ProductLocators.productItem.xpath}[${index + 1}]${ProductLocators.addToCartButton.xpath}`;
        await this.common.click(addButton);
        console.log(`[PRODUCT] Added product to cart at index: ${index}`);
    }

    /**
     * Add product to cart by product ID
     * @param {string} productId - Product ID
     */
    async addProductToCartById(productId) {
        const product = productsData.products?.find(p => p.id === productId);
        if (!product) {
            throw new Error(`Product not found: ${productId}`);
        }
        await this.searchProduct(product.name);
        await this.addProductToCart(0);
    }

    /**
     * View product details
     * @param {number} index - Product index
     */
    async viewProductDetails(index = 0) {
        const viewButton = `${ProductLocators.productItem.xpath}[${index + 1}]${ProductLocators.viewDetailsButton.xpath}`;
        await this.common.click(viewButton);
        console.log(`[PRODUCT] Viewed product details at index: ${index}`);
    }

    /**
     * Check if product is out of stock
     * @param {number} index - Product index
     * @returns {Promise<boolean>}
     */
    async isProductOutOfStock(index = 0) {
        const outOfStockLabel = `${ProductLocators.productItem.xpath}[${index + 1}]${ProductLocators.outOfStockLabel.xpath}`;
        return await this.common.isVisible(outOfStockLabel);
    }

    /**
     * Get no results message
     * @returns {Promise<string>}
     */
    async getNoResultsMessage() {
        return await this.common.getText(ProductLocators.noResultsMessage.xpath);
    }

    // ============================================
    // CART METHODS
    // ============================================

    /**
     * Navigate to cart page
     */
    async navigateToCartPage() {
        const url = cartData.urls?.cartPage || '/cart';
        await this.common.goto(url);
        console.log('[CART] Navigated to cart page');
    }

    /**
     * Open cart from header
     */
    async openCart() {
        await this.common.click(CartLocators.cartIcon.xpath);
    }

    /**
     * Get cart item count
     * @returns {Promise<number>}
     */
    async getCartItemCount() {
        try {
            const badge = CartLocators.cartBadge.xpath;
            const text = await this.common.getText(badge);
            return parseInt(text) || 0;
        } catch {
            return 0;
        }
    }

    /**
     * Get number of items in cart page
     * @returns {Promise<number>}
     */
    async getCartItemsCount() {
        return await this.common.getCount(CartLocators.cartItem.xpath);
    }

    /**
     * Update product quantity in cart
     * @param {number} index - Cart item index
     * @param {number} quantity - New quantity
     */
    async updateQuantity(index, quantity) {
        const quantityInput = `${CartLocators.cartItem.xpath}[${index + 1}]${CartLocators.quantityInput.xpath}`;
        await this.common.clear(quantityInput);
        await this.common.fill(quantityInput, quantity.toString());
        await this.common.click(CartLocators.updateCartButton.xpath);
        console.log(`[CART] Updated quantity to ${quantity} at index: ${index}`);
    }

    /**
     * Remove item from cart
     * @param {number} index - Cart item index
     */
    async removeItem(index) {
        const removeButton = `${CartLocators.cartItem.xpath}[${index + 1}]${CartLocators.removeButton.xpath}`;
        await this.common.click(removeButton);
        console.log(`[CART] Removed item at index: ${index}`);
    }

    /**
     * Apply promo code
     * @param {string} promoCode - Promo code
     */
    async applyPromoCode(promoCode) {
        await this.common.fill(CartLocators.promoCodeInput.xpath, promoCode);
        await this.common.click(CartLocators.applyPromoButton.xpath);
        console.log(`[CART] Applied promo code: ${promoCode}`);
    }

    /**
     * Get promo code error message
     * @returns {Promise<string>}
     */
    async getPromoCodeError() {
        return await this.common.getText(CartLocators.promoCodeError.xpath);
    }

    /**
     * Get cart subtotal
     * @returns {Promise<string>}
     */
    async getCartSubtotal() {
        return await this.common.getText(CartLocators.cartSubtotal.xpath);
    }

    /**
     * Get cart total
     * @returns {Promise<string>}
     */
    async getCartTotal() {
        return await this.common.getText(CartLocators.cartTotal.xpath);
    }

    /**
     * Proceed to checkout
     */
    async proceedToCheckout() {
        await this.common.click(CartLocators.proceedToCheckout.xpath);
        await this.common.waitForNavigation();
        console.log('[CART] Proceeded to checkout');
    }

    /**
     * Continue shopping
     */
    async continueShopping() {
        await this.common.click(CartLocators.continueShoppingButton.xpath);
    }

    /**
     * Check if cart is empty
     * @returns {Promise<boolean>}
     */
    async isCartEmpty() {
        return await this.common.isVisible(CartLocators.emptyCartMessage.xpath);
    }

    /**
     * Get empty cart message
     * @returns {Promise<string>}
     */
    async getEmptyCartMessage() {
        return await this.common.getText(CartLocators.emptyCartMessage.xpath);
    }

    // ============================================
    // CHECKOUT METHODS
    // ============================================

    /**
     * Navigate to checkout page
     */
    async navigateToCheckoutPage() {
        const url = checkoutData.urls?.checkoutPage || '/checkout';
        await this.common.goto(url);
        console.log('[CHECKOUT] Navigated to checkout page');
    }

    /**
     * Fill shipping address
     * @param {Object} address - Shipping address object
     */
    async fillShippingAddress(address) {
        if (address.name) {
            await this.common.fill(CheckoutLocators.shippingName.xpath, address.name);
        }
        if (address.address) {
            await this.common.fill(CheckoutLocators.shippingAddress.xpath, address.address);
        }
        if (address.address2) {
            await this.common.fill(CheckoutLocators.shippingAddress2.xpath, address.address2);
        }
        if (address.city) {
            await this.common.fill(CheckoutLocators.shippingCity.xpath, address.city);
        }
        if (address.state) {
            await this.common.selectByLabel(CheckoutLocators.shippingState.xpath, address.state);
        }
        if (address.zip) {
            await this.common.fill(CheckoutLocators.shippingZip.xpath, address.zip);
        }
        if (address.country) {
            await this.common.selectByLabel(CheckoutLocators.shippingCountry.xpath, address.country);
        }
        if (address.phone) {
            await this.common.fill(CheckoutLocators.shippingPhone.xpath, address.phone);
        }
        console.log('[CHECKOUT] Filled shipping address');
    }

    /**
     * Select shipping method
     * @param {string} method - Shipping method (standard, express, overnight)
     */
    async selectShippingMethod(method) {
        const methodLocator = {
            'standard': CheckoutLocators.standardShipping.xpath,
            'express': CheckoutLocators.expressShipping.xpath,
            'overnight': CheckoutLocators.overnightShipping.xpath
        }[method];

        if (methodLocator) {
            await this.common.click(methodLocator);
            console.log(`[CHECKOUT] Selected shipping method: ${method}`);
        }
    }

    /**
     * Select payment method
     * @param {string} method - Payment method
     */
    async selectPaymentMethod(method) {
        const methodLocator = {
            'creditCard': CheckoutLocators.creditCardOption.xpath,
            'paypal': CheckoutLocators.paypalOption.xpath,
            'debitCard': CheckoutLocators.debitCardOption.xpath
        }[method];

        if (methodLocator) {
            await this.common.click(methodLocator);
            console.log(`[CHECKOUT] Selected payment method: ${method}`);
        }
    }

    /**
     * Fill credit card details
     * @param {Object} cardDetails - Card details object
     */
    async fillCardDetails(cardDetails) {
        if (cardDetails.cardNumber) {
            await this.common.fill(CheckoutLocators.cardNumber.xpath, cardDetails.cardNumber);
        }
        if (cardDetails.expiry) {
            await this.common.fill(CheckoutLocators.cardExpiry.xpath, cardDetails.expiry);
        }
        if (cardDetails.cvv) {
            await this.common.fill(CheckoutLocators.cardCvv.xpath, cardDetails.cvv);
        }
        if (cardDetails.cardName) {
            await this.common.fill(CheckoutLocators.cardName.xpath, cardDetails.cardName);
        }
        console.log('[CHECKOUT] Filled card details');
    }

    /**
     * Apply checkout promo code
     * @param {string} promoCode - Promo code
     */
    async applyCheckoutPromoCode(promoCode) {
        await this.common.fill(CheckoutLocators.checkoutPromoCodeInput.xpath, promoCode);
        await this.common.click(CheckoutLocators.checkoutApplyPromo.xpath);
        console.log(`[CHECKOUT] Applied promo code: ${promoCode}`);
    }

    /**
     * Continue to payment
     */
    async continueToPayment() {
        await this.common.click(CheckoutLocators.continueToPayment.xpath);
    }

    /**
     * Place order
     */
    async placeOrder() {
        await this.common.click(CheckoutLocators.placeOrderButton.xpath);
        console.log('[CHECKOUT] Placed order');
    }

    /**
     * Get order total
     * @returns {Promise<string>}
     */
    async getOrderTotal() {
        return await this.common.getText(CheckoutLocators.orderTotal.xpath);
    }

    /**
     * Get checkout error message
     * @returns {Promise<string>}
     */
    async getCheckoutError() {
        return await this.common.getText(CheckoutLocators.checkoutError.xpath);
    }

    /**
     * Get field error message
     * @param {string} field - Field name
     * @returns {Promise<string>}
     */
    async getFieldError(field) {
        // Dynamic field error locator
        const fieldError = `//span[@id='${field}-error']`;
        return await this.common.getText(fieldError);
    }

    /**
     * Complete checkout flow
     * @param {Object} checkoutData - Complete checkout data
     */
    async completeCheckout(checkoutData) {
        // Fill shipping
        if (checkoutData.shipping) {
            await this.fillShippingAddress(checkoutData.shipping);
        }

        // Select shipping method
        if (checkoutData.shippingMethod) {
            await this.selectShippingMethod(checkoutData.shippingMethod);
        }

        // Continue to payment
        await this.continueToPayment();

        // Select payment method
        if (checkoutData.payment?.method) {
            await this.selectPaymentMethod(checkoutData.payment.method);

            // Fill card details if credit/debit
            if (checkoutData.payment.method === 'creditCard' || checkoutData.payment.method === 'debitCard') {
                await this.fillCardDetails(checkoutData.payment);
            }
        }

        // Apply promo code if provided
        if (checkoutData.promoCode) {
            await this.applyCheckoutPromoCode(checkoutData.promoCode);
        }

        // Place order
        await this.placeOrder();
        console.log('[CHECKOUT] Completed checkout flow');
    }

    // ============================================
    // ORDER HISTORY METHODS
    // ============================================

    /**
     * Navigate to order history page
     */
    async navigateToOrderHistoryPage() {
        const url = ordersData.urls?.orderHistoryPage || '/orders';
        await this.common.goto(url);
        console.log('[ORDERS] Navigated to order history page');
    }

    /**
     * Get order count
     * @returns {Promise<number>}
     */
    async getOrderCount() {
        return await this.common.getCount(OrderHistoryLocators.orderItem.xpath);
    }

    /**
     * View order details
     * @param {number} index - Order index
     */
    async viewOrderDetails(index = 0) {
        const viewButton = `${OrderHistoryLocators.orderItem.xpath}[${index + 1}]${OrderHistoryLocators.viewOrderButton.xpath}`;
        await this.common.click(viewButton);
        console.log(`[ORDERS] Viewed order details at index: ${index}`);
    }

    /**
     * Reorder items from order
     * @param {number} index - Order index
     */
    async reorderFromOrder(index = 0) {
        const reorderButton = `${OrderHistoryLocators.orderItem.xpath}[${index + 1}]${OrderHistoryLocators.reorderButton.xpath}`;
        await this.common.click(reorderButton);
        console.log(`[ORDERS] Reordered from order at index: ${index}`);
    }

    /**
     * Cancel order
     * @param {number} index - Order index
     */
    async cancelOrder(index = 0) {
        const cancelButton = `${OrderHistoryLocators.orderItem.xpath}[${index + 1}]${OrderHistoryLocators.cancelOrderButton.xpath}`;
        await this.common.click(cancelButton);
        console.log(`[ORDERS] Cancelled order at index: ${index}`);
    }

    /**
     * Download invoice
     * @param {number} index - Order index
     */
    async downloadInvoice(index = 0) {
        const downloadButton = `${OrderHistoryLocators.orderItem.xpath}[${index + 1}]${OrderHistoryLocators.downloadInvoiceButton.xpath}`;
        await this.common.click(downloadButton);
        console.log(`[ORDERS] Downloaded invoice at index: ${index}`);
    }

    /**
     * Track order
     * @param {number} index - Order index
     */
    async trackOrder(index = 0) {
        const trackButton = `${OrderHistoryLocators.orderItem.xpath}[${index + 1}]${OrderHistoryLocators.trackOrderButton.xpath}`;
        await this.common.click(trackButton);
        console.log(`[ORDERS] Tracked order at index: ${index}`);
    }

    /**
     * Filter orders by status
     * @param {string} status - Order status
     */
    async filterOrdersByStatus(status) {
        await this.common.selectByLabel(OrderHistoryLocators.statusFilter.xpath, status);
        console.log(`[ORDERS] Filtered by status: ${status}`);
    }

    /**
     * Get order ID at index
     * @param {number} index - Order index
     * @returns {Promise<string>}
     */
    async getOrderId(index = 0) {
        const orderIdLocator = `${OrderHistoryLocators.orderItem.xpath}[${index + 1}]${OrderHistoryLocators.orderId.xpath}`;
        return await this.common.getText(orderIdLocator);
    }

    /**
     * Get order status
     * @param {number} index - Order index
     * @returns {Promise<string>}
     */
    async getOrderStatus(index = 0) {
        const statusLocator = `${OrderHistoryLocators.orderItem.xpath}[${index + 1}]${OrderHistoryLocators.orderStatus.xpath}`;
        return await this.common.getText(statusLocator);
    }

    /**
     * Check if order history is empty
     * @returns {Promise<boolean>}
     */
    async isOrderHistoryEmpty() {
        return await this.common.isVisible(OrderHistoryLocators.noOrdersMessage.xpath);
    }

    /**
     * Get no orders message
     * @returns {Promise<string>}
     */
    async getNoOrdersMessage() {
        return await this.common.getText(OrderHistoryLocators.noOrdersMessage.xpath);
    }
}

// ============================================
// EXPORT COMPONENT MODULE
// ============================================

module.exports = {
    ComponentModule,
    loginData,
    productsData,
    cartData,
    checkoutData,
    ordersData,
    LoginLocators,
    ProductLocators,
    CartLocators,
    CheckoutLocators,
    OrderHistoryLocators,
    CommonLocators
};

// ============================================
// TEST CASES
// ============================================

// Export test data for direct access in tests
module.exports.testData = {
    loginData,
    productsData,
    cartData,
    checkoutData,
    ordersData
};

// ============================================
// HELPER FUNCTIONS FOR TEST EXECUTION
// ============================================

/**
 * Create page fixture for tests
 * @param {Object} page - Playwright page
 * @returns {ComponentModule} Component module instance
 */
function createComponentModule(page) {
    return new ComponentModule(page);
}

module.exports.createComponentModule = createComponentModule;
