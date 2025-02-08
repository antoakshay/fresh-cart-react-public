import { useSearchContext } from '../../SearchContextApi';

function TrackOrderDetails() {
  const { trackOrder } = useSearchContext();
  const {
    addressLine1,
    addressLine2,
    city,
    orderDate,
    orderId,
    orderStatus,
    phoneNumber,
    pincode,
    products,
    totalPrice,
    totalQuantity,
  } = trackOrder;

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-900 p-4">
      <div className="w-full max-w-4xl rounded-lg bg-gray-800 p-6 text-gray-100 shadow-lg">
        {/* Order Header */}
        <div className="mb-6 border-b border-gray-700 pb-4">
          <h1 className="mb-2 text-2xl font-bold">Order #{orderId}</h1>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Order Date: {orderDate}</p>
            <span
              className={`rounded-full px-3 py-1 ${orderStatus === 'delivered' ? 'bg-green-600' : 'bg-yellow-600'} text-sm`}
            >
              {orderStatus}
            </span>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-gray-700 p-4">
            <h2 className="mb-3 text-lg font-semibold">Shipping Address</h2>
            <p className="text-gray-300">{addressLine1}</p>
            {addressLine2 && <p className="text-gray-300">{addressLine2}</p>}
            <p className="text-gray-300">
              {city} - {pincode}
            </p>
            <p className="mt-2 text-gray-300">Phone: {phoneNumber}</p>
          </div>

          <div className="rounded-lg bg-gray-700 p-4">
            <h2 className="mb-3 text-lg font-semibold">Order Summary</h2>
            <div className="space-y-2">
              <p className="flex justify-between text-gray-300">
                <span>Total Items:</span>
                <span>{totalQuantity}</span>
              </p>
              <p className="flex justify-between font-medium text-gray-300">
                <span>Total Amount:</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-hidden rounded-lg bg-gray-700">
          <h2 className="border-b border-gray-600 p-4 text-lg font-semibold">
            Products
          </h2>
          <div className="p-4">
            <div className="mb-3 grid grid-cols-3 gap-4 font-medium text-gray-300">
              <div>Product</div>
              <div>Quantity</div>
              <div>Price</div>
            </div>
            {products.map((product, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 border-b border-gray-600 py-3 last:border-0"
              >
                <div className="truncate">{product.product.name}</div>
                <div>{product.quantity}</div>
                <div>${product.totalPriceInd.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Footer */}
        <div className="mt-6 text-center text-sm text-gray-400">
          Need help? Contact our support team
        </div>
      </div>
    </div>
  );
}

export default TrackOrderDetails;
