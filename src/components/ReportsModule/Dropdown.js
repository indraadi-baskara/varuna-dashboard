import React, { useEffect, useState } from "react";

function Dropdown(props) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	let [label, setLabel] = useState(props.value);

	const handleClick = (value, index) => {
		if (props.name === "Bulan") {
			props.setDropdownValue(++index);
		}

		if (props.name === "Tahun") {
			props.setDropdownValue(value);
		}

		setLabel(value);
		setIsDropdownOpen(false);
	};

	return (
		<div className="relative text-left">
			<div>
				<span className="rounded-md shadow">
					<button
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						type="button"
						className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
						id="options-menu"
						aria-haspopup="true"
						aria-expanded="true"
					>
						{/* {props.value} */}
						{label}
						{/* <!-- Heroicon name: chevron-down --> */}
						<svg
							className="-mr-1 ml-2 h-5 w-5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</span>
			</div>

			{/* <!--
    Dropdown panel, show/hide based on dropdown state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  --> */}
			<div
				className={`${
					isDropdownOpen ? "block" : "hidden"
				} origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg`}
			>
				<div className="rounded-md bg-white shadow-xs">
					<div
						className="py-1"
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="options-menu"
					>
						{props.options.map((options, index) => {
							return (
								<span
									key={index}
									onClick={() => handleClick(options, index)}
									className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 cursor-pointer"
								>
									{options}
								</span>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dropdown;
