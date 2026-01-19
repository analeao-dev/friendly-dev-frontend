import type { Project } from '~/types';
import ProjectCard from './project-card';

type FeaturedProjectsProps = {
	projects: Project[];
	count: number;
};

const FeaturedProjects = ({ projects, count = 0 }: FeaturedProjectsProps) => {
	if (projects.length === 0) return null;

	return (
		<section>
			<h2 className='text-2xl font-bold mb-6'>✨ Projetos em Destaque</h2>

			<div className='grid sm:grid-cols-2 gap-6'>
				{projects.map((project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
		</section>
	);
};

export default FeaturedProjects;
