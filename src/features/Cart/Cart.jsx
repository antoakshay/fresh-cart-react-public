import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
// import { getCart, getTotalCartPrice } from './cartSlice';
import CartBill from './CartBill';
import Login from '../../ui/Login';
import { useEffect } from 'react';
import { getCartDetails } from '../../features/Cart/cartSlice';
import Spinner from '../../ui/Spinner';

// export async function loader() {
//   const cart = await getCartDetails();
//   return cart;
// }
function Cart() {
  // const cart = useLoaderData();
  // useEffect(() => {
  //   if (cart) console.log(cart);
  // }, [cart]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  // console.log(result);
  const cartState = useSelector((state) => state.cart);
  let finalBill = cartState.totalPrice;

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const isCartLoading = useSelector((state) => state.cart.loading);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true });
      return;
    }
  }, [isAuthenticated, navigate]);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCartDetails());
    }
  }, [dispatch,isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  // if (isCartLoading) {
  //   return <Spinner />;
  // }

  return (
    <div className="min-h-screen flex-auto items-center justify-center">
      <button onClick={() => navigate('/products')}> Back to products</button>
      {/* <h2 className="mt-7 text-xl font-semibold">Your cart</h2> */}
      {cartState.items /* cart.products */
        .map((item) => (
          <CartItem item={item} key={item._id} finalBill={finalBill} />
        ))}
      <CartBill totalCartPrice={finalBill} />
    </div>
  );
}

export default Cart;
