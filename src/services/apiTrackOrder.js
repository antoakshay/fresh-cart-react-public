import API_URL from '../../apiUrl';

export async function trackOrderCurrent(orderId) {
  try {
    const response = await fetch(`${API_URL}/api/v1/orders/trackOrder`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId: orderId }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
}
