import type { Project } from '~/types';
import type { Route } from './+types/index';
import ProjectCard from '~/components/project-card';
import { useState } from 'react';
import PaginationButton from '~/components/pagination-button';
import { AnimatePresence, motion } from 'framer-motion';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'The Friendly Dev | Projects' },
		{ name: 'description', content: 'My website project portfolio' },
	];
}

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
	const res = await fetch(`${import.meta.env.VITE_URL_API}/projects?populate=*`);
	const json = await res.json();

	const projects = json.data.map((item: any) => ({
		item: item.id,
		documentId: item.documentId,
		title: item.title,
		description: item.description,
		image: item.image?.url
			? `${import.meta.env.VITE_STRAPI_API}${item.image.url}`
			: '/images/no-image.png',
		url: item.url,
		date: item.date,
		category: item.category,
		featured: item.featured,
	}));

	return { projects: projects };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [currentPage, setCurrentPage] = useState(1);
	const projectsPerPage = 10;

	const { projects } = loaderData as { projects: Project[] };

	//categorias
	const categories = ['All', ...new Set(projects.map((project) => project.category))];

	//filtra projetos
	const filteredProjects =
		selectedCategory === 'All'
			? projects
			: projects.filter((project) => project.category === selectedCategory);

	//calcula total de páginas
	const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

	//pega projetos da página atual
	const indexOfLast = currentPage * projectsPerPage;
	const indexOfFirst = indexOfLast - projectsPerPage;
	const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

	return (
		<>
			<h2 className='text-3xl font-bold text-white mb-8'>🚀 Meus Projetos</h2>
			<div className='flex flex-wrap gap-2 mb-8'>
				{categories.map((category) => (
					<button
						key={category}
						onClick={() => {
							setSelectedCategory(category);
							setCurrentPage(1);
						}}
						className={`px-3 py-1 rounded text-sm cursor-pointer ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}
					>
						{category}
					</button>
				))}
			</div>
			<AnimatePresence mode='wait'>
				<motion.div layout className='grid gap-6 sm:grid-cols-2'>
					{currentProjects.map((project) => (
						<motion.div layout key={project.id}>
							<ProjectCard project={project} />
						</motion.div>
					))}
				</motion.div>
			</AnimatePresence>

			<PaginationButton
				totalPages={totalPages}
				currentPage={currentPage}
				OnPageChange={setCurrentPage}
			/>
		</>
	);
};

export default ProjectsPage;
