import type { Project } from "~/types";
import type { Route } from "./+types/details";

export async function clientLoader({ request, params }: Route.ClientLoaderArgs) {
    const res = await fetch(`http://localhost:8000/projects/${params.id}`)

    if (!res.ok) throw new Response('Project not found', { status: 404 });

    const project: Project = await res.json();
    return project;
}

const ProjectDetailsPage = () => {
    return (
        <>
            <h1>Project Details</h1>
        </>
    );
}

export default ProjectDetailsPage;