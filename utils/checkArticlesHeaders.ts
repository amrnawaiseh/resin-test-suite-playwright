import locators from '../locators/resinSelectors';
import { expect, Page } from '@playwright/test';

/**
 * Collect articles headers in the list content page after applying filters / check for filter name in the headers
 *
 * @param {Object} page - Playwright page
 * @param {String} name - Filter name
 */

async function checkArticlesHeaders(page: Page, name: String) {
  const articlesArr = await page.locator(locators.testIds.cardTitle).allTextContents();
  (await articlesArr).map(async (article) => {
    expect(await article.toLowerCase()).toContain(name.toLowerCase());
  });
}

export default checkArticlesHeaders;
