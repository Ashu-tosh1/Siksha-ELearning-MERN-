import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-800 shadow-md">
        <img src="/image copy.png" alt="Logo" className="w-16" />
        <div className="flex space-x-4">
          <img src="/notification.png" alt="Notification" className="w-8 h-8" />
          <img src="/notification.png" alt="User Profile" className="w-8 h-8" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center mt-10">
        <img src="/image.png" alt="Big Logo" className="w-32 mb-6" />
        {/* Social Media */}
        <div className="flex space-x-6">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="/twitter.png" alt="Twitter" className="w-8 h-8" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/instagram.png" alt="Instagram" className="w-8 h-8" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/facebook.png" alt="Facebook" className="w-8 h-8" />
          </a>
        </div>
      </main>

      {/* Next Section */}
      <section className="p-6">
        <h2 className="text-xl font-bold mb-4">MyLogo</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <img key={i} src="" alt="" className="w-24 h-24 bg-gray-700 rounded-lg" />
          ))}
        </div>
        <div className="mt-4">
          <button className="px-4 py-2 bg-blue-500 rounded-lg">Add Crop</button>
        </div>
      </section>

      {/* Info Boxes */}
      <section className="grid grid-cols-2 gap-6 p-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow">Box 1</div>
        <div className="bg-gray-800 p-4 rounded-lg shadow">Box 2</div>
      </section>

      {/* Third Page Sections */}
      {[
        { title: "Water Content", imgSrc: "" },
        { title: "NPK Content", imgSrc: "" },
        { title: "Heal Crop", imgSrc: "" },
        { title: "Soil Test", imgSrc: "" },
      ].map((item, index) => (
        <section key={index} className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <img src={item.imgSrc} alt={item.title} className="w-12 h-12" />
          </div>
          <div className="mt-4 bg-gray-800 p-4 rounded-lg h-24"></div>
        </section>
      ))}
    </div>
  );
};

export default Dashboard;
