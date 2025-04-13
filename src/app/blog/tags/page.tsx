import { Badge } from '@/components/ui/badge'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'

export default function TagsIndexPage() {
	// Get all unique tags and count how many posts use each tag
	const tagCounts = allPosts.reduce(
		(acc, post) => {
			if (post.tags && post.tags.length > 0) {
				post.tags.forEach((tag) => {
					const tagLower = tag.toLowerCase()
					acc[tagLower] = (acc[tagLower] || 0) + 1
				})
			}
			return acc
		},
		{} as Record<string, number>
	)

	// Convert to array and sort alphabetically
	const sortedTags = Object.entries(tagCounts).sort(([tagA], [tagB]) =>
		tagA.localeCompare(tagB)
	)

	return (
		<div className="mx-auto max-w-4xl mb-12">
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
						<BreadcrumbLink className="flex items-center">Tags</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<h1 className="mt-4 mb-4 text-3xl font-bold text-terminal-highlight font-mono">
				Blog Tags
			</h1>
			<p className="mb-8 text-terminal-text/70">
				Durchsuche alle {sortedTags.length} Tags des Neuland Blogs
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
				{sortedTags.map(([tag, count]) => {
					const displayTag = tag.charAt(0).toUpperCase() + tag.slice(1)

					return (
						<Link
							key={tag}
							href={`/blog/tags/${encodeURIComponent(tag)}`}
							className="group no-underline"
						>
							<div className="flex items-center justify-between p-4 bg-terminal-window border border-terminal-window-border rounded-lg group-hover:border-terminal-cyan transition-colors duration-300">
								<div className="flex items-center">
									<Badge
										variant="outline"
										className="text-sm py-0.5 px-2 mr-3 group-hover:bg-terminal-cyan/10"
									>
										{displayTag}
									</Badge>
									<span className="text-terminal-text/70 text-sm">
										{count} {count === 1 ? 'Beitrag' : 'Beiträge'}
									</span>
								</div>
								<span className="text-terminal-text/50 group-hover:text-terminal-cyan text-xs font-mono">
									View{' '}
									<span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
										→
									</span>
								</span>
							</div>
						</Link>
					)
				})}
			</div>
		</div>
	)
}
