"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import fetchData from "@/utils/fetchData";

export default function Home() {
	const [data, setData] = useState<{}[]>([]);
	const [filteredData, setFilteredData] = useState([]);
	const [arr, setArr] = useState([]);
	const [name, setName] = useState("");
	const [success, setSuccess] = useState(false);
	const [err, setErr] = useState(false);

	const changeVal = function (status: string) {
		if (status == "success") {
			setSuccess(!success);
			setErr(false);
			const newArr = filteredData.filter(
				(el) => el.payment.status == "status"
			);
			setFilteredData(newArr);
		} else {
			setErr(!err);
			setSuccess(false);
			const newArr = filteredData.filter(
				(el) => el.payment.status == "error"
			);
			setFilteredData(newArr);
		}
	};

	const router = useRouter();
	const createQueryString = function (name: string, value: string): string {
		const params = new URLSearchParams();
		params.set(name, value);

		return params.toString();
	};

	useEffect(() => {
		if (success) {
			console.log("s");
			const newArr = filteredData.filter(
				(el) => el.payment.status == "status"
			);
			setFilteredData(newArr);
			console.log(filteredData);

			setArr(filteredData);
		}
		if (err) {
			const newArr = filteredData.filter(
				(el) => el.payment.status == "error"
			);
			setFilteredData(newArr);
			setArr(filteredData);
		}
		setArr(data);
	}, [success, err]);

	useEffect(() => {
		const fetchMerchants = async () => {
			try {
				const res = await fetchData(
					"https://mocki.io/v1/98548986-6e17-4a80-9d68-9d2f7e04ef99"
				);
				setData(res);
				setFilteredData(res);
				setArr(res);
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
					<p>Status</p>
					<div className="item">
						<input
							checked={success}
							type="checkbox"
							name=""
							id=""
							onChange={() => {
								changeVal("success");
							}}
						/>
						<span>Success</span>
					</div>
					<div className="item">
						<input
							checked={err}
							type="checkbox"
							name=""
							id=""
							onChange={() => {
								changeVal("err");
							}}
						/>
						<span>Error</span>
					</div>
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
						{arr.map((el, index) => (
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
