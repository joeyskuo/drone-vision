import { memo, type ReactNode } from 'react';

export interface ProjectLinkProps {
  readonly symbol: string;
  readonly name: string;
  readonly href: string;
  readonly accent: string;
  readonly description: string;
  readonly meta?: readonly string[];
}

function ProjectLinkComponent({
  symbol,
  name,
  href,
  accent,
  description,
  meta,
}: ProjectLinkProps): ReactNode {
  return (
    <a
      className="flex items-center gap-3.5 py-3.5 px-[18px] bg-surface border border-border rounded-xl no-underline text-text-primary shadow-sm transition-[box-shadow,background-color] w-fit hover:bg-surface-alt hover:shadow-card-hover"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name}, opens in new tab`}
      style={{ borderLeftWidth: 3, borderLeftColor: accent }}
    >
      <div className="flex flex-col gap-0.5">
        <div
          className="flex items-center gap-1.5 font-bold text-[calc(0.95rem+1px)] tracking-tight"
          style={{ color: accent }}
        >
          <span
            aria-hidden="true"
            className="text-[calc(1.3rem+1px)] leading-none"
            style={{ color: accent }}
          >
            {symbol}
          </span>
          {name}
        </div>
        {meta ? (
          <span className="text-[calc(0.8rem+1px)] opacity-85" style={{ color: accent }}>
            {meta.join(' \u00B7 ')}
          </span>
        ) : null}
        <span className="text-[calc(0.85rem+1px)] text-text-primary">{description}</span>
      </div>
      <span
        aria-hidden="true"
        className="text-[calc(1rem+1px)] ml-1.5 shrink-0 opacity-70"
        style={{ color: accent }}
      >
        {'\u2197'}
      </span>
    </a>
  );
}

const ProjectLink = memo(ProjectLinkComponent);
ProjectLink.displayName = 'ProjectLink';

export default ProjectLink;
