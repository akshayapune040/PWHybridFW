# Hybrid Playwright Test Automation Framework - Architecture Plan (Updated)

## 1. Project Overview

**Project Name**: E-Commerce Hybrid Playwright Framework  
**Project Type**: Test Automation Framework  
**Core Functionality**: A hybrid test automation framework for E-commerce web applications using Playwright JavaScript, featuring a centralized Component Module containing all test cases, methods, external test data integration, and a separate common methods utility class.  
**Target Users**: QA Engineers, SDETs, Automation Testers

---

## 2. Framework Architecture

### 2.1 Hybrid Framework Design Pattern

The framework combines **Data-Driven**, **Component-Based**, and **Modular** testing approaches:

- **Component Module**: Central file containing all page objects, methods, and test cases
- **Common Methods Class**: Separate utility file with reusable Playwright methods
- **Locators File**: Separate file for XPath/CSS selectors
- **External Test Data**: JSON files separate from logic for reusability
- **Page Object Model (POM)**: Integrated within the component module

### 2.2 Directory Structure

```
KilloCodeDemo/
├── Framework/
│   ├── Config/
│   │   ├── config.js              # Global configuration
│   │   └── environments.json      # Environment-specific settings
│   ├── Components/
│   │   └── ComponentModule.js     # Main component module with test cases
│   ├── Locators/
│   │   └── locators.js            # All XPath and CSS selectors
│   ├── CommonMethods/
│   │   └── PlaywrightCommon.js    # Reusable Playwright methods
│   ├── TestData/
│   │   ├── login.json             # Login test data
│   │   ├── products.json          # Product catalog test data
│   │   ├── cart.json              # Cart test data
│   │   ├── checkout.json          # Checkout test data
│   │   └── orders.json            # Order history test data
│   ├── Utils/
│   │   ├── dataReader.js          # JSON data reader utility
│   │   ├── logger.js              # Custom logging utility
│   │   └── helpers.js             # Common helper functions
│   └── Reports/
│       └── playwright-report/     # Test execution reports
├── Tests/
│   └── testRunner.js              # Test execution file
├── package.json                   # NPM dependencies
└── playwright.config.js           # Playwright configuration
```

---

## 3. Key Components

### 3.1 PlaywrightCommon.js - Common Methods Class

This separate class contains all reusable Playwright methods:

```javascript
class PlaywrightCommon {
    // Click Methods
    click(locator)                         // Single click
    doubleClick(locator)                   // Double click
    rightClick(locator)                    // Right click/context menu
    clickAndHold(locator, duration)        // Click and hold
    
    // Input Methods
    type(locator, text, options)            // Type with delay
    fill(locator, text)                     // Fill immediately
    pressKey(locator, key)                  // Press specific key
    clear(locator)                          // Clear input field
    
    // Navigation Methods
    goto(url)                               // Navigate to URL
    back()                                  // Browser back
    forward()                               // Browser forward
    reload()                                // Reload page
    
    // Wait Methods
    waitForElement(locator, options)        // Wait for element
    waitForVisible(locator)                 // Wait for visibility
    waitForHidden(locator)                  // Wait for hidden
    waitForEnabled(locator)                 // Wait for enabled
    waitForText(locator, text)              // Wait for text
    
    // Assertion Methods
    expectVisible(locator)                  // Assert visible
    expectText(locator, expectedText)       // Assert text content
    expectValue(locator, expectedValue)     // Assert input value
    expectCount(locator, count)             // Assert element count
    expectAttribute(locator, attr, value)  // Assert attribute
    
    // Element Methods
    hover(locator)                          // Mouse hover
    scrollIntoView(locator)                 // Scroll to element
    getText(locator)                        // Get text content
    getAttribute(locator, attr)            // Get attribute value
    getCount(locator)                       // Get element count
    
    // Dialog Methods
    acceptDialog()                          // Accept alert/confirm
    dismissDialog()                         // Dismiss alert/confirm
    fillDialog(text)                       // Fill prompt dialog
    
    // Frame Methods
    switchToFrame(frameLocator)            // Switch to iframe
    switchToMainFrame()                    // Switch to main content
    
    // Screenshot Methods
    takeScreenshot(name)                   // Take screenshot
    takeElementScreenshot(locator, name)  // Take element screenshot
}
```

### 3.2 Locators.js - XPath and CSS Selectors

This separate file contains all element selectors:

```javascript
// Login Page Locators
const LoginLocators = {
    usernameInput: "//input[@id='username']",
    passwordInput: "//input[@type='password']",
    loginButton: "//button[@type='submit']",
    errorMessage: "//div[@class='error-message']",
    rememberMe: "//input[@id='remember-me']",
    forgotPasswordLink: "//a[contains(text(),'Forgot Password')]"
};

// Product Page Locators
const ProductLocators = {
    searchInput: "//input[@placeholder='Search products']",
    searchButton: "//button[@class='search-btn']",
    productList: "//div[@class='product-item']",
    productName: "//div[@class='product-name']",
    productPrice: "//div[@class='product-price']",
    addToCartButton: "//button[contains(text(),'Add to Cart')]",
    filterCategory: "//select[@id='category-filter']",
    sortDropdown: "//select[@id='sort-by']"
};

// Cart Page Locators
const CartLocators = {
    cartIcon: "//a[@class='cart-icon']",
    cartItem: "//div[@class='cart-item']",
    quantityInput: "//input[@class='quantity-input']",
    removeButton: "//button[@class='remove-item']",
    cartTotal: "//div[@class='cart-total']",
    proceedToCheckout: "//button[contains(text(),'Checkout')]"
};

// Checkout Page Locators
const CheckoutLocators = {
    shippingForm: "//form[@id='shipping-form']",
    addressInput: "//input[@id='address']",
    cityInput: "//input[@id='city']",
    zipInput: "//input[@id='zip']",
    paymentMethod: "//select[@id='payment-method']",
    promoCodeInput: "//input[@id='promo-code']",
    applyPromoButton: "//button[contains(text(),'Apply')]",
    placeOrderButton: "//button[contains(text(),'Place Order')]"
};

module.exports = {
    LoginLocators,
    ProductLocators,
    CartLocators,
    CheckoutLocators
};
```

### 3.3 ComponentModule.js - Main Component File

Contains all test cases and feature-specific methods:

```javascript
// ComponentModule.js Structure
1. Imports (Playwright, Common Methods, Locators, Test Data)
2. Test Data Objects (loaded from JSON)
3. Feature-Specific Methods
   - Login Methods
   - Product Methods
   - Cart Methods
   - Checkout Methods
   - Order Methods
4. Test Case Functions
   - Valid test cases
   - Invalid test cases
   - Edge case test cases
5. Export Statement
```

---

## 4. Test Scenarios Coverage

### 4.1 Login Module - Test Cases

#### Valid Test Cases:
| ID | Test Case | Test Data |
|----|-----------|-----------|
| TC_LOGIN_001 | Valid login with correct credentials | login.json - validUsers[0] |
| TC_LOGIN_002 | Login with remember me checked | login.json - validUsers[0] |
| TC_LOGIN_003 | Successful logout after login | login.json - validUsers[0] |

#### Invalid Test Cases:
| ID | Test Case | Test Data |
|----|-----------|-----------|
| TC_LOGIN_004 | Login with invalid username | login.json - invalidCredentials[0] |
| TC_LOGIN_005 | Login with invalid password | login.json - invalidCredentials[1] |
| TC_LOGIN_006 | Login with empty credentials | login.json - edgeCases.empty |

#### Edge Case Test Cases:
| ID | Test Case | Test Data |
|----|-----------|-----------|
| TC_LOGIN_007 | Login with SQL injection attempt | login.json - edgeCases.sqlInjection |
| TC_LOGIN_008 | Login with special characters | login.json - edgeCases.specialChars |
| TC_LOGIN_009 | Case sensitivity in credentials | login.json - edgeCases.caseSensitivity |

### 4.2 Product Catalog Module - Test Cases

#### Valid Test Cases:
| ID | Test Case | Test Data |
|----|-----------|-----------|
| TC_PROD_001 | Search product with valid keyword | products.json - searchTerms.valid[0] |
| TC_PROD_002 | Filter products by category | products.json - categories[0] |
| TC_PROD_003 | Sort products by price low-high | products.json - sortOptions.priceLowHigh |

#### Edge Case Test Cases:
| ID | Test Case | Test Data |
|----|-----------|-----------|
| TC_PROD_004 | Search with no results | products.json - searchTerms.noResults[0] |
| TC_PROD_005 | Search with special characters | products.json - searchTerms.specialChars[0] |
| TC_PROD_006 | Search with empty string | products.json - searchTerms.empty |

### 4.3 Shopping Cart Module - Test Cases

#### Valid Test Cases:
| ID | Test Case | Test Data |
|----|-----------|-----------|
| TC_CART_001 | Add single product to cart | cart.json - addToCart[0] |
| TC_CART_002 | Update product quantity | cart.json - updateQuantity[0] |
| TC_CART_003 | Remove product from cart | cart.json - removeItem[0] |

#### Edge Case Test Cases:
| ID | Test Case | Test Data |
|----|-----------|-----------|
| TC_CART_004 | Add out-of-stock product | cart.json - edgeCases.outOfStockProduct |
| TC_CART_005 | Quantity exceeds limit | cart.json - edgeCases.maxQuantity |
| TC_CART_006 | Add same product twice | cart.json - duplicateProduct |

### 4.4 Checkout Module - Test Cases

#### Valid Test Cases:
| ID | Test Case | Test Data |
|----|-----------|-----------|
| TC_CHK_001 | Complete checkout with valid data | checkout.json - validCheckout[0] |
| TC_CHK_002 | Apply valid promo code | checkout.json - promoCodes.valid |
| TC_CHK_003 | Guest checkout (without login) | checkout.json - guestCheckout |

#### Edge Case Test Cases:
| ID | Test Case | Test Data |
|----|-----------|-----------|
| TC_CHK_004 | Apply invalid promo code | checkout.json - promoCodes.invalid |
| TC_CHK_005 | Apply expired promo code | checkout.json - promoCodes.expired |
| TC_CHK_006 | Empty required shipping fields | checkout.json - emptyFields |

---

## 5. Test Data Structure (JSON Files)

### 5.1 login.json
```json
{
  "validUsers": [
    { "email": "user@example.com", "password": "Test@123", "role": "customer", "expectedResult": "success" },
    { "email": "admin@example.com", "password": "Admin@123", "role": "admin", "expectedResult": "success" }
  ],
  "invalidCredentials": [
    { "email": "wrong@example.com", "password": "Test@123", "expectedResult": "error", "errorMessage": "Invalid credentials" },
    { "email": "user@example.com", "password": "wrongpass", "expectedResult": "error", "errorMessage": "Invalid password" }
  ],
  "edgeCases": {
    "empty": { "email": "", "password": "", "expectedResult": "error", "errorMessage": "Email is required" },
    "sqlInjection": { "email": "' OR '1'='1", "password": "anything", "expectedResult": "error" },
    "specialChars": { "email": "user@<script>", "password": "pass&<>\"'", "expectedResult": "error" },
    "caseSensitivity": { "email": "USER@EXAMPLE.COM", "password": "TEST@123", "expectedResult": "error" }
  }
}
```

### 5.2 products.json
```json
{
  "searchTerms": {
    "valid": ["laptop", "phone", "headphones"],
    "noResults": ["xyz123nonexistent", "abcdefghijk"],
    "specialChars": ["@#$%", "<script>alert(1)</script>"],
    "empty": ""
  },
  "categories": ["electronics", "clothing", "home", "books"],
  "sortOptions": {
    "priceLowHigh": "price_asc",
    "priceHighLow": "price_desc",
    "nameAZ": "name_asc",
    "nameZA": "name_desc"
  },
  "products": [
    { "id": "prod001", "name": "Test Laptop", "price": 999.99, "category": "electronics", "inStock": true },
    { "id": "prod002", "name": "Wireless Mouse", "price": 29.99, "category": "electronics", "inStock": true },
    { "id": "prod003", "name": "Cotton T-Shirt", "price": 19.99, "category": "clothing", "inStock": true },
    { "id": "prod004", "name": "Out of Stock Item", "price": 49.99, "category": "electronics", "inStock": false }
  ]
}
```

### 5.3 cart.json
```json
{
  "addToCart": [
    { "productId": "prod001", "quantity": 1, "expectedResult": "success", "expectedCartCount": 1 },
    { "productId": "prod002", "quantity": 2, "expectedResult": "success", "expectedCartCount": 3 }
  ],
  "updateQuantity": [
    { "productId": "prod001", "oldQty": 1, "newQty": 3, "expectedResult": "success" },
    { "productId": "prod001", "newQty": 0, "expectedResult": "remove" }
  ],
  "removeItem": [
    { "productId": "prod001", "expectedResult": "success", "expectedCartCount": 0 }
  ],
  "duplicateProduct": [
    { "productId": "prod001", "quantity": 1, "secondQuantity": 2, "expectedTotalQuantity": 3 }
  ],
  "edgeCases": {
    "maxQuantity": 99,
    "outOfStockProduct": { "productId": "prod004", "expectedResult": "error", "errorMessage": "Product out of stock" }
  }
}
```

### 5.4 checkout.json
```json
{
  "validCheckout": [
    {
      "shipping": { "name": "John Doe", "address": "123 Main St", "city": "New York", "zip": "10001", "country": "USA" },
      "payment": "creditCard",
      "promoCode": "",
      "expectedResult": "success"
    }
  ],
  "guestCheckout": {
    "email": "guest@example.com",
    "shipping": { "name": "Guest User", "address": "456 Oak Ave", "city": "Los Angeles", "zip": "90001", "country": "USA" },
    "expectedResult": "success"
  },
  "promoCodes": {
    "valid": { "code": "SAVE10", "discount": 10, "expectedResult": "success" },
    "invalid": { "code": "INVALIDCODE", "expectedResult": "error", "errorMessage": "Invalid promo code" },
    "expired": { "code": "EXPIRED20", "expectedResult": "error", "errorMessage": "Promo code has expired" }
  },
  "emptyFields": {
    "shipping": { "name": "", "address": "", "city": "", "zip": "", "country": "" },
    "expectedResult": "error",
    "errorFields": ["name", "address", "city", "zip"]
  }
}
```

---

## 6. Implementation Plan

### Phase 1: Framework Setup
- [ ] Initialize Node.js project with package.json
- [ ] Install Playwright dependencies
- [ ] Create playwright.config.js
- [ ] Set up directory structure

### Phase 2: Utilities & Configuration
- [ ] Create config.js for global settings
- [ ] Implement dataReader.js utility
- [ ] Create logger.js utility
- [ ] Implement helpers.js

### Phase 3: Locators & Common Methods
- [ ] Create Locators.js with XPath and CSS selectors
- [ ] Build PlaywrightCommon.js class with all reusable methods
- [ ] Test common methods functionality

### Phase 4: Test Data Files
- [ ] Create login.json
- [ ] Create products.json
- [ ] Create cart.json
- [ ] Create checkout.json
- [ ] Create orders.json

### Phase 5: Component Module Development
- [ ] Build ComponentModule.js
- [ ] Import Common Methods and Locators
- [ ] Implement Login test cases
- [ ] Implement Product test cases
- [ ] Implement Cart test cases
- [ ] Implement Checkout test cases

### Phase 6: Test Execution Setup
- [ ] Create testRunner.js
- [ ] Configure test execution
- [ ] Set up reporting

---

## 7. Key Features

| Feature | Description |
|---------|-------------|
| **Common Methods Class** | Separate PlaywrightCommon.js with reusable methods |
| **Locators File** | Separate locators.js for XPath/CSS selectors |
| **Data-Driven** | All test data externalized to JSON files |
| **Component-Based** | All methods in single ComponentModule.js |
| **Page Object Model** | Organized locators and methods per feature |
| **Reusability** | Methods can be reused across test cases |
| **Maintainability** | Easy to update test data without code changes |

---

## 8. Dependencies

```json
{
  "devDependencies": {
    "@playwright/test": "^1.40.0"
  }
}
```

---

## 9. Summary

This updated plan now includes:

1. ✅ **Sample Test Cases** - Detailed test cases with IDs for each module
2. ✅ **Mock Test Data** - Complete JSON files with test data
3. ✅ **PlaywrightCommon.js** - Separate class with all common Playwright methods
4. ✅ **Locators.js** - Separate file for all XPath and CSS selectors

The framework is modular, maintainable, and follows best practices for test automation.
