import axios from 'axios';

axios.defaults.baseURL = 'https://api.wisey.app/api/v1/';

async function getCourses() {
  try {
    const response = await axios.get('auth/anonymous?platform=subscriptions');
    const token = response.data.token;

    const data = await axios.get('core/preview-courses', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getCourse(id) {
  try {
    const response = await axios.get('auth/anonymous?platform=subscriptions');
    const token = response.data.token;

    const data = await axios.get(`core/preview-courses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error(error);
  }
}

const api = { getCourses, getCourse };

export default api;
