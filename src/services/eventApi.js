import api from './api';

export async function getEventInfo() {
  console.log(import.meta.env.VITE_API_URL)
  const response = await api.get('/event');
  return response.data;
}
//
