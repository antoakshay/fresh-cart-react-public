import { useEffect } from 'react';
import { useSearchContext } from '../../SearchContextApi';
import { useNavigate } from 'react-router-dom';

function UserAccountCreation() {
  const { signUpAuth, setSignUpAuth } = useSearchContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signUpAuth) {
      return navigate('/');
    }
  }, [navigate, signUpAuth]);
  return <div></div>;
}

export default UserAccountCreation;
