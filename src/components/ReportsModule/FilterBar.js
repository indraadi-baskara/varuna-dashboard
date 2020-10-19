import React from "react";
import Dropdown from "./Dropdown";

function FilterBar(props) {
	const bulan = [
		"Januari",
		"Februari",
		"Maret",
		"April",
		"Mei",
		"Juni",
		"Juli",
		"Agustus",
		"September",
		"Oktober",
		"November",
		"Desember",
	];

	const tahun = [2017, 2018, 2019, 2020];

	const currentMonth = props.value.inputBulan;

	return (
		<div className="w-full flex justify-between items-center mb-2">
			<p>
				Laporan pada bulan {bulan[currentMonth]}, {props.value.inputTahun}
			</p>
			<div className="inline-flex">
				<Dropdown
					name="Bulan"
					value={bulan[currentMonth]}
					options={bulan}
					setDropdownValue={props.handleInput.setInputBulan}
				/>
				<Dropdown
					name="Tahun"
					value={props.value.inputTahun}
					options={tahun}
					setDropdownValue={props.handleInput.setInputTahun}
				/>
			</div>
		</div>
	);
}

export default FilterBar;
