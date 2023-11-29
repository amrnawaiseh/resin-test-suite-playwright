import locators from '../locators/resinSelectors';

/**
 * Select sorting options for main list content
 *
 * @param {Object} page - Playwright page
 * @param {String} sortType - Sort-by type
 */

async function sortBySelect(page, sortType) {
  await page.getByTestId(locators.testIds.sortByBtn).click();
  await page.locator(locators.sortByInput).fill(sortType);
  await page.keyboard.press('Enter');
}

export default sortBySelect;
