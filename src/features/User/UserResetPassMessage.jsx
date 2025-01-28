function UserResetPassMessage() {
return (
  <div className="flex min-h-screen items-center justify-center p-4">
    <div className="w-full max-w-sm rounded-lg bg-blue-100 p-6 shadow-lg">
      <p className="text-center text-lg font-semibold text-gray-700">
        Your password has been sent to your registered email address. Kindly
        check your mail.
      </p>
    </div>
  </div>
);

}

export default UserResetPassMessage;
