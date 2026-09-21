import { test, expect } from '@playwright/test';

const API_BASE = 'https://jsonplaceholder.typicode.com';

test.describe('JSONPlaceholder API', () => {
test('GET /posts returns a non-empty array', async ({ request }) => {
const response = await request.get(`${API_BASE}/posts`);
expect(response.status()).toBe(200);

const posts = await response.json();
expect(Array.isArray(posts)).toBeTruthy();
expect(posts.length).toBeGreaterThan(0);
});

test('GET /posts/1 returns a single post with expected fields', async ({ request }) => {
const response = await request.get(`${API_BASE}/posts/1`);
expect(response.status()).toBe(200);

const post = await response.json();
expect(post).toHaveProperty('id', 1);
expect(post).toHaveProperty('userId');
expect(post).toHaveProperty('title');
expect(post).toHaveProperty('body');
});

test('POST /posts creates a new post', async ({ request }) => {
const payload = {
title: 'QA Automation',
body: 'Contract testing with Playwright',
userId: 1,
};

const response = await request.post(`${API_BASE}/posts`, { data: payload });
expect(response.status()).toBe(201);

const created = await response.json();
expect(created.title).toBe(payload.title);
expect(created.body).toBe(payload.body);
expect(created.userId).toBe(payload.userId);
});

test('GET /posts/9999 returns empty object for non-existent post', async ({ request }) => {
const response = await request.get(`${API_BASE}/posts/9999`);
const body = await response.json();
expect(body).toEqual({});
});
});