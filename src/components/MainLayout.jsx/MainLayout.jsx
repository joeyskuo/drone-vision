import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { useVideoSync } from '../../context/VideoSyncContext';
import { detectObjects } from '../../ml/objectDetector';
import DualVideoPlayer from "../DualVideoPlayer/DualVideoPlayer";
import ImageProcessingContainer from "../ImageProcessingContainer/ImageProcessingContainer";
import RepoInfo from "../RepoInfo/RepoInfo";
import ProjectLink from "../ProjectLink/ProjectLink";
import './MainLayout.scss';

const MainLayout = () => {
    const { appState, setAppState } = useContext(AppContext);
    const { sourceRef } = useVideoSync();
    const [captureActivated, setCaptureActivated] = useState(false);

    const handleCapture = async () => {
        setCaptureActivated(true);
        const video = sourceRef.current;

        const frameCanvas = document.createElement('canvas');
        frameCanvas.width = video.videoWidth;
        frameCanvas.height = video.videoHeight;
        const ctx = frameCanvas.getContext('2d');
        ctx.drawImage(video, 0, 0, frameCanvas.width, frameCanvas.height);

        const container = document.querySelector('.captured-frame-root');
        const rawImg = document.createElement('img');
        rawImg.src = frameCanvas.toDataURL('image/jpeg', 0.95);
        rawImg.style.width = '100%';
        container.innerHTML = '';
        container.appendChild(rawImg);

        setAppState({ isLoading: true });

        frameCanvas.toBlob(async (blob) => {
            try {
                const resultUrl = await detectObjects(blob);
                const resultImg = document.createElement('img');
                resultImg.src = resultUrl;
                resultImg.style.width = '100%';
                container.innerHTML = '';
                container.appendChild(resultImg);
            } catch (error) {
                throw error;
            } finally {
                setAppState({ isLoading: false });
            }
        }, 'image/jpeg', 0.95);
    };

    return (
        <div id="main-layout">
            <section className="title-section">
                <h1>Drone Vision</h1>
                <h2>Simulation and Object Detection</h2>
                <div>ROS2 &middot; Gazebo &middot; YOLOv8s</div>
            </section>
            <section className="video-section">
                    <DualVideoPlayer/>
            </section>
            <div className="video-capture-connector">
                <button className={`capture-btn${captureActivated ? ' activated' : ''}`} onClick={handleCapture} disabled={appState.isLoading}>
                    {appState.isLoading ? 'Detecting...' : 'Capture Frame'}
                </button>
            </div>
            <section className="image-process-section">
                <ImageProcessingContainer/>
            </section>
            <section className="about-section">
                <section className="project-description-section">
                    <div class="section-label">About the Project</div>
                    <p>A ROS 2-based drone is simulated in the Gazebo environment, where the onboard camera feed is captured via ROS topics and sampled into still frames. These frames are passed to a YOLOv8s object detection model, initially trained on a real-world dataset of aerial football match imagery. Model performance is being improved through retraining using synthetically generated data</p>
                    <div>
                        <div className="sub-label">Pending Improvements</div>
                        <ul className="pending-list">
                            <li>Implement Faster R-CNN (ResNet-50) training loop on synthetic data</li>
                            <li>Replace object detection model and implement PyTorch checkpoint support</li>
                            <li>Return prediction scores alongside bounding boxes</li>
                        </ul>
                    </div>
                    <div className="related-projects">
                        <div className="sub-label">Related Projects</div>
                        <ProjectLink
                            symbol="◈"
                            name="Code Librarian"
                            href="https://www.mycodelibrarian.com"
                            accent="#4a6878"
                            meta={["RAG", "pgvector", "Claude Sonnet", "BFF", "Redis"]}
                            description="An interactive codebase browser that lets developers query any repository in natural language. Powered by a RAG pipeline with semantic code search and Claude Sonnet"
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