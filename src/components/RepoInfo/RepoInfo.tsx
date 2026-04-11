interface RepoInfoProps {
  label: string;
  meta?: string[];
  description: string;
  link: string;
}

const RepoInfo = ({ label, meta, description, link }: RepoInfoProps) => {
    const metaString = meta?.join(' · ');

    return (
        <article data-slot="repo-info" className="flex flex-col bg-surface border border-border rounded-[14px] py-2.5 px-4 shadow-card">
            <div className="flex items-center gap-3 mb-1">
                <div className="flex-1">
                    <div className="font-semibold">{label}</div>
                    <div className="text-text-muted">{metaString}</div>
                </div>
                <a
                    data-slot="repo-link"
                    className="text-[0.78rem] font-medium text-accent whitespace-nowrap py-1 px-2.5 border border-border-strong rounded-md no-underline transition-colors hover:bg-accent hover:text-white hover:border-accent"
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub ↗
                </a>
            </div>
            <p className="text-base bg-surface-alt rounded-lg border border-border leading-normal py-2 px-3 m-0">{description}</p>
        </article>
    )
}

export default RepoInfo;
