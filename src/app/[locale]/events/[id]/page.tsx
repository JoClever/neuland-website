import { ArrowLeft, ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import ShareEventLinkButton from '@/components/Events/share-event-link-button'
import TerminalButton from '@/components/terminal-button'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Link } from '@/i18n/navigation'
import {
	formatEventDateRange,
	getLocalizedEventDescription,
	getLocalizedEventTitle
} from '@/lib/events'
import { fetchAllEvents } from '@/services/events'

export async function generateMetadata({
	params
}: {
	params: Promise<{ locale: string; id: string }>
}): Promise<Metadata> {
	const { locale, id } = await params
	const t = await getTranslations({ locale, namespace: 'Events.metadata' })
	const eventId = Number(id)

	if (Number.isNaN(eventId)) {
		return { title: t('notFound') }
	}

	try {
		const { events } = await fetchAllEvents()
		const event = events.find((candidate) => candidate.id === eventId)

		if (!event) {
			return { title: t('notFound') }
		}

		return {
			title: `${getLocalizedEventTitle(event, locale)} - ${t('title')}`,
			description:
				getLocalizedEventDescription(event, locale) || t('description')
		}
	} catch {
		return { title: t('title') }
	}
}

const EventDetailPage = async ({
	params
}: {
	params: Promise<{ locale: string; id: string }>
}) => {
	const { locale, id } = await params
	setRequestLocale(locale)

	const eventId = Number(id)
	if (Number.isNaN(eventId)) {
		notFound()
	}

	let eventData: Awaited<ReturnType<typeof fetchAllEvents>>
	try {
		eventData = await fetchAllEvents()
	} catch {
		notFound()
	}

	const event = eventData.events.find((candidate) => candidate.id === eventId)
	if (!event) {
		notFound()
	}

	const t = await getTranslations({ locale, namespace: 'Events' })
	const title = getLocalizedEventTitle(event, locale)
	const description = getLocalizedEventDescription(event, locale)
	const sharePath = `/${locale}/events/${event.id}`
	const requestHeaders = await headers()
	const host =
		requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host')
	const protocol =
		requestHeaders.get('x-forwarded-proto') ??
		(host?.includes('localhost') ? 'http' : 'https')
	const origin = host
		? `${protocol}://${host}`
		: 'https://neuland-ingolstadt.de'
	const shareUrl = `${origin}${sharePath}`

	return (
		<div className="min-h-screen py-18 px-4 md:px-8">
			<div className="max-w-5xl mx-auto">
				<Breadcrumb>
					<BreadcrumbList className="flex items-center">
						<BreadcrumbItem className="flex items-center">
							<BreadcrumbLink asChild className="flex items-center">
								<Link href="/" className="flex items-center">
									{t('breadcrumbs.home')}
								</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className="flex items-center mx-1" />
						<BreadcrumbItem className="flex items-center">
							<BreadcrumbLink asChild className="flex items-center">
								<Link href="/events" className="flex items-center">
									{t('breadcrumbs.events')}
								</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className="flex items-center mx-1" />
						<BreadcrumbItem className="flex items-center">
							<BreadcrumbLink className="flex items-center">
								{title.length > 36 ? `${title.slice(0, 36)}...` : title}
							</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<div className="mt-8 relative bg-terminal-window border border-terminal-window-border p-6 md:p-8 overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/3 via-transparent to-terminal-cyan/3 pointer-events-none" />
					<div className="relative z-10">
						<div className="flex items-start justify-between gap-3 mb-4">
							<h1 className="text-3xl font-bold text-terminal-lightGreen leading-tight">
								{title}
							</h1>
							<div className="shrink-0">
								<span className="inline-flex items-center border border-terminal-window-border/80 bg-terminal-card/70 px-2 py-[2px] text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-terminal-text/80">
									{event.isInternal
										? t('filters.internal')
										: t('filters.public')}
								</span>
							</div>
						</div>

						<div className="mb-6 space-y-2 text-terminal-text/80">
							<div>
								<span className="text-terminal-text/60 mr-2">{t('date')}:</span>
								{formatEventDateRange(event, locale, t('tbd'))}
							</div>
							{event.location && (
								<div>
									<span className="text-terminal-text/60 mr-2">
										{t('location')}:
									</span>
									{event.location}
								</div>
							)}
						</div>

						<div className="border-t border-terminal-window-border/60 pt-6">
							<h2 className="text-xl font-semibold text-terminal-text mb-3">
								{t('details')}
							</h2>
							{description ? (
								<p className="text-terminal-text/85 whitespace-pre-wrap leading-relaxed">
									{description}
								</p>
							) : (
								<p className="text-terminal-text/60">{t('noDescription')}</p>
							)}
						</div>

						<div className="mt-6">
							<p className="mb-2 text-xs text-terminal-text/75">
								{t('shareableHint')}
							</p>
							<div className="border border-terminal-window-border/70 bg-terminal-card/70 px-3 py-2 text-sm text-terminal-text font-mono break-all">
								{shareUrl}
							</div>
						</div>

						<div className="pt-8 flex flex-wrap gap-3">
							<TerminalButton href="/events" className="group">
								<ArrowLeft
									size={16}
									className="group-hover:-translate-x-0.5 transition-transform duration-200"
								/>
								{t('backToEvents')}
							</TerminalButton>
							<ShareEventLinkButton url={shareUrl} />
							{event.eventUrl && (
								<TerminalButton
									href={event.eventUrl}
									target="_blank"
									rel="noreferrer noopener"
								>
									{t('eventWebsite')}
									<ExternalLink size={16} />
								</TerminalButton>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EventDetailPage
