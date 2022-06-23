import axios from 'axios';

const BASE_URL =
	'https://allowingcors.herokuapp.com/https://api-upscaler-origin.icons8.com/api/frontend/v1/';
const API = axios.create({
	baseURL: BASE_URL,
});

class Icons8Service {
	uploadImage(formData, batch) {
		const configHeaders = {
			headers: {
				'Content-Type':
					'multipart/form-data; boundary=----WebKitFormBoundaryO1cmSdmyQmpLOnCU',
			},
		};
		return API.post(`batches/${batch}`, formData, configHeaders);
	}
}

export default new Icons8Service();
