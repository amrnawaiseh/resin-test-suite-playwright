import { expect } from '@playwright/test';
import locators from '../locators/resinSelectors';

const creationContentUrl = '/creation/content';

/**
 * navigate to creation content page / Town & Country listing content
 *
 * @param {Object} page - Playwright page
 */

const NavigateToCreationContent = async ({ page }) => {
  await page.goto(creationContentUrl);
  await page.locator(locators.tenantSelector).click();
  await page.locator(locators.tenantSearch).fill('Town & Country');
  await page.getByTestId(locators.testIds.townCountryTenant).click();
  await page.getByTestId(locators.testIds.townCountryTenantUs).click();
  await expect(page.getByTestId(locators.testIds.loadingIcon).last()).toBeHidden();
  await page.getByTestId(locators.testIds.dataSrcBtn).click();
  await page.getByTestId(locators.testIds.roverSrcBtn).click();
  await page.keyboard.press('Escape');
  await expect(page.getByTestId(locators.testIds.loadingIcon).last()).toBeHidden();
};

export default NavigateToCreationContent;
