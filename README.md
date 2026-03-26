# Drone Vision

**Live demo:** [mydronevision.com](https://www.mydronevision.com)

A React web app showcasing a custom-trained object detection model, applied to ROS 2 drone simulation footage via a cloud-hosted inference API. Part of a multi-repo system spanning ROS 2 simulation, ML model training, a FastAPI inference service, and a BFF layer.

---

## What It Does

1. Plays two synchronized drone camera feeds (camera view + world view) from a Gazebo simulation
2. User captures a frame — drawn to canvas and converted to JPEG
3. Frame is POSTed to a BFF (Node/Express on Railway) which forwards to a FastAPI inference service (Cloud Run)
4. YOLOv8s runs inference and returns an annotated image
5. Result is displayed replacing the original captured frame

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite, SCSS, Axios |
| Inference API | FastAPI, YOLOv8s, Docker, Cloud Run |
| BFF | Node.js, Express, Railway |
| Simulation | ROS 2, Gazebo |
| Monitoring | Sentry |

---

## Architecture

```
Browser (React)
  └─► BFF (Node/Express – Railway)
        └─► Inference API (FastAPI – Cloud Run)
              └─► YOLOv8s model
```

- BFF centralizes auth, rate limiting, and credential management
- Cold-start latency mitigated by a warmup call (`GET /warmup`) on app mount
- Videos served as static assets from `public/videos/`; sync maintained via shared `sourceRef` context

---

## Related Repos

| Repo | Description |
|---|---|
| [drone-feed](https://github.com/joeyskuo/drone-feed) | ROS 2 drone simulation in Gazebo — model, world, and bringup |
| [yolov8s-football-detect](https://github.com/joeyskuo/yolov8s-football-detect) | YOLOv8s training on aerial football imagery (Google Colab) |
| [drone-vision-api](https://github.com/joeyskuo/drone-vision-api) | FastAPI inference service, Dockerized for Cloud Run |
| [drone-vision-bff](https://github.com/joeyskuo/drone-vision-bff) | BFF layer — API gateway with rate limiting |

---

## Local Development

```bash
npm install
npm run dev
```

Requires a `.env.development` file:

```
VITE_BFF_ENDPOINT=<bff-url>
VITE_SENTRY_DSN=<sentry-dsn>
```

---

## Pending Improvements

- Implement Faster R-CNN (ResNet-50) training loop on synthetic data
- Replace object detection model and implement PyTorch checkpoint support
- Return prediction scores alongside bounding boxes