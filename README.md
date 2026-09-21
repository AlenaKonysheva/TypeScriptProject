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