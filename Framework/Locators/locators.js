/**
 * Locators.js
 * Contains all XPath and CSS selectors for E-commerce application
 * Organized by page/module
 */

// ============================================
// Login Page Locators
// ============================================
const LoginLocators = {
    // Input Fields
    usernameInput: {
        xpath: "//input[@id='username']",
        css: "#username",
        name: "Username Input Field"
    },
    passwordInput: {
        xpath: "//input[@type='password']",
        css: "input[type='password']",
        name: "Password Input Field"
    },
    emailInput: {
        xpath: "//input[@id='email']",
        css: "#email",
        name: "Email Input Field"
    },
    
    // Buttons
    loginButton: {
        xpath: "//button[@type='submit']",
        css: "button[type='submit']",
        name: "Login Submit Button"
    },
    logoutButton: {
        xpath: "//button[contains(text(),'Logout')]",
        css: ".logout-btn",
        name: "Logout Button"
    },
    
    // Links
    forgotPasswordLink: {
        xpath: "//a[contains(text(),'Forgot Password')]",
        css: "a[href*='forgot-password']",
        name: "Forgot Password Link"
    },
    registerLink: {
        xpath: "//a[contains(text(),'Register')]",
        css: "a[href*='register']",
        name: "Register Link"
    },
    
    // Checkboxes
    rememberMe: {
        xpath: "//input[@id='remember-me']",
        css: "#remember-me",
        name: "Remember Me Checkbox"
    },
    
    // Messages
    errorMessage: {
        xpath: "//div[contains(@class,'error-message')]",
        css: ".error-message",
        name: "Error Message"
    },
    successMessage: {
        xpath: "//div[contains(@class,'success-message')]",
        css: ".success-message",
        name: "Success Message"
    },
    validationError: {
        xpath: "//span[contains(@class,'field-error')]",
        css: ".field-error",
        name: "Field Validation Error"
    }
};

// ============================================
// Product Page Locators
// ============================================
const ProductLocators = {
    // Search
    searchInput: {
        xpath: "//input[@placeholder='Search products']",
        css: "input[placeholder*='Search']",
        name: "Product Search Input"
    },
    searchButton: {
        xpath: "//button[@class='search-btn']",
        css: ".search-btn",
        name: "Search Button"
    },
    clearSearch: {
        xpath: "//button[contains(@class,'clear-search')]",
        css: ".clear-search",
        name: "Clear Search Button"
    },
    
    // Product List
    productList: {
        xpath: "//div[@class='product-list']",
        css: ".product-list",
        name: "Product List Container"
    },
    productItem: {
        xpath: "//div[@class='product-item']",
        css: ".product-item",
        name: "Individual Product Item"
    },
    productCard: {
        xpath: "//div[@class='product-card']",
        css: ".product-card",
        name: "Product Card"
    },
    
    // Product Details
    productName: {
        xpath: "//div[@class='product-name']",
        css: ".product-name",
        name: "Product Name"
    },
    productPrice: {
        xpath: "//div[@class='product-price']",
        css: ".product-price",
        name: "Product Price"
    },
    productOriginalPrice: {
        xpath: "//div[@class='original-price']",
        css: ".original-price",
        name: "Original Price (before discount)"
    },
    productDescription: {
        xpath: "//div[@class='product-description']",
        css: ".product-description",
        name: "Product Description"
    },
    productImage: {
        xpath: "//img[@class='product-image']",
        css: ".product-image",
        name: "Product Image"
    },
    productRating: {
        xpath: "//div[@class='product-rating']",
        css: ".product-rating",
        name: "Product Rating"
    },
    outOfStockLabel: {
        xpath: "//span[contains(@class,'out-of-stock')]",
        css: ".out-of-stock",
        name: "Out of Stock Label"
    },
    saleLabel: {
        xpath: "//span[contains(@class,'sale-label')]",
        css: ".sale-label",
        name: "Sale Label"
    },
    
    // Actions
    addToCartButton: {
        xpath: "//button[contains(text(),'Add to Cart')]",
        css: "button.add-to-cart",
        name: "Add to Cart Button"
    },
    viewDetailsButton: {
        xpath: "//button[contains(text(),'View Details')]",
        css: ".view-details-btn",
        name: "View Details Button"
    },
    wishlistButton: {
        xpath: "//button[contains(@class,'wishlist-btn')]",
        css: ".wishlist-btn",
        name: "Add to Wishlist Button"
    },
    
    // Filters & Sorting
    filterCategory: {
        xpath: "//select[@id='category-filter']",
        css: "#category-filter",
        name: "Category Filter Dropdown"
    },
    filterBrand: {
        xpath: "//select[@id='brand-filter']",
        css: "#brand-filter",
        name: "Brand Filter Dropdown"
    },
    filterPrice: {
        xpath: "//select[@id='price-filter']",
        css: "#price-filter",
        name: "Price Filter Dropdown"
    },
    sortDropdown: {
        xpath: "//select[@id='sort-by']",
        css: "#sort-by",
        name: "Sort By Dropdown"
    },
    
    // Pagination
    paginationContainer: {
        xpath: "//div[@class='pagination']",
        css: ".pagination",
        name: "Pagination Container"
    },
    nextPageButton: {
        xpath: "//button[contains(text(),'Next')]",
        css: ".pagination-next",
        name: "Next Page Button"
    },
    previousPageButton: {
        xpath: "//button[contains(text(),'Previous')]",
        css: ".pagination-previous",
        name: "Previous Page Button"
    },
    pageNumber: {
        xpath: "//button[contains(@class,'page-number')]",
        css: ".page-number",
        name: "Page Number Button"
    },
    
    // No Results
    noResultsMessage: {
        xpath: "//div[contains(@class,'no-results')]",
        css: ".no-results",
        name: "No Results Found Message"
    }
};

// ============================================
// Shopping Cart Page Locators
// ============================================
const CartLocators = {
    // Cart Icon/Button
    cartIcon: {
        xpath: "//a[contains(@class,'cart-icon')]",
        css: "a.cart-icon",
        name: "Cart Icon (Header)"
    },
    cartButton: {
        xpath: "//button[contains(@class,'cart-btn')]",
        css: ".cart-btn",
        name: "Cart Button"
    },
    cartBadge: {
        xpath: "//span[contains(@class,'cart-badge')]",
        css: ".cart-badge",
        name: "Cart Item Count Badge"
    },
    
    // Cart Page
    cartPage: {
        xpath: "//div[@class='cart-page']",
        css: ".cart-page",
        name: "Cart Page Container"
    },
    cartItem: {
        xpath: "//div[@class='cart-item']",
        css: ".cart-item",
        name: "Cart Item"
    },
    cartItemName: {
        xpath: "//div[@class='cart-item-name']",
        css: ".cart-item-name",
        name: "Cart Item Name"
    },
    cartItemPrice: {
        xpath: "//div[@class='cart-item-price']",
        css: ".cart-item-price",
        name: "Cart Item Price"
    },
    
    // Quantity
    quantityInput: {
        xpath: "//input[@class='quantity-input']",
        css: ".quantity-input",
        name: "Quantity Input Field"
    },
    increaseQuantityButton: {
        xpath: "//button[contains(@class,'increase-qty')]",
        css: ".increase-qty",
        name: "Increase Quantity Button"
    },
    decreaseQuantityButton: {
        xpath: "//button[contains(@class,'decrease-qty')]",
        css: ".decrease-qty",
        name: "Decrease Quantity Button"
    },
    
    // Actions
    removeButton: {
        xpath: "//button[contains(@class,'remove-item')]",
        css: ".remove-item",
        name: "Remove Item Button"
    },
    updateCartButton: {
        xpath: "//button[contains(text(),'Update Cart')]",
        css: ".update-cart-btn",
        name: "Update Cart Button"
    },
    continueShoppingButton: {
        xpath: "//button[contains(text(),'Continue Shopping')]",
        css: ".continue-shopping-btn",
        name: "Continue Shopping Button"
    },
    proceedToCheckout: {
        xpath: "//button[contains(text(),'Proceed to Checkout')]",
        css: ".checkout-btn",
        name: "Proceed to Checkout Button"
    },
    
    // Cart Summary
    cartSubtotal: {
        xpath: "//div[@class='cart-subtotal']",
        css: ".cart-subtotal",
        name: "Cart Subtotal"
    },
    cartTax: {
        xpath: "//div[@class='cart-tax']",
        css: ".cart-tax",
        name: "Cart Tax"
    },
    cartShipping: {
        xpath: "//div[@class='cart-shipping']",
        css: ".cart-shipping",
        name: "Cart Shipping Cost"
    },
    cartDiscount: {
        xpath: "//div[@class='cart-discount']",
        css: ".cart-discount",
        name: "Cart Discount"
    },
    cartTotal: {
        xpath: "//div[@class='cart-total']",
        css: ".cart-total",
        name: "Cart Total"
    },
    
    // Empty Cart
    emptyCartMessage: {
        xpath: "//div[contains(@class,'empty-cart')]",
        css: ".empty-cart",
        name: "Empty Cart Message"
    },
    emptyCartIcon: {
        xpath: "//div[contains(@class,'empty-cart-icon')]",
        css: ".empty-cart-icon",
        name: "Empty Cart Icon"
    },
    
    // Promo Code
    promoCodeInput: {
        xpath: "//input[@id='promo-code']",
        css: "#promo-code",
        name: "Promo Code Input"
    },
    applyPromoButton: {
        xpath: "//button[contains(text(),'Apply')]",
        css: ".apply-promo-btn",
        name: "Apply Promo Code Button"
    },
    promoCodeError: {
        xpath: "//div[contains(@class,'promo-error')]",
        css: ".promo-error",
        name: "Promo Code Error Message"
    }
};

// ============================================
// Checkout Page Locators
// ============================================
const CheckoutLocators = {
    // Checkout Container
    checkoutPage: {
        xpath: "//div[@class='checkout-page']",
        css: ".checkout-page",
        name: "Checkout Page Container"
    },
    
    // Shipping Form
    shippingForm: {
        xpath: "//form[@id='shipping-form']",
        css: "#shipping-form",
        name: "Shipping Address Form"
    },
    shippingName: {
        xpath: "//input[@id='shipping-name']",
        css: "#shipping-name",
        name: "Shipping Name"
    },
    shippingAddress: {
        xpath: "//input[@id='shipping-address']",
        css: "#shipping-address",
        name: "Shipping Street Address"
    },
    shippingAddress2: {
        xpath: "//input[@id='shipping-address2']",
        css: "#shipping-address2",
        name: "Shipping Address Line 2"
    },
    shippingCity: {
        xpath: "//input[@id='shipping-city']",
        css: "#shipping-city",
        name: "Shipping City"
    },
    shippingState: {
        xpath: "//select[@id='shipping-state']",
        css: "#shipping-state",
        name: "Shipping State"
    },
    shippingZip: {
        xpath: "//input[@id='shipping-zip']",
        css: "#shipping-zip",
        name: "Shipping ZIP Code"
    },
    shippingCountry: {
        xpath: "//select[@id='shipping-country']",
        css: "#shipping-country",
        name: "Shipping Country"
    },
    shippingPhone: {
        xpath: "//input[@id='shipping-phone']",
        css: "#shipping-phone",
        name: "Shipping Phone"
    },
    
    // Billing Form
    billingForm: {
        xpath: "//form[@id='billing-form']",
        css: "#billing-form",
        name: "Billing Address Form"
    },
    sameAsShipping: {
        xpath: "//input[@id='same-as-shipping']",
        css: "#same-as-shipping",
        name: "Same as Shipping Checkbox"
    },
    
    // Shipping Methods
    shippingMethods: {
        xpath: "//div[@class='shipping-methods']",
        css: ".shipping-methods",
        name: "Shipping Methods Container"
    },
    standardShipping: {
        xpath: "//input[@value='standard']",
        css: "input[value='standard']",
        name: "Standard Shipping Option"
    },
    expressShipping: {
        xpath: "//input[@value='express']",
        css: "input[value='express']",
        name: "Express Shipping Option"
    },
    overnightShipping: {
        xpath: "//input[@value='overnight']",
        css: "input[value='overnight']",
        name: "Overnight Shipping Option"
    },
    
    // Payment Methods
    paymentMethods: {
        xpath: "//div[@class='payment-methods']",
        css: ".payment-methods",
        name: "Payment Methods Container"
    },
    creditCardOption: {
        xpath: "//input[@value='creditCard']",
        css: "input[value='creditCard']",
        name: "Credit Card Option"
    },
    paypalOption: {
        xpath: "//input[@value='paypal']",
        css: "input[value='paypal']",
        name: "PayPal Option"
    },
    debitCardOption: {
        xpath: "//input[@value='debitCard']",
        css: "input[value='debitCard']",
        name: "Debit Card Option"
    },
    
    // Credit Card Form
    cardNumber: {
        xpath: "//input[@id='card-number']",
        css: "#card-number",
        name: "Card Number Input"
    },
    cardExpiry: {
        xpath: "//input[@id='card-expiry']",
        css: "#card-expiry",
        name: "Card Expiry Input"
    },
    cardCvv: {
        xpath: "//input[@id='card-cvv']",
        css: "#card-cvv",
        name: "Card CVV Input"
    },
    cardName: {
        xpath: "//input[@id='card-name']",
        css: "#card-name",
        name: "Name on Card Input"
    },
    
    // Order Summary
    orderSummary: {
        xpath: "//div[@class='order-summary']",
        css: ".order-summary",
        name: "Order Summary Section"
    },
    orderItems: {
        xpath: "//div[@class='order-items']",
        css: ".order-items",
        name: "Order Items List"
    },
    orderSubtotal: {
        xpath: "//div[@class='order-subtotal']",
        css: ".order-subtotal",
        name: "Order Subtotal"
    },
    orderShipping: {
        xpath: "//div[@class='order-shipping']",
        css: ".order-shipping",
        name: "Order Shipping Cost"
    },
    orderTax: {
        xpath: "//div[@class='order-tax']",
        css: ".order-tax",
        name: "Order Tax"
    },
    orderDiscount: {
        xpath: "//div[@class='order-discount']",
        css: ".order-discount",
        name: "Order Discount"
    },
    orderTotal: {
        xpath: "//div[@class='order-total']",
        css: ".order-total",
        name: "Order Total"
    },
    
    // Promo Code
    checkoutPromoCodeInput: {
        xpath: "//input[@id='checkout-promo-code']",
        css: "#checkout-promo-code",
        name: "Checkout Promo Code Input"
    },
    checkoutApplyPromo: {
        xpath: "//button[contains(@class,'apply-checkout-promo')]",
        css: ".apply-checkout-promo",
        name: "Apply Checkout Promo Button"
    },
    
    // Buttons
    continueToPayment: {
        xpath: "//button[contains(text(),'Continue to Payment')]",
        css: ".continue-payment-btn",
        name: "Continue to Payment Button"
    },
    placeOrderButton: {
        xpath: "//button[contains(text(),'Place Order')]",
        css: ".place-order-btn",
        name: "Place Order Button"
    },
    backToCart: {
        xpath: "//button[contains(text(),'Back to Cart')]",
        css: ".back-to-cart-btn",
        name: "Back to Cart Button"
    },
    
    // Messages
    checkoutError: {
        xpath: "//div[contains(@class,'checkout-error')]",
        css: ".checkout-error",
        name: "Checkout Error Message"
    },
    fieldError: {
        xpath: "//span[contains(@class,'field-error')]",
        css: ".field-error",
        name: "Field Validation Error"
    }
};

// ============================================
// Order History Page Locators
// ============================================
const OrderHistoryLocators = {
    // Page
    orderHistoryPage: {
        xpath: "//div[@class='order-history-page']",
        css: ".order-history-page",
        name: "Order History Page"
    },
    
    // Order List
    orderList: {
        xpath: "//div[@class='order-list']",
        css: ".order-list",
        name: "Order List Container"
    },
    orderItem: {
        xpath: "//div[@class='order-item']",
        css: ".order-item",
        name: "Individual Order"
    },
    orderId: {
        xpath: "//div[@class='order-id']",
        css: ".order-id",
        name: "Order ID"
    },
    orderDate: {
        xpath: "//div[@class='order-date']",
        css: ".order-date",
        name: "Order Date"
    },
    orderStatus: {
        xpath: "//div[@class='order-status']",
        css: ".order-status",
        name: "Order Status"
    },
    orderTotal: {
        xpath: "//div[@class='order-total']",
        css: ".order-total",
        name: "Order Total Amount"
    },
    
    // Status Labels
    statusPending: {
        xpath: "//span[contains(@class,'status-pending')]",
        css: ".status-pending",
        name: "Pending Status"
    },
    statusProcessing: {
        xpath: "//span[contains(@class,'status-processing')]",
        css: ".status-processing",
        name: "Processing Status"
    },
    statusShipped: {
        xpath: "//span[contains(@class,'status-shipped')]",
        css: ".status-shipped",
        name: "Shipped Status"
    },
    statusDelivered: {
        xpath: "//span[contains(@class,'status-delivered')]",
        css: ".status-delivered",
        name: "Delivered Status"
    },
    statusCancelled: {
        xpath: "//span[contains(@class,'status-cancelled')]",
        css: ".status-cancelled",
        name: "Cancelled Status"
    },
    
    // Actions
    viewOrderButton: {
        xpath: "//button[contains(text(),'View Order')]",
        css: ".view-order-btn",
        name: "View Order Details Button"
    },
    reorderButton: {
        xpath: "//button[contains(text(),'Reorder')]",
        css: ".reorder-btn",
        name: "Reorder Button"
    },
    cancelOrderButton: {
        xpath: "//button[contains(text(),'Cancel Order')]",
        css: ".cancel-order-btn",
        name: "Cancel Order Button"
    },
    downloadInvoiceButton: {
        xpath: "//button[contains(text(),'Download Invoice')]",
        css: ".download-invoice-btn",
        name: "Download Invoice Button"
    },
    trackOrderButton: {
        xpath: "//button[contains(text(),'Track Order')]",
        css: ".track-order-btn",
        name: "Track Order Button"
    },
    
    // Filters
    statusFilter: {
        xpath: "//select[@id='order-status-filter']",
        css: "#order-status-filter",
        name: "Order Status Filter"
    },
    dateRangeFilter: {
        xpath: "//select[@id='date-range-filter']",
        css: "#date-range-filter",
        name: "Date Range Filter"
    },
    
    // Empty State
    noOrdersMessage: {
        xpath: "//div[contains(@class,'no-orders')]",
        css: ".no-orders",
        name: "No Orders Message"
    }
};

// ============================================
// Common/Shared Locators
// ============================================
const CommonLocators = {
    // Header
    header: {
        xpath: "//header[@class='header']",
        css: "header.header",
        name: "Page Header"
    },
    logo: {
        xpath: "//div[@class='logo']",
        css: ".logo",
        name: "Logo"
    },
    userMenu: {
        xpath: "//div[@class='user-menu']",
        css: ".user-menu",
        name: "User Menu"
    },
    userProfile: {
        xpath: "//a[contains(@class,'user-profile')]",
        css: ".user-profile",
        name: "User Profile Link"
    },
    
    // Footer
    footer: {
        xpath: "//footer[@class='footer']",
        css: "footer.footer",
        name: "Page Footer"
    },
    
    // Navigation
    navigation: {
        xpath: "//nav[@class='navigation']",
        css: "nav.navigation",
        name: "Navigation Menu"
    },
    navLink: {
        xpath: "//a[contains(@class,'nav-link')]",
        css: ".nav-link",
        name: "Navigation Link"
    },
    
    // Loading
    loadingSpinner: {
        xpath: "//div[contains(@class,'loading-spinner')]",
        css: ".loading-spinner",
        name: "Loading Spinner"
    },
    loadingOverlay: {
        xpath: "//div[contains(@class,'loading-overlay')]",
        css: ".loading-overlay",
        name: "Loading Overlay"
    },
    
    // Modal
    modal: {
        xpath: "//div[@class='modal']",
        css: ".modal",
        name: "Modal Dialog"
    },
    modalClose: {
        xpath: "//button[contains(@class,'modal-close')]",
        css: ".modal-close",
        name: "Modal Close Button"
    },
    
    // Toast Notifications
    toastMessage: {
        xpath: "//div[contains(@class,'toast-message')]",
        css: ".toast-message",
        name: "Toast Notification"
    },
    successToast: {
        xpath: "//div[contains(@class,'toast-success')]",
        css: ".toast-success",
        name: "Success Toast"
    },
    errorToast: {
        xpath: "//div[contains(@class,'toast-error')]",
        css: ".toast-error",
        name: "Error Toast"
    },
    
    // Alerts
    alertBox: {
        xpath: "//div[contains(@class,'alert')]",
        css: ".alert",
        name: "Alert Box"
    }
};

// Export all locators
module.exports = {
    LoginLocators,
    ProductLocators,
    CartLocators,
    CheckoutLocators,
    OrderHistoryLocators,
    CommonLocators
};
