import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { redirect, useNavigate } from 'react-router-dom';
import { placeOrder } from '../../services/apiPlaceOrder';
import { useMutation } from '@tanstack/react-query';

function OrderWindow() {
  // !! TO-DO !!
  // !! Implement a useMutation hook handle the form submissions API CALLS

  const [loading, setLoading] = useState(false);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async ({
      addressLine1,
      addressLine2,
      city,
      pincode,
      phoneNumber,
    }) => {
      return await placeOrder({
        addressLine1,
        addressLine2,
        city,
        pincode,
        phoneNumber,
      });
    },
    onSuccess: (data) => {
      navigate('/order/confirmation', { replace: true });
      console.log('Success', data);
    },
    onError: (error) => {
      // alert(error);
      navigate('/order/Error');
    },
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true });
      return;
    }
  }, [isAuthenticated, navigate]);
  if (!isAuthenticated) {
    return null;
  }
  async function handlePlaceOrder(event) {
    // event.preventDefault();
    const form = event.target;
    const addressLine1 = form.addressLine1.value;
    const addressLine2 = form.addressLine2.value;
    const city = form.city.value;
    const pincode = form.pincode.value;
    const phoneNumber = form.phoneNumber.value;
    try {
      setLoading(true);
      const placeNewOrder = await mutation.mutateAsync({
        addressLine1,
        addressLine2,
        city,
        pincode,
        phoneNumber,
      });
    } catch (err) {
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center py-6">
      <form
        className="w-full max-w-lg space-y-6 rounded-lg bg-gray-800 p-8 shadow-lg"
        onSubmit={(event) => {
          event.preventDefault();
          handlePlaceOrder(event);
        }}
      >
        <h2 className="text-center text-2xl font-semibold text-white">
          Order Details
        </h2>

        <div>
          <label
            htmlFor="addressLine1"
            className="block text-sm font-medium text-gray-300"
          >
            Address Line 1:
          </label>
          <input
            type="text"
            name="addressLine1"
            placeholder="e.g. 456 Oak Avenue, Suite 7C"
            required
            className="mt-1 w-full rounded-md border border-gray-600 bg-gray-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label
            htmlFor="addressLine2"
            className="block text-sm font-medium text-gray-300"
          >
            Address Line 2:
          </label>
          <input
            type="text"
            name="addressLine2"
            placeholder="e.g. Next to Riverbank Park"
            required
            className="mt-1 w-full rounded-md border border-gray-600 bg-gray-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-300"
          >
            City:
          </label>
          <input
            type="text"
            name="city"
            placeholder="e.g. Lakeside City"
            required
            className="mt-1 w-full rounded-md border border-gray-600 bg-gray-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label
            htmlFor="pincode"
            className="block text-sm font-medium text-gray-300"
          >
            Pincode:
          </label>
          <input
            type="text"
            name="pincode"
            placeholder="e.g. 67890"
            required
            className="mt-1 w-full rounded-md border border-gray-600 bg-gray-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-300"
          >
            Phone Number:
          </label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="e.g. +1234567890"
            required
            className="mt-1 w-full rounded-md border border-gray-600 bg-gray-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-3 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-500"
            disabled={loading}
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  const order = await placeOrder(data);
  console.log(order);
  return redirect('/order/confirmation');
}

export default OrderWindow;
