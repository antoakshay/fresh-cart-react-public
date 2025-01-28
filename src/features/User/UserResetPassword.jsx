import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { resetPasswordUpdate } from '../../services/apiResetPassword';

function UserResetPassword() {
  const { id } = useParams();

  const mutation = useMutation({
    mutationFn: async (id) => {
      return await resetPasswordUpdate(id);
    },
    onSuccess: (data) => {
      console.log('Success', data);
      navigate('/resetPasswordMessage');
    },
    onError: (error) => {
      alert(error);
      // alert('Something went wrong. Please try again');
      //   console.log('Error', error);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center p-4"></div>
  );
}

export default UserResetPassword;
