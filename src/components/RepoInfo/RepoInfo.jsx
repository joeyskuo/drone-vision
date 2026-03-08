const RepoInfo = ({label, meta, description, link}) => {


    const metaString = meta?.join(' · ');

    return (
        <article className="repo-info">
            <div className="repo-header">
                <div className="repo-summary">
                    <div className="repo-summary--label">{label}</div>
                    <div className="repo-summary--meta">{metaString}</div>
                </div>
                <a className="repo-link" href={link} target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
            <p className="repo-description">{description}</p>
        </article>
    )
}

export default RepoInfo;