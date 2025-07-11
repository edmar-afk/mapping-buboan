import { useState, useEffect } from "react";
import api from "../../assets/api";
function HouseholdChart() {
	const [data, setData] = useState([]);
	useEffect(() => {
		const fetchHousehold = async () => {
			try {
				const response = await api.get(`/api/households/`);
				setData(response.data);
			} catch (error) {
				console.error("Error fetching Households:", error);
				setData([]);
			}
		};

		fetchHousehold();
	}, []);

	return (
		<div className="space-y-10">
			{data.map((household, index) => (
				<div
					key={index}
					className="">
					<h2 className="text-xl font-bold text-gray-800 mb-4 text-left">{household.family_name} Family</h2>

					{household.members && household.members.length > 0 ? (
						<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
							<table className="w-full text-sm text-left rtl:text-right text-gray-500">
								<thead className="text-xs text-gray-700 uppercase bg-gray-50">
									<tr>
										<th
											scope="col"
											className="px-6 py-3">
											Name
										</th>
										<th
											scope="col"
											className="px-6 py-3">
											Age
										</th>
										<th
											scope="col"
											className="px-6 py-3">
											Source of Income
										</th>
										<th
											scope="col"
											className="px-6 py-3">
											Purok
										</th>
										<th
											scope="col"
											className="px-6 py-3">
											Status
										</th>
										<th
											scope="col"
											className="px-6 py-3">
											Role
										</th>
									</tr>
								</thead>
								<tbody>
									{household.members.map((member, i) => (
										<tr
											key={i}
											className="odd:bg-white even:bg-gray-50  border-b border-gray-700">
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
												{member.name}
											</th>
											<td className="px-6 py-4">{member.age}</td>
											<td className="px-6 py-4">{member.source_income}</td>
											<td className="px-6 py-4">{member.purok}</td>
											<td className="px-6 py-4">{member.status}</td>
											<td className="px-6 py-4">{member.role}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<p className="text-gray-500 italic text-center">No family members found.</p>
					)}
				</div>
			))}
		</div>
	);
}

export default HouseholdChart;
