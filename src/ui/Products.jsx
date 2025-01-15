import { Link, useNavigate } from 'react-router-dom';
import Fruit from '../features/Products/Fruits/Fruit';
import Login from './Login';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function Products() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="">
      <div className="aspect-square flex-auto items-center justify-center rounded-lg border border-gray-200 bg-stone-200 p-4 shadow-md">
        <Link to="/products/fruits">
          <Fruit />
        </Link>
      </div>
    </div>
  );
}

export default Products;
