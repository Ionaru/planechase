# Planechase Changelog

All notable changes to Planechase will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Deployment to a Debian host via GHCR and SSH `docker compose`, replacing TeamCity
- A healthcheck, so a deploy waits for nginx to actually answer rather than for the container to
  merely start
- Dependabot configuration for npm, GitHub Actions and Docker updates
- Self-hosting instructions in the README, and a CONTRIBUTING guide
- Long-lived cache headers for the fingerprinted bundle, and `no-cache` for `index.html`

### Changed

- Upgraded from Angular 17 to Angular 22, along with ng-bootstrap, Font Awesome, TypeScript 6 and
  the rest of the dependency tree
- Replaced `.eslintrc.json` with flat config on ESLint 10 and angular-eslint 22
- Moved the Dockerfile and Compose file into `deploy/`, and the image builds the application itself
  instead of copying a `dist/` produced on the CI runner
- The published image is now `ghcr.io/ionaru/planechase` rather than
  `ghcr.io/ionaru/planechase/planechase`, and is tagged with the short commit SHA as well as `latest`
- nginx logs to stdout and stderr, so `docker compose logs` shows them

### Removed

- The TeamCity deployment step and its `TEAMCITY_TOKEN`, `REGISTRY_USER` and `REGISTRY_PASSWORD`
  secrets

[Unreleased]: https://github.com/Ionaru/planechase/compare/493ff15...HEAD
