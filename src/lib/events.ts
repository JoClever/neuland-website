import type { Event } from '@/services/events'

const EVENT_TIMEZONE = 'Europe/Berlin'

function getLocaleTag(locale: string) {
	return locale.startsWith('de') ? 'de-DE' : 'en-GB'
}

export function getEventTimestamp(event: Event): number | null {
	const candidate = event.startDateTime || event.nextOccurrence
	if (!candidate) return null

	const timestamp = new Date(candidate).getTime()
	if (Number.isNaN(timestamp)) return null
	return timestamp
}

export function getLocalizedEventTitle(event: Event, locale: string) {
	return locale.startsWith('de')
		? event.titleDe || event.titleEn || event.title
		: event.titleEn || event.titleDe || event.title
}

export function getLocalizedEventDescription(event: Event, locale: string) {
	return locale.startsWith('de')
		? event.descriptionDe || event.descriptionEn || event.description
		: event.descriptionEn || event.descriptionDe || event.description
}

export function formatEventDateRange(
	event: Event,
	locale: string,
	fallback = 'TBD'
) {
	const timestamp = getEventTimestamp(event)
	if (!timestamp) return fallback

	const start = new Date(timestamp)
	const localeTag = getLocaleTag(locale)
	const fullFormatter = new Intl.DateTimeFormat(localeTag, {
		timeZone: EVENT_TIMEZONE,
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	})
	const timeFormatter = new Intl.DateTimeFormat(localeTag, {
		timeZone: EVENT_TIMEZONE,
		hour: '2-digit',
		minute: '2-digit'
	})
	let label = fullFormatter.format(start)

	if (!event.endDateTime) {
		return label
	}

	const end = new Date(event.endDateTime)
	if (Number.isNaN(end.getTime())) {
		return label
	}

	const dayFormatter = new Intl.DateTimeFormat('en-CA', {
		timeZone: EVENT_TIMEZONE,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	})
	const startsAndEndsOnSameDay =
		dayFormatter.format(start) === dayFormatter.format(end)

	if (startsAndEndsOnSameDay) {
		label += ` - ${timeFormatter.format(end)}`
	} else {
		label += ` - ${fullFormatter.format(end)}`
	}

	return label
}
