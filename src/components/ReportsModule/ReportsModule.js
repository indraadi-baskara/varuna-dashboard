import React, { Component } from "react";
import { withRouter } from "react-router";
import axios from "axios";

import FilterBar from "./FilterBar";
import Tags from "../Tags";
import NotFoundTag from "../NotFoundTag";
import DataTable from "./DataTable";
import { getHostname } from "../../config/api";

class ReportsModule extends Component {
	constructor(props) {
		super(props);

		this.state = {
			reports: { success: true, tahun: null, bulan: null, result: [] },
			inputBulan: 8,
			inputTahun: 2020,
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
			`http://${hostname}/api/reports/${outlet}/${tahun}/${bulan}`
		);
		this.setState({ reports: data });
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

		return (
			<section>
				<header className="bg-white shadow">
					<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
						<h1 className="text-3xl font-bold leading-tight text-gray-900">
							Laporan <Tags hostname={outletName} status="offline" />
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
											<DataTable
												tableFields={tableFields}
												total={total}
												data={this.state.reports.result}
											/>
										</div>
									</div>
								</div>
							) : (
								<NotFoundTag message="Data pada bulan ini belum dimasukkan" />
							)}
						</div>
					</div>
				</main>
			</section>
		);
	}
}

export default withRouter(ReportsModule);
