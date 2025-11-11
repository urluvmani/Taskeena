import React from "react";

const Contact = () => {
  return (
    <section className="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4 text-center">
          Get in Touch
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Have questions, feedback, or partnership ideas? We’d love to hear from
          you.
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>

          {/* Subject */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              placeholder="Enter subject"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none resize-none"
            ></textarea>
          </div>

          {/* Button */}
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-md transition-all duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      <p className="text-sm text-gray-500 mt-10 text-center">
        Or email us directly at{" "}
        <a
          href="mailto:arweb0204Agmail.com"
          className="text-pink-600 hover:underline"
        >
          support@taskeena.com
        </a>
      </p>
    </section>
  );
};

export default Contact;
