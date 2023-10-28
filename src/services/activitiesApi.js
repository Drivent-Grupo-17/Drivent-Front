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
  const response = await api.get(`/activities?date=${day}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function ActivitieSubscripition(activityId, token) {
  const response = await api.post(`/activities`,{activityId},{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
