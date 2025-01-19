import { useEffect, useState } from 'react';
import { useSearchContext } from '../../SearchContextApi';
import SearchItems from './SearchItems';
import { useDispatch, useSelector } from 'react-redux';
import { getCartDetails } from '../../services/apiGetCart';
import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import { findProducts } from '../../services/apiSearchBar';

export async function loader() {
  const query = JSON.parse(sessionStorage.getItem('search_product_query'));
  // console.log(query);
  const searchedData = await findProducts(query);
  // console.log(searchedData.data);
  return searchedData.data;
}

function SearchedProducts() {
  const loaderData = useLoaderData();

  const navigate = useNavigate();


  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  //!! Redirecting to login page if user is NOT authenticated
  useEffect(() => {
    // console.log(isAuthenticated);
    if (!isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }



  if (loaderData.length === 0) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        Search For Something! From the HomePage
      </div>
    );
  }


  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <ul className="w-full space-y-4 divide-y divide-gray-500 px-4">
        {loaderData.map((product) => (
          <SearchItems product={product} key={product._id}></SearchItems>
        ))}
      </ul>
    </div>
  );
}

export default SearchedProducts;
