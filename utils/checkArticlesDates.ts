import locators from '../locators/resinSelectors';
import { expect } from '@playwright/test';

/**
 * Collect articles dates in the list content page after applying filters and sort them in descending order
 *
 * @param {Object} page - Playwright page
 */

async function checkArticlesDates(page) {
  // collecting article dates from the content list / convert them into date objects pushing them into and an array
  const datesArray = await page.$$eval(locators.testIds.articleDate, (elements) => {
    return elements.map((element) => {
      return new Date(element.getAttribute('datetime'));
    });
  });
  // creating sorted copy of dates array and check for equality
  const sortedDatesArray = await datesArray.slice().sort((a, b) => b - a);

  expect(datesArray).toEqual(sortedDatesArray);
}

export default checkArticlesDates;
