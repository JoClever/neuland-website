import { Badge } from '@/components/ui/badge'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { allPosts } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { ArrowLeft, TagIcon } from 'lucide-react'
import Link from 'next/link'

export const generateStaticParams = async () =>
	allPosts.map((post) => ({ slug: post._raw.flattenedPath }))

export const generateMetadata = async ({
	params
}: { params: { slug: string } }) => {
	const { slug } = await params

	const post = allPosts.find((post) => post._raw.flattenedPath === slug)
	if (!post) throw new Error(`Post not found for slug: ${slug}`)
	return { title: post.title }
}

const PostLayout = async ({ params }: { params: { slug: string } }) => {
	const { slug } = await params

	const post = allPosts.find((post) => post._raw.flattenedPath === slug)
	if (!post) throw new Error(`Post not found for slug: ${slug}`)

	return (
		<div className="mx-auto max-w-4xl">
			<Breadcrumb>
				<BreadcrumbList className="flex items-center">
					<BreadcrumbItem className="flex items-center">
						<BreadcrumbLink asChild className="flex items-center">
							<Link href="/" className="flex items-center">
								Home
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator className="flex items-center mx-1" />
					<BreadcrumbItem className="flex items-center">
						<BreadcrumbLink asChild className="flex items-center">
							<Link href="/blog" className="flex items-center">
								Blog
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator className="flex items-center mx-1" />
					<BreadcrumbItem className="flex items-center">
						<BreadcrumbLink className="flex items-center">
							{post.title}
						</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<article className="mt-4 mb-8 ">
				<div className="pb-6 border-b border-terminal-window-border mb-6">
					<time
						dateTime={post.date}
						className="mb-1 text-xs text-terminal-text/70"
					>
						{format(parseISO(post.date), 'LLLL d, yyyy')}
					</time>

					<h1 className="text-3xl font-bold">{post.title}</h1>
					{post.authors && post.authors.length > 0 && (
						<div className="mt-2 text-sm text-terminal-text/80">
							Von {post.authors.join(', ')}
						</div>
					)}

					{post.tags && post.tags.length > 0 && (
						<div className="mt-4 flex items-center gap-2 group">
							<TagIcon
								size={14}
								className="text-terminal-text/60 transition-transform duration-300 group-hover:rotate-12 group-hover:text-terminal-text mt-1"
							/>
							<div className="flex flex-wrap gap-1">
								{post.tags.map((tag) => (
									<Link
										key={tag}
										href={`/blog/tags/${encodeURIComponent(tag.toLowerCase())}`}
										className="no-underline"
									>
										<Badge
											variant="outline"
											className="text-[12px] py-0 hover:bg-terminal-cyan/10 cursor-pointer"
										>
											{tag}
										</Badge>
									</Link>
								))}
							</div>
						</div>
					)}
				</div>
				<div
					className="[&>*]:mb-3 [&>*:last-child]:mb-0 prose-img:max-w-full"
					// biome-ignore lint/security/noDangerouslySetInnerHtml:
					dangerouslySetInnerHTML={{ __html: post.body.html }}
				/>
			</article>

			<div className="pt-6 pb-6 flex justify-end">
				<Button variant="outline" asChild className="group">
					<Link href="/blog" className="flex items-center gap-2 no-underline">
						<ArrowLeft
							size={16}
							className="group-hover:-translate-x-1 transition-transform"
						/>
						<span>Alle Posts</span>
					</Link>
				</Button>
			</div>
		</div>
	)
}

export default PostLayout
