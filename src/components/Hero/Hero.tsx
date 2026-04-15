import type { ReactNode } from 'react';

function Hero(): ReactNode {
  return (
    <header className="flex flex-col items-center justify-center">
      <h1 className="text-[3.2em] leading-tight">Drone Vision</h1>
      <p className="text-lg">Simulation and Object Detection</p>
      <p className="text-text-muted">PyTorch &middot; ROS2 &middot; Gazebo</p>
    </header>
  );
}

export default Hero;
