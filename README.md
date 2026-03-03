# Hybrid Playwright Test Automation Framework

A comprehensive hybrid test automation framework for E-commerce applications using Playwright JavaScript.

## 📁 Project Structure

```
KilloCodeDemo/
├── Framework/
│   ├── CommonMethods/
│   │   └── PlaywrightCommon.js     # Reusable Playwright methods
│   ├── Components/
│   │   └── ComponentModule.js     # Main component module with test cases
│   ├── Locators/
│   │   └── locators.js            # XPath and CSS selectors
│   └── TestData/
│       ├── login.json             # Login test data
│       ├── products.json          # Product test data
│       ├── cart.json             # Cart test data
│       ├── checkout.json         # Checkout test data
│       └── orders.json           # Orders test data
├── Tests/
│   └── testRunner.js              # Test execution file
├── package.json                   # NPM dependencies
├── playwright Playwright configuration
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js.config.js           # (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Running Tests

```bash
# Run all tests
npm test

# Run with headed mode (visible browser)
npm run test:headed

# Run with debug mode
npm run test:debug

# Generate HTML report
npm run test:report
```

## 📋 Framework Components

### 1. PlaywrightCommon.js
A separate class containing all reusable Playwright methods:

**Click Methods:**
- `click(locator)` - Single click
- `doubleClick(locator)` - Double click
- `rightClick(locator)` - Right click
- `clickAndHold(locator, duration)` - Click and hold

**Input Methods:**
- `type(locator, text)` - Type with delay
- `fill(locator, text)` - Fill immediately
- `pressKey(locator, key)` - Press key
- `clear(locator)` - Clear input

**Wait Methods:**
- `waitForElement(locator)` - Wait for element
- `waitForVisible(locator)` - Wait for visibility
- `waitForHidden(locator)` - Wait for hidden
- `waitForText(locator, text)` - Wait for text

**Assertion Methods:**
- `expectVisible(locator)` - Assert visible
- `expectText(locator, text)` - Assert text
- `expectValue(locator, value)` - Assert value
- `expectCount(locator, count)` - Assert count
- `expectAttribute(locator, attr, value)` - Assert attribute

**Element Methods:**
- `hover(locator)` - Mouse hover
- `scrollIntoView(locator)` - Scroll to element
- `getText(locator)` - Get text content
- `getAttribute(locator, attr)` - Get attribute
- `getCount(locator)` - Get element count

### 2. Locators.js
A separate file containing all XPath and CSS selectors organized by page:

- `LoginLocators` - Login page selectors
- `ProductLocators` - Product page selectors
- `CartLocators` - Cart page selectors
- `CheckoutLocators` - Checkout page selectors
- `OrderHistoryLocators` - Order history selectors
- `CommonLocators` - Common/shared selectors

### 3. ComponentModule.js
The main component module containing:

- **Login Methods** - login, logout, enterEmail, enterPassword
- **Product Methods** - searchProduct, filterByCategory, sortProducts
- **Cart Methods** - addToCart, updateQuantity, removeItem
- **Checkout Methods** - fillShippingAddress, selectPaymentMethod, placeOrder
- **Order Methods** - viewOrderDetails, reorderFromOrder, cancelOrder

### 4. Test Data (JSON Files)
External JSON files containing test data:

- `login.json` - Valid users, invalid credentials, edge cases
- `products.json` - Products, categories, filters, search terms
- `cart.json` - Add to cart, update quantity, edge cases
- `checkout.json` - Shipping, payment, promo codes
- `orders.json` - Order history, statuses, actions

## 🧪 Test Cases

The framework includes the following test cases:

### Login Tests (TC_LOGIN_*)
- TC_LOGIN_001: Valid login with correct credentials
- TC_LOGIN_002: Login with remember me checked
- TC_LOGIN_003: Successful logout after login
- TC_LOGIN_004: Login with invalid username
- TC_LOGIN_005: Login with invalid password
- TC_LOGIN_006: Login with empty credentials
- TC_LOGIN_007: Login with SQL injection attempt
- TC_LOGIN_008: Login with special characters
- TC_LOGIN_009: Case sensitivity in credentials

### Product Tests (TC_PROD_*)
- TC_PROD_001: Search product with valid keyword
- TC_PROD_002: Filter products by category
- TC_PROD_003: Sort products by price
- TC_PROD_004: Search with no results
- TC_PROD_005: Search with special characters
- TC_PROD_006: Search with empty string

### Cart Tests (TC_CART_*)
- TC_CART_001: Add single product to cart
- TC_CART_002: Update product quantity
- TC_CART_003: Remove product from cart
- TC_CART_004: Add out-of-stock product
- TC_CART_005: Quantity exceeds limit

### Checkout Tests (TC_CHK_*)
- TC_CHK_001: Complete checkout with valid data
- TC_CHK_002: Apply valid promo code
- TC_CHK_003: Guest checkout
- TC_CHK_004: Apply invalid promo code
- TC_CHK_005: Apply expired promo code
- TC_CHK_006: Empty required shipping fields

### Order Tests (TC_ORDER_*)
- TC_ORDER_001: View order history
- TC_ORDER_002: View order details
- TC_ORDER_003: Filter orders by status
- TC_ORDER_004: Empty order history

## 🔧 Configuration

Edit `playwright.config.js` to customize:

- Base URL
- Browser selection
- Test timeouts
- Retry settings
- Reporter configuration

## 📝 Usage Example

```javascript
const { ComponentModule } = require('./Framework/Components/ComponentModule');

// In your test file
test('Login Test', async ({ page }) => {
    const component = new ComponentModule(page);
    
    // Use test data
    const validUser = loginData.validUsers[0];
    
    // Execute login
    await component.login(validUser.email, validUser.password);
    
    // Verify
    const isLoggedIn = await component.isLoggedIn();
    expect(isLoggedIn).toBe(true);
});
```

## 🎯 Features

- ✅ **Hybrid Framework** - Combines Data-Driven and Component-Based approaches
- ✅ **Modular Design** - Separate files for locators, common methods, and test data
- ✅ **Data-Driven** - All test data externalized to JSON files
- ✅ **Reusable Methods** - Common methods class for DRY principle
- ✅ **Page Object Model** - Organized structure for maintainability
- ✅ **Edge Case Coverage** - Comprehensive test scenarios
- ✅ **HTML Reports** - Built-in Playwright reporting

## 📄 License

MIT
