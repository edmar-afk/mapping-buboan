import AccessibleIcon from "@mui/icons-material/Accessible";import ApartmentIcon from "@mui/icons-material/Apartment";import ElderlyIcon from "@mui/icons-material/Elderly";import HouseIcon from "@mui/icons-material/House";
import PeopleIcon from "@mui/icons-material/People";
import React from "react";

function TopBar({ isVisible, onCategorySelect, activeCategory }) {
	const categories = [
		{
			label: "PWD",
			key: "pwds",
			icon: (
				<AccessibleIcon
					fontSize="small"
					className="mr-1"
				/>
			),
		},
		{
			label: "Infrastructure",
			key: "infras",
			icon: (
				<ApartmentIcon
					fontSize="small"
					className="mr-1"
				/>
			),
		},
		{
			label: "Senior Citizens",
			key: "seniors",
			icon: (
				<ElderlyIcon
					fontSize="small"
					className="mr-1"
				/>
			),
		},
		{
			label: "Households",
			key: "households",
			icon: (
				<HouseIcon
					fontSize="small"
					className="mr-1"
				/>
			),
		},
		{
			label: "Feedbacks",
			key: "feedbacks",
			icon: (
				<PeopleIcon
					fontSize="small"
					className="mr-1"
				/>
			),
		},
	];

	return (
		<div
			className={`absolute bg-white w-full flex flex-row justify-between items-center top-0 py-5 right-0 shadow-2xl z-[9999] transition-transform duration-300 ${
				isVisible ? "scale-100" : "scale-0"
			}`}>
			<a className="font-bold ml-4" href="https://buboanmapping.pythonanywhere.com/admin/login/?next=/admin/" target="_blank">Admin Login</a>
			<div className="flex flex-row ">
				{categories.map((cat) => (
					<button
						key={cat.key}
						onClick={() => onCategorySelect(cat.key)}
						className={`px-4 py-2 mx-2 rounded-lg flex items-center whitespace-nowrap duration-300 ${
							activeCategory === cat.key ? "bg-red-700 text-white" : "bg-white hover:bg-red-700 hover:text-white"
						}`}>
						{cat.label}
					</button>
				))}
			</div>
		</div>
	);
}

export default TopBar;
