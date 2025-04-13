import { Mail, UserPlus, Zap } from 'lucide-react'
import TerminalButton from './TerminalButton'

const TerminalMembership = () => {
	return (
		<div className="flex flex-col md:flex-row items-start my-10 gap-8 max-w-4xl mx-auto">
			<div className="terminal-price-info border-2 border-terminal-window-border p-5 bg-terminal-window rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 md:w-2/5 self-start ml-0 mr-auto">
				<div className="text-terminal-text/60 mb-3 font-mono text-sm">
					$ cat membership-fees.txt
				</div>
				<div className="flex flex-col gap-3">
					<div>
						<span className="text-terminal-highlight font-medium">
							Studierende:
						</span>
						<span className="text-success ml-2 font-bold">5€ / Jahr</span>
					</div>
					<div>
						<span className="text-terminal-highlight font-medium">
							Externe:
						</span>
						<span className="text-success ml-2 font-bold">20€ / Jahr</span>
					</div>
				</div>
			</div>

			<div className="space-y-4 md:pl-4 md:border-l md:border-terminal-cyan/30 md:w-3/5">
				<h4 className="text-xl font-medium flex items-center">
					<Zap size={18} className="text-terminal-cyan mr-2" />
					Deine Vorteile:
				</h4>

				<div className="space-y-2">
					<div className="flex items-start group">
						<span className="text-terminal-cyan mr-2 text-xl group-hover:scale-110 transition-transform duration-300">
							•
						</span>
						<p className="group-hover:translate-x-1 transition-transform duration-300 mb-1">
							Teil eines aktiven studentischen Vereins mit regelmäßigen Treffen
							und Austausch
						</p>
					</div>
					<div className="flex items-start group">
						<span className="text-terminal-cyan mr-2 text-xl group-hover:scale-110 transition-transform duration-300">
							•
						</span>
						<p className="group-hover:translate-x-1 transition-transform duration-300 mb-1">
							Gemeinsame Arbeit an Open-Source Projekten
						</p>
					</div>
					<div className="flex items-start group">
						<span className="text-terminal-cyan mr-2 text-xl group-hover:scale-110 transition-transform duration-300">
							•
						</span>
						<p className="group-hover:translate-x-1 transition-transform duration-300 mb-1">
							Exklusive Workshops, Hackathons und soziale Events mit
							Gleichgesinnten
						</p>
					</div>
				</div>

				<div className="pt-2 flex flex-wrap gap-3">
					<TerminalButton href="https://join.neuland-ingolstadt.de/">
						<UserPlus
							size={16}
							className="mr-2 group-hover:rotate-8 transition-transform duration-300"
						/>
						Mitglied werden
					</TerminalButton>
					<TerminalButton href="mailto:info@neuland-ingolstadt.de?subject=Frage%20zur%20Mitgliedschaft">
						<Mail
							size={16}
							className="mr-2 group-hover:rotate-8 transition-transform duration-300"
						/>
						E-Mail schreiben
					</TerminalButton>
				</div>
			</div>
		</div>
	)
}

export default TerminalMembership
