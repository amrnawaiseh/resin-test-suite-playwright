import locators from '../locators/resinSelectors';
import { expect } from '@playwright/test';

/**
 * Select a date for end-date filter
 *
 * @param {Object} page - Playwright page
 * @param {Date} endDate - selected end date
 */

async function selectEndDate(page, endDate) {
  await page.locator(locators.dateCalenderBtns).nth(1).click();
  await page.waitForSelector(locators.calenderDateInput);
  await page.locator(locators.calenderDateInput).type(await endDate);
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Apply Filters' }).click();
  await expect(page.getByTestId(locators.testIds.loadingIcon).last()).toBeHidden();
}

export default selectEndDate;
