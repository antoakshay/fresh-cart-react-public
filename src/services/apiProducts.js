export async function getFruits(page = 1) {
  const res = await fetch(
    `https://192.168.43.117:7000/api/v1/products/category/vegetables?page=${page}&sort=name`,
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

export async function getProductCount(category) {
  const res = await fetch(
    `https://192.168.43.117:7000/api/v1/products/getProductCount`,
    {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ category: category }),
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
