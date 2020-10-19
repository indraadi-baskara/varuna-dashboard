import React, { Component } from "react";
import { Link } from "react-router-dom";
import Tags from "./Tags";

export default class Dashboard extends Component {
	capitalizeStr(string) {
		return string.charA;
	}

	render() {
		const outlets = {
			localhost: {
				name: "localhost",
				status: "offline",
				img:
					"https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1357&q=80",
			},
			goodfellas: {
				name: "goodfellas",
				status: "offline",
				img:
					"https://uploads-ssl.webflow.com/5c752f67ef5f3c117ee5fdca/5cd5258bf95bc71a6079db67_GF---1.jpg",
			},
		};

		const renderCards = Object.values(outlets).map((outlet) => {
			return (
				<Link key={outlet.name} to={`/target/${outlet.name}`}>
					<div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-2 mx-4">
						<img
							className="w-full h-56 object-cover object-center"
							src={outlet.img}
							alt="avatar"
						/>
						<div className="flex items-center px-6 py-3 bg-gray-900">
							<h1 className="mr-3 text-white font-semibold text-lg capitalize">
								{outlet.name}
							</h1>
							<Tags name={outlet.name} status={outlet.status} />
						</div>
						{/* <div className="py-4 px-6">
							<h1 className="text-2xl font-semibold text-gray-800 uppercase">
								{outlet.name}
							</h1>
							<p className="py-2 text-lg text-gray-700">
								Full Stack maker & UI / UX Designer , love hip hop music Author
								of Building UI.
							</p>
						</div> */}
					</div>
				</Link>
			);
		});

		return (
			<section>
				<header className="bg-white shadow">
					<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
						<h1 className="text-3xl font-bold leading-tight text-gray-900">
							Pilih Outlets
						</h1>
					</div>
				</header>
				<main>
					<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex justify-center flex-wrap">
						{renderCards}
					</div>
				</main>
			</section>
		);
	}
}
