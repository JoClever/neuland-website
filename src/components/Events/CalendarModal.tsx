'use client'
import { Check, Copy } from 'lucide-react'
import type React from 'react'
import { useCallback, useEffect, useState } from 'react'
import TerminalWindowButtons from './TerminalWindowButtons'

interface CalendarModalProps {
	isOpen: boolean
	onClose: () => void
	icalUrl: string
}

const CalendarModal: React.FC<CalendarModalProps> = ({
	isOpen,
	onClose,
	icalUrl
}) => {
	const [copied, setCopied] = useState(false)

	const copyToClipboard = useCallback(() => {
		navigator.clipboard.writeText(icalUrl).then(() => {
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		})
	}, [icalUrl])

	const handleModalButtonClick = useCallback(
		(color: 'red' | 'yellow' | 'green') => {
			if (color === 'red') {
				onClose()
			}
		},
		[onClose]
	)

	useEffect(() => {
		const handleEscKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isOpen) {
				onClose()
			}
		}

		if (isOpen) {
			document.addEventListener('keydown', handleEscKey)
		}

		return () => {
			document.removeEventListener('keydown', handleEscKey)
		}
	}, [isOpen, onClose])

	if (!isOpen) return null

	return (
		<>
			<div
				className="fixed inset-0 bg-terminal-bg/60 backdrop-blur-sm z-40"
				onClick={onClose}
				aria-hidden="true"
				onKeyDown={(e) => {
					if (e.key === 'Escape') {
						onClose()
					}
				}}
			/>
			<div
				className="fixed z-50 inset-0 flex items-center justify-center p-4"
				aria-modal="true"
				onClick={onClose}
				onKeyDown={(e) => {
					if (e.key === 'Escape') {
						onClose()
					}
				}}
			>
				<div
					className="terminal-window bg-terminal-window border border-terminal-window-border rounded-lg w-full max-w-md overflow-hidden"
					onClick={(e) => e.stopPropagation()}
					onKeyDown={(e) => {
						if (e.key === 'Escape') {
							onClose()
						}
					}}
				>
					<div className="bg-terminal-windowTitle text-terminal-text px-4 py-2 flex items-center overflow-hidden rounded-t-md">
						<TerminalWindowButtons
							onButtonClick={handleModalButtonClick}
							animationInProgress={false}
						/>
						<div className="ml-4 flex-1 text-center text-sm opacity-90 font-semibold">
							ical-subscribe.sh --import-events
						</div>
					</div>
					<div className="p-6">
						<p className="mb-6">
							Du kannst alle Neuland Events in deinen Kalender als iCal
							Abonnement hinzufügen.
						</p>

						<div className="bg-terminal-bg/70 p-3 rounded border border-terminal-window-border mb-6 font-mono text-xs relative group">
							<div className="flex items-center justify-between">
								<span className="break-all pr-2 w-[calc(100%-30px)]">
									{icalUrl}
								</span>
								<button
									onClick={copyToClipboard}
									className="flex-shrink-0 ml-1 text-terminal-text hover:text-terminal-cyan transition-colors"
									aria-label="URL kopieren"
									title="URL kopieren"
									type="button"
								>
									{copied ? (
										<Check size={16} className="text-terminal-mediumGreen" />
									) : (
										<Copy size={16} />
									)}
								</button>
							</div>
						</div>

						<h3 className="text-lg text-terminal-cyan mb-2">So gehts:</h3>
						<ul className="list-disc list-inside space-y-2 mb-6">
							<li>Kopiere die URL</li>
							<li>Öffne deine Kalender App</li>
							<li>Erstelle ein neues iCal Abonnement</li>
							<li>Die Events werden automatisch aktualisiert</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}

export default CalendarModal
