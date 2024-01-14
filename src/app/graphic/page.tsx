"use client";
import { Doughnut } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

import { useEffect, useState } from "react";
import fetchData from "@/utils/fetchData";

export default function Graphic() {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: "Bar chart of transactions",
			},
		},
	};
	const optionsMerchants = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: "The total amount of transaction with commissions",
			},
		},
	};
	const labels = ["The amount of transactions devided by status"];
	const [arr, setArr] = useState<{}[]>([]);
	const [data, setData] = useState(null);
	const [amount, setAmount] = useState(null);

	useEffect(() => {
		setData({
			labels,
			datasets: [
				{
					label: "Success",
					data: [
						arr.filter((el) => el.payment.status == "success").length,
					],
					backgroundColor: "rgba(255, 99, 132, 0.5)",
				},
				{
					label: "Error",
					data: [arr.filter((el) => el.payment.status == "error").length],
					backgroundColor: "rgba(53, 162, 235, 0.5)",
				},
			],
		});
		let newArr = [];
		let namesArr = ["Sulpak", "Technodom", "Olx", "Tassay", "Aster"];
		for (let index = 0; index < namesArr.length; index++) {
			const element = namesArr[index];
			let number = 0;
			arr.map((el) => {
				if (
					el.merchant.name.toLowerCase() == element.toLowerCase() &&
					el.payment.status == "success"
				) {
					let commission =
						el.payment.amount * (el.payment.comission / 100);
					number = number + (el.payment.amount - commission);
				}
			});
			newArr.push(number);
		}

		setAmount({
			labels: namesArr,
			datasets: [
				{
					label: "The amount of Pay",
					data: newArr,
					backgroundColor: "rgba(53, 162, 235, 0.5)",
				},
			],
		});
	}, [arr]);

	useEffect(() => {
		const fetchMerchants = async () => {
			try {
				const res = await fetchData();
				setArr(res);
			} catch (err) {
				console.log(err);
			}
		};
		fetchMerchants();
	}, []);

	return (
		<div>
			<h1>Graphic</h1>
			{data && <Bar options={options} data={data} />}
			{amount && <Bar options={optionsMerchants} data={amount} />}
		</div>
	);
}
