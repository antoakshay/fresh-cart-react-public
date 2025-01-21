import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import { getFruits, getProductCount } from '../../../services/apiProducts';
import Fruititems from './Fruititems';
import { useEffect, useState } from 'react';
import Login from '../../../ui/Login';
import { getCartDetails } from '../../Cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Spinner from '../../../ui/Spinner';

// export async function loader() {
//   const lists = await getFruits();
//   // console.log(lists);
//   return lists;
// }

function Fruitslists() {
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  // const menu = useLoaderData();
  const navigation = useNavigation();

  function handlePageChange(data) {
    setPage(data.selected + 1);
  }

  useEffect(() => {
    const getProductCountNumber = async () => {
      try {
        const response = await getProductCount('vegetable');
        console.log(response);
        const productCount = response.data;
        setTotalPage(Math.ceil(productCount / 10));
      } catch (err) {
        console.log(err);
      }
    };

    getProductCountNumber();
  }, []);

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        const response = await getFruits(page);
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getProducts();
  }, [page]);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

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

  // console.log(menu.data);
  // const parsedMenu =  JSON.parse(menu);
  return (
    <div className="flex min-h-screen w-full flex-col justify-between">
      <ul className="w-full space-y-4 divide-y divide-gray-500 px-4">
        {products.map((fruit) => (
          <Fruititems fruit={fruit} key={fruit._id}></Fruititems>
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

export default Fruitslists;
