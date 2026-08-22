# Contributing to Planechase

Thanks for taking the time to contribute!

## Prerequisites

- [Node.js](https://nodejs.org/) 24 or newer, which is what the CI pipeline and the Docker image use.
- npm, which ships with Node.js.

Docker is only needed if you want to build or run the production image; the application itself runs
fine without it.

## Getting started

```bash
git clone https://github.com/Ionaru/planechase.git
cd planechase
npm ci
npm start
```

`npm start` serves the application on <http://localhost:4200> with live reload.

## Checks

Run both of these before opening a pull request. They are the same checks CI runs, so a failure here
is a failure there:

```bash
npm run lint              # prettier --check, then ng lint
npm run build:production
```

`npm run format` fixes formatting and the auto-fixable lint rules for you.

The pipeline also runs `npm audit --omit=dev` before anything else, so a pull request that adds a
dependency with a known advisory will not go green.

## Building the container image

The image is a multi-stage build: it compiles the application with Node and serves the result with
nginx. The Compose file declares an external network, so create it once first:

```bash
docker network create edge
touch .env
docker compose --project-name planechase --env-file "$PWD/.env" --file deploy/compose.yaml up -d --build
```

See the [README](README.md#self-hosting) for what the deployment expects.

## Pull requests

1. Fork the repository and create a branch off `main`.
2. Make your change, keeping the commits focused.
3. Make sure the checks above pass.
4. Open a pull request describing what changed and why.

## Reporting bugs and requesting features

Use the [issue templates](https://github.com/Ionaru/planechase/issues/new/choose). For a bug, the
steps to reproduce it and the browser you saw it in are the most useful things you can include.
