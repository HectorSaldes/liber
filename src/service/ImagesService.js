/* eslint-disable import/no-anonymous-default-export */

import axios from "axios";
const BASE_URL = "https://api-upscaler-origin.icons8.com/api/frontend/v1/";
const API = axios.create({ baseURL: BASE_URL });

class Icons8Service {
	uploadImage(formData, batch) {
		const configHeaders = {
			headers: {
				"Content-Type":
					"multipart/form-data; boundary=----WebKitFormBoundaryO1cmSdmyQmpLOnCU",
				"x-user-id": "63470d772cf095526d35ae49",
			},
		};
		return API.post(`batches/${batch}`, formData, configHeaders);
	}
}

export default new Icons8Service();
