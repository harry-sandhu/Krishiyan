import React, { useEffect } from "react";
import whoare from '../assets/Images/whoarebanner.png';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface Who1Props { }

const Who1: React.FC<Who1Props> = () => {
  const imgStyle: React.CSSProperties = {
    width: "100%",
    height: "auto",
    maxHeight: "550px",
  };

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "20px",
    left: "20%",
    transform: "translateX(-50%)",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    padding: "15px",
    borderRadius: "5px",
    maxWidth: "80%",
    textAlign: "center",
  };

  return (
    <div>
      <Carousel showThumbs={false} autoPlay infiniteLoop swipeable>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img src={"/Images/car1.jpg"} alt="Slide 1 Image" style={imgStyle} />
          {/* <div style={overlayStyle}>
            <h2 className="text-xl font-bold mb-2">Slide 1 Title</h2>
            <p className="mb-2">Description for slide 1 goes here.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Learn More</button>
          </div> */}
        </div>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img src={"/Images/car2.jpg"} alt="Slide 2 Image" style={imgStyle} />
          {/* <div style={overlayStyle}>
            <h2 className="text-xl font-bold mb-2">Slide 2 Title</h2>
            <p className="mb-2">Description for slide 2 goes here.</p>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Explore</button>
          </div> */}
        </div>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img src={"/Images/car3.jpg"} alt="Slide 3 Image" style={imgStyle} />
          {/* <div style={overlayStyle}>
            <h2 className="text-xl font-bold mb-2">Slide 3 Title</h2>
            <p className="mb-2">Description for slide 3 goes here.</p>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Discover More</button>
          </div> */}
        </div>
      </Carousel>
    </div>
  );
};

export default Who1;
