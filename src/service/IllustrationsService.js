import axios from 'axios';

const CORS_ENDPONIT = 'https://allowingcors.herokuapp.com/';
const body = { nothing: 'nothing' };
// https://api-ouch.icons8.com/api/frontend/v1/illustrations?page=1&per_page=50&locale=en-US&subject_pretty_ids=dog

class IllustrationsService {
  autoComplete(text) {
    return axios.get(
      `${CORS_ENDPONIT}https://api-ouch.icons8.com/api/frontend/v1/autocomplete?query=${text}`,
      body
    );
  }


  searchIllustrations(query, page = 1, category = '') {
    if (category.length === 0) {
      return axios.get(
        `${CORS_ENDPONIT}https://api-ouch.icons8.com/api/frontend/v1/illustrations?page=${page}&per_page=50&subject_pretty_ids=${query}`,
        body
      ).then(({ data: { illustrations } }) => illustrations)
        .catch(() => null);
    } else {
      return axios.get(
        `${CORS_ENDPONIT}https://api-ouch.icons8.com/api/frontend/v1/illustrations/count/illustrators?page=${page}&per_page=50&style_pretty_ids=${category}&subject_pretty_ids=${query}`,
        body
      ).then(({ data: { illustrations } }) => illustrations)
        .catch(() => null);
    }
  }

  getIllustration(id) {
    return axios.get(
      `${CORS_ENDPONIT}https://api-ouch.icons8.com/api/frontend/v1/illustrations/${id}`,
      body
    );
  }
}


export default new IllustrationsService()

// https://api-ouch.icons8.com/api/frontend/v1/autocomplete?query=dog&locale=en-US
// https://api-ouch.icons8.com/api/frontend/v1/illustrations?page=1&per_page=50&locale=es-ES&style_pretty_ids=experimental&search=cat%20

// https://api-ouch.icons8.com/api/frontend/v1/illustrations/62b29f624b3ea3001f8d7374/


// Categoria
// https://api-ouch.icons8.com/api/frontend/v1/illustrations/count/illustrators?style_pretty_ids=business-3d&subject_pretty_ids=dog

// Sin ella
// https://api-ouch.icons8.com/api/frontend/v1/illustrations?page=1&per_page=50&locale=en-US&subject_pretty_ids=cat
// https://api-ouch.icons8.com/api/frontend/v1/illustrations?page=1&per_page=50&locale=en-US&subject_pretty_ids=dog
// https://api-ouch.icons8.com/api/frontend/v1/illustrations?page=2&per_page=50&locale=en-US&subject_pretty_ids=cat


// https://api-ouch.icons8.com/api/frontend/v1/illustrations/5ec7b82601d0360018d4bc5a/download-url?media_format=png-hd
