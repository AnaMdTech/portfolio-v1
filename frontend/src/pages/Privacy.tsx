import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { usePageTitle } from "../hooks/usePageTitle";

const Privacy = () => {
  usePageTitle("Privacy Protocol");

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-black">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-4xl font-bold mb-8 text-primary">
          Privacy Protocol
        </h1>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">
              1. Data Collection
            </h2>
            <p>
              This portfolio collects basic information (Name, Email) solely
              through the Contact Form. This data is transmitted via secure
              channels (Resend API) and stored in a private database
              (Neon/PostgreSQL) for the purpose of communication.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">
              2. Usage of Data
            </h2>
            <p>
              Your data is used exclusively to respond to inquiries or job
              opportunities. I do not sell, trade, or transfer your personally
              identifiable information to outside parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Security</h2>
            <p>
              I implement a variety of security measures (HTTPS, Database
              Encryption, JWT) to maintain the safety of your personal
              information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Contact</h2>
            <p>
              If you wish to have your data removed from my records, please
              contact me directly at:
              <span className="text-primary ml-2">anamdtech@gmail.com</span>
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
