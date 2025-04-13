// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeImgSize from 'rehype-img-size'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'

export const Post = defineDocumentType(() => ({
	name: 'Post',
	filePathPattern: '**/*.md',
	fields: {
		title: { type: 'string', required: true },
		authors: { type: 'list', of: { type: 'string' }, required: true },
		description: { type: 'string', required: false },
		date: { type: 'date', required: true },
		tags: {
			type: 'list',
			of: { type: 'string' },
			required: false,
			default: []
		}
	},

	computedFields: {
		url: {
			type: 'string',
			resolve: (post) => `/blog/${post._raw.flattenedPath}`
		}
	}
}))

export default makeSource({
	contentDirPath: 'posts',
	documentTypes: [Post],
	markdown: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			[
				// biome-ignore lint/suspicious/noExplicitAny:
				rehypePrettyCode as any,
				{
					// Use a known theme name like 'github-dark' or 'one-dark-pro'
					theme: 'github-dark',
					keepBackground: false,
					defaultLang: 'plaintext'
				}
			],
			// biome-ignore lint/suspicious/noExplicitAny:
			[rehypeImgSize as any, { dir: 'public' }]
		]
	}
})
