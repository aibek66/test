"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import fetchData from "@/utils/fetchData";

export default function Details() {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	interface Client {
		merchant: {};
		payment: {};
	}
	const [obj, setObj] = useState<Client | null>(null);

	const fetchMerchants = async () => {
		try {
			const res = await fetchData(
				"https://mocki.io/v1/98548986-6e17-4a80-9d68-9d2f7e04ef99"
			);
			const client = res.find((el) => el.merchant.id == id);
			setObj(client);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchMerchants();
	}, []);

	return (
		<div className="details">
			{obj && (
				<>
					<h2>{obj.merchant.name}</h2>
					<div className="relative overflow-x-auto">
						<table className="w-1/3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
							<tbody>
								<tr className="body-tr bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										Country:
									</th>
									<td className="dark:text-white px-6 py-4">
										{obj.payment.country}
									</td>
								</tr>
								<tr className="body-tr bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										Merchant id:
									</th>
									<td className="dark:text-white px-6 py-4">
										{obj.merchant.merchant_id}
									</td>
								</tr>
								<tr className="body-tr bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										Payment id:
									</th>
									<td className="dark:text-white px-6 py-4">
										{obj.payment.payment_id}
									</td>
								</tr>
								<tr className="body-tr bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										Status:
									</th>
									<td className="dark:text-white px-6 py-4">
										{obj.payment.status}
									</td>
								</tr>
								<tr className="body-tr bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										Comission:
									</th>
									<td className="dark:text-white px-6 py-4">
										{obj.payment.comission}%
									</td>
								</tr>
								<tr className="body-tr bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										Payment description:
									</th>
									<td className="dark:text-white px-6 py-4">
										{obj.payment.description}
									</td>
								</tr>
								<tr className="body-tr bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										Payment type:
									</th>
									<td className="dark:text-white px-6 py-4">
										{obj.payment.type}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</>
			)}
		</div>
	);
}
