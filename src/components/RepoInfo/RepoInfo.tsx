import { memo, type ReactNode } from 'react';
import type { Repo } from '@/types/repo';

export type RepoInfoProps = Repo;

function RepoInfoComponent({ label, meta, description, link }: RepoInfoProps): ReactNode {
  const metaString = meta.join(' \u00B7 ');

  return (
    <article className="flex flex-col bg-surface border border-border rounded-[14px] py-2.5 px-4 shadow-card">
      <div className="flex items-center gap-3 mb-1">
        <div className="flex-1">
          <h4 className="font-semibold">{label}</h4>
          <div className="text-text-muted">{metaString}</div>
        </div>
        <a
          className="text-[0.78rem] font-medium text-accent whitespace-nowrap py-1 px-2.5 border border-border-strong rounded-md no-underline transition-colors hover:bg-accent hover:text-white hover:border-accent"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label} on GitHub, opens in new tab`}
        >
          GitHub {'\u2197'}
        </a>
      </div>
      <p className="text-base bg-surface-alt rounded-lg border border-border leading-normal py-2 px-3 m-0">
        {description}
      </p>
    </article>
  );
}

const RepoInfo = memo(RepoInfoComponent);
RepoInfo.displayName = 'RepoInfo';

export default RepoInfo;
