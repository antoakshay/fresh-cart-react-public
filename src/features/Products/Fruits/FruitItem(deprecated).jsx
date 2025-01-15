import { useDispatch, useSelector } from 'react-redux';
import {  getCurrentQuantityById, updateItemQuantity } from '../../Cart/cartSlice(deprecated)';
import UpdateItem from '../../Cart/UpdateItem';
import { useEffect, useState } from 'react';

function Fruititems({ fruit }) {
  const { _id, name, price, soldOut, totalPrice, quantity } = fruit;
  // const [quantity, setQuantity] = useState();
  const dispatch = useDispatch();
  //   console.log(price);

  useEffect(() => {
    console.log(soldOut);
  }, [soldOut]);

  function handleAddToCart() {
    // setQuantity(quantity + 1);
    const newItem = {
      _id,
      name,
      quantity: 1,
      price: price || 0,
      totalPrice: price * quantity,
    };
    console.log(newItem.quantity, newItem.totalPrice);
    console.log(newItem);
    dispatch(updateItemQuantity(newItem));
  }

  const currentQuantity = useSelector(getCurrentQuantityById(_id));
  const isInCart = currentQuantity > 0;

  return (
    <div className="flex-auto items-center justify-center py-6">
      <ul className="grid grid-cols-3 gap-4 border border-gray-400 p-4">
        <li className="break-words">{name}</li>
        {!soldOut && <li className="break-words">{price} /kg</li>}
        <li className="break-words">
          {!soldOut ? 'Available' : 'Out of stock'}
        </li>
        {!soldOut && (
          <>
            {!isInCart ? (
              <button
                onClick={handleAddToCart}
                className="rounded-md bg-lime-500 px-3 py-1 text-white"
              >
                Add to cart
              </button>
            ) : (
              <UpdateItem currentQuantity={currentQuantity} id={_id} />
            )}
          </>
        )}
      </ul>
    </div>
  );
}

export default Fruititems;
