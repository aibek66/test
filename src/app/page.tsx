"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import fetchData from "@/utils/fetchData";
import moment from "moment";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
	const [data, setData] = useState<{}[]>([]);
	const [filteredData, setFilteredData] = useState([]);
	const [name, setName] = useState("");
	const [status, setStatus] = useState("all");
	// const [startDate, setStartDate] = useState(null);
	// const [endDate, setEndDate] = useState(null);
	const [date, setDate] = useState({
		startDate: null,
		endDate: null,
	});

	const router = useRouter();
	const createQueryString = function (name: string, value: string): string {
		const params = new URLSearchParams();
		params.set(name, value);

		return params.toString();
	};
	useEffect(() => {
		changeDate();
	}, [date]);
	const changeDate = function () {
		setName("");
		setStatus("all");
		const newArr = data.filter((el) => {
			if (date.startDate && !date.endDate) {
				return new Date(el.payment.created_at) >= date.startDate;
			} else if (date.endDate && !date.startDate) {
				return new Date(el.payment.created_at) <= date.endDate;
			} else if (date.startDate && date.endDate) {
				return (
					new Date(el.payment.created_at) <= date.endDate &&
					new Date(el.payment.created_at) >= date.startDate
				);
			} else {
				return true;
			}
		});
		setFilteredData(newArr);
	};

	const changeName = function (event) {
		setName(event.target.value);
		setStatus("all");
		if (event.target.value == "") {
			setFilteredData([...data]);
		} else {
			const newArr = data.filter((el) =>
				el.merchant.name
					.toLowerCase()
					.includes(event.target.value.toLowerCase())
			);
			setFilteredData(newArr);
		}
	};

	const changeStatus = function (event) {
		setStatus(event.target.value);
		setName("");
		if (event.target.value == "all") {
			setFilteredData([...data]);
		} else if (event.target.value == "success") {
			const newArr = data.filter((el) => el.payment.status == "success");

			setFilteredData(newArr);
		} else if (event.target.value == "error") {
			const newArr = data.filter((el) => el.payment.status == "error");
			setFilteredData(newArr);
		}
	};

	useEffect(() => {
		const fetchMerchants = async () => {
			try {
				const res = await fetchData();
				setData(res);
				setFilteredData(res);
			} catch (err) {
				console.log(err);
			}
		};
		fetchMerchants();
	}, []);

	return (
		<div className="main-content">
			<div className="filters">
				<div className="filters-content">
					<input
						className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded dark:text-gray-400 dark:placeholder-gray-500"
						type="text"
						placeholder="Search merchant name"
						onChange={changeName}
						value={name}
					/>
				</div>
				<div className="filters-content">
					<select
						value={status}
						onChange={changeStatus}
						id="countries"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option value="all">Choose a status</option>
						<option value="success">Success</option>
						<option value="error">Error</option>
					</select>
				</div>
				<div className="filters-content flex w-1/4">
					<div>
						<p>Start date</p>
						<DatePicker
							showIcon
							selected={date.startDate}
							onChange={(val) => {
								setDate((prev) => ({ ...prev, startDate: val }));
							}}
						/>
					</div>
					<div>
						<p>End date</p>
						<DatePicker
							showIcon
							selected={date.endDate}
							onChange={(val) => {
								setDate((prev) => ({ ...prev, endDate: val }));
							}}
						/>
					</div>
				</div>
			</div>
			<div className="relative overflow-x-auto">
				{filteredData.length ? (
					<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="px-6 py-3">
									Merchant Name
								</th>
								<th scope="col" className="px-6 py-3">
									Status
								</th>
								<th scope="col" className="px-6 py-3">
									Amount
								</th>
								<th scope="col" className="px-6 py-3">
									Created Time
								</th>
							</tr>
						</thead>
						<tbody>
							{filteredData.map((el, index) => (
								<tr
									key={index}
									className="body-tr bg-white border-b dark:bg-gray-800 dark:border-gray-700"
									onClick={() => {
										router.push(
											"/details" +
												"?" +
												createQueryString("id", el.merchant.id)
										);
									}}
								>
									<td
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										{el.merchant.name}
									</td>
									<td
										className={`px-6 py-4 ${
											el.payment.status == "error"
												? "text-red-500"
												: "text-lime-400"
										}`}
									>
										{el.payment.status}
									</td>
									<td className="dark:text-white px-6 py-4">
										{el.payment.amount}
									</td>
									<td className="dark:text-white px-6 py-4">
										{moment(el.payment.created_at).format("L")}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p>No data</p>
				)}
			</div>
		</div>
	);
}
