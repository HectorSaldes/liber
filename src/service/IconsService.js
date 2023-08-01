import axios from "axios";
import {URL_CORS} from "./UtilService";

class IconsService {
    autoComplete(text) {
        return axios.get(`${URL_CORS}https://search.icons8.com/api/iconsets/autocomplete?term=${text}&limit=10&platform=all`);
    }

    async getPlatforms() {
        let allPlatforms = [{label: "All styles", value: "all",}]
        try {
            let platforms = await axios.get(`${URL_CORS}https://api-icons.icons8.com/publicApi/platforms?token=ZIegCHzGMYWKrqeDADXWzt2j6ZYyXbt9P04SDIhG`);
            for (const p of platforms.data.docs) allPlatforms.push({label: p.title, value: p.apiCode})
        } catch (e) {
            console.error(e)
        }
        return allPlatforms;
    }

    async searchIcons(query, platform = "all", offset = 0) {
        return axios
            .get(`${URL_CORS}https://search.icons8.com/api/iconsets/v5/search?term=${query}&amount=50&offset=${offset}&platform=${platform}&authors=all`)
            .then(({data: {icons}}) => icons)
            .catch(() => []);
    }

    getIcon(id) {
        return axios.get(`${URL_CORS}https://api-icons.icons8.com/siteApi/icons/icon?id=${id}&svg=true`);
    }

    getCategoriesAndSubcategories() {
        return axios.get(`${URL_CORS}https://api-icons.icons8.com/publicApi/categories?token=ZIegCHzGMYWKrqeDADXWzt2j6ZYyXbt9P04SDIhG`)
            .then(({data: {docs}}) => docs)
            .catch(() => []);
    }

    getIconCategories(category, group, itter=0) {
        return axios.get(`${URL_CORS}https://api-icons.icons8.com/siteApi/icons/packs/demarcation?category=${category}&amount=100&offset=${itter}&platform=${group}`)
            .then(({data: {category}}) => category)
            .catch(() => false);
    }
}

export default IconsService;
