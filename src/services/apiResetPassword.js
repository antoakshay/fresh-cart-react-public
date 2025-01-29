import validator from 'validator';
import API_URL from '../../apiUrl';

export async function resetPassword(email) {
  try {
    if (!validator.isEmail(email)) {
      throw new Error('Invalid email address');
    }
    const response = await fetch(`${API_URL}/api/v1/users/forgotPassword`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    });
    console.log(response);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
}

export async function resetPasswordUpdate(token) {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/users/resetPasswordVerification`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token }),
      },
    );
    console.log(response);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
}

export async function setResetPassword({password, passwordConfirm}) {
  console.log({password,passwordConfirm})
  try {
    const response = await fetch(
      `${API_URL}/api/v1/users/resetPassword`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: password,
          passwordConfirm: passwordConfirm,
        }),
      },
    );
    console.log(response);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
}
