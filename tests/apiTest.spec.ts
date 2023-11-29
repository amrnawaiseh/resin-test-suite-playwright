import { expect, test } from '@playwright/test';
import { NavigateToCreationContent } from '../utils';

const createContentPayload = {
  operationName: 'createContent',
  variables: {
    createdBy: 'd4fce972-0548-4554-8f69-0237bf2a3ec6',
    editorialSource: 'c9a19f3c-9926-48bf-b231-089a4a5d0bf3',
    publishSource: '1d68b0f0-cd4c-434f-8ad3-b09d958782fc',
    site: '115eff3b-95a0-4668-832c-9d02ea92500d',
    metadata: {
      header: {
        titleLayout: 3,
        hasResinLayoutChanged: false,
      },
      resinReleaseCreated: 'Scribe@394bf8e56998f255cd0dc5ce8f80426850fbcc46',
    },
  },
  query:
    'mutation createContent($createdBy: String!, $editorialSource: ID!, $publishSource: ID!, $site: String!, $metadata: JSON!) {\n  createContent(\n    createdBy: $createdBy\n    editorialSource: $editorialSource\n    publishSource: $publishSource\n    site: $site\n    metadata: $metadata\n  ) {\n    id\n    __typename\n  }\n}',
};

test.describe('resin tests', () => {
  test.use({
    storageState: 'state.json',
  });

  test.beforeEach(async ({ page }) => {
    await NavigateToCreationContent({ page });
  });

  test('check tenant selection results', async ({ request }) => {
    const createResponse = await request.post('https://resin.kubefeature.hearstapps.net/graphql', {
      data: createContentPayload,
    });

    const createResponseJson = await createResponse.json();
    const articleId = await createResponseJson.data.createContent.id;
    console.log(articleId);
    console.log(createResponseJson);

    const updateContentPayload = {
      operationName: 'updateContent',
      variables: {
        authors: null,
        body: '',
        collections: [],
        id: articleId,
        isAutosaveUpdate: true,
        isVersioningEnabled: true,
        lastUpdatedBy: 'd4fce972-0548-4554-8f69-0237bf2a3ec6',
        metadata: {
          dek: '',
          excludeFromPaywall: null,
          header: {
            hasResinLayoutChanged: false,
            titleLayout: 3,
          },
          hideDisplayDate: null,
          hideEditors: null,
          hideFromExternalSearch: null,
          hideFromInternalSearch: null,
          hideWatchNextPlayer: null,
          indexDek: '',
          indexTitle: 'Playwright AN',
          links: null,
          nofollow: null,
          resinReleaseCreated: 'Scribe@394bf8e56998f255cd0dc5ce8f80426850fbcc46',
          resinReleaseEdited: 'Scribe@394bf8e56998f255cd0dc5ce8f80426850fbcc46',
          seoMetaDescription: null,
          seoMetaTitle: 'Playwright AN',
          shortTitle: '',
          showOpinionLabel: null,
          socialDek: '',
          socialTitle: 'Playwright AN',
          syndicationRights: 3,
        },
        rights: {},
        section: null,
        slug: 'yaman123',
        subsection: null,
        title: 'Playwright AN',
        versions: [],
      },
      query:
        'mutation updateContent($authors: [JSON], $body: String, $collections: [JSON], $contentType: ID, $createdAt: String, $editorialSource: ID, $id: ID!, $isAutosaveUpdate: Boolean, $isVersioningEnabled: Boolean, $lastUpdatedBy: ID, $metadata: JSON, $publishFrom: String, $publishSource: ID, $publishTo: String, $rights: JSON, $section: ID, $slug: String!, $status: Int, $subsection: ID, $title: String, $versions: [JSON]) {\n  updateContent(\n    authors: $authors\n    body: $body\n    collections: $collections\n    contentType: $contentType\n    createdAt: $createdAt\n    editorialSource: $editorialSource\n    id: $id\n    isAutosaveUpdate: $isAutosaveUpdate\n    isVersioningEnabled: $isVersioningEnabled\n    lastUpdatedBy: $lastUpdatedBy\n    metadata: $metadata\n    publishFrom: $publishFrom\n    publishSource: $publishSource\n    publishTo: $publishTo\n    rights: $rights\n    section: $section\n    slug: $slug\n    status: $status\n    subsection: $subsection\n    title: $title\n    versions: $versions\n  ) {\n    authors {\n      id\n      displayName\n      value: id\n      label: displayName\n      __typename\n    }\n    id\n    body\n    collections {\n      id\n      label: title\n      primary\n      title\n      value: id\n      __typename\n    }\n    createdAt\n    metadata {\n      dek\n      excludeFromPaywall\n      header {\n        hasResinLayoutChanged\n        titleLayout\n        __typename\n      }\n      hideDisplayDate\n      hideEditors\n      hideFromExternalSearch\n      hideFromInternalSearch\n      hideWatchNextPlayer\n      indexDek\n      indexTitle\n      links {\n        frontend {\n          dev\n          prod\n          stage\n          __typename\n        }\n        __typename\n      }\n      nofollow\n      resinReleaseCreated\n      resinReleaseEdited\n      seoMetaDescription\n      seoMetaTitle\n      shortTitle\n      showOpinionLabel\n      socialDek\n      socialTitle\n      syndicationRights\n      __typename\n    }\n    slug\n    title\n    publishFrom\n    publishTo\n    status\n    __typename\n  }\n}',
    };

    const apiResponse = await request.post('https://resin.kubefeature.hearstapps.net/graphql', {
      data: updateContentPayload,
    });

    const jsonResponse = await apiResponse.json();
    console.log(jsonResponse);
  });

  test('create content button', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Create New Content' })).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Create New Content' })).toBeEnabled();
    await page.getByRole('button', { name: 'Create New Content' }).click();
    await expect(page.getByRole('button', { name: 'Create New Content' })).toBeDisabled();
  });
});
