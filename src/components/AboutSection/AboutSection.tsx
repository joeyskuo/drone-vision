import type { ReactNode } from 'react';
import ProjectLink from '@/components/ProjectLink/ProjectLink';
import RepoInfo from '@/components/RepoInfo/RepoInfo';
import { repos } from '@/data/repos';

const PENDING_IMPROVEMENTS = [
  '[Completed] Train Faster R-CNN model to replace YOLOv8s model',
  'Return prediction scores alongside bounding boxes',
] as const;

function AboutSection(): ReactNode {
  return (
    <section className="grid grid-cols-2 gap-12" aria-labelledby="about-heading">
      <section aria-labelledby="about-heading">
        <h2
          id="about-heading"
          className="font-sans text-base font-bold tracking-widest uppercase text-accent mb-4"
        >
          About the Project
        </h2>
        <p className="text-text-primary leading-relaxed">
          A ROS 2-based drone is simulated in the Gazebo environment, where the onboard camera feed
          is captured via ROS topics and sampled into still frames. These frames are passed to a
          Faster R-CNN object detection model trained on synthetically generated data.
        </p>
        <div className="mt-4">
          <h3 className="font-sans font-bold text-[0.9rem] text-accent tracking-[0.05em] mb-2.5">
            Pending Improvements
          </h3>
          <ul className="flex flex-col gap-1.5 pl-5">
            {PENDING_IMPROVEMENTS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-base text-text-muted py-2 px-3 bg-surface-alt rounded-lg border border-border leading-normal shadow-card before:content-['\u25CB'] before:text-accent-alt before:text-xs before:mt-0.5 before:shrink-0"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-5">
          <h3 className="font-sans font-bold text-[0.9rem] text-accent tracking-[0.05em] mb-2.5">
            Related Projects
          </h3>
          <div className="ml-5">
            <ProjectLink
              symbol={'\u25C8'}
              name="Code Librarian"
              href="https://www.mycodelibrarian.com"
              accent="#4a6878"
              meta={['RAG', 'Postgres', 'LLM', 'BFF', 'Redis']}
              description="An interactive codebase browser that lets developers query any repository in natural language. Agentic loop, embeddings, and reranking logic implemented across BFF and tool server"
            />
          </div>
        </div>
      </section>
      <section aria-labelledby="modules-heading">
        <h2
          id="modules-heading"
          className="font-sans text-base font-bold tracking-widest uppercase text-accent mb-4"
        >
          Modules
        </h2>
        <div className="flex flex-col gap-1.5">
          {repos.map((repo) => (
            <RepoInfo key={repo.link} {...repo} />
          ))}
        </div>
      </section>
    </section>
  );
}

export default AboutSection;
