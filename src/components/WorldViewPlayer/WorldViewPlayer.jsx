const WorldViewPlayer = () => {
    return (
        <figure className="world-view-player">
            <video controls width="100%">
                <source src="/videos/world.mp4" type="video/mp4" />
            </video>
        </figure>
    )
};

export default WorldViewPlayer;