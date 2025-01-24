import { useNavigate } from 'react-router-dom';
import { useSearchContext } from '../../SearchContextApi';
import { useMutation } from '@tanstack/react-query';
import { otpVerifier } from '../../services/apiSignUp';

function UserOtp() {
  const { loading, setLoading } = useSearchContext();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (otp) => {
      otpVerifier(otp);
    },
    onSuccess: () => {},
    onError: (error) => {
      alert(error.message);
    },
  });
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const otp = form.otp.value;

    setLoading(true);
    try {
      const response = await mutation.mutateAsync(otp);
      form.reset();
    } catch (err) {
      alert(err);
      //   console.log(err);
    } finally {
      setLoading(false);
    }
  }
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
          <div className="flex justify-between">
            {/* OTP Inputs */}
            {[...Array(7)].map((_, index) => (
              <input
                key={index}
                type="text"
                id="otp"
                maxLength="1"
                className="h-12 w-12 rounded-md border border-gray-300 text-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                placeholder="-"
                inputMode="numeric"
                pattern="[0-9]*"
                autoFocus={index === 0}
              />
            ))}
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-blue-600 py-3 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={loading}
          >
            {mutation.isPending ? 'Submitting..' : ' Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserOtp;
