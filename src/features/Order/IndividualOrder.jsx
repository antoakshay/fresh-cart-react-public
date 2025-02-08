import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getIndividualOrder } from '../../services/apiGetOrderHistory';
import Spinner from '../../ui/Spinner';
import { useSelector } from 'react-redux';

function IndividualOrder() {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    async function getOrderDetails() {
      if (!orderId) return;
      try {
        setLoading(true);
        const response = await getIndividualOrder(orderId);
        console.log(response.data);
        setOrderDetails(response.data);
      } catch (e) {
        alert('Something went wrong');
      } finally {
        setLoading(false);
      }
    }
    getOrderDetails();
  }, [orderId]);

  const {
    addressLine1,
    addressLine2,
    city,
    orderDate,
    orderId: orderid,
    orderStatus,
    phoneNumber,
    pincode,
    totalPrice,
    totalQuantity,
  } = orderDetails;

  const { products } = orderDetails;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true });
      return;
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <Spinner />;
  }

  //   console.log(addressLine1)

  return (
    <div className="container mx-auto p-4">
      {/* Order Header */}
      <h1 className="mb-4 text-2xl font-bold text-white">Order Details</h1>

      {/* Order Summary */}
      <div className="mb-6 rounded bg-white p-6 shadow">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Order Information */}
          <div>
            <h2 className="mb-2 text-xl font-semibold">Order Information</h2>
            <p>
              <span className="font-medium">Order ID:</span> {orderid}
            </p>
            <p>
              <span className="font-medium">Order Date:</span> {orderDate}
            </p>
            <p>
              <span className="font-medium">Status:</span> {orderStatus}
            </p>
            <p>
              <span className="font-medium">Total Quantity:</span>{' '}
              {totalQuantity}
            </p>
            <p>
              <span className="font-medium">Total Price:</span> ${totalPrice}
            </p>
          </div>

          {/* Shipping Address */}
          <div>
            <h2 className="mb-2 text-xl font-semibold">Shipping Address</h2>
            <p>{addressLine1}</p>
            {addressLine2 && <p>{addressLine2}</p>}
            <p>
              {city} - {pincode}
            </p>
            <p>{phoneNumber}</p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="rounded bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Products</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {products?.map((item, index) => (
              <tr key={index}>
                <td className="whitespace-nowrap px-6 py-4">
                  {item.product?.name || 'N/A'}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{item.quantity}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  ${item.totalPriceInd}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IndividualOrder;
