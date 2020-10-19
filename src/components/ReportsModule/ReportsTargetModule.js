import React, { Component } from "react";
import { withRouter } from "react-router";
import axios from "axios";

import FilterBar from "./FilterBar";
import Tags from "../Tags";
import { getHostname } from "../../config/api";

class ReportsModule extends Component {
	constructor(props) {
		super(props);

		this.state = {
			reports: { success: true, tahun: null, bulan: null, result: [] },
			inputBulan: new Date().getMonth() + 1,
			inputTahun: new Date().getFullYear(),
		};

		this.handleInputBulan = this.handleInputBulan.bind(this);
		this.handleInputTahun = this.handleInputTahun.bind(this);
	}

	handleInputBulan(payload) {
		this.setState({ inputBulan: payload });
	}

	handleInputTahun(payload) {
		this.setState({ inputTahun: payload });
	}

	componentDidMount() {
		const outlet = this.props.match.params.location;
		this.getReports(this.state.inputBulan, this.state.inputTahun, outlet);
	}

	componentDidUpdate(prevProps, prevState) {
		let { inputBulan, inputTahun } = this.state;
		if (
			inputBulan !== prevState.inputBulan ||
			inputTahun !== prevState.inputTahun
		) {
			const outlet = this.props.match.params.location;
			this.getReports(this.state.inputBulan, this.state.inputTahun, outlet);
		}
	}

	async getReports(bulan, tahun, outlet) {
		let hostname = getHostname();
		let { data } = await axios.get(
			`http://${hostname}/api/target/${outlet}/${tahun}/${bulan}`
		);
		this.setState({ reports: data });
	}

	formatCurrency(number = 0) {
		return "Rp. " + parseInt(number).toLocaleString("id-ID");
	}

	callculateTotal() {
		let total = this.state.reports.result.reduce((accumulator, item) => {
			Object.keys(item).forEach((key) => {
				if (key !== "tgl_jual") {
					accumulator[key] = (accumulator[key] || 0) + item[key];
				}
			});
			return accumulator;
		}, {});

		return total;
	}

	render() {
		const tableFields = [
			"tgl_jual",
			"BEV",
			"FOOD",
			"JUMLAH",
			"TAX",
			"SERVICE",
			"TOTAL",
			"TARGET",
		];

		const total = this.callculateTotal();

		const outletName = this.props.match.params.location;

		const renderTableHeader = tableFields.map((field) => {
			return (
				<th
					key={field}
					className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
				>
					{field === "tgl_jual" ? "TANGGAL" : field}
				</th>
			);
		});

		const renderTableRowData = this.state.reports.result.map((report) => {
			return (
				<tr key={report.tgl_jual} className="hover:bg-gray-100 cursor-pointer">
					{tableFields.map((field) => {
						return (
							<td
								key={`${report.tgl_jual}-${field}`}
								className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500"
							>
								{field === "tgl_jual"
									? report[field]
									: this.formatCurrency(report[field])}
							</td>
						);
					})}
				</tr>
			);
		});

		const renderTableFooter = tableFields.map((field) => {
			return (
				<th
					key={field}
					className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
				>
					{field === "tgl_jual" ? "TOTAL" : this.formatCurrency(total[field])}
				</th>
			);
		});

		return (
			<section>
				<header className="bg-white shadow">
					<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
						<h1 className="text-3xl font-bold leading-tight text-gray-900">
							Laporan <Tags name={outletName} status="offline" />
						</h1>
					</div>
				</header>
				<main>
					<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
						<div className="flex flex-col">
							{/* Dropdown */}
							<FilterBar
								handleInput={{
									setInputBulan: this.handleInputBulan,
									setInputTahun: this.handleInputTahun,
								}}
								value={{
									inputBulan: this.state.inputBulan - 1,
									inputTahun: this.state.inputTahun,
								}}
							/>

							{this.state.reports.success ? (
								<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
									<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
										<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
											<table className="min-w-full divide-y divide-gray-200 text-right">
												<thead className="text-center">
													<tr>{renderTableHeader}</tr>
												</thead>
												<tbody className="bg-white divide-y divide-gray-200">
													{renderTableRowData}
												</tbody>
												<tfoot className="text-right">
													<tr>{renderTableFooter}</tr>
												</tfoot>
											</table>
										</div>
									</div>
								</div>
							) : (
								<div
									className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
									role="alert"
								>
									<p className="font-bold">Oooppsss.....</p>
									<p>{this.state.reports.result}</p>
								</div>
							)}
						</div>
					</div>
				</main>
			</section>
		);
	}
}

export default withRouter(ReportsModule);
