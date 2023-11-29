import { expect } from '@playwright/test';

/**
 * Collect articles dates in the list content page after applying start date/ end date filters
 *
 * @param {Object} page - Playwright page
 * @param {String} startDate - Selected start date
 * @param {String} endDate - Selected end date
 */

async function getDatesAndCompare(page, { startDate, endDate }: { startDate?: string; endDate?: string } = {}) {
  // collecting filtered articles dates from the content list into and array after converting them into date objects
  const datesArray = await page.$$eval('[data-testid="last-updated-date"]', (elements) => {
    return elements.map((element) => {
      const elementDate = new Date(element.getAttribute('datetime')).toLocaleDateString();
      return new Date(elementDate);
    });
  });

  datesArray.forEach(async (date) => {
    // make assertion if both start date and  end date filters are applied
    if (startDate && endDate) {
      const selectedStartDate = new Date(startDate);
      const selectedEndDate = new Date(endDate);
      expect((await date) >= selectedStartDate).toBeTruthy();
      expect((await date) <= selectedEndDate).toBeTruthy();
    } else if (endDate) {
      const selectedEndDate = new Date(endDate);
      expect(date <= selectedEndDate).toBeTruthy();
    }
    // make assertion if only start date filter is applied
    else if (startDate) {
      const selectedStartDate = new Date(startDate);
      expect(date >= selectedStartDate).toBeTruthy();
    }
    // make assertion if only end date filter is applied
  });
}
export default getDatesAndCompare;
