import type { Repo } from '@/types/repo';

export const repos = [
  {
    label: 'ROS2 Drone Workspace',
    meta: ['Gazebo', 'RViz', 'TF', 'Xacro'],
    link: 'https://github.com/joeyskuo/drone-feed',
    description: 'ROS 2 drone simulation in Gazebo, including model, world, and bringup',
  },
  {
    label: 'Object Detection ML Model',
    meta: ['Faster R-CNN', 'PyTorch', 'Colab'],
    link: 'https://github.com/joeyskuo/fasterrcnn-football-detect',
    description: 'Faster R-CNN object detection model training on Google Colab (to be updated)',
  },
  {
    label: 'Web App',
    meta: ['React', 'Vite', 'Tailwind'],
    link: 'https://github.com/joeyskuo/drone-vision',
    description:
      'React app demonstrating Faster R-CNN object detection via API integration on drone camera feed',
  },
  {
    label: 'Object Detection API',
    meta: ['FastAPI', 'Faster R-CNN', 'Cloud Run', 'Docker'],
    link: 'https://github.com/joeyskuo/drone-vision-api',
    description: 'FastAPI Service for Object Detection using trained model',
  },
  {
    label: 'BFF Layer',
    meta: ['Node', 'Express', 'Railway'],
    link: 'https://github.com/joeyskuo/drone-vision-bff',
    description: 'Centralize API access control, secure credentials, and enable rate limiting',
  },
] as const satisfies readonly Repo[];

export type RepoKey = (typeof repos)[number]['link'];
