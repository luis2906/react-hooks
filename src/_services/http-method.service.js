import axios from 'axios';
import { authHeader } from '../_helpers';
import { API_ROOT } from '../_environments/index';

async function GET(urlApi, data) {
  const response = await axios.get(`${API_ROOT}${urlApi}/?format=json`, { headers: authHeader(), params: data });
  return response;    
}

async function PUT(urlApi, data) {
  const response = await axios.put(`${API_ROOT}${urlApi}/?format=json`, data, {headers: authHeader() } );
  return response;
}

async function POST(urlApi, data) {
  const options = {
    method: 'POST',
    headers: authHeader(),
    data,
    url: `${API_ROOT}${urlApi}`,
  };
  const response = await axios(options);
  return response;
}

export const httpMethodService = {
  GET,
  PUT,
  POST
};
