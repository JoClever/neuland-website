import { Mail, Zap } from 'lucide-react'
import type React from 'react'
import TerminalButton from './TerminalButton'

const TerminalPartners: React.FC = () => {
	return (
		<div className="flex flex-col md:flex-row items-start my-10 gap-8 max-w-4xl mx-auto">
			<div className="terminal-partners-info border-2 border-terminal-window-border p-5 bg-terminal-window rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 md:w-2/5 self-start ml-0 mr-auto">
				<div className="text-terminal-text/60 mb-3 font-mono text-sm">
					$ cat sponsoring-info.txt
				</div>
				<div className="text-terminal-text">
					<p className=" font-medium">
						Jetzt Partner werden und unseren Verein unterstützen!
					</p>
				</div>
			</div>

			<div className="space-y-4 md:pl-4 md:border-l md:border-terminal-cyan/30 md:w-3/5">
				<h4 className="text-xl font-medium flex items-center">
					<Zap size={18} className="text-terminal-cyan mr-2" />
					Ihre Vorteile:
				</h4>

				<div className="space-y-2">
					<div className="flex items-start group">
						<span className="text-terminal-cyan mr-2 text-xl group-hover:scale-110 transition-transform duration-300">
							•
						</span>
						<p className="group-hover:translate-x-1 transition-transform duration-300 mb-1">
							Direkter Zugang zu technikaffinen Studierenden
						</p>
					</div>
					<div className="flex items-start group">
						<span className="text-terminal-cyan mr-2 text-xl group-hover:scale-110 transition-transform duration-300">
							•
						</span>
						<p className="group-hover:translate-x-1 transition-transform duration-300 mb-1">
							Sichtbarkeit bei Events und auf unseren digitalen Plattformen
						</p>
					</div>
					<div className="flex items-start group">
						<span className="text-terminal-cyan mr-2 text-xl group-hover:scale-110 transition-transform duration-300">
							•
						</span>
						<p className="group-hover:translate-x-1 transition-transform duration-300 mb-1">
							Möglichkeit zur Vorstellung von Technologien und Fachvorträgen
						</p>
					</div>
				</div>

				<div className="pt-2">
					<TerminalButton href="mailto:info@neuland-ingolstadt.de?subject=Anfrage%20zur%20Partnerschaft">
						<Mail
							size={16}
							className="mr-2 group-hover:rotate-8 transition-transform duration-300"
						/>
						Partner werden
					</TerminalButton>
				</div>
			</div>
		</div>
	)
}

export default TerminalPartners
