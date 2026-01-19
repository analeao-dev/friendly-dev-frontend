export type Project = {
    id: string;
    documentId: string;
    title: string;
    description: string;
    image: string;
    url: string;
    date: string;
    category: string;
    featured: boolean;
}

export type StrapiResponse<T> = {
    data: T[]
}

export type StrapiProject = {
    id: string;
    documentId: string;
    title: string;
    description: string;
    image?: {
        url: string;
        formats?: {
            thumbnail?: { url: string };
            small?: { url: string };
            medium?: { url: string };
            large?: { url: string };
        }
    };
    url: string;
    date: string;
    category: string;
    featured: boolean;
}

export type StrapiPost = {
    id: string;
    documentId: string;
    title: string;
    excerpt: string;
    date: string;
    slug: string;
    body: string;
    image?: {
        url: string;
        formats?: {
            thumbnail?: { url: string };
            small?: { url: string };
            medium?: { url: string };
            large?: { url: string };
        }
    };
}

export type Post = {
    id: string;
    documentId: string;
    title: string;
    excerpt: string;
    date: string;
    slug: string;
    body: string;
    image: string;
}