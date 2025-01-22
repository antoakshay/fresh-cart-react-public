import API_URL from "../../apiUrl";

export async function placeOrder(
  addressLine1,
  addressLine2,
  city,
  pincode,
  phoneNumber,
) {
  try {
    const response = await fetch(`${API_URL}/api/v1/orders/placeOrder`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        city: city,
        pincode: pincode,
        phoneNumber: phoneNumber,
      }),
    });
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
