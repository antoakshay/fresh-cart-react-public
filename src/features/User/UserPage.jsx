import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UserPage() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-semibold text-gray-800">
          User Information
        </h1>
        <div className="mb-6 space-y-2">
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Name:</span> John Doe
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Email:</span>{' '}
            john.doe@example.com
          </p>
        </div>
        <button className="mb-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-center font-medium text-white hover:bg-blue-600">
          Your Order History
        </button>
        <button className="w-full rounded-lg bg-green-500 px-4 py-2 text-center font-medium text-white hover:bg-green-600">
          Update Password
        </button>
      </div>
    </div>
  );
}

export default UserPage;
