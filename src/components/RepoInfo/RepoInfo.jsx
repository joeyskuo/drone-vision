const RepoInfo = ({label, details, link}) => {

    return (
        <article className="repo-info">
            <span className="repo-label">{label}</span>
            <span>({details})</span>
            <a href={link}>Repo</a>
        </article>
    )
}

export default RepoInfo;