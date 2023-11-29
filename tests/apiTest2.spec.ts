import { expect, test } from '@playwright/test';
import userListJsonBody from '../locators/userListJsonBody.json';

test.describe('resin tests', () => {
  test('fetching usr list', async ({ request }) => {
    const jsonResponse = await request.get('https://reqres.in/api/users?page=2');

    expect(jsonResponse.ok()).toBeTruthy();
    expect(jsonResponse.status()).toBe(200);
    const response = await jsonResponse.json();
    expect(await response).toEqual(
      expect.objectContaining({
        page: 2,
        per_page: 6,
        total: 12,
        total_pages: 2,
      })
    );

    expect(response).toEqual(expect.objectContaining(userListJsonBody));
  });

  test('creating user', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/users', {
      data: {
        name: 'Amr Nawaiseh',
        job: 'software engineer',
      },
    });

    const jsonResponse = await response.json();

    expect(response.status()).toBe(201);
    expect(jsonResponse).toMatchObject({
      name: 'Amr Nawaiseh',
    });

    const deleteUser = await request.delete('https://reqres.in/api/users/2');

    expect(deleteUser.status()).toBe(204);
  });
});
