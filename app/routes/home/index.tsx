import type { Route } from './+types/index';
import FeaturedProjects from '~/components/featured-projects';
import type { Post, Project, StrapiPost, StrapiProject, StrapiResponse } from '~/types';
import AboutPreview from '~/components/about-preview';
import LatestPosts from '~/components/latest-posts';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'The Friendly Dev | Welcome' },
		{ name: 'description', content: 'Custom website development' },
	];
}

export async function loader({
	request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: Post[] }> {
	const [projectsResponse, postsResponse] = await Promise.all([
		fetch(`${import.meta.env.VITE_URL_API}/projects?filters[featured][$eq]=true&populate=*`),
		fetch(`${import.meta.env.VITE_URL_API}/posts?populate=*`),
	]);

	if (!projectsResponse.ok || !postsResponse.ok) {
		throw new Error('Failed to fetch projects or posts');
	}

	const projectsJson: StrapiResponse<StrapiProject> = await projectsResponse.json();
	const postsJson: StrapiResponse<StrapiPost> = await postsResponse.json();

	const projects = projectsJson.data.map((item) => ({
		id: item.id,
		documentId: item.documentId,
		title: item.title,
		description: item.description,
		image: item.image?.url ? `${item.image.url}` : '/images/no-image.png',
		url: item.url,
		date: item.date,
		category: item.category,
		featured: item.featured,
	}));

	const posts = postsJson.data.map((item) => ({
		id: item.id,
		documentId: item.documentId,
		title: item.title,
		excerpt: item.excerpt,
		body: item.body,
		date: item.date,
		slug: item.slug,
		image: item.image?.url ? `${item.image.url}` : '/images/no-image.png',
	}));

	return { projects, posts };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
	const { projects, posts } = loaderData;
	return (
		<>
			<FeaturedProjects projects={projects} count={2} />
			<AboutPreview />
			<LatestPosts posts={posts} />
		</>
	);
};

export default HomePage;
