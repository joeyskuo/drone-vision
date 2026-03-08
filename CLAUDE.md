# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

## Architecture

**drone-vision** is a React 19 + Vite app that streams drone camera footage and runs YOLOv8s object detection via a remote API.

### Data Flow

1. Two synchronized video players (`CameraViewPlayer`, `WorldViewPlayer`) play local MP4s from `public/videos/`
2. User captures a frame → drawn to `<canvas>` → converted to JPEG blob
3. Blob POSTed to the BFF (Backend-for-Frontend) at `VITE_BFF_ENDPOINT/detect`
4. BFF forwards to a FastAPI service (Cloud Run) running YOLOv8s inference
5. Annotated image returned as blob → displayed in `PredictionContainer`
6. A warmup call (`GET /warmup`) fires on mount to avoid cold-start latency

### Key Files

| File | Purpose |
|------|---------|
| `src/ml/objectDetector.js` | `detectObjects()` and `warmUp()` — all API calls via Axios |
| `src/context/VideoSyncContext.jsx` | Shares a `sourceRef` so `WorldViewPlayer` syncs to `CameraViewPlayer` (0.1s tolerance) |
| `src/context/AppContext.jsx` | Global `isLoading` flag |
| `src/components/MainLayout.jsx/MainLayout.jsx` | Root layout — composes all sections |
| `src/instrument.js` | Sentry init (reads `VITE_SENTRY_DSN`) — imported before React in `main.jsx` |

### Environment Variables

Both `.env.development` and `.env.production` define:
- `VITE_BFF_ENDPOINT` — base URL for the BFF API
- `VITE_SENTRY_DSN` — Sentry DSN for error tracking

### Styling

- Global styles: `src/index.css`, `src/App.css`
- Component styles: SCSS (`.scss`) with Sass nesting; CSS for some components
- Color scheme uses surface/accent blues and grays defined in `MainLayout.scss`
