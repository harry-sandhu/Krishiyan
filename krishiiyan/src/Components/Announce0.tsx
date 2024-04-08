import React from 'react';
import img from '../assets/Images/Announce.png';

function Announce0() {
    return (
        <>
            <section className="bg-cover bg-center h-[300px] sm:h-[400px] lg:h-[500px] relative" style={{ backgroundImage: `url(${img})` }}>
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-4 sm:p-6 md:p-8 lg:pl-10">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold">Announcements</h1>
                </div>
            </section>
            {/* <div className='flex  w-full'>
                <div className='animate-loop-scroll'>
                    <p>Announcements will scroll here</p>
                </div>
                <div className='animate-loop-scroll' aria-hidden="true">
                    <p></p>
                </div>
            </div> */}
        </>
    );
}

export default Announce0;
