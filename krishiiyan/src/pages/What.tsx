import React from "react";
import Preloader from "../Components/Preloader";
import Navbar from "../Components/Navbar";
import What1 from "../Components/What1";
import Footer from "../Components/Footer";
import What2 from "../Components/What2";
import Hero3 from "../Components/Hero3";
import What0 from "../Components/What0";
import Team from "./Team";

const What = () => {
  return (
    <>
      <Preloader />
      <Navbar />
      {/* <What1 />
      <What0 />
      <What2 />
      <Hero3 /> */}
      <Team />
      <Footer />
    </>
  );
};

export default What;
