import API_URL from "../../apiUrl";

export async function signUp(email) {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/users/signup`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      },
    );
    console.log(response);
    if (!response.ok) {
      // alert('No results found')
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}

export async function otpVerifier(otp) {
  try {
    const response = await fetch(`${API_URL}/api/v1/users/verifyOtp`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otp: otp }),
    });
    console.log(response);
    if (!response.ok) {
      // alert('No results found')
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}
