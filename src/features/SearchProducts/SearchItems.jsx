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
        deleteProduct({ productId: _id /* , quantity: -productQuantity */ }),
      );
    } catch (err) {
      alert('Something went wrong while deleting the product');
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <ul className="space-y-4">
        {/* Grid Header */}
        <li className="hidden grid-cols-5 gap-4 px-4 py-2 font-medium text-white md:grid">
          <div className="col-span-2">Product</div>
          <div className="col-span-1">Price</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Actions</div>
        </li>

        {/* Product Item */}
        <li className="grid grid-cols-1 items-center gap-4 rounded-lg border border-gray-200 p-4 shadow-sm transition-colors hover:bg-gray-900 md:grid-cols-5">
          {/* Product Name */}
          <div className="col-span-2 break-words font-medium text-white">
            {name}
          </div>

          {/* Price */}
          {!soldOut && (
            <div className="col-span-1 text-lg font-semibold text-white">
              ${price}
            </div>
          )}

          {/* Status */}
          <div className="col-span-1">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${!soldOut ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
            >
              {!soldOut ? 'Available' : 'Out of stock'}
            </span>
          </div>

          {/* Actions */}
          <div className="col-span-1 flex flex-col items-start gap-2">
            {!soldOut && !itemInCart && (
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition-colors hover:bg-emerald-700"
                disabled={loading}
              >
                {loading ? <Loader /> : 'Add to Cart'}
              </button>
            )}

            {itemInCart && (
              <div className="flex flex-col gap-2">
                {deleteLoading ? null : (
                  <UpdateItem
                    currentQuantity={productQuantity}
                    id={_id}
                    className="rounded-lg border-gray-300"
                  />
                )}
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDeleteProduct()}
                  disabled={updateQtyLoading[_id]?.delete}
                  className="shadow-sm transition-shadow hover:shadow-md"
                >
                  {deleteLoading ? <Loader /> : 'Delete'}
                </Button>
              </div>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default SearchItems;
