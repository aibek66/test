import axios from "axios";

const fetchData = async (endPoint: string) => {
	try {
		const response = await axios.get(endPoint);
		const data = await response.data;
		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};

export default fetchData;
