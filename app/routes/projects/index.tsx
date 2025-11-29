import type { Project } from "~/types";
import type { Route } from "./+types/index";
import ProjectCard from "~/components/project-card";

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
    const res = await fetch("http://localhost:8000/projects");
    const data = await res.json();

    return { projects: data };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
    const { projects } = loaderData as { projects: Project[] };

    return (
        <>
            <h2 className="text-3xl font-bold text-white mb-8">🚀 Meus Projetos</h2>
            <div className="grid gap-6 sm:grid-cols-2">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </>
    )
}

export default ProjectsPage;