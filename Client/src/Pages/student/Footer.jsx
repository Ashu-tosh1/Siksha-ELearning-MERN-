import React from 'react'

const Footer = () => {
    return (
      <footer className="bg-black text-gray-300 py-6 border-t border-gray-700 pt-2">
        <div className=" flex  md:flex-row items-center justify-between px-6">
          
          {/* Branding */}
          <div className="mb-4 md:mb-0 ml-[30px]">
            <h2 className="text-xl font-bold text-white">Siksha</h2>
            <p className="text-sm">Empowering education, anytime, anywhere.</p>
          </div>
  
          {/* Navigation Links */}
          <div>
          <nav className="flex space-x-7 text-sm">
            <a href="/" className="hover:text-white">Home</a>
            <a href="/courses" className="hover:text-white">Courses</a>
            <a href="/about" className="hover:text-white">About</a>
            <a href="/contact" className="hover:text-white">Contact</a>
          </nav>
          </div>
          
  
          {/* Social Media Icons */}
          {/* <div className="flex space-x-4">
            <a href="#" className="hover:text-white"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-linkedin-in"></i></a>
          </div> */}
  
        </div>
  
        {/* Copyright */}
        <div className="text-center text-xs mt-4 ">
          © {new Date().getFullYear()} Ashutosh.
        </div>
      </footer>
    );
  };
  

  

export default Footer