import locators from '../locators/resinSelectors';
import { expect } from '@playwright/test';

/**
 * Select and add filter inputs to (section, subsection, collection) filters and apply them
 *
 * @param {Object} page - Playwright page
 * @param {String} filterName - Filter name
 * @param {String} filterType - Filter type (section, subsection, collection)
 */

async function applyFilters(page, filterName, filterType) {
  await page.locator(locators.filterBtn(filterType)).click();
  const searchArea = page.locator(locators.searchInput(filterType));
  await expect(searchArea).toBeVisible();
  await searchArea.type(filterName);
  await page.waitForSelector(locators.filtersOptions);
  await page.locator(locators.filtersOptions).nth(0).click();
  await expect(searchArea).toBeEmpty();
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Apply Filters' }).click();
  await expect(page.getByTestId(locators.testIds.loadingIcon).last()).toBeHidden();
}

export default applyFilters;
