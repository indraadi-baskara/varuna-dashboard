import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";

function FilterBar(props) {
	const [optionLists, setOptionLists] = useState({ bulan: [], tahun: [] });

	const getOptionLists = () => {
		fetch(`http://goodfellas.test/api/config`)
			.then((response) => response.json())
			.then((jsonResponse) => {
				setOptionLists(jsonResponse);
			});
	};

	useEffect(() => {
		getOptionLists();
	}, []);

	return (
		<div className="w-full flex justify-between items-center mb-2">
			<p>
				Laporan pada bulan {optionLists.bulan[props.value.inputBulan--]},{" "}
				{props.value.inputTahun}
			</p>
			<div className="inline-flex">
				<Dropdown
					name="Bulan"
					value={optionLists.bulan[props.value.inputBulan]}
					options={optionLists.bulan}
					setDropdownValue={props.handleInput.setInputBulan}
				/>
				<Dropdown
					name="Tahun"
					value={props.value.inputTahun}
					options={optionLists.tahun}
					setDropdownValue={props.handleInput.setInputTahun}
				/>
			</div>
		</div>
	);
}

export default FilterBar;
