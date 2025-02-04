import API_URL from '../../apiUrl';

export async function getOrderHistory(sortId) {
  console.log(sortId);
  try {
    const response = await fetch(
      `${API_URL}/api/v1/orders/getAllOrderHistory`,
      {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ sortId: Number(sortId) }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}
