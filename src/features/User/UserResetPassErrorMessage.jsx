import { Link } from 'react-router-dom';

function UserResetPassErrorMessage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-lg bg-blue-100 p-6 shadow-lg">
        <h2 className="mb-4 text-center text-xl font-semibold text-red-600">
          Error
        </h2>
        <p className="text-center text-lg font-semibold text-gray-700">
          Something Went Wrong Please Try Again !!
        </p>
      </div>
      <Link
        to="/"
        className="mt-6 text-center text-lg font-semibold text-blue-600 transition duration-300 hover:text-blue-800 hover:underline"
      >
        Return to Home Page
      </Link>
    </div>
  );
}

export default UserResetPassErrorMessage;
