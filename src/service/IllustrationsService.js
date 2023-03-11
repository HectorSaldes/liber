/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

class IllustrationsService {
	autoComplete(text) {
		return axios.get(
			`https://api-ouch.icons8.com/api/frontend/v1/autocomplete?query=${text}`,
		);
	}

	searchIllustrations(query, page = 1, category = "") {
		return (
			axios
				// eslint-disable-next-line no-template-curly-in-string
				.get(
					`https://api-ouch.icons8.com/api/frontend/v1/illustrations?locale=en-US&page=${page}&per_page=50&search=${query}${
						// eslint-disable-next-line no-template-curly-in-string
						category.length === 0 ? "" : "&style_pretty_ids=${category}"
					}`,
				)
				.then(({ data: { illustrations } }) => illustrations)
				.catch(() => null)
		);
	}

	getIllustration(id) {
		return axios.get(
			`https://api-creator.icons8.com/api/editor/v1/assets/identify?resource_id=${id}&source=vector&action=add-element`,
		);
	}
}

export default new IllustrationsService();
