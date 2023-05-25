import axios from 'axios';
import { apiUrl } from './config';

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
// api.js

// export const signin = async (email, password) => {
//   // Perform the sign-in logic, such as making an API request
//   // and returning the response or data
//   // Example:
//   try {
//     const response = await fetch('/api/signin', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       return data;
//     } else {
//       throw new Error('Sign-in failed');
//     }
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };
export const signin = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/api/signin`, { email, password });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};