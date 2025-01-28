import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { resetPasswordUpdate } from '../../services/apiResetPassword';
import { useState } from 'react';

function UserResetPassword() {
  const [message, setMessage] = useState(
    'Verifying Credentials ... Please Wait...',
  );
  const { id } = useParams();

  const mutation = useMutation({
    mutationFn: async (id) => {
      return await resetPasswordUpdate(id);
    },
    onSuccess: (data) => {
      console.log('Success', data);
    },
    onError: (error) => {
      alert(error);
      // alert('Something went wrong. Please try again');
      //   console.log('Error', error);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center space-x-4 p-4">
      <>
        {mutation.isPending ? (
          <div className="h-6 w-6 animate-spin rounded-full border-4 border-t-4 border-gray-200"></div>
        ) : (
          <span>{message}</span>
        )}
        {/* {!mutation.isPending && <span>Redirecting...</span>} */}
      </>
    </div>
  );
}

export default UserResetPassword;
