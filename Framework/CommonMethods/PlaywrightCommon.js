/**
 * PlaywrightCommon.js
 * Reusable Playwright methods class
 * Contains common methods for click, input, navigation, wait, assertions, etc.
 */

class PlaywrightCommon {
    /**
     * Constructor
     * @param {Object} page - Playwright page object
     */
    constructor(page) {
        this.page = page;
    }

    // ============================================
    // CLICK METHODS
    // ============================================

    /**
     * Click on an element
     * @param {string} locator - Element selector (xpath or css)
     * @param {Object} options - Click options
     */
    async click(locator, options = {}) {
        try {
            await this.page.click(locator, {
                timeout: options.timeout || 10000,
                force: options.force || false,
                modifiers: options.modifiers || [],
                position: options.position || null,
                ...options
            });
            console.log(`[CLICK] Clicked on: ${locator}`);
        } catch (error) {
            console.error(`[CLICK ERROR] Failed to click on: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Double click on an element
     * @param {string} locator - Element selector
     */
    async doubleClick(locator) {
        try {
            await this.page.dblclick(locator);
            console.log(`[DOUBLE CLICK] Double clicked on: ${locator}`);
        } catch (error) {
            console.error(`[DOUBLE CLICK ERROR] Failed: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Right click (context menu) on an element
     * @param {string} locator - Element selector
     */
    async rightClick(locator) {
        try {
            await this.page.click(locator, { button: 'right' });
            console.log(`[RIGHT CLICK] Right clicked on: ${locator}`);
        } catch (error) {
            console.error(`[RIGHT CLICK ERROR] Failed: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Click and hold on an element
     * @param {string} locator - Element selector
     * @param {number} duration - Duration to hold in milliseconds
     */
    async clickAndHold(locator, duration = 1000) {
        try {
            await this.page.click(locator, { delay: duration });
            console.log(`[CLICK AND HOLD] Held on: ${locator} for ${duration}ms`);
        } catch (error) {
            console.error(`[CLICK AND HOLD ERROR] Failed: ${locator}`, error.message);
            throw error;
        }
    }

    // ============================================
    // INPUT METHODS
    // ============================================

    /**
     * Type text into an element with delay (character by character)
     * @param {string} locator - Element selector
     * @param {string} text - Text to type
     * @param {Object} options - Type options
     */
    async type(locator, text, options = {}) {
        try {
            await this.page.type(locator, text, {
                delay: options.delay || 50,
                timeout: options.timeout || 10000
            });
            console.log(`[TYPE] Typed "${text}" into: ${locator}`);
        } catch (error) {
            console.error(`[TYPE ERROR] Failed to type into: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Fill text into an element immediately
     * @param {string} locator - Element selector
     * @param {string} text - Text to fill
     */
    async fill(locator, text) {
        try {
            await this.page.fill(locator, text);
            console.log(`[FILL] Filled "${text}" into: ${locator}`);
        } catch (error) {
            console.error(`[FILL ERROR] Failed to fill: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Press a specific key
     * @param {string} locator - Element selector
     * @param {string} key - Key to press (e.g., 'Enter', 'Escape', 'ArrowDown')
     */
    async pressKey(locator, key) {
        try {
            await this.page.press(locator, key);
            console.log(`[PRESS KEY] Pressed "${key}" on: ${locator}`);
        } catch (error) {
            console.error(`[PRESS KEY ERROR] Failed: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Press a key without specifying locator (global)
     * @param {string} key - Key to press
     */
    async pressKeyGlobal(key) {
        try {
            await this.page.keyboard.press(key);
            console.log(`[PRESS KEY GLOBAL] Pressed: ${key}`);
        } catch (error) {
            console.error(`[PRESS KEY GLOBAL ERROR] Failed: ${key}`, error.message);
            throw error;
        }
    }

    /**
     * Clear input field
     * @param {string} locator - Element selector
     */
    async clear(locator) {
        try {
            await this.page.fill(locator, '');
            console.log(`[CLEAR] Cleared: ${locator}`);
        } catch (error) {
            console.error(`[CLEAR ERROR] Failed: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Select text in input field
     * @param {string} locator - Element selector
     * @param {string} behavior - Select behavior ('all', 'start', 'end')
     */
    async selectText(locator, behavior = 'all') {
        try {
            await this.page.selectText(locator, { behavior });
            console.log(`[SELECT TEXT] Selected text on: ${locator}`);
        } catch (error) {
            console.error(`[SELECT TEXT ERROR] Failed: ${locator}`, error.message);
            throw error;
        }
    }

    // ============================================
    // NAVIGATION METHODS
    // ============================================

    /**
     * Navigate to a URL
     * @param {string} url - URL to navigate to
     * @param {Object} options - Navigation options
     */
    async goto(url, options = {}) {
        try {
            await this.page.goto(url, {
                waitUntil: options.waitUntil || 'load',
                timeout: options.timeout || 30000
            });
            console.log(`[NAVIGATE] Navigated to: ${url}`);
        } catch (error) {
            console.error(`[NAVIGATE ERROR] Failed to navigate to: ${url}`, error.message);
            throw error;
        }
    }

    /**
     * Go back in browser history
     */
    async back() {
        try {
            await this.page.goBack();
            console.log(`[NAVIGATE] Went back`);
        } catch (error) {
            console.error(`[BACK ERROR]`, error.message);
            throw error;
        }
    }

    /**
     * Go forward in browser history
     */
    async forward() {
        try {
            await this.page.goForward();
            console.log(`[NAVIGATE] Went forward`);
        } catch (error) {
            console.error(`[FORWARD ERROR]`, error.message);
            throw error;
        }
    }

    /**
     * Reload current page
     * @param {Object} options - Reload options
     */
    async reload(options = {}) {
        try {
            await this.page.reload({
                waitUntil: options.waitUntil || 'load',
                timeout: options.timeout || 30000
            });
            console.log(`[NAVIGATE] Page reloaded`);
        } catch (error) {
            console.error(`[RELOAD ERROR]`, error.message);
            throw error;
        }
    }

    // ============================================
    // WAIT METHODS
    // ============================================

    /**
     * Wait for element to be present in DOM
     * @param {string} locator - Element selector
     * @param {Object} options - Wait options
     */
    async waitForElement(locator, options = {}) {
        try {
            await this.page.waitForSelector(locator, {
                state: options.state || 'attached',
                timeout: options.timeout || 10000,
                visible: options.visible || true
            });
            console.log(`[WAIT] Element found: ${locator}`);
        } catch (error) {
            console.error(`[WAIT ERROR] Element not found: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Wait for element to be visible
     * @param {string} locator - Element selector
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForVisible(locator, timeout = 10000) {
        try {
            await this.page.waitForSelector(locator, {
                state: 'visible',
                timeout: timeout
            });
            console.log(`[WAIT] Element visible: ${locator}`);
        } catch (error) {
            console.error(`[WAIT VISIBLE ERROR] Element not visible: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Wait for element to be hidden or removed from DOM
     * @param {string} locator - Element selector
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForHidden(locator, timeout = 10000) {
        try {
            await this.page.waitForSelector(locator, {
                state: 'hidden',
                timeout: timeout
            });
            console.log(`[WAIT] Element hidden: ${locator}`);
        } catch (error) {
            console.error(`[WAIT HIDDEN ERROR] Element still visible: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Wait for element to be detached from DOM
     * @param {string} locator - Element selector
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForDetached(locator, timeout = 10000) {
        try {
            await this.page.waitForSelector(locator, {
                state: 'detached',
                timeout: timeout
            });
            console.log(`[WAIT] Element detached: ${locator}`);
        } catch (error) {
            console.error(`[WAIT DETACHED ERROR] Element still attached: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Wait for element to be enabled (not disabled)
     * @param {string} locator - Element selector
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForEnabled(locator, timeout = 10000) {
        try {
            await this.page.waitForSelector(locator, {
                state: 'visible',
                timeout: timeout
            });
            const isEnabled = await this.isEnabled(locator);
            if (!isEnabled) {
                throw new Error(`Element is disabled: ${locator}`);
            }
            console.log(`[WAIT] Element enabled: ${locator}`);
        } catch (error) {
            console.error(`[WAIT ENABLED ERROR]: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Wait for specific text to appear
     * @param {string} locator - Element selector
     * @param {string} text - Expected text
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForText(locator, text, timeout = 10000) {
        try {
            await this.page.waitForFunction(
                (selector, expectedText) => {
                    const element = document.querySelector(selector);
                    return element && element.textContent.includes(expectedText);
                },
                locator,
                text,
                { timeout: timeout }
            );
            console.log(`[WAIT] Text found "${text}" in: ${locator}`);
        } catch (error) {
            console.error(`[WAIT TEXT ERROR] Text not found: ${text}`, error.message);
            throw error;
        }
    }

    /**
     * Wait for URL to contain specific pattern
     * @param {string} pattern - URL pattern to wait for
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForURL(pattern, timeout = 30000) {
        try {
            await this.page.waitForURL(pattern, { timeout: timeout });
            console.log(`[WAIT] URL matched pattern: ${pattern}`);
        } catch (error) {
            console.error(`[WAIT URL ERROR] URL did not match: ${pattern}`, error.message);
            throw error;
        }
    }

    /**
     * Wait for navigation to complete
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForNavigation(timeout = 30000) {
        try {
            await this.page.waitForLoadState('networkidle', { timeout: timeout });
            console.log(`[WAIT] Navigation complete`);
        } catch (error) {
            console.error(`[WAIT NAVIGATION ERROR]`, error.message);
            throw error;
        }
    }

    // ============================================
    // ASSERTION METHODS
    // ============================================

    /**
     * Assert element is visible
     * @param {string} locator - Element selector
     * @param {string} message - Custom assertion message
     */
    async expectVisible(locator, message = '') {
        try {
            const isVisible = await this.page.isVisible(locator);
            const customMsg = message || `Expected element to be visible: ${locator}`;
            if (!isVisible) {
                throw new Error(customMsg);
            }
            console.log(`[ASSERT] Element visible: ${locator}`);
        } catch (error) {
            console.error(`[ASSERT VISIBLE FAILED]: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Assert element is hidden or not visible
     * @param {string} locator - Element selector
     * @param {string} message - Custom assertion message
     */
    async expectHidden(locator, message = '') {
        try {
            const isHidden = await this.page.isHidden(locator);
            const customMsg = message || `Expected element to be hidden: ${locator}`;
            if (!isHidden) {
                throw new Error(customMsg);
            }
            console.log(`[ASSERT] Element hidden: ${locator}`);
        } catch (error) {
            console.error(`[ASSERT HIDDEN FAILED]: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Assert element has specific text
     * @param {string} locator - Element selector
     * @param {string} expectedText - Expected text content
     * @param {string} message - Custom assertion message
     */
    async expectText(locator, expectedText, message = '') {
        try {
            const actualText = await this.getText(locator);
            const customMsg = message || `Expected text "${expectedText}" but got "${actualText}"`;
            if (!actualText.includes(expectedText)) {
                throw new Error(customMsg);
            }
            console.log(`[ASSERT] Text matches: ${locator}`);
        } catch (error) {
            console.error(`[ASSERT TEXT FAILED]: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Assert input field has specific value
     * @param {string} locator - Element selector
     * @param {string} expectedValue - Expected value
     * @param {string} message - Custom assertion message
     */
    async expectValue(locator, expectedValue, message = '') {
        try {
            const actualValue = await this.page.inputValue(locator);
            const customMsg = message || `Expected value "${expectedValue}" but got "${actualValue}"`;
            if (actualValue !== expectedValue) {
                throw new Error(customMsg);
            }
            console.log(`[ASSERT] Value matches: ${locator}`);
        } catch (error) {
            console.error(`[ASSERT VALUE FAILED]: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Assert element count
     * @param {string} locator - Element selector
     * @param {number} expectedCount - Expected count
     * @param {string} message - Custom assertion message
     */
    async expectCount(locator, expectedCount, message = '') {
        try {
            const elements = await this.page.$$(locator);
            const actualCount = elements.length;
            const customMsg = message || `Expected ${expectedCount} elements but got ${actualCount}`;
            if (actualCount !== expectedCount) {
                throw new Error(customMsg);
            }
            console.log(`[ASSERT] Count matches: ${locator} (${actualCount})`);
        } catch (error) {
            console.error(`[ASSERT COUNT FAILED]: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Assert element has specific attribute
     * @param {string} locator - Element selector
     * @param {string} attribute - Attribute name
     * @param {string} expectedValue - Expected attribute value
     * @param {string} message - Custom assertion message
     */
    async expectAttribute(locator, attribute, expectedValue, message = '') {
        try {
            const actualValue = await this.page.getAttribute(locator, attribute);
            const customMsg = message || `Expected attribute "${attribute}" to be "${expectedValue}" but got "${actualValue}"`;
            if (actualValue !== expectedValue) {
                throw new Error(customMsg);
            }
            console.log(`[ASSERT] Attribute matches: ${locator}[${attribute}]`);
        } catch (error) {
            console.error(`[ASSERT ATTRIBUTE FAILED]: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Assert element is enabled
     * @param {string} locator - Element selector
     * @param {string} message - Custom assertion message
     */
    async expectEnabled(locator, message = '') {
        try {
            const isEnabled = await this.isEnabled(locator);
            const customMsg = message || `Expected element to be enabled: ${locator}`;
            if (!isEnabled) {
                throw new Error(customMsg);
            }
            console.log(`[ASSERT] Element enabled: ${locator}`);
        } catch (error) {
            console.error(`[ASSERT ENABLED FAILED]: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Assert element is disabled
     * @param {string} locator - Element selector
     * @param {string} message - Custom assertion message
     */
    async expectDisabled(locator, message = '') {
        try {
            const isEnabled = await this.isEnabled(locator);
            const customMsg = message || `Expected element to be disabled: ${locator}`;
            if (isEnabled) {
                throw new Error(customMsg);
            }
            console.log(`[ASSERT] Element disabled: ${locator}`);
        } catch (error) {
            console.error(`[ASSERT DISABLED FAILED]: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Assert URL contains specific text
     * @param {string} text - Text to check in URL
     * @param {string} message - Custom assertion message
     */
    async expectURLContains(text, message = '') {
        try {
            const url = this.page.url();
            const customMsg = message || `Expected URL to contain "${text}" but got "${url}"`;
            if (!url.includes(text)) {
                throw new Error(customMsg);
            }
            console.log(`[ASSERT] URL contains: ${text}`);
        } catch (error) {
            console.error(`[ASSERT URL CONTAINS FAILED]:`, error.message);
            throw error;
        }
    }

    // ============================================
    // ELEMENT METHODS
    // ============================================

    /**
     * Hover over an element
     * @param {string} locator - Element selector
     */
    async hover(locator) {
        try {
            await this.page.hover(locator);
            console.log(`[HOVER] Hovered on: ${locator}`);
        } catch (error) {
            console.error(`[HOVER ERROR]: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Scroll element into view
     * @param {string} locator - Element selector
     */
    async scrollIntoView(locator) {
        try {
            await this.page.locator(locator).scrollIntoViewIfNeeded();
            console.log(`[SCROLL] Scrolled to: ${locator}`);
        } catch (error) {
            console.error(`[SCROLL ERROR]: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Get text content of element
     * @param {string} locator - Element selector
     * @returns {Promise<string>} Text content
     */
    async getText(locator) {
        try {
            const text = await this.page.textContent(locator);
            console.log(`[GET TEXT] Got text from ${locator}: "${text}"`);
            return text ? text.trim() : '';
        } catch (error) {
            console.error(`[GET TEXT ERROR]: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Get attribute value of element
     * @param {string} locator - Element selector
     * @param {string} attribute - Attribute name
     * @returns {Promise<string>} Attribute value
     */
    async getAttribute(locator, attribute) {
        try {
            const value = await this.page.getAttribute(locator, attribute);
            console.log(`[GET ATTRIBUTE] ${locator}[${attribute}] = "${value}"`);
            return value;
        } catch (error) {
            console.error(`[GET ATTRIBUTE ERROR]: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Get count of elements matching selector
     * @param {string} locator - Element selector
     * @returns {Promise<number>} Element count
     */
    async getCount(locator) {
        try {
            const count = await this.page.locator(locator).count();
            console.log(`[GET COUNT] ${locator} = ${count} elements`);
            return count;
        } catch (error) {
            console.error(`[GET COUNT ERROR]: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Check if element is enabled
     * @param {string} locator - Element selector
     * @returns {Promise<boolean>} Is enabled
     */
    async isEnabled(locator) {
        try {
            const isEnabled = await this.page.isEnabled(locator);
            return isEnabled;
        } catch (error) {
            console.error(`[IS ENABLED ERROR]: ${locator}`, error.message);
            return false;
        }
    }

    /**
     * Check if element is visible
     * @param {string} locator - Element selector
     * @returns {Promise<boolean>} Is visible
     */
    async isVisible(locator) {
        try {
            const isVisible = await this.page.isVisible(locator);
            return isVisible;
        } catch (error) {
            console.error(`[IS VISIBLE ERROR]: ${locator}`, error.message);
            return false;
        }
    }

    // ============================================
    // DIALOG METHODS
    // ============================================

    /**
     * Accept alert/confirm dialog
     * @param {string} text - Optional text to fill in prompt
     */
    async acceptDialog(text = null) {
        try {
            this.page.on('dialog', async dialog => {
                if (text) {
                    await dialog.accept(text);
                } else {
                    await dialog.accept();
                }
                console.log(`[DIALOG] Accepted: ${dialog.message()}`);
            });
        } catch (error) {
            console.error(`[ACCEPT DIALOG ERROR]`, error.message);
            throw error;
        }
    }

    /**
     * Dismiss alert/confirm dialog
     */
    async dismissDialog() {
        try {
            this.page.on('dialog', async dialog => {
                await dialog.dismiss();
                console.log(`[DIALOG] Dismissed: ${dialog.message()}`);
            });
        } catch (error) {
            console.error(`[DISMISS DIALOG ERROR]`, error.message);
            throw error;
        }
    }

    // ============================================
    // FRAME METHODS
    // ============================================

    /**
     * Switch to iframe
     * @param {string} frameLocator - Frame selector
     */
    async switchToFrame(frameLocator) {
        try {
            const frame = this.page.frameLocator(frameLocator);
            console.log(`[FRAME] Switched to frame: ${frameLocator}`);
            return frame;
        } catch (error) {
            console.error(`[FRAME SWITCH ERROR]`, error.message);
            throw error;
        }
    }

    /**
     * Switch to main content (exit iframe)
     */
    async switchToMainFrame() {
        try {
            await this.page.frame('__main');
            console.log(`[FRAME] Switched to main frame`);
        } catch (error) {
            console.error(`[FRAME MAIN ERROR]`, error.message);
            throw error;
        }
    }

    // ============================================
    // SCREENSHOT METHODS
    // ============================================

    /**
     * Take screenshot of page
     * @param {string} name - Screenshot name
     * @param {Object} options - Screenshot options
     */
    async takeScreenshot(name, options = {}) {
        try {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const fileName = `${name}_${timestamp}.png`;
            await this.page.screenshot({
                path: `./TestResults/screenshots/${fileName}`,
                fullPage: options.fullPage || false
            });
            console.log(`[SCREENSHOT] Saved: ${fileName}`);
        } catch (error) {
            console.error(`[SCREENSHOT ERROR]`, error.message);
            throw error;
        }
    }

    /**
     * Take screenshot of specific element
     * @param {string} locator - Element selector
     * @param {string} name - Screenshot name
     */
    async takeElementScreenshot(locator, name) {
        try {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const fileName = `${name}_${timestamp}.png`;
            await this.page.locator(locator).screenshot({
                path: `./TestResults/screenshots/${fileName}`
            });
            console.log(`[ELEMENT SCREENSHOT] Saved: ${fileName}`);
        } catch (error) {
            console.error(`[ELEMENT SCREENSHOT ERROR]`, error.message);
            throw error;
        }
    }

    // ============================================
    // DROPDOWN/SELECT METHODS
    // ============================================

    /**
     * Select option from dropdown by value
     * @param {string} locator - Select element selector
     * @param {string} value - Option value
     */
    async selectByValue(locator, value) {
        try {
            await this.page.selectOption(locator, { value: value });
            console.log(`[SELECT] Selected value "${value}" in: ${locator}`);
        } catch (error) {
            console.error(`[SELECT BY VALUE ERROR]: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Select option from dropdown by label text
     * @param {string} locator - Select element selector
     * @param {string} label - Option label text
     */
    async selectByLabel(locator, label) {
        try {
            await this.page.selectOption(locator, { label: label });
            console.log(`[SELECT] Selected label "${label}" in: ${locator}`);
        } catch (error) {
            console.error(`[SELECT BY LABEL ERROR]: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Select option from dropdown by index
     * @param {string} locator - Select element selector
     * @param {number} index - Option index
     */
    async selectByIndex(locator, index) {
        try {
            await this.page.selectOption(locator, { index: index });
            console.log(`[SELECT] Selected index ${index} in: ${locator}`);
        } catch (error) {
            console.error(`[SELECT BY INDEX ERROR]: ${locator}`, error.message);
            throw error;
        }
    }

    // ============================================
    // CHECKBOX METHODS
    // ============================================

    /**
     * Check a checkbox
     * @param {string} locator - Checkbox selector
     */
    async check(locator) {
        try {
            await this.page.check(locator);
            console.log(`[CHECK] Checked: ${locator}`);
        } catch (error) {
            console.error(`[CHECK ERROR]: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Uncheck a checkbox
     * @param {string} locator - Checkbox selector
     */
    async uncheck(locator) {
        try {
            await this.page.uncheck(locator);
            console.log(`[UNCHECK] Unchecked: ${locator}`);
        } catch (error) {
            console.error(`[UNCHECK ERROR]: ${locator}`, error.message);
            throw error;
        }
    }

    /**
     * Toggle checkbox state
     * @param {string} locator - Checkbox selector
     */
    async toggleCheckbox(locator) {
        try {
            const isChecked = await this.page.isChecked(locator);
            if (isChecked) {
                await this.page.uncheck(locator);
            } else {
                await this.page.check(locator);
            }
            console.log(`[TOGGLE] Toggled: ${locator}`);
        } catch (error) {
            console.error(`[TOGGLE ERROR]: ${locator}`, error.message);
            throw error;
        }
    }

    // ============================================
    // MOUSE/KEYBOARD METHODS
    // ============================================

    /**
     * Click at specific coordinates
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */
    async clickAt(x, y) {
        try {
            await this.page.mouse.click(x, y);
            console.log(`[MOUSE CLICK] Clicked at (${x}, ${y})`);
        } catch (error) {
            console.error(`[MOUSE CLICK ERROR]`, error.message);
            throw error;
        }
    }

    /**
     * Double click at specific coordinates
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */
    async doubleClickAt(x, y) {
        try {
            await this.page.mouse.dblclick(x, y);
            console.log(`[MOUSE DOUBLE CLICK] Double clicked at (${x}, ${y})`);
        } catch (error) {
            console.error(`[MOUSE DOUBLE CLICK ERROR]`, error.message);
            throw error;
        }
    }

    /**
     * Drag and drop
     * @param {string} sourceLocator - Source element
     * @param {string} targetLocator - Target element
     */
    async dragAndDrop(sourceLocator, targetLocator) {
        try {
            await this.page.dragAndDrop(sourceLocator, targetLocator);
            console.log(`[DRAG DROP] Dragged ${sourceLocator} to ${targetLocator}`);
        } catch (error) {
            console.error(`[DRAG DROP ERROR]`, error.message);
            throw error;
        }
    }

    /**
     * Type using keyboard
     * @param {string} text - Text to type
     */
    async keyboardType(text) {
        try {
            await this.page.keyboard.type(text);
            console.log(`[KEYBOARD TYPE] Typed: ${text}`);
        } catch (error) {
            console.error(`[KEYBOARD TYPE ERROR]`, error.message);
            throw error;
        }
    }

    /**
     * Press keyboard key
     * @param {string} key - Key to press
     */
    async keyboardPress(key) {
        try {
            await this.page.keyboard.press(key);
            console.log(`[KEYBOARD PRESS] Pressed: ${key}`);
        } catch (error) {
            console.error(`[KEYBOARD PRESS ERROR]`, error.message);
            throw error;
        }
    }
}

module.exports = PlaywrightCommon;
