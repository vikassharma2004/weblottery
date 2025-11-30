export default function AuthLayout({ children, src }) {
  return (
    <div className="min-h-screen flex">
      {/* --- Left Side (Image Section) --- */}
      <div className="hidden lg:flex w-1/2 bg-gray-100 items-center justify-center p-10">
        <img
          src={src}
          loading="lazy"
          alt="Auth Illustration"
          className="max-w-[70%] rounded-2xl shadow-lg object-cover"
        />
      </div>

      {/* --- Right Side (Form Section) --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
