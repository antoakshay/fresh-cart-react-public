import { useNavigate } from 'react-router-dom';
import { useSearchContext } from '../../SearchContextApi';
import { useMutation } from '@tanstack/react-query';
import { otpVerifier } from '../../services/apiSignUp';
import { useEffect, useRef, useState } from 'react';

function UserOtp() {
  const { loading, setLoading } = useSearchContext();
  const { signUpAuth, setSignUpAuth } = useSearchContext();
  const navigate = useNavigate();
  const [inputOtp, setInputOtp] = useState(true);
  const otpRef = useRef('');

  console.log(signUpAuth);

  const mutation = useMutation({
    mutationFn: async (otp) => {
      return await otpVerifier(otp);
    },
    onSuccess: () => {
      navigate('/accountCreation', { replace: true });
    },
    onError: (error) => {
      alert(error);
      setInputOtp(false);
      if (error.message === 'OTP expired. Please use the Sign-up again!') {
        setSignUpAuth(false);
        navigate('/signup', { replace: true });
      }
        console.log(error.message);
      // alert(error.message);
    },
  });

  function handleChange(event) {
    otpRef.current = event.target.value;
    setInputOtp(otpRef.current.length !== 7);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const otp = form.otp.value;
    setLoading(true);
    try {
      const response = await mutation.mutateAsync(otp);
      console.log(response);
      form.reset();
    } catch (err) {
      // alert(err);
        console.log(err);
    } finally {
      // setInputOtp(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!signUpAuth) {
      return navigate('/');
    }
  }, [navigate, signUpAuth]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-700">
          OTP Verification
        </h1>
        <p className="mb-6 text-center text-gray-600">
          A 7-digit OTP has been sent to your email address. Please check your
          email and enter the OTP below to verify your identity.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="otp"
              minLength="7"
              maxLength="7"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Enter OTP"
              inputMode="numeric"
              pattern="[0-9]*"
              required
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-blue-600 py-3 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled={inputOtp}
          >
            {mutation.isPending ? 'Submitting...' : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserOtp;
