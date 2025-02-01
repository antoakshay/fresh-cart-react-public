import {
  Link,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import Fruit from '../features/Products/Fruits/Fruit';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCategoryName } from '../services/apiGetCategory';
import CustomHeader from './CustomHeader';
import Spinner from './Spinner';
import { useSearchContext } from '../SearchContextApi';

// export async function loader() {
//   const response = await getCategoryName();
//   return response;
// }

function Products() {
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  // const categories = useLoaderData();
  // console.log(categories);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    async function getCategory() {
      if (isAuthenticated) {
        try {
          setLoading(true);
          const response = await getCategoryName();
          setCategories(response);
          // setLoading(false);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    }

    getCategory();
  }, [isAuthenticated]);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  if (!isAuthenticated) {
    return null;
  }
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="">
      <div className="aspect-square flex-auto items-center justify-center rounded-lg border border-gray-200 bg-stone-200 p-4 shadow-md">
        {/* <Link to="/products/fruits">
          <Fruit />
        </Link> */}
        <div className="grid grid-cols-3 gap-4">
          {categories?.map((category, index) => (
            <>
              <Link to={`/products/${category.category}/page/${1}`}>
                <CustomHeader key={index} category={category.category} />
              </Link>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
