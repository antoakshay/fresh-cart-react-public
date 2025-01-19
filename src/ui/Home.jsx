import { useSelector } from 'react-redux';
import Searchbar from '../features/Products/Search/Searchbar';
import Login from './Login';
import { useEffect } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';

function Home() {
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
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-lg bg-lime-300 p-6 text-center shadow-lg outline outline-2 outline-lime-500">
        <p className="mt-4 py-6 text-lg">Welcome to Fresh Cart</p>
        <Searchbar />
      </div>
    </div>
  );
}

export default Home;
