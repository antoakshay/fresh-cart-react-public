import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, updateItemQuantity } from '../Cart/cartSlice';
import UpdateItem from '../Cart/UpdateItem';
import { useSearchContext } from '../../SearchContextApi';
import { Button } from '@mui/material';
import { useState } from 'react';
import Loader from '../../ui/Loading';

function SearchItems({ product }) {
  const { _id, name, price, soldOut, totalPrice, quantity } = product;
  const { updateQtyLoading } = useSearchContext();
  const [deleteLoading, setDeleteLoading] = useState();
  const [loading, setLoading] = useState();

  const dispatch = useDispatch();

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
    } catch (err) {
      alert('Something went wrong while adding the product to cart');
    } finally {
      setLoading(false);
    }
  }
  async function handleDeleteProduct() {
    try {
      // console.log(id);
      setDeleteLoading(true);
      await dispatch(
        deleteProduct({ productId: _id/* , quantity: -productQuantity */ }),
      );
    } catch (err) {
      alert('Something went wrong while deleting the product');
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <div className="flex-auto items-center justify-center py-6">
      <ul className="grid grid-cols-5 gap-4 border border-gray-400 p-4">
        <li className="break-words">{name}</li>
        {!soldOut && <li className="break-words">{price} $ </li>}
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
              disabled={updateQtyLoading[_id]?.delete}
            >
              {deleteLoading ? <Loader /> : 'Delete'}
            </Button>
          </>
        )}
      </ul>
    </div>
  );
}

export default SearchItems;
