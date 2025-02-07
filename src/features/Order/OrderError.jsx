import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function OrderError() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const navigate = useNavigate();
  

    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/', { replace: true });
        return;
      }
    }, [isAuthenticated, navigate]);

  return (
    <div className="flex h-40 items-center justify-center rounded-lg border border-red-400 bg-red-100 px-4 py-3 text-red-700">
      <p className="text-lg font-semibold">
        Something went wrong while placing the order. Please try again.
      </p>
    </div>
  );
}

export default OrderError;
