import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function AppImage() {
    const imgStyle = {
        maxWidth: "295px",
        height: "550px",
        margin: "auto"
    };

    return (
        <>
            <div className='m-10 p-5 relative overflow-hidden'>
                <img src="/Images/car2.jpg" alt="Background Image" className="absolute inset-0 w-full h-full object-cover z-0" />
                <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>
                <div className="relative z-20">
                    <h1 className='font-extrabold text-2xl m-5 text-white'>Connect with our App</h1>
                    <Carousel showThumbs={false} autoPlay infiniteLoop swipeable interval={5000}>
                        <div style={{ ...imgStyle }}>
                            <img src={"/Images/Mandiprice.png"} alt="" style={imgStyle} />
                        </div>
                        <div style={{ ...imgStyle }}>
                            <img src={"/Images/Crop_lib.png"} alt="" style={imgStyle} />
                        </div>
                        <div style={{ ...imgStyle }}>
                            <img src={"/Images/Enquiry_dashboard.png"} alt="" style={imgStyle} />
                        </div>
                        <div style={{ ...imgStyle }}>
                            <img src={"/Images/farmer_dash.png"} alt="" style={imgStyle} />
                        </div>
                    </Carousel>
                </div>
            </div>
        </>
    );
}
