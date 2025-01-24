import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
// import { loader as FruitsLoader } from './features/Products/Fruits/Fruitslists';
// import { loader as CartLoader } from './features/Cart/Cart';
import { loader as categoryLoader } from './ui/Products';
import { action as placeOrderAction } from './features/Order/OrderWIndow';
import { loader as orderLoader } from './features/Order/OrderDetails';
import { loader as searchResultLoader } from './features/SearchProducts/SearchedProducts';
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
import SearchedProducts from './features/SearchProducts/SearchedProducts';
import { SearchContextProvider } from './SearchContextApi';
import CustomProducts from './features/Products/CustomProductsPage/CustomProducts';
import UserSignUp from './features/User/userSignUp';
import UserOtp from './features/User/UserOtp';
import UserAccountCreation from './features/User/UserAccountCreation';

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
        path: '/signUp',
        element: <UserSignUp/>
      },
      {
        path: '/otpVerification',
        element: <UserOtp/>
      },
      {
        path: '/accountCreation',
        element: <UserAccountCreation/>
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/products',
        element: <Products />,
        loader: categoryLoader,
      },
      {
        path: '/products/:id',
        element: <CustomProducts />,
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
      {
        path: '/searchedProducts',
        element: <SearchedProducts />,
        // loader: searchResultLoader,
      },
    ],
  },
]);

function App() {
  return (
    <SearchContextProvider>
      <RouterProvider router={router} />
    </SearchContextProvider>
  );
}

export default App;
