import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
// import { getCart, getTotalCartPrice } from './cartSlice';
import CartBill from './CartBill';
import Login from '../../ui/Login';
import { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState();
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
    async function cartDetails() {
      if (isAuthenticated) {
        try {
          setLoading(true);
          await dispatch(getCartDetails());
        } catch (err) {
          alert('Something Went please try again later');
        } finally {
          setLoading(false);
        }
      }
    }
    cartDetails();
  }, [dispatch, isAuthenticated]);

  const productSoldOut = useSelector((state) => {
    const product = state.cart.items.some((item) => {
      // console.log(item);
      return item.product.soldOut === true;
    });
    return product;
  });

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen flex-auto items-center justify-center">
      <button onClick={() => navigate('/products')} className='text-white'> Back to products</button>
      {/* <h2 className="mt-7 text-xl font-semibold">Your cart</h2> */}
      {cartState.items /* cart.products */
        .map((item) => (
          <CartItem
            item={item}
            key={item._id}
            finalBill={finalBill}
            soldOut={item.product.soldOut}
          />
        ))}
      <CartBill totalCartPrice={finalBill} soldOut={productSoldOut} />
    </div>
  );
}

export default Cart;
