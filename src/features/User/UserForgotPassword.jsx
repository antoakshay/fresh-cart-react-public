import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../../services/apiResetPassword';
import { useNavigate } from 'react-router-dom';
import { useSearchContext } from '../../SearchContextApi';
import Spinner from '../../ui/Spinner';

function UserForgotPassword() {
  const { loading, setLoading } = useSearchContext();
  const { resetPassAuth, setResetPassAuth } = useSearchContext();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (email) => {
      return await resetPassword(email);
    },
    onSuccess: (data) => {
      console.log('Success', data);
      setResetPassAuth(true);
      navigate('/resetPasswordMessage');
    },
    onError: (error) => {
      alert(error);
      // alert('Something went wrong. Please try again');
      //   console.log('Error', error);
    },
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    console.log(email);

    try {
      setLoading(true);
      const response = await mutation.mutateAsync(email);
    } catch (e) {
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  }
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-semibold text-gray-700">
          Forgot Password
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              // value="antolazarus7@gmail.com"
              required
              className="mt-2 w-full rounded-md border border-gray-300 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {mutation.isPending ? 'Submitting' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserForgotPassword;
