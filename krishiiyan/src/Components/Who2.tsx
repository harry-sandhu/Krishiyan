import React from 'react';
import welcome from '../assets/Images/revolution.png';

const Who2 = () => {
  return (
    <>
      <div className="bg-green-400 h-4 w-full mt-5"></div>
      <div className="flex justify-between items-center w-full p-5">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-black-700 mx-auto">About KrishiYan</h1>
        <img src="/Images/logo1.png" alt="Logo" className="h-20 hidden sm:block" />
      </div>
      <section className="flex flex-col md:flex-row items-stretch justify-between p-10 space-y-10 md:space-y-0">
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <img
            src="/Images/home-3.png"
            alt="Description for the Image"
            className="w-full max-h-[400px] md:max-h-[600px] object-cover rounded-3xl shadow-md"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-6">
          <ul className="font-bold text-justify p-10 text-xl leading-10">
            <li className="list-disc">Wetacre Sustainable Solutions Private Limited is a Gujarat-based startup founded in 2021 with the motive to encourage farming activity by integrating technology and real-time data to support farmers through Farmer Producer Organizations (FPOs).</li>
            <li className="list-disc">Our main objective is nurturing FPOs for systematic management of farmers and increasing the farmer engagement.</li>
            <li className="list-disc">The company works in the Phygital model, where Farmers can go to the FPO to sell their produces, to take the Input supply from FPO.</li>
          </ul>
        </div>
      </section>
      <div className="bg-green-400 h-4 w-full mt-5"></div>
    </>
  );
};

export default Who2;
