import React, { Component } from "react";

export default class NotFoundTag extends Component {
	render() {
		return (
			<div
				className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
				role="alert"
			>
				<p className="font-bold">Oooppsss.....</p>
				<p>{this.props.message}</p>
			</div>
		);
	}
}
