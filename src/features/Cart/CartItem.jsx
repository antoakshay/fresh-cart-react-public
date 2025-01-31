import { useDispatch, useSelector } from 'react-redux';
// import { getCurrentQuantityById, getTotalCartPrice } from './cartSlice';
import CartBill from './CartBill';
import UpdateItem from './UpdateItem';
import { useEffect, useState } from 'react';
import { updateItemQuantity } from './cartSlice';
import Loader from '../../ui/Loading';
import { Button } from '@mui/material';
import { useSearchContext } from '../../SearchContextApi';

function CartItem({ item, finalBill }) {
  // console.log(item);
  const { /* _id, */ price, /* name, */ /* totalPrice, */ quantity } = item;
  let _id = item.product._id;
  // console.log(_id);
  // console.log(item.product.name);
  let name = item.product.name;
  let totalPrice = item.totalPriceInd;

  const { updateQtyLoading } = useSearchContext();
  const [deleteLoading, setDeleteLoading] = useState();

  const dispatch = useDispatch();

  // Selecting the productQuantity of the updated Item
  const productQuantity = useSelector((state) => {
    // console.log([...state.cart.items]);
    // console.log(_id);
    const item = state.cart.items.find((item) => {
      // console.log(item.product._id);
      return item.product._id === _id;
    });
    // console.log(item);
    return item ? item.quantity : 0;
  });

  async function handleDeleteProduct() {
    try {
      setDeleteLoading(true);
      await dispatch(
        updateItemQuantity({ productId: _id, quantity: -productQuantity }),
      );
    } catch (err) {
      alert('Something went wrong while deleting the product');
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <>
      <div className="flex-auto items-center justify-center py-6">
        <li className="flex-auto items-center py-3 sm:flex sm:justify-between">
          <p className="mb-1 sm:mb-0">
            {quantity}&times; {name}
          </p>
          <p className="mb-1 sm:mb-0">{totalPrice} $</p>

          {productQuantity > 0 && (
            <>
              <UpdateItem currentQuantity={productQuantity} id={_id} />
              <Button
                className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() => handleDeleteProduct()}
                disabled={updateQtyLoading}
              >
                {deleteLoading ? <Loader /> : 'Delete'}
              </Button>
            </>
          )}
        </li>
      </div>
    </>
  );
}

export default CartItem;
