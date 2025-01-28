function UserUpdatePasswordSuccess() {
  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
        <h2 className="text-xl font-semibold text-green-600">
          Password Updated Successfully
        </h2>
        <p className="mt-2 text-gray-600">
          Your password has been updated successfully. You can now use your new
          credentials to access your account.
        </p>
      </div>
    </div>
  );
}

export default UserUpdatePasswordSuccess;
