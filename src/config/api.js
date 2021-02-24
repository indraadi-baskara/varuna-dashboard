export const getHostname = () => {
	let hostname = document.location.host;

	if (document.location.hostname === "localhost") {
		return "localhost:3020";
	}

	return hostname;
};
