import { Footer } from "./layouts/footer";

export function TermsAndConditions() {
  return (
      <>


    <div className="max-w-5xl mx-auto px-4 py-14">
      <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-6">
        Terms & Conditions
      </h2>

      <div className="space-y-5 text-stone-700 leading-relaxed">
        <p>
          By using SpinShare, you agree to follow all policies including
          referral rules, wallet usage, withdrawal guidelines, and platform
          safety checks.
        </p>
        <p>
          Referral rewards are credited only after successful verification and
          payment by the referred user. SpinShare reserves the right to
          withhold or revoke bonuses in case of fraudulent activity.
        </p>
        <p>
          Withdrawals are processed only for verified users after review. Any
          incorrect UPI or bank details provided by the user may result in
          irreversible loss.
        </p>
        <p>
          Continued misuse, fake accounts, or violation of terms may result in
          suspension or permanent account closure.
        </p>
      </div>
    </div>
      <Footer/>
      </>
  );
}
