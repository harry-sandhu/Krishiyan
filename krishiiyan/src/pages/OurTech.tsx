import React from "react";
import TechCard from "../Components/TechCard";
import Navbar from "../Components/Navbar";
import TechCard1 from "../Components/TechCard1";
import TechBanner from "../Components/TechBanner";
import TechCard2 from "../Components/TechCard2";
import TechCard3 from "../Components/TechCard3";
import Footer from "../Components/Footer";
import Preloader from "../Components/Preloader";
import TechCard4 from "../Components/TechCard4";
import FlowChart from "../Components/FlowChart";
import AppImage from "../Components/AppImage";
import OurServices from "../Components/OurServices";
import Playstore from "../Components/Playstore";

const OurTech = () => {
  return (
    <>
      <Preloader />
      <Navbar />
      <TechBanner />
      <FlowChart />
      {/* <TechCard2 /> */}
      {/* <TechCard4 /> */}
      {/* <TechCard3 /> */}
      {/* <TechCard1 /> */}
      <TechCard />
      <OurServices />
      <AppImage />
      <Playstore />
      <Footer />
    </>
  );
};

export default OurTech;
