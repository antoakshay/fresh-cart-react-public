import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import Header from './Header';
import Footer from './Footer';
import Cartoverview from '../features/Cart/Cartoverview';
import { useDispatch } from 'react-redux';
// import { getCart, getTotalCartQuantity } from '../features/Cart/cartSlice';
import CartBill from '../features/Cart/CartBill';

function Applayout() {

  // console.log(isCart);
  return (
    <div >
      <Header />
      <Outlet />
      {/* <Cartoverview/> */}
      
      <Footer />
    </div>
  );
}

export default Applayout;
