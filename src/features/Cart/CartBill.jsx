import { useNavigate } from 'react-router-dom';
import CartEmpty from './CartEmpty';

function CartBill({ totalCartPrice, soldOut }) {
  const navigate = useNavigate();
  return (
    <>
      <footer className="mt-6 flex items-center justify-between rounded-lg border-gray-100 bg-gray p-6">
        {totalCartPrice !== 0 ? (
          <>
            <span className="text-lg font-semibold text-white">Total:</span>
            <span className="text-2xl font-bold text-green-400">
              {totalCartPrice}$
            </span>
          </>
        ) : (
          <CartEmpty />
        )}
      </footer>
      {totalCartPrice !== 0 && (
        <button
          disabled={soldOut}
          className={`ml-auto rounded-lg px-6 py-2 text-white focus:outline-none ${
            soldOut
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          onClick={() => navigate('/order')}
        >
          Order Now
        </button>
      )}
    </>
  );
}

export default CartBill;
