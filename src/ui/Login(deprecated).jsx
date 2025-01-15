import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../services/apiLogin';
import { useAuth } from '../../context/authenticationContext';

function Login() {
  const { loggingIn, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);

    // const response = await login(email, password);
    // const createCookie = () => {
    //   const expiresIn = 7; // Number of days
    //   const expirationDate = new Date();
    //   expirationDate.setDate(expirationDate.getDate() + expiresIn);

    //   document.cookie = `user=${response.data.user}; expires=${expirationDate.toGMTString()}; path=/`;
    // };

    // if (response.status === 'success') {
    //   loggingIn();
    //   createCookie();
    // }
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <form onSubmit={handleSubmit}>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40">Email</label>
            <input className="input grow" type="text" name="email" required />
          </div>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40">Password</label>
            <input
              className="input grow"
              type="password"
              name="password"
              required
            />
          </div>
          <div className="flex space-x-2">
            <button type="submit" className="button">
              Login
            </button>
            <button type="submit" className="button">
              Sign-up
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
