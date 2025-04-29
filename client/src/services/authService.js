import {fetchData} from './fetchData.js';

export const loginUser = async ({email, password}) => {
  return await fetchData('api/v1/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({user_email: email, user_password: password}),
  });
};
