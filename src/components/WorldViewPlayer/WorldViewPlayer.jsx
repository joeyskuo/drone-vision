const WorldViewPlayer = () => {
    return (
        <figure className="world-view-player">
            <figcaption>World View</figcaption>
            <video controls width="100%">
                <source src="/videos/world.mp4" type="video/mp4" />
            </video>
        </figure>
    )
};

export default WorldViewPlayer;