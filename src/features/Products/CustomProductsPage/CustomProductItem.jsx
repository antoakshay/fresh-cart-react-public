import { useDispatch, useSelector } from 'react-redux';
import { updateItemQuantity } from '../../Cart/cartSlice';
import UpdateItem from '../../Cart/UpdateItem';
import { useState } from 'react';
import Spinner from '../../../ui/Spinner';
import Loader from '../../../ui/Loading';
import { useSearchContext } from '../../../SearchContextApi';
import { Button } from '@mui/material';


function CustomProductItem({ product }) {
  const { _id, name, price, soldOut } = product;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const [deleteLoading, setDeleteLoading] = useState();
  const { updateQtyLoading } = useSearchContext();

  // Looking if the product is already in the cart
  const itemInCart = useSelector((state) =>
    state.cart.items?.some((item) => item.product._id === _id),
  );

  // Selecting the productQuantity of the updated Item
  const productQuantity = useSelector((state) => {
    // console.log([...state.cart.items]);
    // console.log(_id);
    const item = state.cart.items.find((item) => item.product._id === _id);
    // console.log(item);
    return item ? item.quantity : 0;
  });

  async function handleAddToCart() {
    try {
      setLoading(true);
      await dispatch(
        updateItemQuantity({
          productId: _id,
          quantity: 1,
        }),
      );
    } catch {
      alert('Error updating quantity');
    } finally {
      setLoading(false);
    }
  }
  async function handleDeleteProduct() {
    // console.log(id);
    try {
      setDeleteLoading(true);
      await dispatch(
        updateItemQuantity({ productId: _id, quantity: -productQuantity }),
      );
    } catch (e) {
      alert('Error deleting product');
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <div className="flex-auto items-center justify-center py-6">
      <ul className="grid grid-cols-5 gap-4 border border-gray-400 p-4">
        <li className="break-words">{name}</li>
        {!soldOut && <li className="break-words">{price}$ </li>}
        <li className="break-words">
          {!soldOut ? 'Available' : 'Out of stock'}
        </li>
        {!soldOut && !itemInCart && (
          <>
            <button
              onClick={handleAddToCart}
              className="rounded-md bg-lime-500 px-3 py-1 text-white"
            >
              {loading ? <Loader /> : 'Add to Cart'}
            </button>
            <div>{itemInCart ? `Quantity: ${productQuantity}` : null}</div>
          </>
        )}
        {itemInCart && (
          <>
            {deleteLoading ? null : (
              <UpdateItem currentQuantity={productQuantity} id={_id} />
            )}
            <Button
              className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={() => handleDeleteProduct()}
              disabled={updateQtyLoading}
            >
              {deleteLoading ? <Loader /> : 'Delete'}
            </Button>
          </>
        )}
      </ul>
    </div>
  );
}

export default CustomProductItem;
