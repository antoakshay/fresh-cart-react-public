import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import { loader as FruitsLoader } from './features/Products/Fruits/Fruitslists';
// import { loader as CartLoader } from './features/Cart/Cart';
import { action as placeOrderAction } from './features/Order/OrderWIndow';
import { loader as orderLoader } from './features/Order/OrderDetails';
import Applayout from './ui/Applayout';
import Error from './ui/Error';
import Home from './ui/Home';
import Products from './ui/Products';
import Fruitslists from './features/Products/Fruits/Fruitslists';
import Cart from './features/Cart/Cart';
import Login from './ui/Login';
import OrderWIndow from './features/Order/OrderWIndow';
import OrderDetails from './features/Order/OrderDetails';
import { useDispatch } from 'react-redux';

const router = createBrowserRouter([
  {
    element: <Applayout />,

    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/products/fruits',
        loader: FruitsLoader,
        element: <Fruitslists />,
      },
      {
        path: '/cart',
        // loader: CartLoader,
        element: <Cart />,
      },
      {
        path: '/order',
        element: <OrderWIndow />,
        action: placeOrderAction,
      },
      {
        loader: orderLoader,
        path: '/order/confirmation',
        element: <OrderDetails />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
