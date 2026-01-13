import CameraViewPlayer from "../CameraViewPlayer/CameraViewPlayer";
import ImageProcessingContainer from "../ImageProcessingContainer/ImageProcessingContainer";
import WorldViewPlayer from "../WorldViewPlayer/WorldViewPlayer";
import './MainLayout.css';

const MainLayout = () => {
    return (
        <div id="main-layout">
            <WorldViewPlayer/>
            <div>
                <CameraViewPlayer/>
                <ImageProcessingContainer/>
            </div>
        </div>
    )
};

export default MainLayout;