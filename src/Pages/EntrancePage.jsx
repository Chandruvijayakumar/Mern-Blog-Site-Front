import React, { useState } from "react";
import { Link } from "react-router-dom";

const EntrancePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    "/images/carousel3.jpg",
    "/images/blog2.png",
    "/images/carousel1.jpg",
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative -mt-20 change1">
      <div className="bg-white-400 h-screen flex flex-col justify-center items-center change3">
        <h1 className="text-red-600 text-center font-extrabold text-4xl change2">
          Welcome to Our Blog Site
        </h1>
        <div className="mt-5 relative w-full">
          <img
            src={images[activeIndex]}
            alt={`Slide ${activeIndex + 1}`}
            className="w-full max-h-96 rounded-lg shadow-lg "
          />
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0  w-16 h-16 ml-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition duration-300"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0  w-16 h-16 mr-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition duration-300"
          >
            ›
          </button>
        </div>
        <div className="mt-10">
          <Link to="/home" className="custom-link ">
            <span>👉 Get Started 👈</span>
          </Link>
        </div>
      </div>
      <div className="bg-gray-800 change1 text-white py-8 change3">
        <div className="container mx-auto flex flex-wrap justify-center items-center">
          <div className="w-full sm:w-1/2 lg:w-1/4 p-4 text-center">
            <h2 className="text-2xl font-bold mb-2 ">About Us</h2>
            <p className="change2">
              We are passionate about sharing insightful content with our
              readers. Join us on this exciting journey!
            </p>
          </div>
        </div>
      </div>
      <footer className="bg-gray-900 text-white py-4 text-center change1">
        <p>&copy; 2024 Blog Site. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default EntrancePage;
