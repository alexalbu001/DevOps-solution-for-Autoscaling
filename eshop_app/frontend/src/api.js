import axios from 'axios';
import { apiUrl } from './config';
import { setUserInfo } from './localStorage';

export const getProduct = async (id) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/products/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};
// Add the following function to check if the user is signed in
export const isUserSignedIn = () => {
  const userInfo = getUserInfo();
  return !!userInfo;
};

// Modify the `signin` function to update the user info in local storage
export const signin = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/api/signin`, { email, password });
    const data = response.data;
    setUserInfo(data); // Store user info in local storage
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createOrder = async (order) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: order,
    });
    if (response.statusText !== 'Created') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response ? err.response.data.message : err.message };
  }
};