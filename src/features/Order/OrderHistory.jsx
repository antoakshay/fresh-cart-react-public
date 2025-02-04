import { useEffect, useState } from 'react';
import { getOrderHistory } from '../../services/apiGetOrderHistory';
import Spinner from '../../ui/Spinner';
import { useParams } from 'react-router-dom';

function OrderHistory() {
  const [loading, setLoading] = useState();
  const { sortNumber } = useParams();
  useEffect(() => {
    async function getUserOrderHistory() {
      try {
        setLoading(true);
        const response = await getOrderHistory(sortNumber);
        console.log(response.data);
      } catch (err) {
        console.log(err.response);
      } finally {
        setLoading(false);
      }
    }
    getUserOrderHistory();
  }, [sortNumber]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="flex min-h-screen items-center justify-center py-6"></div>
  );
}

export default OrderHistory;
