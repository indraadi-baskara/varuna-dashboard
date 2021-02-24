import React, { Component } from "react";
import axios from "axios";
import { getHostname } from "../config/api";

export default class Tag extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hostname: props.hostname,
			status: props.status,
		};
	}

	componentDidMount() {
		this._isMounted = true;
		this.axiosCancelSource = axios.CancelToken.source();

		this.getServerConnectionStatus(this.state.hostname);

		this.timerID = setInterval(() => {
			this.getServerConnectionStatus(this.state.hostname);
		}, 1000 * 10);
	}

	componentWillUnmount() {
		this._isMounted = false;
		this.axiosCancelSource.cancel("Request cancelled...");

		clearInterval(this.timerID);
	}

	async getServerConnectionStatus(serverName) {
		try {
			const url = getHostname();
			const {
				data: { hostname, status },
			} = await axios.get(`http://${url}/api/outlets/is_online/${serverName}`, {
				timeout: 1000 * 5,
				cancelToken: this.axiosCancelSource.token,
			});

			if (
				this.props.handleOnlineStatus !== undefined &&
				this.state.status === "offline"
			) {
				this.props.handleOnlineStatus();
			}

			if (this._isMounted) {
				this.setState({
					hostname,
					status,
				});
			}
		} catch (error) {
			if (this._isMounted) {
				this.setState({
					status: "offline",
				});
			}
		}
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
				className={`ml-3 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-${
					tagStyle[this.state.status].color
				}-200 text-${tagStyle[this.state.status].color}-700 rounded-full`}
			>
				{this.state.status}
			</div>
		);
	}
}
