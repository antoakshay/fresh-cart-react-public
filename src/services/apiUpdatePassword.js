import API_URL from '../../apiUrl';

export async function updatePassword(
  {password,
  newPassword,
  newPasswordConfirm},
) {
  console.log({password, newPassword, newPasswordConfirm});
  try {
    const response = await fetch(`${API_URL}/api/v1/users/updatePassword`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        passwordCurrent: password,
        password: newPassword,
        passwordConfirm: newPasswordConfirm,
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
