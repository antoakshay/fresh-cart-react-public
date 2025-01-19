import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import { getFruits } from '../../../services/apiProducts';
import Fruititems from './Fruititems';
import { useEffect, useState } from 'react';
import Login from '../../../ui/Login';
import { getCartDetails } from '../../Cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

export async function loader() {
  const lists = await getFruits();
  console.log(lists);
  return lists;
}

function Fruitslists() {
  const menu = useLoaderData();
  const navigation = useNavigation();
  useEffect(()=>{
    console.log(navigation.state);
  },[navigation.state])
  console.log(menu);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const navigate = useNavigate();

  const isCartLoading = useSelector((state) => state.cart.loading);

  //!! Redirecting to login page if user is NOT authenticated
  useEffect(() => {
    // console.log(isAuthenticated);
    if (!isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // !! Just a additional measure to prevent rendering the authorized routes
  if (!isAuthenticated) {
    return null;
  }

  // if (isCartLoading) {
  //   return <div>Loading...</div>;
  // }

  // console.log(menu.data);
  // const parsedMenu =  JSON.parse(menu);
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <ul className="w-full space-y-4 divide-y divide-gray-500 px-4">
        {menu.data.map((fruit) => (
          <Fruititems fruit={fruit} key={fruit._id}></Fruititems>
        ))}
      </ul>
    </div>
  );
}

export default Fruitslists;
