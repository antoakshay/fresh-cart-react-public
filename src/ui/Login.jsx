import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../services/apiLogin';
import { loginUser } from '../features/User/userSlice';

function Login() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    dispatch(loginUser({ email: email, password: password }));
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    }
    // console.log(isAuthenticated);
  }, [isAuthenticated, navigate]);

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
