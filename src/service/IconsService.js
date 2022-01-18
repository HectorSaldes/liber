import axios from "axios";
const body = { nothing: "nothing" };

class IconsService {
	autoComplete(text) {
		return axios.get(
			`https://allowingcors.herokuapp.com/https://search.icons8.com/api/iconsets/autocomplete?term=${text}&limit=10&platform=all`,
			body
		);
	}

	async searchIcons(query) {
		return await axios
			.get(
				`https://allowingcors.herokuapp.com/https://search.icons8.com/api/iconsets/v5/search?term=${query}&amount=100&platform=all&authors=all`,
				body
			)
			.then(({ data: { icons } }) => icons)
			.catch((err) => null);
	}

	getIcon(id) {
		return axios.get(
			`https://allowingcors.herokuapp.com/https://api-icons.icons8.com/siteApi/icons/icon?id=${id}&svg=true`,
			body
		);
	}
}

export default new IconsService();
