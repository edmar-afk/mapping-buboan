import { useState, useEffect } from "react";import Chart from "react-apexcharts";
import api from "../../assets/api";

function PwdCharts() {
	const [, setData] = useState([]);
	const [genderCategories, setGenderCategories] = useState([]);
	const [ageGroupSeries, setAgeGroupSeries] = useState([]);

	useEffect(() => {
		const fetchPwds = async () => {
			try {
				const response = await api.get(`/api/pwds/`);
				const fetchedData = response.data;
				setData(fetchedData);

				const genders = ["Male", "Female"];
				const ageGroups = ["1–30", "31–60", "61–90", "91+"];

				const grouped = {
					"1–30": { Male: 0, Female: 0 },
					"31–60": { Male: 0, Female: 0 },
					"61–90": { Male: 0, Female: 0 },
					"91+": { Male: 0, Female: 0 },
				};

				fetchedData.forEach((person) => {
					const age = parseInt(person.age);
					const gender = person.gender;
					if (!isNaN(age) && genders.includes(gender)) {
						if (age >= 1 && age <= 30) grouped["1–30"][gender]++;
						else if (age >= 31 && age <= 60) grouped["31–60"][gender]++;
						else if (age >= 61 && age <= 90) grouped["61–90"][gender]++;
						else if (age >= 91) grouped["91+"][gender]++;
					}
				});

				const series = ageGroups.map((group) => ({
					name: group,
					data: genders.map((g) => grouped[group][g]),
				}));

				setAgeGroupSeries(series);
				setGenderCategories(genders);
			} catch (error) {
				console.error("Error fetching data:", error);
				setAgeGroupSeries([]);
				setGenderCategories([]);
			}
		};

		fetchPwds();
	}, []);

	const chartOptions = {
		chart: {
			type: "bar",
			height: 350,
			stacked: true,
			stackType: "100%",
			toolbar: {
				show: true,
				tools: {
					download: true,
				},
			},
		},
		plotOptions: {
			bar: {
				horizontal: true,
			},
		},
		stroke: {
			width: 1,
			colors: ["#fff"],
		},
		title: {
			text: "PWD Distribution by Gender and Age Group (100%)",
		},
		xaxis: {
			categories: genderCategories,
			labels: {
				formatter: (val) => val,
			},
		},
		tooltip: {
			y: {
				formatter: (val) => `${val} PWDs`,
			},
		},
		fill: {
			opacity: 1,
		},
		legend: {
			position: "top",
			horizontalAlign: "left",
			offsetX: 40,
		},
		dataLabels: {
			enabled: true,
		},
	};

	return (
		<div className="my-8">
			
			<Chart
				options={chartOptions}
				series={ageGroupSeries}
				type="bar"
				height={350}
			/>
		</div>
	);
}

export default PwdCharts;
