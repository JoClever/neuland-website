'use client'

const colors = [
	{ name: 'Neuland Neon Green', color: '#4efe00' },
	{ name: 'Terminal Dark Green', color: '#12230f' },
	{ name: 'Neuland Light Green', color: '#edf4ea' },
	{ name: 'Neuland Blue', color: '#44bbf7' }
]

export default function BrandingPage() {
	return (
		<div className="pt-20 pb-12">
			<h1 className="text-3xl font-bold text-terminal-cyan font-mono mb-4">
				Branding
			</h1>
			<p className="text-terminal-text/80 mb-8 font-mono">
				Unsere Farben und Logos.
			</p>

			<section className="mb-12">
				<h2 className="text-xl font-bold text-terminal-cyan font-mono mb-4">
					Farben
				</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
					{colors.map((color) => (
						<div
							key={color.name}
							className="border border-terminal-window-border rounded-xl p-4 font-mono text-xs text-center shadow-md transition-transform hover:scale-105 hover:shadow-lg flex flex-col items-center"
							style={{
								background: 'linear-gradient(90deg, #fff 50%, #000 50%)'
							}}
						>
							<div
								className="h-16 w-16 rounded-full mb-3 border-2 border-terminal-window-border shadow-inner"
								style={{ backgroundColor: color.color }}
							/>
							<div className="flex w-full">
								<div className="flex-1 pr-1 text-left text-neutral-900">
									<div className="font-semibold mb-1 text-sm">{color.name}</div>
									<div className="font-mono tracking-wide">{color.color}</div>
								</div>
								<div className="flex-1 pl-1 text-right text-white">
									<div className="font-semibold mb-1 text-sm">{color.name}</div>
									<div className="font-mono tracking-wide">{color.color}</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			<section>
				<h2 className="text-xl font-bold text-terminal-cyan font-mono mb-4">
					Logos
				</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 gap-6 items-center">
					{/** biome-ignore lint/performance/noImgElement: static assets */}
					<img src="/assets/logo_dark.svg" alt="Neuland Logo" />
					{/** biome-ignore lint/performance/noImgElement: static assets */}
					<img
						src="/icon0.svg"
						alt="Neuland Icon 0"
						className="bg-terminal-window-border p-2 rounded h-40 w-40"
					/>
					{/** biome-ignore lint/performance/noImgElement: static assets */}
					<img
						src="/assets/logo_green.svg"
						alt="Neuland Logo"
						className="bg-black p-2 rounded h-40 w-40"
					/>
				</div>
			</section>
		</div>
	)
}
