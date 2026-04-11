import RepoInfo from "../RepoInfo/RepoInfo";
import ProjectLink from "../ProjectLink/ProjectLink";
import repos from '../../data/repos.json';

const AboutSection = () => (
    <section data-slot="about" className="grid grid-cols-2 gap-12">
        <section data-slot="description">
            <div data-slot="section-label">About the Project</div>
            <p className="text-text-primary leading-relaxed">A ROS 2-based drone is simulated in the Gazebo environment, where the onboard camera feed is captured via ROS topics and sampled into still frames. These frames are passed to a Faster R-CNN object detection model trained on synthetically generated data</p>
            <div className="mt-4">
                <div data-slot="sub-label">Pending Improvements</div>
                <ul data-slot="pending-list" className="flex flex-col gap-1.5 pl-5">
                    <li className="flex items-start gap-2.5 text-base text-text-muted py-2 px-3 bg-surface-alt rounded-lg border border-border leading-normal shadow-card before:content-['○'] before:text-accent-alt before:text-xs before:mt-0.5 before:shrink-0">[Completed] Train Faster R-CNN model to replace YOLOv8s model</li>
                    <li className="flex items-start gap-2.5 text-base text-text-muted py-2 px-3 bg-surface-alt rounded-lg border border-border leading-normal shadow-card before:content-['○'] before:text-accent-alt before:text-xs before:mt-0.5 before:shrink-0">Return prediction scores alongside bounding boxes</li>
                </ul>
            </div>
            <div className="mt-5">
                <div data-slot="sub-label">Related Projects</div>
                <div className="ml-5">
                    <ProjectLink
                        symbol="◈"
                        name="Code Librarian"
                        href="https://www.mycodelibrarian.com"
                        accent="#4a6878"
                        meta={["RAG", "Postgres", "LLM", "BFF", "Redis"]}
                        description="An interactive codebase browser that lets developers query any repository in natural language. Agentic loop, embeddings, and reranking logic implemented across BFF and tool server"
                    />
                </div>
            </div>
        </section>
        <section data-slot="modules">
            <div data-slot="section-label">Modules</div>
            <div className="flex flex-col gap-1.5">
                {repos.map((repo) => (
                    <RepoInfo
                        key={repo.link}
                        label={repo.label}
                        meta={repo.meta}
                        link={repo.link}
                        description={repo.description}
                    />
                ))}
            </div>
        </section>
    </section>
);

export default AboutSection;
