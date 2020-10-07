import React, { useEffect, useState } from "react";
import FilterBar from "./FilterBar";
// import { useFetch } from "../library/utility";

function ReportsModule() {
	const [reports, setReports] = useState({
		tahun: null,
		bulan: null,
		result: [],
	});

	const [inputBulan, setInputBulan] = useState(1);
	const [inputTahun, setInputTahun] = useState(2017);

	const formatCurrency = (number) => {
		return "Rp. " + parseInt(number).toLocaleString("id-ID");
	};

	const getReports = (bulan, tahun) => {
		fetch(`http://localhost/goodfellas/public/api/reports/${tahun}/${bulan}`)
			.then((response) => response.json())
			.then((jsonResponse) => {
				setReports(jsonResponse);
			});
	};

	useEffect(() => {
		getReports(inputBulan, inputTahun);
	}, [inputBulan, inputTahun]);

	return (
		<section>
			<header className="bg-white shadow">
				<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold leading-tight text-gray-900">
						Dashboard
					</h1>
				</div>
			</header>
			<main>
				<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					{/* <!-- Replace with your content --> */}
					{/* <div className="px-4 py-6 sm:px-0">
						<div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
					</div> */}
					{/* <!-- /End replace --> */}
					<div className="flex flex-col">
						{/* Dropdown */}
						<FilterBar
							handleInput={{
								setInputBulan,
								setInputTahun,
							}}
							value={{
								inputBulan,
								inputTahun,
							}}
						/>

						<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
								<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
									<table className="min-w-full divide-y divide-gray-200 text-right">
										<thead className="text-center">
											<tr>
												<th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
													TANGGAL
												</th>
												<th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
													FOOD
												</th>
												<th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
													BEV
												</th>
												<th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
													CIGARRET
												</th>
												<th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
													TAX
												</th>
												<th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
													SERVICE
												</th>
												<th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
													JUMLAH
												</th>
												<th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
													TOTAL
												</th>
												<th className="px-6 py-3 bg-gray-50"></th>
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{reports.result.map((report) => {
												return (
													<tr key={report.tgl_jual}>
														<td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-800 font-medium">
															{report.tgl_jual}
														</td>
														<td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
															{formatCurrency(report.FOOD)}
														</td>
														<td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
															{formatCurrency(report.BEV)}
														</td>
														<td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
															{formatCurrency(report.CIGARRET)}
														</td>
														<td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
															{formatCurrency(report.JUMLAH)}
														</td>
														<td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
															{formatCurrency(report.TAX)}
														</td>
														<td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
															{formatCurrency(report.SERVICE)}
														</td>
														<td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
															{formatCurrency(report.TOTAL)}
														</td>
														<td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
															<a
																href="#"
																className="text-indigo-600 hover:text-indigo-900"
															>
																Edit
															</a>
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</section>
	);
}

export default ReportsModule;
