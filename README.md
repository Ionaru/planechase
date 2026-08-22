# Planechase

A project for playing the [MTG Planechase format](<https://mtg.wiki/page/Planechase_(format)>).

Supports custom planes.

## Self-hosting

It is possible to self-host Planechase. It requires Docker with the Compose v2 plugin, and images are
published to `ghcr.io/ionaru/planechase`.

Planechase does not publish a port. It is an nginx container listening on port 80, and it expects a
reverse proxy in front of it, reached over a shared Docker network named `edge`.

1. Install [Docker Engine](https://docs.docker.com/engine/install/), which includes the Compose v2 plugin.
2. Clone this repository, or [download](https://github.com/Ionaru/planechase/archive/main.zip) and extract it.
3. Create the shared network, if your reverse proxy has not already created it:

    ```bash
    docker network create edge
    ```

    The Compose file declares this network as `external`, so it will **not** create it for you and
    the stack refuses to start without it.

4. Create a `.env` file in the root of the checkout. Every variable is optional, so an empty file is
   fine:

    ```bash
    touch .env
    ```

5. Start it:

    ```bash
    docker compose --project-name planechase --env-file "$PWD/.env" --file deploy/compose.yaml up -d
    ```

    The `--env-file` flag is not optional. The Compose file lives in `deploy/`, so Compose looks for a
    `.env` next to it and will **not** find the one in the root of the checkout. Without the flag the
    stack silently runs `:latest` rather than the revision you pinned.

6. Check that it came up:

    ```bash
    docker compose --project-name planechase --env-file "$PWD/.env" --file deploy/compose.yaml ps
    ```

    The service has a healthcheck, so it reports `healthy` once nginx is actually answering.

Point your reverse proxy at `http://planechase:80`. Compose registers the service name as a network
alias, so anything else attached to `edge` can resolve it. With Caddy that is:

```caddyfile
planechase.example.com {
    reverse_proxy planechase:80
}
```

If you would rather not run a reverse proxy, publish the port yourself with an override file next to
the Compose file, `deploy/compose.override.yaml`:

```yaml
services:
    planechase:
        ports:
            - '8080:80'
```

Run `docker compose ... config` instead of `up` at any point to print the fully resolved
configuration. That is the quickest way to confirm your networks and image tag are what you expect.

### Environment variables

| Variable                  | Required | Description                             |
| ------------------------- | -------- | --------------------------------------- |
| `PLANECHASE_GIT_REVISION` | No       | Image tag to run. Defaults to `latest`. |

### A note on architecture

The prebuilt `ghcr.io/ionaru/planechase` images are `linux/amd64` only. On other architectures the
pull fails with a manifest error, and you will need to build the image locally instead:

```bash
docker compose --project-name planechase --env-file "$PWD/.env" --file deploy/compose.yaml up -d --build
```

## Developer information

Want to contribute? Awesome! See [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

Planechase is an Angular application and requires **Node.js 24 or newer**.

```bash
npm ci                    # Install dependencies
npm start                 # Serve with live reload on http://localhost:4200
npm run lint              # Check formatting and lint
npm run format            # Fix what can be fixed automatically
npm run build:production  # Build the production bundle into dist/browser
```
