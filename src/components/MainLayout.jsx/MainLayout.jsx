import CameraViewPlayer from "../CameraViewPlayer/CameraViewPlayer";
import ImageProcessingContainer from "../ImageProcessingContainer/ImageProcessingContainer";
import PredictionContainer from "../PredictionContainer/PredictionContainer";
import WorldViewPlayer from "../WorldViewPlayer/WorldViewPlayer";
import './MainLayout.scss';

const MainLayout = () => {
    return (
        <div id="main-layout">
            <section className="title-section">
                <div>
                    <h1>Drone Vision</h1>
                    <p>Simulation and Image Processing</p>
                    <div>ROS2 &middot; Gazebo &middot; TensorFlow</div>
                </div>
            </section>
            <section className="video-section">
                <CameraViewPlayer/>
                <WorldViewPlayer/>
            </section>
            <section className="image-process-section">
                <ImageProcessingContainer/>
            </section>
            <section className="repo-section">
                <div>
                    <div>Project Description</div>
                    <div>
                        <div>Pending</div>
                        <ul>
                            <li>aerial drone model and movement</li>
                            <li>custom machine learning model</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h3>Modules</h3>
                    <article>
                        <div>ROS2 Drone Workspace</div>
                        <a href="http://github.com">Repo</a>
                    </article>
                    <article>
                        <div>Image Processing ML Model</div>
                        <a href="http://github.com">Repo</a>
                    </article>
                    <article>
                        <div>Web App</div>
                        <a href="http://github.com">Repo</a>
                    </article>
                </div>
            </section>
        </div>
    )
};

export default MainLayout;