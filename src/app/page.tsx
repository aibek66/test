"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import fetchData from "@/utils/fetchData";

export default function Home() {
	const [data, setData] = useState<{}[]>([]);
	const [filteredData, setFilteredData] = useState([]);
	const [name, setName] = useState("");
	const [status, setStatus] = useState("");

	const router = useRouter();
	const createQueryString = function (name: string, value: string): string {
		const params = new URLSearchParams();
		params.set(name, value);

		return params.toString();
	};

	const changeStatus = function (event) {
		setStatus(event.target.value);
		if (event.target.value == "all") {
			setFilteredData(data);
		} else if (event.target.value == "success") {
			const newArr = [];
			for (let index = 0; index < filteredData.length; index++) {
				const element = filteredData[index];
				if (element.payment.status == "success") {
					newArr.push(element);
				}
			}

			setFilteredData(newArr);
			console.log(filteredData, "filter");
		} else if (event.target.value == "error") {
			const newArr = [];
			for (let index = 0; index < filteredData.length; index++) {
				const element = filteredData[index];
				if (element.payment.status == "error") {
					newArr.push(element);
				}
			}
			setFilteredData(newArr);
			console.log(filteredData, "err");
		}
		console.log(event.target.value);
	};

	useEffect(() => {
		const fetchMerchants = async () => {
			try {
				const res = await fetchData(
					"https://mocki.io/v1/98548986-6e17-4a80-9d68-9d2f7e04ef99"
				);
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
						onChange={(event) => {
							setName(event.target.value);
						}}
					/>
				</div>
				<div className="filters-content">
					<select
						value={status}
						onChange={changeStatus}
						id="countries"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option selected value="all">
							Choose a status
						</option>
						<option value="success">Success</option>
						<option value="error">Error</option>
					</select>
				</div>
			</div>
			<div className="relative overflow-x-auto">
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
						{filteredData &&
							filteredData.map((el, index) => (
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
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										{el.merchant.name}
									</th>
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
										{el.payment.created_at}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
