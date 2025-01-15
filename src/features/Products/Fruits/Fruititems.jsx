import { useDispatch, useSelector } from 'react-redux';
// import {  getCurrentQuantityById, updateItemQuantity } from '../../Cart/cartSlice';
import UpdateItem from '../../Cart/UpdateItem';
import { useEffect, useState } from 'react';
import {
  deleteProduct,
  // getCurrentQuantityById,
  updateItemQuantity,
} from '../../Cart/cartSlice';
import { getCartDetails } from '../../../services/apiGetCart';

function Fruititems({ fruit, cartData }) {
  const { _id, name, price, soldOut, totalPrice, quantity } = fruit;

  // const cart = useSelector((state) => state.cart);
  // useEffect(() => {
  //   console.log(cartData);
  // }, [cartData]);

  const dispatch = useDispatch();

  // Looking if the product is already in the cart
  const itemInCart = useSelector((state) =>
    state.cart.items?.some((item) => item.product._id === _id),
  );

  // const itemInCartData = cartData.products.some(
  //   (item) => item.product._id === _id,
  // );
  // useEffect(() => {
  //   console.log(itemInCartData);
  // }, [itemInCartData]);

  // Selecting the productQuantity of the updated Item
  const productQuantity = useSelector((state) => {
    // console.log([...state.cart.items]);
    // console.log(_id);
    const item = state.cart.items.find((item) => item.product._id === _id);
    // console.log(item);
    return item ? item.quantity : 0;
  });

// const cartProductQuantity =
//   cartData.products.find((item) => {
//     console.log(item);
//     if (item.product._id === _id) {
//       console.log(item.quantity);
//       return true; // Match found
//     }
//     return false; // No match
//   })?.quantity || 0;

// console.log(cartProductQuantity);

//   useEffect(() => {
//     console.log(cartProductQuantity);
//   }, [cartProductQuantity]);

  // useEffect(() => {
  //   console.log(productQuantity);
  // }, [productQuantity]);

  // console.log(itemInCart?.quantity);

  function handleAddToCart() {
    // setQuantity(quantity + 1);
    const newItem = {
      _id,
      name,
      quantity: 1,
      price: price || 0,
      totalPrice: price * quantity,
    };

    dispatch(
      updateItemQuantity({
        productId: newItem._id,
        quantity: newItem.quantity,
      }),
    );
  }

  async function handleDeleteProduct() {
    // console.log(id);
    dispatch(
      updateItemQuantity({ productId: _id, quantity: -productQuantity }),
    );
  }

  return (
    <div className="flex-auto items-center justify-center py-6">
      <ul className="grid grid-cols-5 gap-4 border border-gray-400 p-4">
        <li className="break-words">{name}</li>
        {!soldOut && <li className="break-words">{price} </li>}
        <li className="break-words">
          {!soldOut ? 'Available' : 'Out of stock'}
        </li>
        {!soldOut && !itemInCart && (
          <>
            <button
              onClick={handleAddToCart}
              className="rounded-md bg-lime-500 px-3 py-1 text-white"
            >
              Add to Cart
            </button>
            <div>{itemInCart ? `Quantity: ${productQuantity}` : null}</div>
          </>
        )}
        {itemInCart && (
          <>
            <UpdateItem currentQuantity={productQuantity} id={_id} />
            <button
              className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={() => handleDeleteProduct()}
            >
              Delete
            </button>
          </>
        )}
      </ul>
    </div>
  );
}

export default Fruititems;
