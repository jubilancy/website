import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export const GET = async (context) => {
	const posts = await getCollection("posts");

	const sortedPosts = posts.sort(
		(a, b) =>
			new Date(b.data.updated || b.data.added).valueOf() -
			new Date(a.data.updated || a.data.added).valueOf()
	);

	return rss({
		// Hardcode your site details here instead of importing them
		title: "Eliana's Web Feed", 
		description: "A digital shoebox of thoughts and projects.",
		site: context.site,
		items: sortedPosts.map((post) => ({
			link: `/post/${post.data.slug}`,
			title: post.data.title,
			pubDate: new Date(post.data.added),
			description: post.data.description,
			content: post.rendered?.html || "",
			customData: `<updated>${
				post.data.updated ? post.data.updated : post.data.added
			}</updated>`,
		})),
		stylesheet: "/rss-styles.xsl",
	});
};