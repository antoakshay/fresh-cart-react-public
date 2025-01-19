import { useEffect, useState } from 'react';
import { findProducts } from '../../../services/apiSearchBar';
import { redirect, replace, useNavigate } from 'react-router-dom';
import { useSearchContext } from '../../../SearchContextApi';

function Searchbar() {
  const { query, setQuery } = useSearchContext();

  const navigate = useNavigate();

  async function handleSearch(event) {
    event.preventDefault();
    if (!query) return alert('Do I look like a mind reader? TYPE SOMETHING!');
    const response = await findProducts(query);

    if (!response) return alert('No results found!');

    sessionStorage.setItem('search_product_query', JSON.stringify(query));

    navigate('/searchedProducts');
    // console.log(response);
  }

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search for products"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-2/3 lg:w-1/2"
      />
    </form>
  );
}

export default Searchbar;
