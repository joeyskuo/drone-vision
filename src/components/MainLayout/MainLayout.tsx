import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { useVideoSync } from '../../context/VideoSyncContext';
import { detectObjects } from '../../ml/objectDetector';
import DualVideoPlayer from "../DualVideoPlayer/DualVideoPlayer";
import ImageProcessingContainer from "../ImageProcessingContainer/ImageProcessingContainer";
import RepoInfo from "../RepoInfo/RepoInfo";
import ProjectLink from "../ProjectLink/ProjectLink";
import repos from '../../data/repos.json';
import './MainLayout.scss';

const MainLayout = () => {
    const { appState, setAppState } = useContext(AppContext);
    const { sourceRef } = useVideoSync();
    const [captureActivated, setCaptureActivated] = useState(false);

    const handleCapture = async () => {
        setCaptureActivated(true);
        const video = sourceRef.current;

        const frameCanvas = document.createElement('canvas');
        frameCanvas.width = video!.videoWidth;
        frameCanvas.height = video!.videoHeight;
        const ctx = frameCanvas.getContext('2d');
        ctx!.drawImage(video!, 0, 0, frameCanvas.width, frameCanvas.height);

        const container = document.querySelector('.captured-frame-root');
        const rawImg = document.createElement('img');
        rawImg.src = frameCanvas.toDataURL('image/jpeg', 0.95);
        rawImg.style.width = '100%';
        container!.innerHTML = '';
        container!.appendChild(rawImg);

        setAppState({ isLoading: true });

        frameCanvas.toBlob(async (blob) => {
            if (!blob) return;
            try {
                const resultUrl = await detectObjects(blob);
                const resultImg = document.createElement('img');
                resultImg.src = resultUrl;
                resultImg.style.width = '100%';
                container!.innerHTML = '';
                container!.appendChild(resultImg);
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
                <div>PyTorch &middot; ROS2 &middot; Gazebo</div>
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
                    <div className="section-label">About the Project</div>
                    <p>A ROS 2-based drone is simulated in the Gazebo environment, where the onboard camera feed is captured via ROS topics and sampled into still frames. These frames are passed to a Faster R-CNN object detection model trained on synthetically generated data</p>
                    <div>
                        <div className="sub-label">Pending Improvements</div>
                        <ul className="pending-list">
                            <li>[Completed] Train Faster R-CNN model to replace YOLOv8s model</li>
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
                            meta={["RAG", "Postgres", "LLM", "BFF", "Redis"]}
                            description="An interactive codebase browser that lets developers query any repository in natural language. Agentic loop, embeddings, and reranking logic implemented across BFF and tool server"
                        />
                    </div>
                </section>
                <section className="repo-section">
                    <div className="section-label">Modules</div>
                    <div className="repo-info-list">
                        {repos.map((repo) => (
                            <RepoInfo
                                key={repo.link}
                                label={repo.label}
                                meta={repo.meta}
                                link={repo.link}
                                description={repo.description}
                            />
                        ))}
                    </div>
                </section>
            </section>
            <section className="architecture-section">
                <div className="section-label">Architecture</div>
                <img src="/architecture.png"/>
            </section>
        </div>
    )
};

export default MainLayout;
