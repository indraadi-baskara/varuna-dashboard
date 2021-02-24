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
			reports: {
				name: "Laporan",
				success: true,
				tahun: null,
				bulan: null,
				result: [],
			},
			inputBulan: new Date().getMonth() + 1,
			inputTahun: new Date().getFullYear(),
			isLoading: true,
		};

		this.handleInputBulan = this.handleInputBulan.bind(this);
		this.handleInputTahun = this.handleInputTahun.bind(this);
		this.handleOnlineStatus = this.handleOnlineStatus.bind(this);
	}

	handleInputBulan(payload) {
		this.setState({ inputBulan: payload });
	}

	handleInputTahun(payload) {
		this.setState({ inputTahun: payload });
	}

	handleOnlineStatus() {
		const outlet = this.props.match.params.location;
		!this._isFetching &&
			this.getReports(this.state.inputBulan, this.state.inputTahun, outlet);
	}

	componentDidMount() {
		this._isMounted = true;
		this._isFetching = true;
		this._axiosCancelSource = axios.CancelToken.source();

		const outlet = this.props.match.params.location;
		this.getReports(this.state.inputBulan, this.state.inputTahun, outlet);
	}

	componentWillUnmount() {
		this._isMounted = false;
		this._axiosCancelSource.cancel("Request cancelled...");
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
		try {
			this.setState({ isLoading: true });
			let hostname = getHostname();
			let {
				data,
			} = await axios.get(
				`http://${hostname}/api/sales/target/${outlet}/${tahun}/${bulan}`,
				{ cancelToken: this._axiosCancelSource.token }
			);
			if (this._isMounted) {
				this.setState({ reports: data, isLoading: false });
				this._isFetching = false;
			}
		} catch (error) {
			if (this._isMounted) {
				this.setState({ isLoading: false });
				this._isFetching = false;
			}
		}
	}

	callculateTotal() {
		let total = [];

		if (this.state.reports.result) {
			total = this.state.reports.result.reduce((accumulator, item) => {
				Object.keys(item).forEach((key) => {
					if (key !== "tgl_jual") {
						accumulator[key] = (accumulator[key] || 0) + item[key];
					}
				});
				return accumulator;
			}, {});
		}
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
							{this.state.reports.name}
							<Tags
								name={this.state.reports.name}
								hostname={outletName}
								handleOnlineStatus={this.handleOnlineStatus}
								status="offline"
							/>
						</h1>
					</div>
				</header>
				<main>
					<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
						<div className="flex flex-col mx-3">
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
										<div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
											<DataTable
												isLoading={this.state.isLoading}
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
