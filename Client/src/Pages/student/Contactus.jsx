const Contactus = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
    <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-1">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Your Email"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Message</label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Your Message"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Send Message
        </button>
      </form>
    </div>
  </div>
);
};

export default Contactus
