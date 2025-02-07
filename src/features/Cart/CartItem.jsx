import { useDispatch, useSelector } from 'react-redux';
// import { getCurrentQuantityById, getTotalCartPrice } from './cartSlice';
import CartBill from './CartBill';
import UpdateItem from './UpdateItem';
import { useEffect, useState } from 'react';
import { deleteProduct, updateItemQuantity } from './cartSlice';
import Loader from '../../ui/Loading';
import { Button } from '@mui/material';
import { useSearchContext } from '../../SearchContextApi';

function CartItem({ item, finalBill ,soldOut}) {
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
        deleteProduct({ productId: _id/* , quantity: -productQuantity */ }),
      );
    } catch (err) {
      alert('Something went wrong while deleting the product');
    } finally {
      setDeleteLoading(false);
    }
  }

 return (
   <div className="mx-auto max-w-6xl px-4 py-6">
     <ul className="space-y-4">
       <li className="grid grid-cols-1 items-center gap-4 rounded-lg border border-gray-200 p-4 shadow-sm transition-colors hover:bg-gray-800 md:grid-cols-12">
         {/* Product Details */}
         <div className="col-span-4 break-words font-medium text-white">
           {quantity} × {name}
         </div>

         {/* Price */}
         <div className="col-span-2 text-lg font-semibold text-emerald-300">
           {totalPrice} $
         </div>

         {/* Actions */}
         <div className="col-span-6 flex items-center gap-3">
           {productQuantity > 0 && (
             <>
               {soldOut ? (
                 <>
                   <span className="font-medium text-red-600">Sold Out!</span>
                   <button
                     className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                     onClick={() => handleDeleteProduct()}
                     disabled={updateQtyLoading[_id]?.delete || false}
                   >
                     {deleteLoading ? <Loader /> : 'Delete'}
                   </button>
                 </>
               ) : (
                 <>
                   {!deleteLoading && (
                     <UpdateItem
                       currentQuantity={productQuantity}
                       id={_id}
                       className="rounded-lg border border-gray-300"
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
                 </>
               )}
             </>
           )}
         </div>
       </li>
     </ul>
   </div>
 );

}

export default CartItem;
