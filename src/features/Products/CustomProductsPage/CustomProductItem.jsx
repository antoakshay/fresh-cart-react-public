import { useDispatch, useSelector } from 'react-redux';
import { updateItemQuantity, deleteProduct } from '../../Cart/cartSlice';
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
        deleteProduct({ productId: _id /* , quantity: -productQuantity */ }),
      );
    } catch (e) {
      alert('Error deleting product');
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <ul className="space-y-4">
        {/* Grid Header */}
        <li className="hidden grid-cols-12 gap-4 px-4 py-2 font-medium text-white md:grid">
          <div className="col-span-4">Product</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-4">Actions</div>
        </li>

        {/* Product Item */}
        <li className="grid grid-cols-1 items-center gap-4 rounded-lg border border-gray-200 p-4 shadow-sm transition-colors hover:bg-gray-900 md:grid-cols-12">
          {/* Product Name */}
          <div className="col-span-4 break-words font-medium text-white">
            {name}
          </div>

          {/* Price */}
          {!soldOut && (
            <div className="col-span-2 text-lg font-semibold text-emerald-600">
              ${price}
            </div>
          )}

          {/* Status */}
          <div className="col-span-2">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${!soldOut ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
            >
              {!soldOut ? 'Available' : 'Out of stock'}
            </span>
          </div>

          {/* Actions */}
          <div className="col-span-4 flex items-center gap-3">
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
              <div className="flex items-center gap-3">
                {!deleteLoading && (
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

export default CustomProductItem;
