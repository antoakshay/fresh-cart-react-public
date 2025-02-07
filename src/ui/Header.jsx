import { useDispatch, useSelector } from 'react-redux';
import { Link, redirect, useNavigate } from 'react-router-dom';
// import { getTotalCartQuantity } from '../features/Cart/cartSlice';
import Cartoverview from '../features/Cart/Cartoverview';
import { useEffect } from 'react';
import { logoutUser } from '../features/User/userSlice';
import { persistor } from '../store.js';
import { clearCart } from '../features/Cart/cartSlice.js';
import { useSearchContext } from '../SearchContextApi.jsx';
import User from './User.jsx';

function Header() {
  // js reducer() used in cartSlice.js file to compute the total quantity/
  // const totalCartQuantity = useSelector(getTotalCartQuantity);
  // const isAdded = totalCartQuantity > 0;
  const { query, setQuery } = useSearchContext();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearPersistedData = () => {
    persistor
      .purge()
      .then(() => {
        console.log('Redux Persist data cleared!');
      })
      .catch((err) => {
        console.error('Error clearing Redux Persist data:', err);
      });
  };

  async function handleLogOut() {
    dispatch(logoutUser());
    clearPersistedData();
    localStorage.removeItem('persist:user');
    dispatch(clearCart());
    sessionStorage.clear();
    setQuery('');
  }

  return (
    <header className="flex items-center justify-between border-b-2 border-stone-500 bg-lime-700 px-4 py-3 uppercase sm:px-6">
      <Link to="/home" className="tracking-widest text-white">
        Fresh Cart🍇
      </Link>

      <div className="flex items-center gap-4">
        {isAuthenticated && (
          <Link to="/user" className="tracking-widest">
            <div className="ml-3">
              <User />
            </div>
          </Link>
        )}
        {isAuthenticated /*  && isAdded */ && <Cartoverview />}
        {isAuthenticated ? (
          <Link to="/products" className="text-sm text-white">
            Products
          </Link>
        ) : null}
        {isAuthenticated ? (
          <button className="text-sm text-white" onClick={() => handleLogOut()}>
            Log-Out
          </button>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
