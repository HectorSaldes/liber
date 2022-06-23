import axios from 'axios';

const CORS_ENDPONIT = 'https://allowingcors.herokuapp.com/';
const body = { nothing: 'nothing' };

class IconsService {
	autoComplete(text) {
		return axios.get(
			`${CORS_ENDPONIT}https://search.icons8.com/api/iconsets/autocomplete?term=${text}&limit=10&platform=all`,
			body,
		);
	}

	async searchIcons(query, platform = 'all', offset = 0) {
		return axios
			.get(
				`${CORS_ENDPONIT}https://search.icons8.com/api/iconsets/v5/search?term=${query}&amount=50&offset=${offset}&platform=${platform}&authors=all`,
				body,
			)
			.then(({ data: { icons } }) => icons)
			.catch(() => null);
	}

	getIcon(id) {
		return axios.get(
			`${CORS_ENDPONIT}https://api-icons.icons8.com/siteApi/icons/icon?id=${id}&svg=true`,
			body,
		);
	}
}

export default new IconsService();
