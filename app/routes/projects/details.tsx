import type { Project } from '~/types';
import type { Route } from './+types/details';
import { Link } from 'react-router';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Utilizei client loader somente para teste, pois o ideal em prodrução seria usar server loader
export async function clientLoader({ request, params }: Route.ClientLoaderArgs) {
	const res = await fetch(`http://localhost:8000/projects/${params.id}`);

	if (!res.ok) throw new Response('Project not found', { status: 404 });

	const project: Project = await res.json();
	return project;
}

export async function HydrateFallback() {
	return <div>Loading...</div>;
}

const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
	const project = loaderData;
	console.log(loaderData);
	return (
		<>
			<Link
				to='/projects'
				className='flex items-center gap-2 mb-6 text-xl text-blue-400 hover:text-blue-500 transition'
			>
				<FaArrowLeft />
				<span>Voltar para projetos</span>
			</Link>
			<div className='grid md:grid-cols-2 gap-8 items-start'>
				<div>
					<img src={project.image} alt={project.title} className='w-full rounded-lg shadow-md' />
				</div>
				<div className='flex flex-col items-start gap-4'>
					<h1 className='text-blue-400 text-2xl font-bold'>{project.title}</h1>
					<span>
						{new Date(project.date).toLocaleDateString()} * {project.category}
					</span>
					<p className='text-gray-200'>{project.description}</p>
					{/* usa-se a tag <a> no lugar <Link>, pois será redirecionado para uma página externa */}
					<a
						className='bg-blue-600 hover:bg-blue-700 text-white transition rounded px-6 py-2 cursor-pointer'
						href={project.url}
						target='_blank'
					>
						<div className='flex items-center gap-2'>
							<span>View Live Site</span>
							<FaArrowRight />
						</div>
					</a>
				</div>
			</div>
		</>
	);
};

export default ProjectDetailsPage;
