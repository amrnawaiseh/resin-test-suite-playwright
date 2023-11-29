import { test, expect } from '@playwright/test';
import locators from '../locators/resinSelectors';
import {
  NavigateToCreationContent,
  applyFilters,
  checkArticlesDates,
  checkArticlesHeaders,
  checkForAppliedFilter,
  getDatesAndCompare,
  search,
  selectEndDate,
  selectFilter,
  selectStartDate,
  sortBySelect,
} from '../utils';
import dataSet from '../utils/dataSet.json';
const startDate = new Date('10/04/2023').toLocaleDateString(undefined, {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
const endDate = new Date('11/11/2023').toLocaleDateString(undefined, {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
test.describe('resin tests', () => {
  test.use({
    storageState: 'state.json',
  });

  test.beforeEach(async ({ page }) => {
    await NavigateToCreationContent({ page });
  });

  test('check tenant selection results', async ({ page }) => {
    const selectTenant = await page.locator(locators.tenantSelector).innerText();
    const firstArticle = page.getByTestId(locators.testIds.articleCard).first();
    !firstArticle.isVisible()
      ? await expect(page.getByTestId(locators.testIds.emptyResult)).toHaveText(dataSet.noResultsMsg)
      : await expect(page.getByTestId(locators.testIds.cardTitle).first()).toContainText(selectTenant);
  });

  test('check creating new content', async ({ page }) => {
    await page.locator(locators.contentCreate).click();
    await expect(page.getByTestId(locators.testIds.loadingIcon).last()).toBeHidden();
    await expect(page.getByText('Draft Saved')).toBeVisible();
    const articleUrl = page.url();
    const articleId = articleUrl.split('/').pop();
    await page.goBack();
    await page.waitForSelector(locators.articlesContainer);
    await expect(page.locator(locators.articleCardById(articleId))).toBeVisible();
    const selectTenant = await page.locator(locators.tenantSelector).innerText();
    await expect(page.getByTestId(locators.testIds.cardTitle).first()).toContainText(selectTenant);
    await expect(page.locator(locators.cardDraftIcon).first()).toHaveCSS('background-color', 'rgb(237, 147, 241)');
    await page.getByTestId(locators.testIds.cardOptionBtn).first().click();
    await expect(page.getByText('View In FRE')).toBeVisible();
  });

  test('check search sort-by / last published sort results in main content page', async ({ page }) => {
    await search(page, dataSet.searchTitle);
    await sortBySelect(page, dataSet.sortType.sortTypeLastPublished);
    await checkArticlesDates(page);
    await checkArticlesHeaders(page, dataSet.sortType.sortTypeLastPublished);
  });

  test('check search sort-by / Title (A-Z) sort results in main content page', async ({ page }) => {
    await search(page, dataSet.searchTitle);
    await sortBySelect(page, dataSet.sortType.sortTypeTitleAZ);
    const cardHeaders = await page.locator(locators.testIds.cardHeader).allTextContents();
    const sortedHeaders = cardHeaders.sort();
    expect(cardHeaders).toEqual(sortedHeaders);
  });

  test('check search sort-by / last updated sort results in main content page', async ({ page }) => {
    await search(page, dataSet.searchTitle);
    await sortBySelect(page, dataSet.sortType.sortTypeLastUpdated);
    await checkArticlesDates(page);
  });

  test('check content list/ grid layout button functionality', async ({ page }) => {
    await page.getByTestId(locators.testIds.listLayoutBtn).click();
    await expect(page.getByTestId(locators.testIds.listContentContainer)).toBeVisible();
    await page.getByTestId(locators.testIds.gridLayoutBtn).click();
    await expect(page.getByTestId(locators.testIds.gridContentContainer)).toBeVisible();
  });

  test('check content list filtering / start date filter', async ({ page }) => {
    await selectStartDate(page, startDate);
    await getDatesAndCompare(page, { startDate });
  });

  test('check content list filtering / end date filter', async ({ page }) => {
    await selectEndDate(page, endDate);
    await getDatesAndCompare(page, { endDate });
  });

  test('check content list filtering / start and end date filter', async ({ page }) => {
    await selectStartDate(page, startDate);
    await selectEndDate(page, endDate);
    await getDatesAndCompare(page, { startDate, endDate });
  });

  test('check content list filtering / section filter', async ({ page }) => {
    await applyFilters(page, dataSet.sectionFilter.filterName, dataSet.sectionFilter.filterType);
    await checkForAppliedFilter(page, dataSet.sectionFilter.filterName, dataSet.sectionFilter.filterType);
  });

  test('check content list filtering / subsection filter', async ({ page }) => {
    await applyFilters(page, dataSet.subsectionFilter.filterName, dataSet.subsectionFilter.filterType);
    await checkForAppliedFilter(page, dataSet.subsectionFilter.filterName, dataSet.subsectionFilter.filterType);
  });

  test('check content list filtering / collection filter', async ({ page }) => {
    await applyFilters(page, dataSet.collectionFilter.filterName, dataSet.collectionFilter.filterType);
    await checkForAppliedFilter(page, dataSet.collectionFilter.filterName, dataSet.collectionFilter.filterType);
  });

  test('it displays empty content message', async ({ page }) => {
    await page.route('/graphql', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(dataSet.emptyContentPaylaod),
      });
    });
    await page.goto('/creation/content');
    expect(dataSet.noResultsMsg).toBeTruthy();
  });

  test('check content list filtering / filtering content by articles status ( Draft articles )', async ({ page }) => {
    const statusFilter = page.getByTestId(locators.listingFilters).nth(1);
    await selectFilter(page, statusFilter, dataSet.status.statusDraft);
    await checkArticlesHeaders(page, dataSet.status.statusDraft);
  });

  test('check content list filtering / filtering content by articles status ( Scheduled articles )', async ({
    page,
  }) => {
    const statusFilter = page.getByTestId(locators.listingFilters).nth(1);
    await selectFilter(page, statusFilter, dataSet.status.statusScheduled);
    await checkArticlesHeaders(page, dataSet.status.statusScheduled);
  });

  test('check content list filtering / filtering content by articles status ( Published articles )', async ({
    page,
  }) => {
    const statusFilter = page.getByTestId(locators.listingFilters).nth(1);
    await selectFilter(page, statusFilter, dataSet.status.statusPublished);
    await checkArticlesHeaders(page, dataSet.status.statusPublished);
  });

  test('check content list filtering / (My Site) source filtering', async ({ page }) => {
    const sourceFilter = page.getByTestId(locators.listingFilters).nth(3);
    await selectFilter(page, sourceFilter, dataSet.source.sourceMySite);
    await checkArticlesHeaders(page, dataSet.source.sourceMySite);
  });

  test('check content list filtering / (Syndicated) source filtering', async ({ page }) => {
    const sourceFilter = page.getByTestId(locators.listingFilters).nth(3);
    await selectFilter(page, sourceFilter, dataSet.source.sourceSyndicated);
    await checkArticlesHeaders(page, dataSet.source.sourceSyndicated);
  });

  test('check content list filtering / (LIFT) source filtering', async ({ page }) => {
    const sourceFilter = page.getByTestId(locators.listingFilters).nth(3);
    await selectFilter(page, sourceFilter, dataSet.source.sourceLIFT);
    await checkArticlesHeaders(page, dataSet.source.sourceLIFT);
  });

  test('check content list filtering / Sponsorship filtering', async ({ page }) => {
    const sponsorshipFilter = page.getByTestId(locators.listingFilters).nth(4);
    await selectFilter(page, sponsorshipFilter, dataSet.sponsoredContentFilter);
    await checkArticlesHeaders(page, dataSet.sponsoredContentFilter);
  });
});
