# Counterfact Example: Swagger Petstore

An example implementation of the [OpenAPI Petstore](https://petstore3.swagger.io/) using [Counterfact](https://counterfact.dev/).

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later

## Installation

```bash
npm install
```

## Usage

Start the mock server:

```bash
npm start
```

This runs Counterfact with the Petstore OpenAPI spec (`spec/petstore.yaml`) and serves the API routes defined in the `api/` directory.

Once running, Counterfact provides:

- A mock HTTP server (default: `http://localhost:3100`)
- An interactive REPL for inspecting and manipulating server state at runtime
- A Swagger UI for exploring and testing the API

### Pet Store UI

A single-page app is included in the `ui/` directory. After starting the mock server, open `ui/index.html` in a browser, or serve it with any static file server:

```bash
npx serve ui
```

Then visit `http://localhost:3000` (or whatever port `serve` uses). The UI communicates with the Counterfact backend at `http://localhost:3100` by default. To point it at a different API server, pass the `api` query parameter:

```
http://localhost:3000/?api=http://localhost:3100
```

The UI covers all petstore APIs:

- **Pets tab** – browse pets by status, search by tags, add, edit, and delete pets
- **Store tab** – view live inventory, place orders, look up and delete orders
- **Users tab** – list, add, edit, look up, and delete users

## Testing

### Unit tests

```bash
npm test
```

Runs the context unit tests with Node's built-in test runner.

### UI tests (Playwright)

```bash
npm run test:ui
```

Starts the Counterfact API server on port 3101 and a static file server on port 8080, then runs Playwright browser tests against the full UI + backend stack.

Playwright reports are written to `playwright-report/`. Test failure artefacts (screenshots, videos) go to `test-results/`.

## Project Structure

```
.
├── api/
│   ├── routes/          # Route handlers (TypeScript)
│   │   ├── pet/         # /pet endpoints
│   │   ├── store/       # /store endpoints
│   │   ├── user/        # /user endpoints
│   │   └── _.context.ts # Shared context (state) for all routes
│   └── types/           # Generated TypeScript types from the OpenAPI spec
├── spec/
│   └── petstore.yaml    # OpenAPI specification for the Petstore API
├── test/
│   ├── context.test.ts  # Unit tests for the Context class
│   └── petstore.ui.test.ts  # Playwright end-to-end UI tests
├── ui/
│   └── index.html       # Single-page application
├── playwright.config.ts # Playwright configuration
└── package.json
```

## How It Works

Each file under `api/routes/` corresponds to a path in the OpenAPI spec and exports named functions for each HTTP method (`GET`, `POST`, `PUT`, `DELETE`, etc.).

For example, `api/routes/pet.ts` handles `PUT /pet` and `POST /pet`:

```typescript
export const PUT: updatePet = async ($) => {
  return $.response[200].random();
};

export const POST: addPet = async ($) => {
  return $.response[200].random();
};
```

The `$.response[200].random()` call returns a randomly generated response that conforms to the schema defined in the OpenAPI spec. You can replace these with custom implementations to simulate specific behaviors.

Shared state across routes is managed via the `Context` class in `api/routes/_.context.ts`. Add properties and methods there to build stateful mock behavior.

## Learn More

- [Counterfact documentation](https://counterfact.dev/docs)
- [OpenAPI Petstore specification](https://petstore3.swagger.io/)
