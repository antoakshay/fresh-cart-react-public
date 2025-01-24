import { useMutation } from '@tanstack/react-query';
import { useSearchContext } from '../../SearchContextApi';
import Spinner from '../../ui/Spinner';
import validator from 'validator';
import { signUp } from '../../services/apiSignUp';
import { useNavigate } from 'react-router-dom';

function UserSignUp() {
  const { loading, setLoading } = useSearchContext();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (email) => {
      await signUp(email);
    },
    onSuccess: () => {
      navigate('/otpVerification', {replace: true});
      //   console.log('Success', data);
    },
    onError: () => {
      alert('Something went wrong. Please try again');
      //   console.log('Error', error);
    },
  });
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;

    if (!validator.isEmail(email)) {
      throw new Error('Invalid email address');
    }
    setLoading(true);
    try {
      const response = await mutation.mutateAsync(email);
      form.reset();
    } catch (err) {
      alert(err);
      //   console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <form
        className="w-80 rounded-lg bg-white p-6 shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-center text-xl font-semibold text-gray-700">
          New to Fresh-Cart? Sign up with your e-mail
        </h2>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Enter your E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@example.com"
          className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="mt-4 w-full rounded-full border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 shadow-md transition duration-300 hover:bg-gray-200"
          disabled={loading}
        >
          {mutation.isPending ? 'Submitting' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default UserSignUp;
