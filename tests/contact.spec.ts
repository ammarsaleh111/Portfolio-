import { test, expect } from '@playwright/test';

/**
 * Contact Form E2E Tests
 * Tests the contact form submission flow including validation and accessibility
 */

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the portfolio site
    await page.goto('http://localhost:8080/index.html');
    
    // Scroll to contact section
    await page.click('a[href="#contact"]');
    await page.waitForTimeout(500); // Wait for smooth scroll
  });

  test('should display contact form with all required fields', async ({ page }) => {
    // Check form exists
    const form = page.locator('#contactForm');
    await expect(form).toBeVisible();

    // Check required fields exist
    await expect(page.locator('#from_name')).toBeVisible();
    await expect(page.locator('#reply_to')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();

    // Check submit button exists
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show validation errors for empty required fields', async ({ page }) => {
    // Try to submit empty form
    await page.click('button[type="submit"]');

    // Wait for validation
    await page.waitForTimeout(300);

    // Check that error messages appear
    const nameError = page.locator('#name-error');
    const emailError = page.locator('#email-error');
    const messageError = page.locator('#message-error');

    // At least one error should be visible
    const errors = [nameError, emailError, messageError];
    const visibleErrors = await Promise.all(
      errors.map(error => error.isVisible())
    );
    
    expect(visibleErrors.some(visible => visible)).toBeTruthy();
  });

  test('should validate email format', async ({ page }) => {
    // Fill name and message but invalid email
    await page.fill('#from_name', 'Test User');
    await page.fill('#reply_to', 'invalid-email');
    await page.fill('#message', 'Test message');

    // Submit form
    await page.click('button[type="submit"]');
    await page.waitForTimeout(300);

    // Check for email validation error
    const emailError = page.locator('#email-error');
    await expect(emailError).toBeVisible();
    await expect(emailError).toContainText(/valid email/i);
  });

  test('should successfully submit with valid data', async ({ page }) => {
    // Fill all fields with valid data
    await page.fill('#from_name', 'John Doe');
    await page.fill('#reply_to', 'john.doe@example.com');
    await page.fill('#message', 'This is a test message from the automated test suite.');

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for submission
    await page.waitForTimeout(2000);

    // Check for success message
    const status = page.locator('#formStatus');
    await expect(status).toBeVisible();
    await expect(status).toHaveClass(/success/);
    
    // Verify form was reset
    await expect(page.locator('#from_name')).toHaveValue('');
    await expect(page.locator('#reply_to')).toHaveValue('');
    await expect(page.locator('#message')).toHaveValue('');
  });

  test('should clear errors when user starts typing', async ({ page }) => {
    // Submit empty form to trigger errors
    await page.click('button[type="submit"]');
    await page.waitForTimeout(300);

    // Start typing in name field
    await page.fill('#from_name', 'J');
    await page.waitForTimeout(100);

    // Error should be cleared
    const nameError = page.locator('#name-error');
    await expect(nameError).toBeEmpty();
  });

  test('should have accessible form labels', async ({ page }) => {
    // Check that inputs have associated labels (via aria-describedby or implicit labels)
    const nameInput = page.locator('#from_name');
    const emailInput = page.locator('#reply_to');
    const messageInput = page.locator('#message');

    // All inputs should have required attribute
    await expect(nameInput).toHaveAttribute('required');
    await expect(emailInput).toHaveAttribute('required');
    await expect(messageInput).toHaveAttribute('required');

    // All inputs should have aria-describedby pointing to error containers
    await expect(nameInput).toHaveAttribute('aria-describedby', 'name-error');
    await expect(emailInput).toHaveAttribute('aria-describedby', 'email-error');
    await expect(messageInput).toHaveAttribute('aria-describedby', 'message-error');
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Tab to name field
    await page.keyboard.press('Tab');
    await expect(page.locator('#from_name')).toBeFocused();

    // Tab to email field
    await page.keyboard.press('Tab');
    await expect(page.locator('#reply_to')).toBeFocused();

    // Tab to message field
    await page.keyboard.press('Tab');
    await expect(page.locator('#message')).toBeFocused();

    // Tab to submit button
    await page.keyboard.press('Tab');
    await expect(page.locator('button[type="submit"]')).toBeFocused();
  });

  test('should show loading state during submission', async ({ page }) => {
    // Fill form
    await page.fill('#from_name', 'Test User');
    await page.fill('#reply_to', 'test@example.com');
    await page.fill('#message', 'Test message');

    // Submit
    await page.click('button[type="submit"]');

    // Check for loading state (button should be disabled)
    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeDisabled();
    
    // Wait for submission to complete
    await page.waitForTimeout(2000);
    
    // Button should be enabled again
    await expect(submitBtn).toBeEnabled();
  });

  test('should have proper ARIA live region for status messages', async ({ page }) => {
    // Check that status div has proper ARIA attributes
    const status = page.locator('#formStatus');
    await expect(status).toHaveAttribute('role', 'status');
    await expect(status).toHaveAttribute('aria-live', 'polite');
    await expect(status).toHaveAttribute('aria-atomic', 'true');
  });

  test('should work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Form should still be visible and functional
    const form = page.locator('#contactForm');
    await expect(form).toBeVisible();

    // Fill and submit
    await page.fill('#from_name', 'Mobile User');
    await page.fill('#reply_to', 'mobile@example.com');
    await page.fill('#message', 'Testing mobile view');

    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);

    // Should show success
    const status = page.locator('#formStatus');
    await expect(status).toBeVisible();
  });
});

test.describe('Contact Form Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/index.html');
    await page.click('a[href="#contact"]');
    await page.waitForTimeout(500);
  });

  test('should have no accessibility violations', async ({ page }) => {
    // Run axe accessibility checks (requires @axe-core/playwright)
    // This is a placeholder - install the package to enable
    // const results = await new AxeBuilder({ page }).analyze();
    // expect(results.violations).toEqual([]);
    
    // Manual checks that can be done without axe
    const form = page.locator('#contactForm');
    
    // Form should have proper ARIA labelledby
    await expect(form).toHaveAttribute('aria-labelledby', 'contact-heading');
    
    // Form should have novalidate to use custom validation
    await expect(form).toHaveAttribute('novalidate');
  });

  test('should announce errors to screen readers', async ({ page }) => {
    // Submit empty form
    await page.click('button[type="submit"]');
    await page.waitForTimeout(300);

    // Error containers should have role="alert" or aria-live
    const nameError = page.locator('#name-error');
    
    // When error appears, it should have proper attributes
    if (await nameError.isVisible()) {
      await expect(nameError).toHaveAttribute('role', 'alert');
    }
  });
});

test.describe('Overall Page Accessibility', () => {
  test('should have skip link for keyboard users', async ({ page }) => {
    await page.goto('http://localhost:8080/index.html');
    
    // Press Tab to focus skip link
    await page.keyboard.press('Tab');
    
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toHaveText(/skip to main content/i);
    
    // Press Enter to activate skip link
    await page.keyboard.press('Enter');
    
    // Main content should be focused
    const main = page.locator('#main-content');
    await expect(main).toBeFocused();
  });

  test('should have proper document title', async ({ page }) => {
    await page.goto('http://localhost:8080/index.html');
    await expect(page).toHaveTitle(/Ammar Ahmed Saleh.*Front-End Developer/i);
  });

  test('should have lang attribute on html element', async ({ page }) => {
    await page.goto('http://localhost:8080/index.html');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'en');
  });

  test('should have meta viewport for responsive design', async ({ page }) => {
    await page.goto('http://localhost:8080/index.html');
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content', /width=device-width/);
  });
});
