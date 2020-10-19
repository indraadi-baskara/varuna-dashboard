export const getHostname = () => {
	let publicHostname = "varuna.dafamsindoro.co.id";
	let localhost = "localhost/goodfellas/public";
	let devView = "localhost";
	let hostname = document.location.hostname;

	if (hostname === devView || hostname === "goodfellas.test") {
		return localhost;
	}

	return publicHostname;
};
