import React, { Component } from "react";
import Loader from "../Loader";

/**
 * props
 * @tableFields Array
 * @total Array
 * @data Object
 */
export default class DataTable extends Component {
	formatCurrency(number = 0) {
		return "Rp. " + parseInt(number).toLocaleString("id-ID");
	}

	renderTableHeader() {
		return this.props.tableFields.map((field) => {
			return (
				<th
					key={field}
					className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
				>
					{field === "tgl_jual" ? "TANGGAL" : field}
				</th>
			);
		});
	}

	renderTableRowData() {
		return this.props.data.map((item) => {
			return (
				<tr
					key={item.tgl_jual + item.TOTAL}
					className="hover:bg-gray-100 cursor-pointer"
				>
					{this.props.tableFields.map((field) => {
						return (
							<td
								key={`${item.tgl_jual}-${field}`}
								className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500"
							>
								{field === "tgl_jual"
									? item[field]
									: this.formatCurrency(item[field])}
							</td>
						);
					})}
				</tr>
			);
		});
	}

	renderTableFooter() {
		return this.props.tableFields.map((field) => {
			return (
				<th
					key={field}
					className="px-6 py-3 bg-green-200 text-xs leading-4 font-medium text-green-700 uppercase tracking-wider"
				>
					{field === "tgl_jual"
						? "TOTAL"
						: this.formatCurrency(this.props.total[field])}
				</th>
			);
		});
	}

	renderTable() {
		return (
			<table className="min-w-full divide-y divide-gray-200 text-right">
				<thead className="text-center">
					<tr>{this.renderTableHeader()}</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{this.renderTableRowData()}
				</tbody>
				<tfoot className="text-right">
					<tr>{this.renderTableFooter()}</tr>
				</tfoot>
			</table>
		);
	}

	render() {
		return this.props.isLoading ? <Loader /> : this.renderTable();
	}
}
