import API_URL from "../../apiUrl";

export async function getCategoryName() {
  try {
    const response = await fetch(`${API_URL}/api/v1/products/getCategory`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
