import CameraViewPlayer from "../CameraViewPlayer/CameraViewPlayer";
import ImageProcessingContainer from "../ImageProcessingContainer/ImageProcessingContainer";
import WorldViewPlayer from "../WorldViewPlayer/WorldViewPlayer";
import RepoInfo from "../RepoInfo/RepoInfo";
import { VideoSyncProvider } from "../../context/VideoSyncContext";
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
                <VideoSyncProvider>
                    <CameraViewPlayer/>
                    <WorldViewPlayer/>
                </VideoSyncProvider>
            </section>
            <section className="image-process-section">
                <ImageProcessingContainer/>
            </section>
            <section className="about-section">
                <section className="project-description-section">
                    <div class="section-label">About the Project</div>
                    <p>A ROS 2 drone is simulated in Gazebo, where images from the camera feed topic 
    have been recorded. Still frames are sent to a YOLOv8s object detection model 
    trained on a custom football/player image dataset. Model performance is being 
    actively improved through deep learning workflows, including hyperparameter tuning, 
    dataset augmentation, and retraining with synthetic data</p>
                    <div>
                        <div className="sub-label">Pending Improvements</div>
                        <ul className="pending-list">
                            <li>develop synthetic data pipeline to generate paired image and annotation files of a football (Blender, Python)</li>
                            <li>fine-tune YOLOv8s for accurate player and football detection</li>
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