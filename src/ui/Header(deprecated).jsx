import { useDispatch, useSelector } from 'react-redux';
import { Link, redirect, useNavigate } from 'react-router-dom';
// import { getTotalCartQuantity } from '../features/Cart/cartSlice';
import Cartoverview from '../features/Cart/Cartoverview';
import { useAuth } from '../../context/authenticationContext';
import { useEffect } from 'react';

function Header() {
  // js reducer() used in cartSlice.js file to compute the total quantity/
  // const totalCartQuantity = useSelector(getTotalCartQuantity);
  // const isAdded = totalCartQuantity > 0;
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // !! Deleting the "user" cookie
  async function handleLogOut() {
    function clearAllCookies() {
      // Get all cookies
      const cookies = document.cookie.split(';');

      // Loop through each cookie and delete it
      cookies.forEach((cookie) => {
        const cookieName = cookie.split('=')[0].trim();
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
      });
    }

    try {
      const response = await fetch(
        'https://192.168.1.36:7000/api/v1/users/logout',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response);
      // if (!response.ok) {
      //   throw new Error('Failed to log out');
      // }
      clearAllCookies();
      navigate('/', { replace: true });
    } catch (e) {
      throw new Error(e.message || 'Something went wrong');
    }
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
