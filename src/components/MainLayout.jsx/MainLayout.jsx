import CameraViewPlayer from "../CameraViewPlayer/CameraViewPlayer";
import ImageProcessingContainer from "../ImageProcessingContainer/ImageProcessingContainer";
import WorldViewPlayer from "../WorldViewPlayer/WorldViewPlayer";

const MainLayout = () => {
    return (
        <>
            <WorldViewPlayer/>
            <div>
                <CameraViewPlayer/>
                <ImageProcessingContainer/>
            </div>
        </>
    )
};

export default MainLayout;