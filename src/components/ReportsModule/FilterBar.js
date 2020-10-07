import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";

function FilterBar(props) {
	const [optionLists, setOptionLists] = useState({ bulan: [], tahun: [] });

	const getOptionLists = () => {
		fetch(`http://localhost/goodfellas/public/api/config`)
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
			<p>Reports</p>
			<div className="inline-flex">
				<Dropdown
					name="Bulan"
					value={props.inputBulan}
					options={optionLists.bulan}
					setDropdownValue={props.handleInput.setInputBulan}
				/>
				<Dropdown
					name="Tahun"
					value={props.inputTahun}
					options={optionLists.tahun}
					setDropdownValue={props.handleInput.setInputTahun}
				/>
			</div>
		</div>
	);
}

export default FilterBar;
