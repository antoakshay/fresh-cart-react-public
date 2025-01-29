import { useMutation } from '@tanstack/react-query';
import { getUser } from '../../services/apiSignUp';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { newUser } from './userSlice';
import { useEffect, useState } from 'react';
import { useSearchContext } from '../../SearchContextApi';
import Spinner from '../../ui/Spinner';

function UserUpdatePasswordSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const { loading, setLoading } = useSearchContext();
  const mutation = useMutation({
    mutationFn: async () => {
      return await getUser();
    },
    onSuccess: async (data) => {
      // console.log('Success', data);
      console.log(data.data);
      setUser(data.data);
    },
    onError: (error) => {
      alert(error?.message);
      //   navigate('/');
      //   console.log('Error', error);
    },
  });

  async function handleClick() {
    setLoading(true);
    await dispatch(newUser(user));
    navigate('/home', { replace: true });
    setLoading(false);
  }

  useEffect(() => {
    async function triggerMutate() {
      try {
        const response = await mutation.mutateAsync();
      } catch (e) {
        console.log('Error:', e);
        throw e;
      }
    }
    triggerMutate();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
        <h2 className="text-xl font-semibold text-green-600">
          Password Updated Successfully
        </h2>
        <p className="mt-2 text-gray-600">
          Your password has been updated successfully. You can now use your new
          credentials to access your account.
        </p>
        <button
          className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white shadow-md transition hover:bg-blue-700"
          onClick={handleClick}
        >
          Click here to go to the app
        </button>
      </div>
    </div>
  );
}

export default UserUpdatePasswordSuccess;
