import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import postSchema from '../../src/schemas/post.schema.json';
import postsListSchema from '../../src/schemas/posts-list.schema.json';

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const validatePost = ajv.compile(postSchema);
const validatePostsList = ajv.compile(postsListSchema);

const API_BASE = 'https://jsonplaceholder.typicode.com';

test.describe('JSONPlaceholder contract tests', () => {
test('GET /posts/1 conforms to Post schema', async ({ request }) => {
const response = await request.get(`${API_BASE}/posts/1`);
const post = await response.json();

const valid = validatePost(post);
if (!valid) {
console.error(validatePost.errors);
}
expect(valid, JSON.stringify(validatePost.errors, null, 2)).toBeTruthy();
});

test('GET /posts conforms to PostsList schema', async ({ request }) => {
const response = await request.get(`${API_BASE}/posts`);
const posts = await response.json();

const valid = validatePostsList(posts);
if (!valid) {
console.error(validatePostsList.errors);
}
expect(valid, JSON.stringify(validatePostsList.errors, null, 2)).toBeTruthy();
});

test('POST /posts response conforms to Post schema', async ({ request }) => {
const response = await request.post(`${API_BASE}/posts`, {
data: { title: 'Contract', body: 'Test', userId: 1 },
});
const created = await response.json();

const valid = validatePost(created);
expect(valid, JSON.stringify(validatePost.errors, null, 2)).toBeTruthy();
});
});