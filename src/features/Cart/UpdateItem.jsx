import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateItemQuantity } from './cartSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function UpdateItem({ id, currentQuantity }) {
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(id);
  }, [id]);
  const isSelected = useSelector((state) =>
    state.cart.items.some((item) => item._id === id),
  );
  useEffect(() => {
    console.log(isSelected);
  }, [isSelected]);

  const cartLoadingState = useSelector((state) => state.cart.loading);
  return (
    <div className="flex items-center gap-2 md:gap-3">
      {cartLoadingState && isSelected ? (
        'Loading'
      ) : (
        <>
          <Button
            type="round"
            onClick={() =>
              dispatch(updateItemQuantity({ productId: id, quantity: -1 }))
            }
          >
            -
          </Button>
          <span className="text-sm font-medium">{currentQuantity}</span>
          <Button
            type="round"
            onClick={() =>
              dispatch(updateItemQuantity({ productId: id, quantity: 1 }))
            }
          >
            +
          </Button>
        </>
      )}
    </div>
  );
}

export default UpdateItem;
