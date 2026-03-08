import CameraViewPlayer from "../CameraViewPlayer/CameraViewPlayer";
import ImageProcessingContainer from "../ImageProcessingContainer/ImageProcessingContainer";
import WorldViewPlayer from "../WorldViewPlayer/WorldViewPlayer";
import RepoInfo from "../RepoInfo/RepoInfo";
import ProjectLink from "../ProjectLink/ProjectLink";
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
                    <div className="related-projects">
                        <div className="sub-label">Related Projects</div>
                        <ProjectLink
                            symbol="◈"
                            name="Code Librarian"
                            href="https://mycodelibrarian.com"
                            accent="#4a6878"
                            meta={["Go", "Claude", "Pinecone", "Redis", "React"]}
                            description="Codebase browser powered by a RAG pipeline for answering questions about a repo"
                        />
                    </div>
                </section>
                <section className="repo-section">
                    <div class="section-label">Modules</div>
                    <div className="repo-info-list">
                        <RepoInfo
                            label="ROS2 Drone Workspace"
                            meta={["Gazebo", "RViz", "TF", "Xacro"]}
                            link="https://github.com/joeyskuo/drone-feed"
                            description="ROS 2 drone simulation in Gazebo — includes model, world, and bringup"
                        />
                        <RepoInfo
                            label="Object Detection ML Model"
                            meta={["YOLOv8s", "Colab", "Kaggle"]}
                            link="https://github.com/joeyskuo/yolov8s-football-detect"
                            description="YOLOv8s Object Detection Model Training on Google Colab"
                        />
                        <RepoInfo
                            label="Web App"
                            meta={["React", "Vite", "SCSS"]}
                            link="https://github.com/joeyskuo/drone-vision"
                            description="React app demonstrating YOLOv8s object detection via API integration on drone camera feed "
                        />
                        <RepoInfo
                            label="Object Detection API"
                            meta={["FastAPI", "YOLOv8s", "Cloud Run", "Docker"]}
                            link="https://github.com/joeyskuo/drone-vision-api"
                            description="FastAPI Service for Object Detection using trained model"
                        />
                        <RepoInfo
                            label="BFF Layer"
                            meta={["Node", "Express", "Railway"]}
                            link="https://github.com/joeyskuo/drone-vision-bff"
                            description="Centralize API access control, secure credentials, and enable rate limiting"
                        />
                    </div>
                </section>
            </section>
            <section className="architecture-section">
                <div class="section-label">Architecture</div>
                <img src="/architecture.png"/>
            </section>
        </div>
    )
};

export default MainLayout;