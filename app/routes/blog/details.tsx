import type { Post, StrapiPost, StrapiResponse } from '~/types';
import type { Route } from './+types/details';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router';

export async function loader({ request, params }: Route.LoaderArgs) {
	const { slug } = params;

	const response = await fetch(
		`${import.meta.env.VITE_URL_API}/posts?filters[slug][$eq]=${slug}&populate=*`
	);

	if (!response.ok) throw new Error('Failed to fetch');

	const json: StrapiResponse<StrapiPost> = await response.json();

	const strapiPost = json.data[0];
	if (!strapiPost) throw new Response('Not Found', { status: 404 });

	const post: Post = {
		id: strapiPost.id,
		documentId: strapiPost.documentId,
		title: strapiPost.title,
		excerpt: strapiPost.excerpt,
		date: strapiPost.date,
		slug: strapiPost.slug,
		body: strapiPost.body,
		image: strapiPost.image?.url ? `${strapiPost.image.url}` : '/images/no-image.png',
	};

	return { post };
}

type BlogPostDetailsPageProps = {
	loaderData: {
		post: Post;
	};
};

const BlogPostDetailsPage = ({ loaderData }: BlogPostDetailsPageProps) => {
	const { post } = loaderData;

	return (
		<>
			<div className='max-w-3xl mx-auto px-6 py-12 bg-gray-900'>
				<h1 className='text-3xl font-bold text-blue-400 mb-2'>{post.title}</h1>
				<img src={post.image} className='w-full h-48 object-cover rounded mb-4' />
				<p className='text-sm text-gray-400 mb-6'>
					{new Date(post.date).toLocaleDateString('pt-BR', {
						day: 'numeric',
						month: 'long',
						year: 'numeric',
					})}{' '}
					às{' '}
					{new Date(post.date).toLocaleTimeString('pt-BR', {
						hour: '2-digit',
						minute: '2-digit',
					})}
				</p>

				<div className='prose prose-invert max-w-none mb-12'>
					<ReactMarkdown>{post.body}</ReactMarkdown>
				</div>
				<Link
					to='/blog'
					className='inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition'
				>
					Voltar
				</Link>
			</div>
		</>
	);
};

export default BlogPostDetailsPage;
