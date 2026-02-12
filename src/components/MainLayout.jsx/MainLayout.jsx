import CameraViewPlayer from "../CameraViewPlayer/CameraViewPlayer";
import ImageProcessingContainer from "../ImageProcessingContainer/ImageProcessingContainer";
import PredictionContainer from "../PredictionContainer/PredictionContainer";
import WorldViewPlayer from "../WorldViewPlayer/WorldViewPlayer";
import RepoInfo from "../RepoInfo/RepoInfo";
import './MainLayout.scss';

const MainLayout = () => {
    return (
        <div id="main-layout">
            <section className="title-section">
                <h1>Drone Vision</h1>
                <h2>Simulation and Object Detection</h2>
                <div>ROS2 &middot; Gazebo &middot; YOLOv8s</div>
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
                    <p>A drone is operated in a simulated world, and images from its camera feed are run through a custom-trained object detection model (YOLOv8s)</p>
                    <div>
                        <div><strong>Pending</strong></div>
                        <ul>
                            <li>aerial drone model and movement</li>
                            <li>backend optimizations (error handling, faster cold start, security)</li>
                        </ul>
                    </div>
                </section>
                <section className="repo-section">
                    <h3>Modules</h3>
                    <RepoInfo
                        label="ROS2 Drone Workspace"
                        details="Gazebo, RViz, TF, Xacro"
                        link="https://github.com/joeyskuo/drone-feed"
                    />
                    <RepoInfo
                        label="Object Detection ML Model"
                        details="YOLOv8s, Colab, Kaggle"
                        link="https://github.com/joeyskuo/yolov8s-football-detect"
                    />
                    <RepoInfo
                        label="Web App"
                        details="React, Vite, SCSS"
                        link="https://github.com/joeyskuo/drone-vision"
                    />
                    <RepoInfo
                        label="Object Detection API"
                        details="FastAPI, YOLOv8s, Cloud Run, Docker"
                        link="https://github.com/joeyskuo/drone-vision-api"
                    />
                    <RepoInfo
                        label="BFF Layer"
                        details="Node, Express, Railway"
                        link="https://github.com/joeyskuo/drone-vision-bff"
                    />
                </section>
            </section>
            <section className="architecture-section">
                <h3>Architecture</h3>
                <img src="/architecture.png"/>
            </section>
        </div>
    )
};

export default MainLayout;