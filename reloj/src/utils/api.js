import axios from 'axios';

const URL = 'http://localhost:3000/api/v1/times';

export function showHistorical() {
  return axios.get(URL);
}

export function saveNewRecord( time ) {
  console.log(time);
  return axios.post(URL, time);
}