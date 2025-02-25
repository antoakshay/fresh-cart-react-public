import { useEffect } from 'react';
import { useSearchContext } from '../../SearchContextApi';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createAccount } from '../../services/apiSignUp';
import { useDispatch } from 'react-redux';
import { newUser } from './userSlice';
import Spinner from '../../ui/Spinner';

function UserAccountCreation() {
  const { signUpAuth, setSignUpAuth } = useSearchContext();
  const { loading, setLoading } = useSearchContext();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async ({ name, password, passwordConfirm }) => {
      console.log(name, password, passwordConfirm);
      return await createAccount(name, password, passwordConfirm);
    },
    onSuccess: (data) => {
      console.log('Success', data.data.user);
      const newUserData = data.data.user;
      dispatch(newUser(newUserData));
      // navigate('/home', { replace: true });
      setSignUpAuth(false);
    },
    onError: (error) => {
      alert(error?.message);
      //   console.log('Error', error);
    },
  });

  useEffect(() => {
    if (!signUpAuth) {
      return navigate('/');
    }
  }, [navigate, signUpAuth]);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const password = form.password.value;
    const passwordConfirm = form.passwordConfirm.value;
    // console.log(name, password, passwordConfirm);
    setLoading(true);
    try {
      console.log(name, password, passwordConfirm);
      const response = await mutation.mutateAsync({
        name,
        password,
        passwordConfirm,
      });

      // if (!response) throw new Error('Something went wrong');
      // form.reset();
    } catch (err) {
      alert(err);
      //   console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-center"
      onSubmit={handleSubmit}
    >
      <form className="w-96 rounded-lg bg-black p-6 shadow-md">
        <h2 className="mb-4 text-center text-2xl font-semibold text-white">Sign Up</h2>

        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 bg-black text-white block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter your name"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 bg-black text-white block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter your password"
            minLength="8"
            maxLength="15"
          />
          <p className="mt-1 text-sm text-gray-500">
            Min characters: 8, Max characters: 15
          </p>
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label
            htmlFor="passwordConfirm"
            className="block text-sm font-medium text-white"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="passwordConfirm"
            className="mt-1 bg-black text-white block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Confirm your password"
            minLength="8"
            maxLength="15"
          />
          <p className="mt-1 text-sm text-gray-500">
            Min characters: 8, Max characters: 15
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white transition duration-300 hover:bg-indigo-700"
          disabled={loading}
        >
          {mutation.isPending ? 'Creating New Account...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default UserAccountCreation;
