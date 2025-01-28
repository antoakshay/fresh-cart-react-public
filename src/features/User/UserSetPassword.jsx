import { useMutation } from '@tanstack/react-query';
import { setResetPassword } from '../../services/apiResetPassword';
import { useNavigate } from 'react-router-dom';

function UserSetPassword() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async ({ password, passwordConfirm }) => {
      console.log(password, passwordConfirm);
      return await setResetPassword(password, passwordConfirm);
    },
    onSuccess: (data) => {
      console.log('Success', data);
      navigate('/updatePassword/success');
      // navigate('/home', { replace: true });
    },
    onError: (error) => {
      alert(error?.message);
      //   navigate('/');
      //   console.log('Error', error);
    },
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const password = form.password.value;
    const passwordConfirm = form.passwordConfirm.value;
    if (password !== passwordConfirm) {
      return alert('Passwords do not match');
    }
    try {
      const response = await mutation.mutateAsync(password, passwordConfirm);
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold">
          Update Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="new-password"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your new password"
              min="8"
              max="15"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="passwordConfirm"
              name="confirm-password"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your new password"
              min="8"
              max="15"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserSetPassword;
