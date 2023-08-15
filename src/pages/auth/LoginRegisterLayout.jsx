import React, { useState } from "react";
import graphic1 from "../../assets/images/personal-finance-graphics.png";
import graphic2 from "../../assets/images/personal-finance-graphics-1.jpg";
import graphic3 from "../../assets/images/personal-finance-graphics-2.jpg";
import { useNavigate } from "react-router";

function LoginRegisterLayout({ children }) {
  const images = [graphic1, graphic2, graphic3];
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  setTimeout(() => {
    setCurrentImage(currentImage + 1 === images.length ? 0 : currentImage + 1);
  }, 2500);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 grow h-100 flex flex-col items-center justify-center gap-2">
        <div className="mb-4 bg-purple-400 py-5 px-12 rounded-tr-full rounded-br-full relative">
          <h2 className="w-full text-4xl text-white mb-2">
            We help you to manage your finance efficiently!
          </h2>
          <h5 className="text-white text-2xl">Let's join.</h5>
          <button className="bg-purple-600 py-2 px-6 text-white rounded-full absolute right-16 bottom-4 hover:bg-purple-700">
            See what you can benefit
          </button>
        </div>
        <div className="" style={{ width: 500, height: 500 }}>
          <img src={images[currentImage]} alt="" className="" />
        </div>
        <div className="flex gap-2">
          {images.map((image, index) => {
            return (
              <button
                key={Math.random()}
                className={`rounded-md ${
                  currentImage === index ? "bg-purple-300" : "bg-gray-300"
                }`}
                style={{ width: 80, height: 5 }}
                onClick={() => setCurrentImage(index)}
              ></button>
            );
          })}
        </div>
      </div>
      <div className="w-1/2 grow flex flex-col">
        <div
          className="flex gap-2 justify-end py-3 pe-8"
          style={{
            backgroundImage:
              "linear-gradient(to left, rgb(216, 180, 254), #ffffff)",
          }}
        >
          <button
            className="bg-purple-600 w-40 px-6 rounded-full text-white hover:bg-purple-700"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
          <button
            className="border w-40 border-purple-600 py-2 px-6 rounded-full text-purple-600 bg-white hover:bg-purple-50"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
        <div className="w-full flex items-center justify-center grow">
          {children}
        </div>
      </div>
    </div>
  );
}

export default LoginRegisterLayout;
