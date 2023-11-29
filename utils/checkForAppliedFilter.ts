import locators from '../locators/resinSelectors';
import { expect } from '@playwright/test';

/**
 * Select the first article in conent list and navigate into the article settings to match it with the applied filter
 *
 * @param {Object} page - Playwright page
 * @param {String} filterName - Filter name
 * @param {String} filterType - Filter type (section, subsection, collection)
 */

async function checkForAppliedFilter(page, filterName, filterType) {
  await page.getByTestId(locators.testIds.articleCard).nth(0).click();
  await page.getByRole('tab', { name: 'History' }).click();
  await page.getByRole('tab', { name: 'Composer' }).click();
  await page.getByTestId(locators.testIds.settingsBtn).click();
  const selectedFilterElement = await page.getByTestId(filterType.toLowerCase());
  expect(await selectedFilterElement.getByText(filterName.toUpperCase())).toBeTruthy();
}

export default checkForAppliedFilter;
