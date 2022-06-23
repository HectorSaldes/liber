import axios from 'axios';

const CORS_ENDPONIT = 'https://allowingcors.herokuapp.com/';
const body = { nothing: 'nothing' };

class IllustrationsService {
	autoComplete(text) {
		return axios.get(
			`${CORS_ENDPONIT}https://api-ouch.icons8.com/api/frontend/v1/autocomplete?query=${text}`,
			body,
		);
	}

	searchIllustrations(query, page = 1, category = '') {
		if (category.length === 0) {
			return axios
				.get(
					`${CORS_ENDPONIT}https://api-ouch.icons8.com/api/frontend/v1/illustrations?page=${page}&per_page=50&subject_pretty_ids=${query}`,
					body,
				)
				.then(({ data: { illustrations } }) => illustrations)
				.catch(() => null);
		} else {
			return axios
				.get(
					`${CORS_ENDPONIT}https://api-ouch.icons8.com/api/frontend/v1/illustrations?page=${page}&per_page=50&style_pretty_ids=${category}&search=${query}`,
					body,
				)
				.then(({ data: { illustrations } }) => illustrations)
				.catch(() => null);
		}
	}

	getIllustration(id) {
		return axios.get(
			`${CORS_ENDPONIT}https://api-ouch.icons8.com/api/frontend/v1/illustrations/${id}`,
			body,
		);
	}
}

export default new IllustrationsService();
