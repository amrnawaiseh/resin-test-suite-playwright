import locators from '../locators/resinSelectors';
import { expect } from '@playwright/test';

/**
 * Select a date for start-date filter
 *
 * @param {Object} page - Playwright page
 * @param {Date} startDate - selected start date
 */

async function selectStartDate(page, startDate) {
  await page.locator(locators.dateCalenderBtns).nth(0).click();
  await page.waitForSelector(locators.calenderDateInput);
  await page.locator(locators.calenderDateInput).type(await startDate);
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Apply Filters' }).click();
  await expect(page.getByTestId(locators.testIds.loadingIcon).last()).toBeHidden();
}

export default selectStartDate;
