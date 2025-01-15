export async function getCartDetails() {
  try {
    const response = await fetch(
      'https://192.168.43.117:7000/api/v1/cart/getCartById',
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}

