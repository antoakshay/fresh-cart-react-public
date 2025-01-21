import { useEffect, useState } from 'react';
import { useSearchContext } from '../../SearchContextApi';
import SearchItems from './SearchItems';
import { useDispatch, useSelector } from 'react-redux';
import { getCartDetails } from '../../services/apiGetCart';
import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import { findProducts } from '../../services/apiSearchBar';
import { getProductCount } from '../../services/apiProducts';
import ReactPaginate from 'react-paginate';
import Spinner from '../../ui/Spinner';

export async function loader() {
  const query = JSON.parse(sessionStorage.getItem('search_product_query'));
  // console.log(query);
  const searchedData = await findProducts(query);
  // console.log(searchedData.data);
  return searchedData.data;
}

function SearchedProducts() {
  const loaderData = useLoaderData();
  // const { query } = useSearchContext();
  const query = JSON.parse(sessionStorage.getItem('search_product_query'));

  const [loading, setLoading] = useState(false);

  const [totalPage, setTotalPage] = useState();
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const isCartLoading = useSelector((state) => state.cart.loading);

  useEffect(() => {
    const getProductCountNumber = async () => {
      try {
        const response = await getProductCount(query);
        console.log(response);
        const productCount = response.data;
        setTotalPage(Math.ceil(productCount / 10));
      } catch (err) {
        console.log(err);
      }
    };

    getProductCountNumber();
  }, [query]);

  function handlePageChange(data) {
    setPage(data.selected + 1);
  }

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);

        const response = await findProducts(query, page);
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getProducts();
  }, [page, query]);

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

  if (isCartLoading) {
    return <Spinner />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col justify-between">
      <ul className="w-full space-y-4 divide-y divide-gray-500 px-4">
        {
          /* loaderData */ products.map((product) => (
            <SearchItems product={product} key={product._id}></SearchItems>
          ))
        }
      </ul>
      {totalPage > 1 ? (
        <div className="mt-auto flex justify-center pb-4">
          <ReactPaginate
            onPageChange={handlePageChange}
            pageCount={totalPage}
            forcePage={page - 1}
            breakLabel="..."
            containerClassName="flex justify-center items-center mt-4 space-x-2"
            pageClassName="px-3 py-1 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-200 transition"
            pageLinkClassName="text-gray-700"
            activeClassName="bg-blue-500 text-white"
            disabledClassName="text-gray-300 cursor-not-allowed"
            previousClassName="px-3 py-1 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-200 transition"
            nextClassName="px-3 py-1 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-200 transition"
          />
        </div>
      ) : null}
    </div>
  );
}

export default SearchedProducts;
