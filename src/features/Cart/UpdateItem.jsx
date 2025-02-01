import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateItemQuantity } from './cartSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../../ui/Spinner';
import Loader from '../../ui/Loading';
import { useSearchContext } from '../../SearchContextApi';

function UpdateItem({ id, currentQuantity }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { updateQtyLoading, setUpdateQtyLoading } = useSearchContext();

  async function handleClick(productId) {
    try {
      setLoading(true);
      // If you update the state without spreading prev, the new state object will
      // only contain the new key-value pair(current delete boolean for the selected productId).
      //  All the other key-value pairs (previous delete button states boolean)
      //  from the previous state will be lost.
      setUpdateQtyLoading((prev) => ({
        ...prev,
        // !! spreads the existing object for that product (prev[productId]) to copy its current properties.
        // !! To protect React's Immutability;
        [productId]: { ...prev[productId], delete: true },
      }));
      await dispatch(updateItemQuantity({ productId: id, quantity: -1 }));
    } catch (e) {
      setLoading(false);
      alert('Error updating quantity');
      setUpdateQtyLoading(false);
    } finally {
      setLoading(false);
      setUpdateQtyLoading((prev) => ({
        ...prev,
        [productId]: { ...prev[productId], delete: false },
      }));
    }
  }

  async function handleClick2(productId) {
    try {
      setUpdateQtyLoading((prev) => ({
        ...prev,
        // !! spreads the existing object for that product (prev[productId]) to copy its current properties.
        [productId]: { ...(prev[productId] || {}), delete: true },
      }));
      setLoading(true);
      await dispatch(updateItemQuantity({ productId: id, quantity: 1 }));
    } catch (e) {
      setLoading(false);
      alert('Error updating quantity');
      setUpdateQtyLoading(false);
    } finally {
      setLoading(false);
      setUpdateQtyLoading((prev) => ({
        ...prev,
        [productId]: { ...prev[productId], delete: false },
      }));
    }
  }

  const cartLoadingState = useSelector((state) => state.cart.loading);
  return (
    <div className="flex items-center gap-1 md:gap-2">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Button
            type="round"
            className="h-8 w-8 rounded-full p-2"
            onClick={(event) => handleClick(id)}
          >
            -
          </Button>
          <input
            value={currentQuantity}
            className="h-8 w-10 rounded-md border border-gray-300 bg-white text-center text-sm font-medium focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
      
          />
          <Button
            type="round"
            className="h-8 w-8 rounded-full p-2"
            onClick={() => handleClick2(id)}
          >
            +
          </Button>
        </>
      )}
    </div>
  );
}

export default UpdateItem;
