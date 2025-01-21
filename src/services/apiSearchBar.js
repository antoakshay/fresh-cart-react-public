export async function findProducts(products,page=1) {
  try {
    const response = await fetch(
      `https://192.168.43.117:7000/api/v1/products/search?sort=name&limit=10&page=${page}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName: products }),
      },
    );
    console.log(response)
    if (!response.ok) {
      // alert('No results found')
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data.data);
    return data;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}
