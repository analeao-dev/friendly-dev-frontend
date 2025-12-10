import Hero from "~/components/hero";
import type { Route } from "./+types/index";
import FeaturedProjects from "~/components/featured-projects";
import type { Project } from "~/types";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | Welcome" },
    { name: "description", content: "Custom website development" },
  ];
}

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const response = await fetch(`${import.meta.env.VITE_URL_API}/projects`);
  const data = await response.json();

  return { projects: data };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData;
  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
    </>
  );
}

export default HomePage;
