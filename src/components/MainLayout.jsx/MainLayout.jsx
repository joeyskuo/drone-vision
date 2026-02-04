import CameraViewPlayer from "../CameraViewPlayer/CameraViewPlayer";
import ImageProcessingContainer from "../ImageProcessingContainer/ImageProcessingContainer";
import PredictionContainer from "../PredictionContainer/PredictionContainer";
import WorldViewPlayer from "../WorldViewPlayer/WorldViewPlayer";
import './MainLayout.scss';

const MainLayout = () => {
    return (
        <div id="main-layout">
            <section className="title-section">
                <h1>Drone Vision</h1>
                <h2>Simulation and Image Processing</h2>
                <div>ROS2 &middot; Gazebo &middot; TensorFlow</div>
            </section>
            <section className="video-section">
                <CameraViewPlayer/>
                <WorldViewPlayer/>
            </section>
            <section className="image-process-section">
                <ImageProcessingContainer/>
            </section>
            <section className="about-section">
                <section className="project-description-section">
                    <h3>Project Description</h3>
                    <p>A drone is operated in a simulated world, and images from its camera feed are run through a pre-trained object detection model</p>
                    <div>
                        <div><strong>Pending</strong></div>
                        <ul>
                            <li>aerial drone model and movement</li>
                            <li>custom machine learning model (YOLOv8)</li>
                        </ul>
                    </div>
                </section>
                <section className="repo-section">
                    <h3>Modules</h3>
                    <article>
                        <div>ROS2 Drone Workspace (Gazebo, RViz, TF, Xacro)</div>
                        <a href="https://github.com/joeyskuo/drone-feed">Repo</a>
                    </article>
                    <article>
                        <div>Image Processing ML Model (YOLOv8, Colab, Kaggle)</div>
                        <a href="https://github.com/joeyskuo/yolov8s-football-detect">Repo</a>
                    </article>
                    <article>
                        <div>Web App (React, Tensorflow, Vite, SCSS)</div>
                        <a href="https://github.com/joeyskuo/drone-vision">Repo</a>
                    </article>
                    <article>
                        <div>Image Processing API (FastAPI)</div>
                        <a href="#" className="inactive-link">WIP</a>
                    </article>
                    <article>
                        <div>BFF Layer (Node, Express)</div>
                        <a href="#" className="inactive-link">WIP</a>
                    </article>
                </section>
            </section>
        </div>
    )
};

export default MainLayout;