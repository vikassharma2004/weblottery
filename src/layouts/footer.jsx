export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-200 py-12 mt-20">
      <div className="w-full mx-auto px-2 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">SpinShare</h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              A trusted platform to earn through referrals and manage your
              wallet effortlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-stone-400 text-sm">
              <li>
                <a
                  href="/terms"
                  className="hover:text-white transition cursor-pointer"
                >
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a
                  href="/faq"
                  className="hover:text-white transition cursor-pointer"
                >
                  FAQs
                </a>
              </li>

              <li>
                <a
                  href="/support"
                  className="hover:text-white transition cursor-pointer"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contact Us
            </h3>
           <a
  href="mailto:support@spinshare.in"
  className="text-stone-400 text-sm hover:underline"
>
  support@spinshare.in
</a>

          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-stone-700 pt-6 text-center text-xs sm:text-sm text-stone-500">
          © {new Date().getFullYear()} SpinShare — Owned by SpinShare code. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
