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
  useEffect(() => {
    // console.log(id);
  }, [id]);
  const isSelected = useSelector((state) =>
    state.cart.items.some((item) => item._id === id),
  );
  useEffect(() => {
    console.log(isSelected);
  }, [isSelected]);

  async function handleClick() {
    try {
      setLoading(true);
      setUpdateQtyLoading(true);
      await dispatch(updateItemQuantity({ productId: id, quantity: -1 }));
    } catch (e) {
      setLoading(false);
      alert('Error updating quantity');
      setUpdateQtyLoading(false);
    } finally {
      setLoading(false);
      setUpdateQtyLoading(false);
    }
  }

  async function handleClick2() {
    try {
      setUpdateQtyLoading(true);
      setLoading(true);
      await dispatch(updateItemQuantity({ productId: id, quantity: 1 }));
    } catch (e) {
      setLoading(false);
      alert('Error updating quantity');
      setUpdateQtyLoading(false);
    } finally {
      setLoading(false);
      setUpdateQtyLoading(false);
    }
  }

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  const cartLoadingState = useSelector((state) => state.cart.loading);
  return (
    <div className="flex items-center gap-2 md:gap-3">
      {
        /* cartLoadingState */ /* && isSelected */ /* updateQtyLoading */ loading ? (
          <Loader />
        ) : (
          <>
            <Button
              type="round"
              onClick={
                () => handleClick()
                // dispatch(updateItemQuantity({ productId: id, quantity: -1 }))
              }
            >
              -
            </Button>
            <span className="text-sm font-medium">{currentQuantity}</span>
            <Button
              type="round"
              onClick={
                () => handleClick2()
                // dispatch(updateItemQuantity({ productId: id, quantity: 1 }))
              }
            >
              +
            </Button>
          </>
        )
      }
    </div>
  );
}

export default UpdateItem;
