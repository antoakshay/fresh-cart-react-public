import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../Cart/cartSlice';
import { getOrderDetails } from '../../services/apiGetOrderDetails';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export async function loader() {
  const order = await getOrderDetails();
  return order;
}

function OrderDetails() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  const loader = useLoaderData();
  console.log(loader);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return null;
  }

  function clearCartState() {
    dispatch(clearCart());
  }
  clearCartState();

  return (
    <div className="flex min-h-screen items-center justify-center py-6">
      <div className="max-w-md rounded-lg bg-gray p-8 text-center shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-green-400">
          Order Placed Successfully! 😎
        </h1>
        <p className="mb-2 text-white  ">
          Your order will be delivered soon. 🚚
        </p>
        <p className="mb-2 text-white">
          A summary has been sent to your email.
        </p>
        <p className="mt-4 font-semibold text-white">
          <span className="text-white">Order ID:</span> {loader.data.orderId}
        </p>
        <p className="mt-6 text-sm text-gray-300">
          Use your Order ID to track the status of your delivery. Thank you for
          shopping with us!
        </p>
      </div>
    </div>
  );
}

export default OrderDetails;
