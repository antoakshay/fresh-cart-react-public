import { Outlet, useNavigation } from 'react-router-dom';
import Container from '@mui/material/Container';
import Header from './Header';
import Footer from './Footer';
import Cartoverview from '../features/Cart/Cartoverview';
import { useDispatch, useSelector } from 'react-redux';
// import { getCart, getTotalCartQuantity } from '../features/Cart/cartSlice';
import CartBill from '../features/Cart/CartBill';
import Spinner from './Spinner';

function Applayout() {
  const navigation = useNavigation();
  const userLoading = useSelector((state) => state.user.loading);

  if (userLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Header />
      {navigation.state === 'loading' ? <Spinner /> : <Outlet />}
      {/* <Cartoverview/> */}

      <Footer />
    </div>
  );
}

export default Applayout;
