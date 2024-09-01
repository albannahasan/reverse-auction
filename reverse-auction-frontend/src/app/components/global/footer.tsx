import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About Us Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">About Us</h2>
            <p className="text-gray-400">
              We are committed to providing the best service possible. Our team is dedicated to ensuring customer satisfaction and delivering high-quality products.
            </p>
          </div>
          {/* FAQ Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">FAQ</h2>
            <ul className="space-y-2">
              <li>
                <a href="/faq" className="hover:underline">
                  What is our return policy?
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:underline">
                  How can I track my order?
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:underline">
                  Do you offer international shipping?
                </a>
              </li>
            </ul>
          </div>
          {/* Terms and Conditions Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Terms and Conditions</h2>
            <ul className="space-y-2">
              <li>
                <a href="/terms" className="hover:underline">
                  View Terms and Conditions
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-400 mt-6">
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
