import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateItemQuantity } from './cartSlice';
import { useEffect } from 'react';

function UpdateItem({ id, currentQuantity }) {
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(id);
  }, [id]);
  return (
    <div className="flex items-center gap-2 md:gap-3">
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
    </div>
  );
}

export default UpdateItem;
