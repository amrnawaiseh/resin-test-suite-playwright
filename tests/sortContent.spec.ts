import { expect, test } from '@playwright/test';
import { NavigateToCreationContent } from '../utils';
import locators from '../locators/resinSelectors';

const sortContentPayload = {
  operationName: 'filteredContent',
  variables: {
    collections: [],
    createdBy: null,
    cropTypes: ['1x1', '2x1'],
    displayType: '210d7745-8bc9-4cfc-8b24-a81b36aa80cd',
    editorialSources: null,
    isSponsored: false,
    page: 1,
    publishSources: null,
    roles: [12],
    searchText: 'Untitled',
    sections: [],
    sites: ['115eff3b-95a0-4668-832c-9d02ea92500d'],
    sort: '-updated_at',
    status: null,
    subsections: [],
    updatedAtEndDate: null,
    updatedAtStartDate: null,
  },
  query:
    'query filteredContent($collections: [ID], $createdBy: [ID], $cropTypes: [String], $displayType: String, $editorialSources: [ID], $hasEmbedGalleriesExcluded: Boolean, $ids: [ID], $isSponsored: Boolean, $hasPublishSourcesExcluded: Boolean, $page: Int, $publishSources: [ID], $roles: [Int], $searchText: String, $sections: [ID], $sites: [ID!], $sort: String, $status: String, $subsections: [ID], $updatedAtEndDate: String, $updatedAtStartDate: String) {\n  contents: concordeContents(\n    displayType: $displayType\n    collections: $collections\n    createdBy: $createdBy\n    editorialSources: $editorialSources\n    hasEmbedGalleriesExcluded: $hasEmbedGalleriesExcluded\n    ids: $ids\n    isSponsored: $isSponsored\n    hasPublishSourcesExcluded: $hasPublishSourcesExcluded\n    page: $page\n    publishSources: $publishSources\n    searchText: $searchText\n    sections: $sections\n    sites: $sites\n    sort: $sort\n    status: $status\n    subsections: $subsections\n    updatedAtEndDate: $updatedAtEndDate\n    updatedAtStartDate: $updatedAtStartDate\n  ) {\n    data {\n      author {\n        displayName\n        photo\n        __typename\n      }\n      displayType {\n        id\n        title\n        __typename\n      }\n      id\n      media(roles: $roles) {\n        mediaObject {\n          hipsUrl\n          metadata {\n            crops(cropTypes: $cropTypes) {\n              _1x1\n              _2x1\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      metadata {\n        embedOnly\n        links {\n          frontend {\n            dev\n            prod\n            stage\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      site {\n        brand {\n          name\n          __typename\n        }\n        locale {\n          country\n          __typename\n        }\n        metadata\n        id\n        __typename\n      }\n      sponsor {\n        title\n        __typename\n      }\n      status\n      title\n      updatedAt\n      editorialSource {\n        title\n        id\n        __typename\n      }\n      __typename\n    }\n    links {\n      prev\n      next\n      __typename\n    }\n    __typename\n  }\n}',
};

test.describe('resin tests', () => {
  test.use({
    storageState: 'state.json',
  });

  test.beforeEach(async ({ page }) => {
    await NavigateToCreationContent({ page });
  });

  test('check tenant selection results', async ({ page }) => {
    await page.route('**/graphql', (route) => {
      route.continue({ postData: sortContentPayload });
    });
    await page.waitForTimeout(10000);

    await page.reload();
  });

  test('it displays empty content message', async ({ page }) => {
    await page.route('https://resin.kubefeature.hearstapps.net/graphql', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(sortContentPayload),
      });
    });

    await page.getByTestId(locators.testIds.dataSrcBtn).click();
    await page.getByTestId(locators.testIds.roverSrcBtn).click();
    await page.keyboard.press('Escape');
    await expect(page.getByTestId(locators.testIds.loadingIcon).last()).toBeHidden();
  });
});
