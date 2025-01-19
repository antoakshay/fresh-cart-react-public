import { Outlet, useNavigation } from 'react-router-dom';
import Container from '@mui/material/Container';
import Header from './Header';
import Footer from './Footer';
import Cartoverview from '../features/Cart/Cartoverview';
import { useDispatch } from 'react-redux';
// import { getCart, getTotalCartQuantity } from '../features/Cart/cartSlice';
import CartBill from '../features/Cart/CartBill';

function Applayout() {
  const navigation = useNavigation();

  return (
    <div>
      <Header />
      {navigation.state === 'loading' ? 'Loading...' : <Outlet />}
      {/* <Cartoverview/> */}

      <Footer />
    </div>
  );
}

export default Applayout;
