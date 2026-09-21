## Running Tests

This project uses Playwright Test to run both UI (E2E) and API/contract tests.

### Run all tests
```bash
npx playwright test
```
### Run only UI tests
```bash
npx playwright test --project=chromium
```
### Run only API and contract tests
```bash
npx playwright test --project=api
```
### Run a specific test file
```bash
npx playwright test tests/e2e/login.spec.ts
```
### Run tests in headed mode (see the browser)
```bash
npx playwright test --headed
```
### Run tests in debug mode
```bash
npx playwright test --debug
```
### Viewing Test Reports
```bash
npx playwright show-report
```
### TypeScriptProject structure
```
TypeScriptProject/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI: UI + API + contract jobs
├── src/
│   ├── pages/                      # Page Object Model
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   └── CartPage.ts
│   ├── fixtures/
│   │   └── pages.ts                # Кастомные Playwright fixtures
│   ├── api/
│   │   └── client.ts               # APIRequestContext wrapper
│   └── schemas/
│       ├── post.schema.json        # JSON Schema для JSONPlaceholder
│       └── user.schema.json
├── tests/
│   ├── e2e/                        # UI-тесты (Playwright)
│   │   ├── login.spec.ts
│   │   ├── cart.spec.ts
│   │   └── checkout.spec.ts
│   ├── api/                        # API-тесты (Playwright request)
│   │   └── posts.api.spec.ts
│   └── contract/                   # Contract-тесты (JSON Schema validation)
│       └── posts.contract.spec.ts
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```