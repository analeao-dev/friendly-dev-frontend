import type { Project, StrapiProject, StrapiResponse } from '~/types';
import type { Route } from './+types/details';
import { Link } from 'react-router';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Utilizei client loader somente para teste, pois o ideal em produção seria usar server loader
export async function loader({ request, params }: Route.LoaderArgs) {
	const { id } = params;
	const res = await fetch(
		`${import.meta.env.VITE_URL_API}/projects?filters[documentId][$eq]=${id}&populate=*`
	);

	if (!res.ok) throw new Response('Project not found', { status: 404 });

	const json: StrapiResponse<StrapiProject> = await res.json();

	const item = json.data[0];

	const imageUrl = item.image?.url ? `${item.image.url}` : '/images/no-image.png';

	console.log(imageUrl);

	const project: Project = {
		id: item.id,
		documentId: item.documentId,
		title: item.title,
		description: item.description,
		image: imageUrl,
		url: item.url,
		date: item.date,
		category: item.category,
		featured: item.featured,
	};

	return { project };
}

const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
	const { project } = loaderData;

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
						{new Date(project.date).toLocaleDateString('pt-BR')} * {project.category}
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
