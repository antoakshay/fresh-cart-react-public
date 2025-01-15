import { Link } from 'react-router-dom';

function Cartoverview() {
  return (
    <Link
      to="/cart"
      className="ml-4 inline-block rounded-full px-2 py-1 text-xs font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      Open cart &rarr;
    </Link>
  );
}

export default Cartoverview;
