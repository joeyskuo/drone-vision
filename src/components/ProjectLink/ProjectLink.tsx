interface ProjectLinkProps {
  symbol: string;
  name: string;
  href: string;
  accent: string;
  description: string;
  meta?: string[];
}

const ProjectLink = ({ symbol, name, href, accent, description, meta }: ProjectLinkProps) => {
    return (
        <a
            data-slot="project-link"
            className="flex items-center gap-3.5 py-3.5 px-[18px] bg-surface border border-border rounded-xl no-underline text-text-primary shadow-sm transition-[box-shadow,background-color] w-fit hover:bg-surface-alt hover:shadow-card-hover"
            href={href}
            target="_blank"
            rel="noreferrer"
            style={{ borderLeftWidth: 3, borderLeftColor: accent }}
        >
            <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 font-bold text-[calc(0.95rem+1px)] tracking-tight" style={{ color: accent }}>
                    <span className="text-[calc(1.3rem+1px)] leading-none" style={{ color: accent }}>{symbol}</span>
                    {name}
                </div>
                {meta && <span className="text-[calc(0.8rem+1px)] opacity-85" style={{ color: accent }}>{meta.join(' · ')}</span>}
                <span className="text-[calc(0.85rem+1px)] text-text-primary">{description}</span>
            </div>
            <span className="text-[calc(1rem+1px)] ml-1.5 shrink-0 opacity-70" style={{ color: accent }}>↗</span>
        </a>
    );
};

export default ProjectLink;
