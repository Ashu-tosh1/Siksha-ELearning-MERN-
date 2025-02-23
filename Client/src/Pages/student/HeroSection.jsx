import React from "react";
import Slider from "react-slick";
import { TypeAnimation } from "react-type-animation";

const HeroSection = () => {
  // Slider settings
  const sliderSettings = {
    infinite: true, // Infinite loop
    speed: 1000, // Transition speed
    slidesToShow: 1, // Number of slides to show
    slidesToScroll: 1, // Number of slides to scroll
    autoplay: true, // Auto-play
    autoplaySpeed: 2000, // Auto-play interval (2 seconds)
    pauseOnHover: false, // Pause on hover
    arrows: false, // Hide navigation arrows
  };

  // Sample images for the slider
  const images = [
    "https://imgs.search.brave.com/AYNnuMyeztK5EOK5Y6kXxtfmJ26WdX9XT8E9_CV8LN0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnZp/bWVvY2RuLmNvbS92/aWRlby8xODk2ODY3/MzQwLTVmMGQ2NTI0/OThiYWMwNzgzN2Nj/MWMxNmRhOTcyZTZj/MTM3MDM1YWM5NWY5/ZTk3MWFmMjFkZWY0/NTU0MGYzYmMtZF85/NjB4NTQw",
    "https://imgs.search.brave.com/tP-mUYDMyAKjfBHcu3mfEAJ0AlxLcx-xtLuTkZOW8ZE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aWFtdGltY29yZXku/Y29tL2Fzc2V0cy9p/bWFnZXMvY291cnNl/cy9ncy1ka3ItMDFf/dGl0bGUucG5n",
    "https://imgs.search.brave.com/fT_MEss_WK3oI8QdAhy0hUjranTvzDP59xkBJPFZAMI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93c3J2/Lm5sLz91cmw9aHR0/cHM6Ly9jcmVhdG9y/LWFzc2V0cy5jb2Rl/ZGFtbi5jb20vb2Zm/aWNpYWwtNjE4OTdi/ZmU2MGYxMTQwMDA4/ZmViMDBkL2NvdXJz/ZS1pbWFnZS8yMDIy/LTA4LTE5L2Q3MWYy/OThmYTc0NzhiMGU3/NGRmMTA3ZGE2Nzdl/N2MxZGY1MDliMzcm/dz0xMjgwJnE9ODIm/b3V0cHV0PXdlYnA",
  ];

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      {/* Divider Line */}
      <div className="absolute top-0 left-0 right-0 z-10 border-t-2 border-red-900 w-full"></div>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 w-full mt-[241px] md:mt-0">
        {/* Left Side (45% - Text Content) */}
        <div className="w-full md:w-[45%] space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Welcome to <span className="text-blue-500">Siksha</span>
          </h1>
          <div className="text-xl sm:text-2xl text-gray-400 font-bold">
            Learn{" "}
            <TypeAnimation
              sequence={[
                "Web Development",
                2000, // Display "Web Development" for 2 seconds
                () => {
                  // Erase "Web Development"
                },
                "Machine Learning",
                2000, // Display "Machine Learning" for 2 seconds
                () => {
                  // Erase "Machine Learning"
                },
                "Data Science",
                2000, // Display "Data Science" for 2 seconds
                () => {
                  // Erase "Data Science"
                },
                "Artificial Intelligence",
                2000, // Display "Artificial Intelligence" for 2 seconds
                () => {
                  // Erase "Artificial Intelligence"
                },
              ]}
              speed={50} // Typing speed
              deletionSpeed={50} // Erasing speed
              repeat={Infinity} // Repeat infinitely
              cursor={true} // Show blinking cursor
            />
          </div>
        </div>

        {/* Right Side (50% - Image Slider) */}
        <div className="w-full md:w-[50%] rounded-3xl overflow-hidden">
          <Slider {...sliderSettings}>
            {images.map((image, index) => (
              <div key={index} className="outline-none">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[300px] sm:h-[400px] md:300px] object-fill rounded-3xl"
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