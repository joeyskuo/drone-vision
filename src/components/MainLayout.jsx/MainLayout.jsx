import CameraViewPlayer from "../CameraViewPlayer/CameraViewPlayer";
import ImageProcessingContainer from "../ImageProcessingContainer/ImageProcessingContainer";
import PredictionContainer from "../PredictionContainer/PredictionContainer";
import WorldViewPlayer from "../WorldViewPlayer/WorldViewPlayer";
import './MainLayout.css';

const MainLayout = () => {
    return (
        <div id="main-layout">
            <div>
            <WorldViewPlayer/>
            <div>Description Here</div>
            </div>
            <div>
                <CameraViewPlayer/>
                <ImageProcessingContainer/>
            </div>
            <PredictionContainer/>
        </div>
    )
};

export default MainLayout;