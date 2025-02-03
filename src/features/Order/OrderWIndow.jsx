import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Form,
  redirect,
  replace,
  useActionData,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { placeOrder } from '../../services/apiPlaceOrder';

function OrderWindow() {
  // !! TO-DO !!
  // !! Implement a useMutation hook handle the form submissions API CALLS

  const [loading, setLoading] = useState(false);
  const action = useLocation();
  useEffect(() => {
    console.log(action);
  }, [action]);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
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
    setLoading(true);
    const placeNewOrder = await placeOrder(
      addressLine1,
      addressLine2,
      city,
      pincode,
      phoneNumber,
    );
    navigate('/order/confirmation', { replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-6">
      <form
        className="w-full max-w-lg space-y-6 rounded-lg bg-white p-8 shadow-lg"
        onSubmit={(event) => {
          event.preventDefault();
          handlePlaceOrder(event);
        }}
        // method="POST"
        // action="/order"
      >
        <h2 className="text-center text-2xl font-semibold text-gray-800">
          Order Details
        </h2>

        <div>
          <label
            htmlFor="addressLine1"
            className="block text-sm font-medium text-gray-700"
          >
            Address Line 1:
          </label>
          <input
            type="text"
            // id="addressLine1"
            name="addressLine1"
            placeholder="e.g. 456 Oak Avenue, Suite 7C"
            required
            className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="addressLine2"
            className="block text-sm font-medium text-gray-700"
          >
            Address Line 2:
          </label>
          <input
            type="text"
            // id="addressLine2"
            name="addressLine2"
            placeholder="e.g. Next to Riverbank Park"
            required
            className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City:
          </label>
          <input
            type="text"
            // id="city"
            name="city"
            placeholder="e.g. Lakeside City"
            required
            className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="pincode"
            className="block text-sm font-medium text-gray-700"
          >
            Pincode:
          </label>
          <input
            type="text"
            // id="pincode"
            name="pincode"
            placeholder="e.g. 67890"
            required
            className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number:
          </label>
          <input
            type="tel"
            // id="phoneNumber"
            name="phoneNumber"
            placeholder="e.g. +1234567890"
            required
            className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 py-3 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
            disabled={loading}
          >
            PlaceOrder
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
