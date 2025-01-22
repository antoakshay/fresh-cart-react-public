import { useEffect, useState } from 'react';
import { findProducts } from '../../../services/apiSearchBar';
import { redirect, replace, useNavigate } from 'react-router-dom';
import { useSearchContext } from '../../../SearchContextApi';

function Searchbar() {
  const { query, setQuery } = useSearchContext();
  const [disable, setDisable] = useState(true);

  const navigate = useNavigate();

  // if (query.length > 3) setDisable(false);

  async function handleSearch(event) {
    event.preventDefault();
    if (!query) return alert('Do I look like a mind reader? TYPE SOMETHING!');
    if (query.length < 3) return alert('Please input more than 3 characters');

    const response = await findProducts(query);

    if (!response) return alert('No results found!');

    sessionStorage.setItem('search_product_query', JSON.stringify(query));

    navigate('/searchedProducts');
    // console.log(response);
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search for products"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className={`rounded-lg px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${disable ? 'cursor-not-allowed bg-gray-400' : 'bg-blue-500'}`}
        style={{ height: '100%' }}
        disabled={disable}
      >
        Search
      </button>
    </form>
  );
}

export default Searchbar;
