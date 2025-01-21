import { useDispatch, useSelector } from 'react-redux';
import { Link, redirect, useNavigate } from 'react-router-dom';
// import { getTotalCartQuantity } from '../features/Cart/cartSlice';
import Cartoverview from '../features/Cart/Cartoverview';
import { useEffect } from 'react';
import { logoutUser } from '../features/User/userSlice';
import { persistor } from '../store.js';
import { clearCart } from '../features/Cart/cartSlice.js';
import { useSearchContext } from '../SearchContextApi.jsx';

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
    dispatch(clearCart());
    sessionStorage.clear();
    setQuery('');
  }

  return (
    <header className="flex items-center justify-between border-b-2 border-stone-500 bg-lime-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/home" className="tracking-widest">
        Fresh Cart🍇
      </Link>
      <div className="flex items-center gap-4">
        {isAuthenticated /*  && isAdded */ && <Cartoverview />}
        {isAuthenticated ? (
          <Link to="/products" className="text-sm">
            Products
          </Link>
        ) : null}
        {isAuthenticated ? (
          <button className="text-sm" onClick={() => handleLogOut()}>
            Log-Out
          </button>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
