import api from './api.js';

export async function getDays(token) {
  const response = await api.get('/activities/days', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getActivities(day, token) {
  const response = await api.get(`/activities/${day}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
