# Drone Vision

[![CI](https://github.com/joeyskuo/drone-vision/actions/workflows/ci.yml/badge.svg)](https://github.com/joeyskuo/drone-vision/actions/workflows/ci.yml)
[![Deploy](https://github.com/joeyskuo/drone-vision/actions/workflows/deploy.yml/badge.svg)](https://github.com/joeyskuo/drone-vision/actions/workflows/deploy.yml)
[![CodeQL](https://github.com/joeyskuo/drone-vision/actions/workflows/codeql.yml/badge.svg)](https://github.com/joeyskuo/drone-vision/actions/workflows/codeql.yml)
[![Node](https://img.shields.io/badge/node-%E2%89%A520.11-brightgreen.svg)](./.nvmrc)

**Live demo:** [mydronevision.com](https://www.mydronevision.com)

A React web app that runs a custom-trained object detection model on ROS 2
drone simulation footage, served through a cloud-hosted inference API. Part of
a multi-repo system spanning ROS 2 simulation, ML model training, a FastAPI
inference service, and a BFF layer.

---

## What it does

1. Plays two synchronized drone camera feeds (camera view and world view) from
   a Gazebo simulation.
2. User captures a frame; it is drawn to a canvas and encoded as JPEG.
3. The frame is POSTed to a BFF (Node/Express on Railway), which forwards to a
   FastAPI inference service on Cloud Run.
4. Faster R-CNN runs inference and returns an annotated image.
5. The result is displayed alongside the captured frame.

---

## Tech stack

| Layer         | Tech                                                                               |
| ------------- | ---------------------------------------------------------------------------------- |
| Frontend      | React 19, TypeScript 5.9, Vite 7, Tailwind 4, React Query 5, Zustand 5, Axios, Zod |
| Observability | Sentry (browser tracing, release tracking)                                         |
| Testing       | Vitest, Testing Library, jsdom, v8 coverage                                        |
| Tooling       | ESLint 9 (typed), Prettier 3, Husky, lint-staged                                   |
| Inference API | FastAPI, Faster R-CNN, Docker, Cloud Run                                           |
| BFF           | Node.js, Express, Railway                                                          |
| Simulation    | ROS 2, Gazebo                                                                      |

---

## Architecture

```
Browser (React)
  |--> BFF (Node/Express on Railway)
         |--> Inference API (FastAPI on Cloud Run)
                |--> Faster R-CNN model
```

- BFF centralizes auth, rate limiting, and credential management.
- Cold-start latency is mitigated with a warmup call (`GET /warmup`) on app
  mount via React Query.
- Videos are served as static assets from `public/videos/` and kept in sync
  through a shared `sourceRef` in a Zustand store.
- All environment variables are validated at boot with a Zod schema; missing
  or malformed values fail the app fast with a readable error.
- Runtime errors are caught by a top-level `Sentry.ErrorBoundary`; cancelled
  requests are filtered out of telemetry.

---

## Project layout

```
src/
  api/          React Query client factory and typed service layer
  components/   Presentational and container components
  config/       Zod-validated env loader
  data/         Typed static data
  hooks/        Reusable React hooks
  lib/          HTTP client, canvas helpers, error classes, logger
  stores/       Zustand stores with devtools and selectors
  types/        Shared utility types (Result, Brand, DeepReadonly, AsyncState)
```

---

## Local development

Requires Node matching `.nvmrc` (currently 20.18.0).

```bash
nvm use
npm ci
cp .env.example .env.development
npm run dev
```

Environment variables:

| Name                | Required | Description                           |
| ------------------- | -------- | ------------------------------------- |
| `VITE_BFF_ENDPOINT` | yes      | Base URL of the BFF (must be a URL)   |
| `VITE_SENTRY_DSN`   | no       | Sentry DSN; omit to disable reporting |

---

## Scripts

| Script                  | Description                                          |
| ----------------------- | ---------------------------------------------------- |
| `npm run dev`           | Start the Vite dev server                            |
| `npm run build`         | Typecheck the project and produce a production build |
| `npm run preview`       | Preview the built bundle locally                     |
| `npm run lint`          | Run ESLint with typed rules                          |
| `npm run typecheck`     | Run `tsc -b --noEmit`                                |
| `npm run format`        | Apply Prettier                                       |
| `npm run format:check`  | Check Prettier formatting                            |
| `npm run test`          | Run Vitest in CI mode                                |
| `npm run test:watch`    | Vitest in watch mode                                 |
| `npm run test:coverage` | Vitest with v8 coverage                              |
| `npm run validate`      | Typecheck, lint, format check, and tests             |

---

## CI and deployment

- `ci.yml` runs format check, lint, typecheck, tests with coverage, and build
  on every push and pull request.
- `codeql.yml` performs JavaScript/TypeScript static analysis weekly and on
  pull requests.
- `deploy.yml` runs the full validation suite and then deploys to S3 and
  invalidates CloudFront on push to `main`.
- `dependabot.yml` groups weekly updates for npm and GitHub Actions.

---

## Related repos

| Repo                                                                                 | Description                                             |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| [drone-feed](https://github.com/joeyskuo/drone-feed)                                 | ROS 2 drone simulation in Gazebo: model, world, bringup |
| [fasterrcnn-football-detect](https://github.com/joeyskuo/fasterrcnn-football-detect) | Faster R-CNN training on aerial football imagery        |
| [drone-vision-api](https://github.com/joeyskuo/drone-vision-api)                     | FastAPI inference service, Dockerized for Cloud Run     |
| [drone-vision-bff](https://github.com/joeyskuo/drone-vision-bff)                     | BFF layer: API gateway with rate limiting               |

