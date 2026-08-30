import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import html from 'remark-html';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'content', 'blog');
  const filenames = fs.readdirSync(postsDir);
  return filenames.map((file) => ({ slug: file.replace(/\.mdx?$/, '') }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) notFound();
  const raw = fs.readFileSync(filePath, 'utf8');
  const [metaRaw, contentRaw] = raw.split('---').filter(Boolean);
  const meta = eval('(' + metaRaw + ')'); // simple front‑matter parsing (trusted source)
  const processed = await remark().use(html).process(contentRaw);
  const contentHtml = processed.toString();

  return (
    <article className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{meta.title}</h1>
      <div className="flex items-center text-sm text-[var(--color-text-muted)] mb-4">
        <span>{meta.author}</span>
        <span className="mx-2">•</span>
        <span>{meta.publishedDate}</span>
        <span className="mx-2">•</span>
        <span>{meta.readingTime}</span>
      </div>
      {meta.coverImage && (
        <Image src={meta.coverImage} alt={meta.title} width={1200} height={600} className="w-full h-auto mb-6" />
      )}
      <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
