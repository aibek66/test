import axios from "axios";

const fetchData = async () => {
	try {
		const response = await axios.get(
			"https://mocki.io/v1/bfabc383-1b98-4a0f-9955-5b61bd36f0d8"
		);
		const data = await response.data;
		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};

export default fetchData;
