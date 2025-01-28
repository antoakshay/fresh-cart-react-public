import { useMutation } from '@tanstack/react-query';
import { updatePassword } from '../../services/apiUpdatePassword';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function UserUpdatePassword() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const mutation = useMutation({
    mutationFn: async ({ password, newPassword, newPasswordConfirm }) => {
      console.log({ password, newPassword, newPasswordConfirm });
      return await updatePassword({
        password,
        newPassword,
        newPasswordConfirm,
      });
    },
    onSuccess: (data) => {
      console.log(data);
      navigate('/updatePassword/success', { replace: true });
    },
    onError: (error) => {
      alert(error);

      // alert(error.message);
    },
  });
  if (!isAuthenticated) {
    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const oldPassword = form.oldpassword.value;
    const newPassword = form.newpassword.value;
    const confirmPassword = form.confirmpassword.value;
    console.log(oldPassword, newPassword, confirmPassword);
    if (newPassword.length < 8) return alert('Password too short');
    // if (newPassword !== confirmPassword) return alert('Passwords do not match');

    try {
      const response = await mutation.mutateAsync({
        password: oldPassword,
        newPassword,
        newPasswordConfirm: confirmPassword,
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Update Password
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Old Password */}
          <div className="mb-4">
            <label
              htmlFor="old-password"
              className="block text-sm font-medium text-gray-700"
            >
              Old Password
            </label>
            <input
              type="password"
              id="oldpassword"
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your old password"
            />
          </div>
          {/* New Password */}
          <div className="mb-4">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newpassword"
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your new password"
              minLength="8"
              maxLength="15"
            />
            <p className="mt-1 text-sm text-gray-500">
              Min characters: 8, Max characters: 15
            </p>
          </div>
          {/* Confirm Password */}
          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmpassword"
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your new password"
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
            className={`w-full rounded-md px-4 py-2 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              mutation.isPending
                ? 'cursor-not-allowed bg-gray-400 text-gray-200'
                : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
            }`}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Submitting' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserUpdatePassword;
