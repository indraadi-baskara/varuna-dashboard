export const getHostname = () => {
	// let publicHostname = "varuna.dafamsindoro.co.id";
	// let localhost = "localhost/goodfellas/public";
	// let devView = "localhost";
	let hostname = document.location.host;

	if (document.location.hostname === "localhost") {
		console.log("yes it is");
		return "localhost:3020";
	}

	return hostname;
};
