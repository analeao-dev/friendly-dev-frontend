import Hero from '~/components/hero';
import type { Route } from './+types/index';
import FeaturedProjects from '~/components/featured-projects';
import type { PostMeta, Project } from '~/types';
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
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostMeta[] }> {
	const url = new URL(request.url);

	const [projectsResponse, postsResponse] = await Promise.all([
		fetch(`${import.meta.env.VITE_URL_API}/projects`),
		fetch(new URL('/posts-meta.json', url)),
	]);

	if (!projectsResponse.ok || !postsResponse.ok) {
		throw new Error('Failed to fetch projects or posts');
	}

	const [projects, posts] = await Promise.all([projectsResponse.json(), postsResponse.json()]);

	return { projects: projects, posts: posts };
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
