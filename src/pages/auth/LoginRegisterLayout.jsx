import React, { useState } from "react";
import graphic1 from "../../assets/images/personal-finance-graphics.png";
import graphic2 from "../../assets/images/personal-finance-graphics-1.jpg";
import graphic3 from "../../assets/images/personal-finance-graphics-2.jpg";
import logo from "../../assets/images/logo-money-master.png";
import logoText from "../../assets/images/name-money-master.png";
import { useNavigate } from "react-router";
import "../../styles/auth.css";
import Benefits from "./components/Benefits";

function LoginRegisterLayout({ children }) {
  const images = [graphic1, graphic2, graphic3];
  const [currentImage, setCurrentImage] = useState(0);
  const [shownBenefits, setShownBenefits] = useState(false);
  const navigate = useNavigate();

  setTimeout(() => {
    setCurrentImage(currentImage + 1 === images.length ? 0 : currentImage + 1);
  }, 2500);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 grow h-100 flex flex-col items-center justify-start">
        <div className="flex gap-2 items-center justify-start w-full px-6 py-2">
          <img src={logo} alt="" width={70} height={70} />
          <img src={logoText} alt="" style={{ height: 50 }} />
        </div>
        <div className="mb-4 w-full bg-purple-400 py-5 px-12 rounded-tr-full rounded-br-full relative">
          <h2 className="w-full text-4xl text-white mb-2 leading-tight">
            We help you to manage your finance efficiently!
          </h2>
          <h5 className="text-white text-2xl">Let's join.</h5>
          <button
            className="bg-purple-600 py-2 px-6 text-white rounded-full absolute right-16 bottom-4 hover:bg-purple-700"
            onClick={() => setShownBenefits(!shownBenefits)}
          >
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

      <div className="w-1/2 grow flex flex-col relative overflow-hidden">
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

        <div
          className="w-full flex items-center justify-center grow h-full"
          style={{
            backgroundImage:
              "linear-gradient(to top left, rgb(233, 213, 255), #ffffff)",
            perspective: 1000,
          }}
        >
          {/* Circles to make beautiful */}
          <div
            className="absolute rounded-full bg-purple-300 opacity-50 bottom-10 -right-20 z-0"
            style={{ width: 400, height: 400 }}
          ></div>
          <div
            className="absolute rounded-full bg-purple-300 opacity-50 -bottom-32 left-20 z-0"
            style={{ width: 200, height: 200 }}
          ></div>

          <div
            style={{ width: 450 }}
            className={`flip-card flex items-center ${
              shownBenefits == true ? "active" : ""
            }`}
          >
            <div
              className="border-blue-400 rounded-3xl p-6 bg-white form-card w-full"
              style={{
                boxShadow: "0 0 30px rgb(216, 180, 254)",
              }}
            >
              {children}
            </div>
            <div
              className="border-blue-400 rounded-3xl p-6 bg-white benefits-card w-full"
              style={{
                boxShadow: "0 0 30px rgb(216, 180, 254)",
              }}
            >
              <Benefits setShownBenefits={setShownBenefits}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegisterLayout;
