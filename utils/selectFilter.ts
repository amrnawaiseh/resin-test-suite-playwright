import locators from '../locators/resinSelectors';
import { expect } from '@playwright/test';

/**
 * Select and click on filter option for (Section, Subsection, Collection, Status, Source, Sponsorship) filters
 *
 * @param {Object} page - Playwright page
 * @param {Locator} filterElement - Filter element locator
 * @param {String} filterName - Filter option name
 */

async function selectFilter(page, filterElement, filterName) {
  await filterElement.getByText(await filterName).click();
  await page.getByRole('button', { name: 'Apply Filters' }).click();
  await expect(page.getByTestId(locators.testIds.loadingIcon).last()).toBeHidden();
}

export default selectFilter;
