import axios from 'axios';

export const callApi = async ({
  endpoint,
  method,
  headers = {},
  params = {},
  data,
}) => {
  const baseURL = 'https://www.themealdb.com/api/json/v1/1';

  const options = {
    baseURL,
    url: endpoint,
    method,
    headers,
    params,
    data,
  };

  const response = await axios(options);
  return response?.data;
};
