import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    stylesheet: "/rss/styles.xsl",
    trailingSlash: false,
    items: posts
      .filter((post) => !post.data.planned)
      .sort((a, b) => (b.data.updatedDate || b.data.pubDate) - (a.data.updatedDate || a.data.pubDate))
      .map((post) => ({
        ...post.data,
        link: `/blog/${post.slug}/`,
      })),
  });
}
