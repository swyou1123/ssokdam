import { ADMIN_SERVER_URL } from '../config';
import Api from './customApi';

export async function fetchMyAskDetail(id) {
  const URL = `${ADMIN_SERVER_URL}/complain/${id}`
  
  const response = await Api(URL)
  console.log(response);
  return response.data
}