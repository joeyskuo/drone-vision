const CameraViewPlayer = () => {
    return (
        <figure className="camera-view-player">
            <video controls width="100%">
                <source src="/videos/shapes.mp4" type="video/mp4" />
            </video>
        </figure>
    )
};

export default CameraViewPlayer;