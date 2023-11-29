import locators from '../locators/resinSelectors';
import { chromium } from '@playwright/test';

const user = '';
const password = '';
const url = 'https://resin.kubefeature.hearstapps.net/';

/**
 * navigate to login page and fill credentials to access welcome page
 */

async function globalConfig() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.locator(locators.loginSelectors.userName).fill(user);
  await page.locator(locators.loginSelectors.password).fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForSelector(locators.welcomeHeader);
  await page.context().storageState({
    path: 'state.json',
  });
}

export default globalConfig;
