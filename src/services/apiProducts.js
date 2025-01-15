export async function getFruits() {
  const res = await fetch(
    'https://192.168.43.117:7000/api/v1/products/category/vegetables?page=1&sort=name',
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!res.ok) {
    throw Error('Failed to get the data 😶');
  }

  const data = await res.json();
  return data;
}
