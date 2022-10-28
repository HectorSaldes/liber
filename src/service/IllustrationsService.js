import axios from "axios";

const CORS_ENDPONIT = "https://allowingcors.herokuapp.com/";

class IllustrationsService {

  autoComplete(text) {
    return axios.get(`${CORS_ENDPONIT}https://api-ouch.icons8.com/api/frontend/v1/autocomplete?query=${text}`);
  }

  searchIllustrations(query, page = 1, category = "") {
    return axios
      .get(`${CORS_ENDPONIT}https://api-ouch.icons8.com/api/frontend/v1/illustrations?locale=en-US&page=${page}&per_page=50&search=${query}${category.length === 0 ? "" : "&style_pretty_ids=${category}"}`)
      .then(({ data: { illustrations } }) => illustrations)
      .catch(() => null);
  }

  getIllustration(id) {
    return axios.get(`${CORS_ENDPONIT}https://api-creator.icons8.com/api/editor/v1/assets/identify?resource_id=${id}&source=vector&action=add-element`);
  }
}

export default new IllustrationsService();
