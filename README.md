# Counterfact Example: Petstore

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
