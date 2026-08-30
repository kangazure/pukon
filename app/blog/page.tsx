import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

interface PostMeta {
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  readingTime: string;
  coverImage: string;
  slug: string;
}

export default async function BlogPage() {
  const postsDir = path.join(process.cwd(), 'content', 'blog');
  const filenames = fs.readdirSync(postsDir);
  const posts: PostMeta[] = filenames.map((file) => {
    const slug = file.replace(/\.mdx?$/, '');
    const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
    const metaMatch = content.match(/^---\n([\s\S]*?)\n---/);
    const meta = metaMatch ? JSON.parse(JSON.stringify(eval('(' + metaMatch[1] + ')'))) : {};
    return {
      title: meta.title ?? slug,
      description: meta.description ?? '',
      author: meta.author ?? '',
      publishedDate: meta.publishedDate ?? '',
      readingTime: meta.readingTime ?? '',
      coverImage: meta.coverImage ?? '/images/blog/default.webp',
      slug,
    } as PostMeta;
  });

  return (
    <section className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Cybersecurity Blog</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <article key={post.slug} className="border border-[var(--color-border)] rounded-lg overflow-hidden">
            <Link href={`/blog/${post.slug}`}> 
              <Image src={post.coverImage} alt={post.title} width={800} height={400} className="w-full h-48 object-cover" />
            </Link>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)] mb-2">{post.description}</p>
              <div className="text-xs text-[var(--color-text-muted)]">
                {post.author} • {post.publishedDate} • {post.readingTime}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
