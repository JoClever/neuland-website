import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import EventsPageClient from '@/components/Events/events-page-client'
import { fetchAllEvents } from '@/services/events'

export async function generateMetadata({
	params
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'Events.metadata' })

	return {
		title: t('title'),
		description: t('description')
	}
}

const EventsPage = async ({
	params
}: {
	params: Promise<{ locale: string }>
}) => {
	const { locale } = await params
	setRequestLocale(locale)

	try {
		const eventsData = await fetchAllEvents()
		return <EventsPageClient initialData={eventsData} />
	} catch (error) {
		return (
			<EventsPageClient
				initialData={{
					semester: `SS ${new Date().getFullYear()}`,
					events: []
				}}
				error={
					error instanceof Error ? error.message : 'Failed to fetch events'
				}
			/>
		)
	}
}

export default EventsPage
