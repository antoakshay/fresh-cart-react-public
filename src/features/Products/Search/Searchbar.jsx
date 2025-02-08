import { useEffect, useState } from 'react';
import { findProducts } from '../../../services/apiSearchBar';
import { redirect, replace, useNavigate } from 'react-router-dom';
import { useSearchContext } from '../../../SearchContextApi';
import { useMutation } from '@tanstack/react-query';
import Spinner from '../../../ui/Spinner';

function Searchbar() {
  const { query, setQuery } = useSearchContext();
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState();

  const navigate = useNavigate();

  async function handleSearch(event) {
    event.preventDefault();
    if (!query) return alert('Please enter a query!');
    if (query.length < 3) return alert('Please input more than 3 characters');

    // const response = await findProducts(query);
    // if (!response) return alert('No results found!');
    try {
      setLoading(true);
      // sessionStorage.setItem('search_product_query', JSON.stringify(query));

      navigate(`/searchedProducts/query/${query}/page/${1}`);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
    // console.log(response);
  }

  if (loading) {
    return <Spinner />;
  }

 return (
   <form onSubmit={handleSearch} className="flex items-center gap-2">
     <input
       type="text"
       placeholder="Search for products"
       value={query}
       onChange={(e) => setQuery(e.target.value)}
       className="flex-1 rounded-lg border border-gray-600 bg-gray-900 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500"
     />
     {query.length > 3 ? (
       <button
         type="submit"
         className={`rounded-lg px-4 py-2 text-white hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 ${disable ? 'cursor-not-allowed bg-gray-400' : 'bg-lime-500'}`}
         style={{ height: '100%' }}
         // disabled={disable}
       >
         Search
       </button>
     ) : null}
   </form>
 );

}

export default Searchbar;
