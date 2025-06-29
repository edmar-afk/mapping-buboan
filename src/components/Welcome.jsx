function Welcome() {
	return (
		<div className="flex items-center text-center p-8 min-h-[380px] rounded-xl shadow-2xl bg-gradient-to-t from-red-900 to-red-600 w-full mt-24">
			<div className="max-w-4xl mx-auto">
				<h1 className="sm:text-4xl text-2xl font-bold text-white">Welcome to Bobuan, Zamboanga del Sur</h1>
				<p className="mt-8 text-sm text-gray-300 leading-relaxed">
					Discover the heart of Bobuan through our interactive mapping system. Explore local landmarks, households, and
					community features—all in one place. Start navigating and learn more about our vibrant barangay.
				</p>
				<p className="px-6 py-3 mt-12 rounded-full text-white text-base font-medium tracking-wider border-none outline-none bg-red-400 hover:bg-red-700">
					Click the buttons on the top right to explore different categories of data.
				</p>
			</div>
		</div>
	);
}

export default Welcome;
