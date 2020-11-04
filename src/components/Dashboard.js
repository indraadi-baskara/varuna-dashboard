import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { getHostname } from "../config/api";
import Tags from "./Tags";

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = { outlets: {} };
	}

	componentDidMount() {
		this.getOutlets();
	}

	async getOutlets() {
		let hostname = getHostname();
		let { data } = await axios.get(`http://${hostname}/api/config`);
		this.setState({ outlets: data });
	}

	render() {
		const renderCards = Object.values(this.state.outlets).map((outlet) => {
			return (
				<Link key={outlet.name} to={`/target/${outlet.hostname}`}>
					<div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden my-2 mx-4">
						<img
							className="w-full h-36 object-cover object-center"
							src={outlet.img}
							alt="avatar"
						/>
						<div className="flex justify-between items-center px-6 py-3 bg-gray-900">
							<h1 className="mr-3 text-white font-semibold text-lg capitalize">
								{outlet.name}
							</h1>
							<Tags
								name={outlet.name}
								hostname={outlet.hostname}
								status={outlet.status}
							/>
						</div>
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
					<div className="max-w-7xl mx-auto py-3 sm:px-6 lg:px-8 flex justify-center flex-wrap">
						{renderCards}
					</div>
				</main>
			</section>
		);
	}
}
