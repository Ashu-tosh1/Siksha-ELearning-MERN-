import { Button } from "@/components/ui/button";
// import React, { useState } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { TypeAnimation } from "react-type-animation";
import slider1 from "@/Pages/student/Images/slider1.png"
import slider2 from "@/Pages/student/Images/slider2.png"
import slider3 from "@/Pages/student/Images/slider3.png"


const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  // Slider settings
  const sliderSettings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    arrows: false,
  };

  const images = [
    // "https://imgs.search.brave.com/AYNnuMyeztK5EOK5Y6kXxtfmJ26WdX9XT8E9_CV8LN0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnZp/bWVvY2RuLmNvbS92/aWRlby8xODk2ODY3/MzQwLTVmMGQ2NTI0/OThiYWMwNzgzN2Nj/MWMxNmRhOTcyZTZj/MTM3MDM1YWM5NWY5/ZTk3MWFmMjFkZWY0/NTU0MGYzYmMtZF85/NjB4NTQw",
    // "https://imgs.search.brave.com/tP-mUYDMyAKjfBHcu3mfEAJ0AlxLcx-xtLuTkZOW8ZE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aWFtdGltY29yZXku/Y29tL2Fzc2V0cy9p/bWFnZXMvY291cnNl/cy9ncy1ka3ItMDFf/dGl0bGUucG5n",
    
    // "https://imgs.search.brave.com/fT_MEss_WK3oI8QdAhy0hUjranTvzDP59xkBJPFZAMI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93c3J2/Lm5sLz91cmw9aHR0/cHM6Ly9jcmVhdG9y/LWFzc2V0cy5jb2Rl/ZGFtbi5jb20vb2Zm/aWNpYWwtNjE4OTdi/ZmU2MGYxMTQwMDA4/ZmViMDBkL2NvdXJz/ZS1pbWFnZS8yMDIy/LTA4LTE5L2Q3MWYy/OThmYTc0NzhiMGU3/NGRmMTA3ZGE2Nzdl/N2MxZGY1MDliMzcm/dz0xMjgwJnE9ODIm/b3V0cHV0PXdlYnA",
    slider1,
    slider2,
    slider3
  ];

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      {/* Divider Line */}
      <div className="absolute top-0 left-0 right-0 z-10 border-t-2 border-red-900 w-full"></div>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 w-full mt-[241px] md:mt-0">
        {/* Left Side */}
        <div className="w-full md:w-[45%] space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Welcome to <span className="text-blue-500">Siksha</span>
          </h1>
          <div className="text-xl sm:text-2xl text-gray-400 font-bold">
            Learn{" "}
            <TypeAnimation
              sequence={[
                "Web Development",
                2000,
                "Machine Learning",
                2000,
                "Data Science",
                2000,
                "Artificial Intelligence",
                2000,
              ]}
              speed={50}
              deletionSpeed={50}
              repeat={Infinity}
              cursor={true}
            />
          </div>

          {/* Search Form */}
        {/* Search Form */}
<form
  onSubmit={searchHandler}
  className="flex items-center bg-gray-900/80 border border-gray-700 rounded-full shadow-md overflow-hidden max-w-xl mx-auto mb-6"
>
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search Courses"
    className="flex-grow bg-transparent border-none focus:outline-none focus:ring-0 px-6 py-3 text-white placeholder-gray-400"
  />
  <Button
    type="submit"
    className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition-all mr-3"
  >
    Search
  </Button>
</form>


          {/* Explore Courses Button */}
          <Button
            onClick={() => navigate(`/course/search?query=`)}
            className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200"
          >
            Explore Courses
          </Button>
        </div>

        {/* Right Side - Image Slider */}
        <div className="w-full md:w-[50%] rounded-3xl overflow-hidden">
          <Slider {...sliderSettings}>
            {images.map((image, index) => (
              <div key={index} className="outline-none">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[300px] sm:h-[400px] md:h-[300px] object-cover rounded-3xl"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
