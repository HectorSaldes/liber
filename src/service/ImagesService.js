import axios from "axios";
import { URL_CORS } from "./UtilService";

const BASE_URL = `${URL_CORS}https://api-upscaler-origin.icons8.com/api/frontend/v1/`;
const API = axios.create({ baseURL: BASE_URL });

class ImagesService {
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

export default ImagesService;
