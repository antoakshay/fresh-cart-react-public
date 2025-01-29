import API_URL from '../../apiUrl';
import validator from 'validator';

export async function signUp(email) {
  try {
    if (!validator.isEmail(email)) {
      throw new Error('Invalid email address');
    }
    const response = await fetch(`${API_URL}/api/v1/users/signup`, {
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

export async function otpVerifier(otp) {
  console.log(otp);
  try {
    const response = await fetch(`${API_URL}/api/v1/users/verifyOtp`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otp: otp }),
    });
    // console.log(await response.json());
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

export async function createAccount(name, password, passwordConfirm) {
  console.log(name, password, passwordConfirm);
  try {
    const response = await fetch(`${API_URL}/api/v1/users/accountCreation`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        password: password,
        passwordConfirm: passwordConfirm,
      }),
    });
    // console.log(await response.json());
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

export async function getUser() {
  try {
    const response = await fetch(`${API_URL}/api/v1/users/getUserOntoken`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(await response.json());
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
