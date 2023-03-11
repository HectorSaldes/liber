import axios from "axios";

const body = { nothing: "nothing" };

class IconsService {
	autoComplete(text) {
		return axios.get(
			`https://search.icons8.com/api/iconsets/autocomplete?term=${text}&limit=10&platform=all`,
			body,
		);
	}

	getPlatformsStyles() {
		return axios.get(`https://api.icons8.com/api/iconsets/v3/platforms`);
	}

	searchById(id) {
		return axios.get(
			`https://api-icons.icons8.com/siteApi/icons/icon?id=${id}&svg=true`,
		);
	}

	async searchIcons(query, platform = "all", offset = 0) {
		return axios
			.get(
				`https://search.icons8.com/api/iconsets/v5/search?term=${query}&amount=50&offset=${offset}&platform=${platform}&authors=all`,
				body,
			)
			.then(({ data: { icons } }) => icons)
			.catch(() => null);
	}

	getIcon(id) {
		return axios.get(
			`https://api-icons.icons8.com/siteApi/icons/icon?id=${id}&svg=true`,
			body,
		);
	}
}

export default new IconsService();
