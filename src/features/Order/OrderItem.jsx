import { Link } from 'react-router-dom';

function OrderItem({ item }) {
  const { orderDate, orderId, orderStatus } = item;
  const currentTime = new Date(orderDate);

  const currentOffset = currentTime.getTimezoneOffset();

  const ISTOffset = 330; // IST offset UTC +5:30

  const ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000,
  );

  //   console.log(ISTTime);

  //   console.log(orderDate, orderId, orderStatus);
  return (
    <Link className="my-2 w-full" to={`/orderHistory/orderId/${orderId}`}>
      <div className="my-2 w-full rounded-lg bg-gray p-4 shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Order #{orderId}</h2>
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              orderStatus === 'delivered'
                ? 'bg-green-500'
                : orderStatus === 'pending'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
            } text-white`}
          >
            {orderStatus}
          </span>
        </div>
        <p className="mt-2 text-white">
          Ordered on: {ISTTime.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}

export default OrderItem;
