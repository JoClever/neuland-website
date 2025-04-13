export default async function RootLayout({
	children
}: { children: React.ReactNode }) {
	return <div className="relative z-10 pt-20 font-sans">{children}</div>
}
