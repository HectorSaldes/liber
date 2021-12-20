import axios from "axios";
const BASE_URL = "https://api-upscaler-origin.icons8.com/api/frontend/v1/";
const API = axios.create({
	baseURL: BASE_URL,
});

class Icons8Service {
	getBatches() {
		/* const config = {
			headers: {
				"visitor-id": "4654f3634fd7915e58b91d0d3fa57c3c",
			},
		}; */
		// return API.post("batches", { nothing: "nothing" }, config);
		return API.post("batches", { nothing: "nothing" });
	}

	uploadImage(formData, batch) {
		const configHeaders = {
			headers: {
				"Content-Type":
					"multipart/form-data; boundary=----WebKitFormBoundaryO1cmSdmyQmpLOnCU",
				// "visitor-id": "4654f3634fd7915e58b91d0d3fa57c3c",
			},
		};
		return API.post(`batches/${batch}`, formData, configHeaders);
	}
}

export default new Icons8Service();
