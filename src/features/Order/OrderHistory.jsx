import { useEffect, useState } from 'react';
import { getOrderHistory } from '../../services/apiGetOrderHistory';
import Spinner from '../../ui/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import OrderItem from './OrderItem';
import { useSelector } from 'react-redux';

function OrderHistory() {
  const [loading, setLoading] = useState();
  const [orderResponse, setOrderResponse] = useState([]);
  const { sortNumber } = useParams();
  const [recent, setRecent] = useState(true);
  const [oldest, setOldest] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const navigate = useNavigate();

  function handleRecentClick() {
    navigate('/orderHistory/sort/-1');
  }

  function handleOldestClick() {
    navigate('/orderHistory/sort/1');
  }

  // !! For forcing the button selected animations to be in sync,
  // !! when using browser navigation
  useEffect(() => {
    if (sortNumber === '1') {
      setRecent(false);
      setOldest(true);
    } else if (sortNumber === '-1') {
      setRecent(true);
      setOldest(false);
    }
  }, [sortNumber]);

  useEffect(() => {
    async function getUserOrderHistory() {
      try {
        setLoading(true);
        const response = await getOrderHistory(sortNumber);
        console.log(response.data);
        setOrderResponse(response.data);
      } catch (err) {
        console.log(err.response);
      } finally {
        setLoading(false);
      }
    }
    getUserOrderHistory();
  }, [sortNumber]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true });
      return;
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-start py-6">
      <div className="mb-6 flex">
        <button
          onClick={handleRecentClick}
          type="button"
          className={`rounded-l-md border border-blue-600 px-4 py-2 transition-transform duration-200 focus:outline-none ${
            recent
              ? 'scale-105 bg-blue-600 text-white'
              : 'bg-gray text-blue-600 hover:bg-gray-500'
          }`}
        >
          Recent
        </button>
        <button
          onClick={handleOldestClick}
          type="button"
          className={`rounded-r-md border border-blue-600 px-4 py-2 transition-transform duration-200 focus:outline-none ${
            oldest
              ? 'scale-105 bg-blue-600 text-white'
              : 'bg-gray text-blue-600 hover:bg-gray-500'
          }`}
        >
          Oldest
        </button>
      </div>

      <div className="flex w-full flex-col items-center">
        {orderResponse.map((item) => (
          <OrderItem item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
