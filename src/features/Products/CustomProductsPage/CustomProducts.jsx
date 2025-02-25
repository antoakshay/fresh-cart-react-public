import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  getFruits,
  getProductCount,
  getProductForId,
} from '../../../services/apiProducts';
import { useSelector } from 'react-redux';
import Spinner from '../../../ui/Spinner';
import ReactPaginate from 'react-paginate';
import CustomProductItem from './CustomProductItem';

function CustomProducts() {
  const { id } = useParams();
  const { pageNumber } = useParams();
  // console.log(pageNumber);

  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState();
  const [localId, setLocalId] = useState();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  // Setting the page number from the params
  useEffect(() => {
    setLocalId(id);
    setPage(pageNumber);
  }, [id, pageNumber]);

  // Handling the page changes here..
  function handlePageChange(data) {
    // console.log(data.selected);
    // !! The data.selected is a zero based index
    const newPage = data.selected + 1;
    // !! Disabling the setPage here as it causes a render before navigating to the new page
    // setPage(newPage);
    // console.log(newPage);
    navigate(`/products/${id}/page/${parseInt(newPage)}`);
  }

  useEffect(() => {
    const getProductCountNumber = async () => {
      if (isAuthenticated) {
        try {
          setLoading(true);
          const response = await getProductCount(id);
          console.log(response);
          const productCount = response.data;
          setTotalPage(Math.ceil(productCount / 10));
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    };

    getProductCountNumber();
  }, [id, isAuthenticated]);

  useEffect(() => {
    // !! JUST TO PREVENT ANY UNWANTED API CALLS
    if (!localId || !page) return;
    async function getProducts() {
      if (isAuthenticated) {
        try {
          setLoading(true);
          const response = await getProductForId(page, localId);
          console.log(response.data);
          setProducts(response.data);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    }
    getProducts();
  }, [localId, isAuthenticated, page]);

  const isCartLoading = useSelector((state) => state.cart.loading);

  //!! Redirecting to login page if user is NOT authenticated
  useEffect(() => {
    // console.log(isAuthenticated);
    if (!isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // !! Just a additional measure to prevent rendering the authorized routes
  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return <Spinner />;
  }

  /*  if (isCartLoading) {
    return <Spinner />;
  } */

  return (
    <div className="flex min-h-screen w-full flex-col justify-between bg-gray text-white">
      <ul className="w-full space-y-4 divide-y divide-gray-700 px-4">
        {products.map((product) => (
          <CustomProductItem product={product} key={product._id} />
        ))}
      </ul>
      <div className="mt-auto flex justify-center pb-4">
        <ReactPaginate
          onPageChange={handlePageChange}
          pageCount={totalPage}
          // !! 0 based index, thats why -1 here
          // !! Force the active page to be index 0 (first page)
          forcePage={pageNumber - 1}
          breakLabel="..."
          containerClassName="flex justify-center items-center mt-4 space-x-2"
          pageClassName="px-3 py-1 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-800 transition"
          pageLinkClassName="text-gray-300"
          activeClassName="bg-lime-500 text-black"
          disabledClassName="text-gray-600 cursor-not-allowed"
          previousClassName="px-3 py-1 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-800 transition"
          nextClassName="px-3 py-1 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-800 transition"
        />
      </div>
    </div>
  );

}

export default CustomProducts;
