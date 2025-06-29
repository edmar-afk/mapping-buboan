import { useState, useEffect } from "react";
import api from "../../assets/api";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
function InfrasChart() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchInfras = async () => {
			try {
				const response = await api.get(`/api/infras/`);
				setData(response.data);
			} catch (error) {
				console.error("Error fetching infrastructures:", error);
				setData([]);
			}
		};

		fetchInfras();
	}, []);

	const defaultImage = "https://images.unsplash.com/photo-1499856871958-5b9627545d1a";

	return (
		<>
			<div className="w-full mx-auto p-2 mt-12">
				<div className="grid grid-cols-1 gap-10">
					{data.map((infra, index) => (
						<div
							key={index}
							className="rounded overflow-hidden shadow-lg">
							<div className="relative">
								<img
									className="w-full"
									src={infra.image ? infra.image : defaultImage}
									alt={infra.name}
								/>
								<div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25" />
								<div className="absolute bottom-0 left-0 bg-red-600 px-4 py-2 text-white text-sm hover:bg-white hover:text-red-600 transition duration-500 ease-in-out">
									{infra.type || "Infrastructure"}
								</div>
								<div className="text-sm absolute top-0 right-0 bg-red-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-red-600 transition duration-500 ease-in-out">
									<MapsHomeWorkIcon/>
								</div>
							</div>
							<div className="px-6 py-4">
								<h3 className="font-semibold text-lg inline-block hover:text-red-600 transition duration-500 ease-in-out">
									{infra.name}
								</h3>
								<p className="text-gray-500 text-sm">{infra.description}</p>
							</div>
							
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default InfrasChart;
