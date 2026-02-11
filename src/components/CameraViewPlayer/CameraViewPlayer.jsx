const CameraViewPlayer = () => {
    return (
        <figure className="camera-view-player">
            <figcaption>Drone Camera</figcaption>
            <video controls width="100%">
                <source src="/videos/cam_soccer.mp4" type="video/mp4" />
            </video>
        </figure>
    )
};

export default CameraViewPlayer;