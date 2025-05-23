import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { trackOrderCurrent } from '../../services/apiTrackOrder';
import { useSearchContext } from '../../SearchContextApi';
import Spinner from '../../ui/Spinner';

function UserPage() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const email = useSelector((state) => state.user.email);
  const name = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { trackOrder, setTrackOrder } = useSearchContext();
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (orderId) => {
      return await trackOrderCurrent(orderId);
    },
    onSuccess: async (data) => {
      // console.log('Success', data);
      console.log(data.data);
      setTrackOrder(data.data);
      navigate('/trackOrder');
    },
    onError: (error) => {
      alert('Something went wrong');
      //   navigate('/');
      //   console.log('Error', error);
    },
  });

  async function handleClick(event) {
    event.preventDefault();
    const form = event.target;
    const orderId = form.orderNumber.value;
    console.log(orderId);
    if (orderId.length < 4) return alert('Enter the  order number properly');
    try {
      setLoading(true);
      const response = await mutation.mutateAsync(orderId);
    } catch (e) {
      alert('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
        {/* Existing User Information Container */}
        <div className="rounded-2xl bg-black p-6 shadow-lg">
          <h1 className="mb-4 text-2xl font-semibold text-white">
            User Information
          </h1>
          <div className="mb-6 space-y-2">
            <p className="text-white">
              <span className="font-medium text-white">Name:</span> {name}
            </p>
            <p className="text-white">
              <span className="font-medium text-white">Email:</span> {email}
            </p>
          </div>
          <Link to="/orderHistory/sort/-1">
            <button className="mb-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-center font-medium text-white hover:bg-blue-600">
              Your Order History
            </button>
          </Link>
          <Link to="/updatePassword" className="tracking-widest">
            <button className="w-full rounded-lg bg-green-500 px-4 py-2 text-center font-medium text-white hover:bg-green-600">
              Update Password
            </button>
          </Link>
        </div>

        {/* New Track Order Container */}
        <div className="rounded-2xl bg-black p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Track Order
          </h2>
          <form onSubmit={handleClick} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Order Number
              </label>
              <input
                name="orderNumber"
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 bg-gray-600 p-3 text-sm text-gray-900 text-white focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your order number"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-orange-500 px-5 py-3 text-center text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300"
            >
              Track Package
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
