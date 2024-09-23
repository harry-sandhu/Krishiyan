import React from "react";
import Preloader from "../Components/Preloader";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Who1 from "../Components/Who1";
import Who2 from "../Components/Who2";
import Who3 from "../Components/Who3";
import Hero3 from "../Components/Hero3";
// import Who4 from "../Components//Who4";

const Who = () => {
  return (
    <>
      <Preloader />
      <Navbar />
      <Who1 />
      <Who3 />
      <Who2 />
      {/* <Who4 /> */}
      <Hero3 />

      <Footer />
    </>
  );
};

export default Who;
