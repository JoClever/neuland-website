'use client'
import { Badge } from '@/components/ui/badge'
import type { Post } from 'contentlayer/generated'
import moment from 'moment'
import Link from 'next/link'

type PostCardProps = {
	post: Post
}

export function PostCard({ post }: PostCardProps) {
	return (
		<>
			<Link
				href={post.url}
				key={post.title}
				className="block group no-underline"
			>
				<div className="blog-card bg-terminal-window border border-terminal-window-border rounded-lg overflow-hidden group-hover:border-terminal-cyan transition-colors duration-300 flex flex-col h-full">
					<div className="p-4 flex-grow">
						<h2 className="text-xl font-bold mb-2 text-terminal-text line-clamp-2">
							{post.title}
						</h2>
						<div className="flex flex-col gap-1 text-md text-terminal-text/70 mb-3 font-mono">
							{post.date && (
								<time dateTime={post.date}>
									{moment(post.date).format('DD.MM.YYYY')}
								</time>
							)}
						</div>
						{post?.tags && post.tags.length > 0 && (
							<div
								className="flex flex-wrap gap-1 mb-3"
								onClick={(e) => e.stopPropagation()}
								onKeyDown={(e) => {
									if (e.key === 'Escape') e.currentTarget.blur()
								}}
							>
								{post.tags.map((tag) => (
									<Link
										key={tag}
										href={`/blog/tags/${encodeURIComponent(tag.toLowerCase())}`}
										onClick={(e) => e.stopPropagation()}
										onKeyDown={(e) => e.stopPropagation()}
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
						)}
						<p className="text-terminal-text text-sm line-clamp-2 font-sans">
							{post.description}
						</p>
					</div>
					<div className="px-4 py-2 bg-terminal-bg border-t border-terminal-window-border mt-auto">
						<span className="text-terminal-text/90 text-xs font-mono hover:text-terminal-cyan">
							Read more →
						</span>
					</div>
				</div>
			</Link>
		</>
	)
}
