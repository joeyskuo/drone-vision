import './ProjectLink.css';

const ProjectLink = ({ symbol, name, href, accent, description, meta }) => {
    return (
        <a className="project-link" href={href} target="_blank" rel="noreferrer" style={{ '--project-accent': accent }}>
            <div className="project-link--body">
                <div className="project-link--name">
                    <span className="project-link--symbol">{symbol}</span>
                    {name}
                </div>
                {meta && <span className="project-link--meta">{meta.join(' · ')}</span>}
                <span className="project-link--description">{description}</span>
            </div>
            <span className="project-link--arrow">↗</span>
        </a>
    );
};

export default ProjectLink;
