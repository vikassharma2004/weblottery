export function PaymentModal({ amount, onClose }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Box */}
      <div className="relative bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-6 animate-fadeIn scale-100">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          ✕
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-stone-900 text-center">
          Unlock Referral Earnings
        </h2>

        <p className="text-stone-600 mt-2 text-center text-sm">
          Make a one-time payment to activate your referral program and start earning.
        </p>

        {/* Amount Box */}
        <div className="mt-6 bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center justify-between">
          <span className="text-stone-700 font-medium">Activation Fee</span>
          <span className="text-2xl font-bold text-stone-900">₹{amount}</span>
        </div>

        {/* Rules */}
        <div className="mt-6 bg-stone-50 border border-stone-200 p-4 rounded-xl">
          <p className="text-sm font-semibold text-stone-800 mb-2">Please Note:</p>
          <ul className="text-sm text-stone-600 space-y-2">
            <li>• This is a <span className="font-semibold">one-time payment</span>.</li>
            <li>• After payment, your referral link unlocks instantly.</li>
            <li>• You earn ₹100 for every successful referral.</li>
            <li>• Payment is non-refundable.</li>
          </ul>
        </div>

        {/* Pay Button */}
        <button
          onClick={() => {
            console.log("Pay Now Clicked");
            // here you will open Razorpay or your payment API
          }}
          className="w-full mt-6 h-12 rounded-lg bg-linear-to-r from-amber-400 to-amber-500 text-stone-900 font-semibold shadow-md hover:from-amber-500 hover:to-amber-600 transition cursor-pointer"
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
}
