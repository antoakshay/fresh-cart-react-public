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

  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  function handlePageChange(data) {
    setPage(data.selected + 1);
  }

  useEffect(() => {
    const getProductCountNumber = async () => {
      if (isAuthenticated) {
        try {
          const response = await getProductCount(id);
          console.log(response);
          const productCount = response.data;
          setTotalPage(Math.ceil(productCount / 10));
        } catch (err) {
          console.log(err);
        }
      }
    };

    getProductCountNumber();
  }, [id, isAuthenticated]);

  useEffect(() => {
    async function getProducts() {
      if (isAuthenticated) {
        try {
          setLoading(true);
          const response = await getProductForId(page, id);
          console.log(response.data);
          setProducts(response.data);
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      }
    }
    getProducts();
  }, [id, isAuthenticated, page]);

  const navigate = useNavigate();

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

  if (isCartLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col justify-between">
      <ul className="w-full space-y-4 divide-y divide-gray-500 px-4">
        {products.map((product) => (
          <CustomProductItem product={product} key={product._id} />
        ))}
      </ul>
      <div className="mt-auto flex justify-center pb-4">
        <ReactPaginate
          onPageChange={handlePageChange}
          pageCount={totalPage}
          // !! 0 based index, thats why -1 here
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
    </div>
  );
}

export default CustomProducts;
