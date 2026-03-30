import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import useCaptureFrame from '../../hooks/useCaptureFrame';
import DualVideoPlayer from "../DualVideoPlayer/DualVideoPlayer";
import ImageProcessingContainer from "../ImageProcessingContainer/ImageProcessingContainer";
import RepoInfo from "../RepoInfo/RepoInfo";
import ProjectLink from "../ProjectLink/ProjectLink";
import repos from '../../data/repos.json';
import './MainLayout.scss';

const MainLayout = () => {
    const { appState } = useContext(AppContext);
    const { handleCapture, captureActivated } = useCaptureFrame();

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
