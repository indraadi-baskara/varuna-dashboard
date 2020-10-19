import React, { Component } from "react";
import axios from "axios";
import { getHostname } from "../config/api";

export default class Tag extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			status: props.status,
		};
	}

	componentDidMount() {
		this.getServerConnectionStatus(this.state.name);
		this.timerID = setInterval(
			() => this.getServerConnectionStatus(this.state.name),
			1000 * 5
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	async getServerConnectionStatus(serverName = "localhost") {
		const hostname = getHostname();
		const {
			data: { name, status },
		} = await axios.get(`http://${hostname}/api/connection/${serverName}`);
		this.setState({
			name,
			status,
		});
	}

	render() {
		const tagStyle = {
			offline: {
				color: "red",
			},
			online: {
				color: "green",
			},
		};

		return (
			<div
				className={`ml-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-${
					tagStyle[this.state.status].color
				}-200 text-${tagStyle[this.state.status].color}-700 rounded-full`}
			>
				{/* <svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-arrow-right mr-2"
				>
					<line x1="5" y1="12" x2="19" y2="12"></line>
					<polyline points="12 5 19 12 12 19"></polyline>
				</svg> */}
				{this.state.name} - {this.state.status}
			</div>
		);
	}
}
