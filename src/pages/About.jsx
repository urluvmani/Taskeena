import React from "react";

const About = () => {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-gray-800 px-6 py-16"
      style={{
        backgroundImage:
          "url('banner.webp')", // 🖼️ replace with your own image path
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-md"></div>

      {/* Content */}
      <div className="relative max-w-4xl w-full bg-white/70 shadow-xl rounded-2xl p-8 md:p-12 backdrop-blur-sm">
        <h2 className="text-4xl md:text-5xl font-bold text-pink-600 mb-6 text-center">
          About Taskeena Beauty
        </h2>

        <p className="text-gray-700 text-lg leading-relaxed mb-6 text-center">
          Welcome to <strong>Taskeena Beauty</strong> — your trusted destination for 
          premium skincare and self-care essentials. Our journey began with a 
          simple goal: to bring confidence and radiance to every individual through 
          pure, effective, and affordable beauty products.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-6 text-center">
          Each of our products is carefully curated, ensuring the perfect blend of 
          natural ingredients and modern science. We believe beauty is not about 
          covering up — it’s about revealing your true glow. 🌸
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-8 text-center">
          Whether you’re new to skincare or an expert, we’re here to guide you toward 
          radiant, healthy skin — with love and care from Taskeena.
        </p>

        {/* WhatsApp Contact Section */}
        <div className="mt-10 text-center">
          <h3 className="text-2xl font-semibold text-pink-600 mb-4">
            Get in Touch
          </h3>
          <p className="text-gray-600 mb-6">
            Have a question or want to place an order directly? Contact us below 👇
          </p>

          <a
            href="https://wa.me/923256795456?text=Hi%20Taskeena%20Beauty!%20I%20want%20to%20place%20an%20order%20or%20ask%20a%20question.%20Can%20you%20please%20assist%20me%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-md"
          >
            Chat on WhatsApp
          </a>

          <p className="text-sm text-gray-500 mt-6">
            Or email us at{" "}
            <a
              href="mailto:support@taskeena.com"
              className="text-pink-600 hover:underline"
            >
              support@taskeena.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
