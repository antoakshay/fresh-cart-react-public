import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
// import { loader as FruitsLoader } from './features/Products/Fruits/Fruitslists';
// import { loader as CartLoader } from './features/Cart/Cart';
// import { loader as categoryLoader } from './ui/Products';
import { action as placeOrderAction } from './features/Order/OrderWIndow';
import { loader as orderLoader } from './features/Order/OrderDetails';
// import { loader as searchResultLoader } from './features/SearchProducts/SearchedProducts';
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
import UserSignUp from './features/User/UserSignUp';
import UserOtp from './features/User/UserOtp';
import UserAccountCreation from './features/User/UserAccountCreation';
import UserPage from './features/User/UserPage';
import UserUpdatePassword from './features/User/UserUpdatePassword';
import UserUpdatePasswordSuccess from './features/User/UserUpdatePasswordSuccess';
import UserForgotPassword from './features/User/UserForgotPassword';
import UserResetPassword from './features/User/UserResetPassword';
import UserResetPassMessage from './features/User/UserResetPassMessage';
import UserResetPassErrorMessage from './features/User/UserResetPassErrorMessage';
import UserSetPassword from './features/User/UserSetPassword';

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
        element: <UserSignUp />,
      },
      {
        path: '/otpVerification',
        element: <UserOtp />,
      },
      {
        path: '/accountCreation',
        element: <UserAccountCreation />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/user',
        element: <UserPage />,
      },
      {
        path: '/updatePassword',
        element: <UserUpdatePassword />,
      },
      {
        path: '/updatePassword/success',
        element: <UserUpdatePasswordSuccess />,
      },
      {
        path: '/forgotPassword',
        element: <UserForgotPassword />,
      },
      {
        path: 'resetPasswordMessage',
        element: <UserResetPassMessage />,
      },
      {
        path: '/resetPassword/:id',
        element: <UserResetPassword />,
      },
      {
        path: '/resetPassword/error',
        element: <UserResetPassErrorMessage />,
      },
      {
        path: '/resetPasswordSuccess/update',
        element: <UserSetPassword />,
      },
      {
        path: '/products',
        element: <Products />,
        // loader: categoryLoader,
      },
      {
        path: '/products/:id/page/:pageNumber',
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
        path: '/searchedProducts/query/:queryName/page/:pageNumber',
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
