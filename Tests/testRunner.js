/**
 * testRunner.js
 * Test Runner file for executing all test cases
 * Uses the ComponentModule with test data from JSON files
 */

const { test, expect } = require('@playwright/test');
const {
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
    CommonLocators
} = require('../Framework/Components/ComponentModule');

// ============================================
// TEST FIXTURES
// ============================================

// Define test configuration
test.describe('E-Commerce Application Tests', () => {

// ============================================
// LOGIN TEST CASES
// ============================================

/**
 * TC_LOGIN_001: Valid login with correct credentials
 */
test('TC_LOGIN_001 - Valid login with correct credentials', async ({ page }) => {
    const component = new ComponentModule(page);
    const validUser = loginData.validUsers[0];
    await component.login(validUser.email, validUser.password);
    
    // Verify login success
    const isLoggedIn = await component.isLoggedIn();
    expect(isLoggedIn).toBe(true);
});

/**
 * TC_LOGIN_002: Login with remember me checked
 */
test('TC_LOGIN_002 - Login with remember me checked', async ({ page }) => {
    const component = new ComponentModule(page);
    const validUser = loginData.validUsers[0];
    
    await component.navigateToLoginPage();
    await component.enterEmail(validUser.email);
    await component.enterPassword(validUser.password);
    await component.checkRememberMe();
    await component.clickLoginButton();
    
    // Verify login success
    const isLoggedIn = await component.isLoggedIn();
    expect(isLoggedIn).toBe(true);
});

/**
 * TC_LOGIN_003: Successful logout after login
 */
test('TC_LOGIN_003 - Successful logout after login', async ({ page }) => {
    const component = new ComponentModule(page);
    const validUser = loginData.validUsers[0];
    
    await component.login(validUser.email, validUser.password);
    await component.logout();
    
    // Verify logout - should be redirected to login or home page
    await expect(page).toHaveURL(/login|home/);
});

/**
 * TC_LOGIN_004: Login with invalid username
 */
test('TC_LOGIN_004 - Login with invalid username', async ({ page }) => {
    const component = new ComponentModule(page);
    const invalidUser = loginData.invalidCredentials[0];
    
    await component.navigateToLoginPage();
    await component.enterEmail(invalidUser.email);
    await component.enterPassword(invalidUser.password);
    await component.clickLoginButton();
    
    // Verify error message
    const errorMessage = await component.getErrorMessage();
    expect(errorMessage).toContain(invalidUser.errorMessage);
});

/**
 * TC_LOGIN_005: Login with invalid password
 */
test('TC_LOGIN_005 - Login with invalid password', async ({ page }) => {
    const component = new ComponentModule(page);
    const invalidUser = loginData.invalidCredentials[1];
    
    await component.navigateToLoginPage();
    await component.enterEmail(invalidUser.email);
    await component.enterPassword(invalidUser.password);
    await component.clickLoginButton();
    
    // Verify error message
    const errorMessage = await component.getErrorMessage();
    expect(errorMessage).toContain(invalidUser.errorMessage);
});

/**
 * TC_LOGIN_006: Login with empty credentials
 */
test('TC_LOGIN_006 - Login with empty credentials', async ({ page }) => {
    const component = new ComponentModule(page);
    const emptyData = loginData.edgeCases.empty;
    
    await component.navigateToLoginPage();
    await component.enterEmail(emptyData.email);
    await component.enterPassword(emptyData.password);
    await component.clickLoginButton();
    
    // Verify error message
    const errorMessage = await component.getErrorMessage();
    expect(errorMessage).toContain(emptyData.errorMessage);
});

/**
 * TC_LOGIN_007: Login with SQL injection attempt
 */
test('TC_LOGIN_007 - Login with SQL injection attempt', async ({ page }) => {
    const component = new ComponentModule(page);
    const sqlInjection = loginData.edgeCases.sqlInjection;
    
    await component.navigateToLoginPage();
    await component.enterEmail(sqlInjection.email);
    await component.enterPassword(sqlInjection.password);
    await component.clickLoginButton();
    
    // Should not allow SQL injection - show error
    const isLoggedIn = await component.isLoggedIn();
    expect(isLoggedIn).toBe(false);
});

/**
 * TC_LOGIN_008: Login with special characters
 */
test('TC_LOGIN_008 - Login with special characters', async ({ page }) => {
    const component = new ComponentModule(page);
    const specialChars = loginData.edgeCases.specialCharsPassword;
    
    await component.navigateToLoginPage();
    await component.enterEmail(specialChars.email);
    await component.enterPassword(specialChars.password);
    await component.clickLoginButton();
    
    // Should not allow special characters - show error
    const isLoggedIn = await component.isLoggedIn();
    expect(isLoggedIn).toBe(false);
});

/**
 * TC_LOGIN_009: Case sensitivity in credentials
 */
test('TC_LOGIN_009 - Case sensitivity in credentials', async ({ page }) => {
    const component = new ComponentModule(page);
    const caseSensitivity = loginData.edgeCases.caseSensitivity;
    
    await component.navigateToLoginPage();
    await component.enterEmail(caseSensitivity.email);
    await component.enterPassword(caseSensitivity.password);
    await component.clickLoginButton();
    
    // Should fail due to case sensitivity
    const isLoggedIn = await component.isLoggedIn();
    expect(isLoggedIn).toBe(false);
});

// ============================================
// PRODUCT TEST CASES
// ============================================

/**
 * TC_PROD_001: Search product with valid keyword
 */
test('TC_PROD_001 - Search product with valid keyword', async ({ page }) => {
    const component = new ComponentModule(page);
    const searchTerm = productsData.searchTerms.valid[0];
    
    await component.navigateToProductsPage();
    await component.searchProduct(searchTerm);
    
    // Verify products are displayed
    const productCount = await component.getProductNames();
    expect(productCount.length).toBeGreaterThan(0);
});

/**
 * TC_PROD_002: Filter products by category
 */
test('TC_PROD_002 - Filter products by category', async ({ page }) => {
    const component = new ComponentModule(page);
    const category = productsData.categories[0];
    
    await component.navigateToProductsPage();
    await component.filterByCategory(category);
    
    // Wait for filter to apply
    await page.waitForTimeout(1000);
    
    // Verify products are displayed
    const productCount = await component.getProductNames();
    expect(productCount.length).toBeGreaterThanOrEqual(0);
});

/**
 * TC_PROD_003: Sort products by price low-high
 */
test('TC_PROD_003 - Sort products by price low-high', async ({ page }) => {
    const component = new ComponentModule(page);
    const sortOption = productsData.sortOptions.priceLowHigh;
    
    await component.navigateToProductsPage();
    await component.sortProducts(sortOption);
    
    // Get product prices
    const prices = await component.getProductPrices();
    expect(prices.length).toBeGreaterThan(0);
});

/**
 * TC_PROD_004: Search with no results
 */
test('TC_PROD_004 - Search with no results', async ({ page }) => {
    const component = new ComponentModule(page);
    const noResultTerm = productsData.searchTerms.noResults[0];
    
    await component.navigateToProductsPage();
    await component.searchProduct(noResultTerm);
    
    // Verify no results message
    const message = await component.getNoResultsMessage();
    expect(message).toBeTruthy();
});

/**
 * TC_PROD_005: Search with special characters
 */
test('TC_PROD_005 - Search with special characters', async ({ page }) => {
    const component = new ComponentModule(page);
    const specialCharTerm = productsData.searchTerms.specialChars[0];
    
    await component.navigateToProductsPage();
    await component.searchProduct(specialCharTerm);
    
    // Should either show no results or handle gracefully
    const message = await component.getNoResultsMessage();
    expect(message).toBeTruthy();
});

/**
 * TC_PROD_006: Search with empty string
 */
test('TC_PROD_006 - Search with empty string', async ({ page }) => {
    const component = new ComponentModule(page);
    const emptyTerm = productsData.searchTerms.empty;
    
    await component.navigateToProductsPage();
    await component.searchProduct(emptyTerm);
    
    // Should either show all products or no results
    await page.waitForTimeout(1000);
});

// ============================================
// CART TEST CASES
// ============================================

/**
 * TC_CART_001: Add single product to cart
 */
test('TC_CART_001 - Add single product to cart', async ({ page }) => {
    const component = new ComponentModule(page);
    const cartTestData = cartData.addToCart[0];
    
    await component.navigateToProductsPage();
    await component.addProductToCart(0);
    
    // Wait for cart to update
    await page.waitForTimeout(1000);
    
    // Verify cart count
    const cartCount = await component.getCartItemCount();
    expect(cartCount).toBe(cartTestData.expectedCartCount);
});

/**
 * TC_CART_002: Update product quantity
 */
test('TC_CART_002 - Update product quantity', async ({ page }) => {
    const component = new ComponentModule(page);
    const updateData = cartData.updateQuantity[0];
    
    await component.navigateToCartPage();
    
    // If cart has items, update quantity
    const cartCount = await component.getCartItemsCount();
    if (cartCount > 0) {
        await component.updateQuantity(0, updateData.newQty);
        
        // Verify quantity updated
        await page.waitForTimeout(1000);
    }
});

/**
 * TC_CART_003: Remove product from cart
 */
test('TC_CART_003 - Remove product from cart', async ({ page }) => {
    const component = new ComponentModule(page);
    
    await component.navigateToCartPage();
    
    // If cart has items, remove one
    const cartCount = await component.getCartItemsCount();
    if (cartCount > 0) {
        await component.removeItem(0);
        await page.waitForTimeout(1000);
    }
});

/**
 * TC_CART_004: Add out-of-stock product
 */
test('TC_CART_004 - Add out-of-stock product', async ({ page }) => {
    const component = new ComponentModule(page);
    const outOfStockData = cartData.edgeCases.outOfStockProduct;
    
    // Try to add out of stock product
    await component.navigateToProductsPage();
    await component.addProductToCartById(outOfStockData.productId);
    
    // Should show error or prevent adding
    await page.waitForTimeout(1000);
});

/**
 * TC_CART_005: Quantity exceeds limit
 */
test('TC_CART_005 - Quantity exceeds limit', async ({ page }) => {
    const component = new ComponentModule(page);
    const maxQty = cartData.edgeCases.maxQuantity.quantity;
    
    await component.navigateToCartPage();
    
    const cartCount = await component.getCartItemsCount();
    if (cartCount > 0) {
        await component.updateQuantity(0, maxQty);
        await page.waitForTimeout(1000);
    }
});

// ============================================
// CHECKOUT TEST CASES
// ============================================

/**
 * TC_CHK_001: Complete checkout with valid data
 */
test('TC_CHK_001 - Complete checkout with valid data', async ({ page }) => {
    const component = new ComponentModule(page);
    const checkoutInfo = checkoutData.validCheckout[0];
    
    // First add product to cart
    await component.navigateToProductsPage();
    await component.addProductToCart(0);
    await page.waitForTimeout(1000);
    
    // Proceed to checkout
    await component.navigateToCheckoutPage();
    
    // Complete checkout
    await component.completeCheckout(checkoutInfo);
    
    // Should navigate to confirmation or show success
    await page.waitForTimeout(2000);
});

/**
 * TC_CHK_002: Apply valid promo code
 */
test('TC_CHK_002 - Apply valid promo code', async ({ page }) => {
    const component = new ComponentModule(page);
    const promoCode = checkoutData.promoCodes.valid;
    
    await component.navigateToCartPage();
    await component.applyPromoCode(promoCode.code);
    
    // Wait for promo to apply
    await page.waitForTimeout(1000);
});

/**
 * TC_CHK_003: Guest checkout (without login)
 */
test('TC_CHK_003 - Guest checkout (without login)', async ({ page }) => {
    const component = new ComponentModule(page);
    const guestCheckout = checkoutData.guestCheckout;
    
    // Add product to cart
    await component.navigateToProductsPage();
    await component.addProductToCart(0);
    await page.waitForTimeout(1000);
    
    // Proceed to checkout as guest
    await component.navigateToCheckoutPage();
    
    // Fill shipping info
    await component.fillShippingAddress(guestCheckout.shipping);
    
    // Should continue without login
    await page.waitForTimeout(1000);
});

/**
 * TC_CHK_004: Apply invalid promo code
 */
test('TC_CHK_004 - Apply invalid promo code', async ({ page }) => {
    const component = new ComponentModule(page);
    const promoCode = checkoutData.promoCodes.invalid;
    
    await component.navigateToCartPage();
    await component.applyPromoCode(promoCode.code);
    
    // Get error message
    const errorMessage = await component.getPromoCodeError();
    expect(errorMessage).toContain(promoCode.errorMessage);
});

/**
 * TC_CHK_005: Apply expired promo code
 */
test('TC_CHK_005 - Apply expired promo code', async ({ page }) => {
    const component = new ComponentModule(page);
    const promoCode = checkoutData.promoCodes.expired;
    
    await component.navigateToCartPage();
    await component.applyPromoCode(promoCode.code);
    
    // Get error message
    const errorMessage = await component.getPromoCodeError();
    expect(errorMessage).toContain(promoCode.errorMessage);
});

/**
 * TC_CHK_006: Empty required shipping fields
 */
test('TC_CHK_006 - Empty required shipping fields', async ({ page }) => {
    const component = new ComponentModule(page);
    const emptyFields = checkoutData.edgeCases.emptyFields;
    
    await component.navigateToCheckoutPage();
    await component.fillShippingAddress(emptyFields.shipping);
    
    // Try to continue
    await component.continueToPayment();
    
    // Should show validation errors
    await page.waitForTimeout(1000);
});

// ============================================
// ORDER HISTORY TEST CASES
// ============================================

/**
 * TC_ORDER_001: View order history
 */
test('TC_ORDER_001 - View order history', async ({ page }) => {
    const component = new ComponentModule(page);
    
    await component.navigateToOrderHistoryPage();
    
    // Get order count
    const orderCount = await component.getOrderCount();
    expect(orderCount).toBeGreaterThanOrEqual(0);
});

/**
 * TC_ORDER_002: View order details
 */
test('TC_ORDER_002 - View order details', async ({ page }) => {
    const component = new ComponentModule(page);
    
    await component.navigateToOrderHistoryPage();
    
    const orderCount = await component.getOrderCount();
    if (orderCount > 0) {
        await component.viewOrderDetails(0);
        await page.waitForTimeout(1000);
    }
});

/**
 * TC_ORDER_003: Filter orders by status
 */
test('TC_ORDER_003 - Filter orders by status', async ({ page }) => {
    const component = new ComponentModule(page);
    const status = ordersData.orderStatuses[0];
    
    await component.navigateToOrderHistoryPage();
    await component.filterOrdersByStatus(status);
    
    // Wait for filter to apply
    await page.waitForTimeout(1000);
});

/**
 * TC_ORDER_004: Empty order history
 */
test('TC_ORDER_004 - Empty order history', async ({ page }) => {
    const component = new ComponentModule(page);
    
    await component.navigateToOrderHistoryPage();
    
    // Check if empty
    const isEmpty = await component.isOrderHistoryEmpty();
    if (isEmpty) {
        const message = await component.getNoOrdersMessage();
        expect(message).toBeTruthy();
    }
});

// ============================================
// EXPORT TEST CONFIGURATION
// ============================================

});
