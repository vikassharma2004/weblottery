import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance as axios } from "../../config/axios";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const orderId = params.get("order_id");
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading"); // loading | success | failed
  const [redirectMsg, setRedirectMsg] = useState(false);

  useEffect(() => {
    if (!orderId) {
      setStatus("failed");
      return;
    }

    verifyPayment();
  }, [orderId]);

  const verifyPayment = async () => {
    try {
      const { data } = await axios.post(`/payment/status/${orderId}`);

      if (data?.status === "PAID") {
        setStatus("success");

        setTimeout(() => setRedirectMsg(true), 1500);

        setTimeout(() => {
          navigate("/refer-earn");
        }, 3500);

      } else {
        setStatus("failed");

        setTimeout(() => setRedirectMsg(true), 1500);

        setTimeout(() => {
          navigate("/");
        }, 3500);
      }
    } catch (err) {
      setStatus("failed");

      setTimeout(() => setRedirectMsg(true), 1500);

      setTimeout(() => {
        navigate("/");
      }, 3500);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen flex-col text-xl gap-3">
        <div className="animate-spin h-12 w-12 border-4 border-yellow-500 border-t-transparent rounded-full"></div>
        <p>Verifying payment...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <div className="bg-red-100 p-6 rounded-full mb-4">
          <svg className="w-16 h-16 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="text-red-600 text-3xl font-bold">Payment Failed</h1>
        <p className="mt-2 text-gray-600">Order ID: {orderId}</p>

        {redirectMsg && (
          <p className="mt-6 text-gray-500 animate-pulse">
            Redirecting you to homepage...
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="bg-green-100 p-6 rounded-full mb-4">
        <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-green-600 text-3xl font-bold">Payment Successful</h1>
      <p className="mt-2 text-gray-600">Order ID: {orderId}</p>

      <p className="text-lg mt-4 text-gray-700">Your payment has been verified.</p>

      {redirectMsg && (
        <p className="mt-6 text-gray-500 animate-pulse">
          Redirecting you to Refer & Earn page...
        </p>
      )}
    </div>
  );
}
