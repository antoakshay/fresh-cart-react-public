import { useNavigate } from 'react-router-dom';
import CartEmpty from './CartEmpty';

function CartBill({ totalCartPrice }) {
  const navigate = useNavigate();
  return (
    <>
      <footer className="mt-6 flex items-center justify-between rounded-lg border-gray-100 bg-gray-200 p-6">
        {totalCartPrice !== 0 ? (
          <>
            <span className="text-lg font-semibold text-gray-800">Total:</span>
            <span className="text-2xl font-bold text-green-600">
              {totalCartPrice}$
            </span>
          </>
        ) : (
          <CartEmpty />
        )}
      </footer>
      {totalCartPrice !== 0 && (
        <button
          className="ml-auto rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none"
          onClick={() => navigate('/order')}
        >
          Order Now
        </button>
      )}
    </>
  );
}

export default CartBill;
