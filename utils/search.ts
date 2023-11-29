import locators from '../locators/resinSelectors';
import { expect } from '@playwright/test';

/**
 * Click on the main search bar / fill the search text and apply search
 *
 * @param {Object} page - Playwright page
 * @param {String} searchTitle - search input text
 */

async function search(page, searchTitle) {
  const searchInput = page.locator(locators.mainSearchInput);
  await searchInput.fill(searchTitle);
  await page.keyboard.press('Enter');
  await expect(page.getByTestId(locators.testIds.loadingIcon).last()).toBeHidden();
}

export default search;
