import React from 'react';
import tc from '../assets/Images/t&c.png';
import './CustomStyles.css';


const FlowChart = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full p-4 md:p-8 lg:p-16 text-2xl">
            <div className='h-2 bg-[#3FC041] w-full mb-10'></div>
            <h1 className='text-5xl mb-14 font-extrabold'>How KrishiYan Works?</h1>
            <div className="flex flex-col items-center w-full max-w-6xl">
                <div className="flex w-full border-t-4 border-b-2 border-green-500 md:flex-row flex-col space-x-4 md:space-x-8 lg:space-x-20 relative rounded-tr-full rounded-br-full border-r-4 whitebg ">
                    {[
                        {
                            number: 1,
                            title: "Clustering Farmers",
                            icon: "/Images/Farmer.svg",
                        },
                        {
                            number: 2,
                            title: "Variety and Quality",
                            icon: "/Images/leaf.svg",
                        },
                        {
                            number: 3,
                            title: "Procurement by FPOs",
                            icon: "/Images/members.svg",
                        },
                        {
                            number: 4,
                            title: "Primary processing",
                            icon: "/Images/processing.svg",
                        },
                    ].map((step, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center flex-1 p-4 md:p-6 lg:p-8 space-x-10"
                        >
                            <div className=" flex flex-col items-center">
                                <div className="cntdot w-4 h-4 bg-green-500 rounded-full relative " />
                                <div className="mt-6 text-2xl font-bold">{step.number}</div>
                                <div className="text-center">{step.title}</div>
                                <img src={step.icon} alt={step.title} className="w-28 h-20 mt-2" />
                            </div>
                        </div>
                    ))}

                </div>
                <div className="flex w-full border-t-4 border-green-500 border-l-4 border-b-4 rounded-bl-full rounded-tl-full  md:flex-row flex-col space-x-10 md:space-x-16 lg:space-x-24 whitebg1 relative">
                    {[
                        {
                            number: 5,
                            title: "Quality check",
                            icon: "/Images/Qualityverified.svg",
                        },
                        {
                            number: 6,
                            title: "Marketability",
                            icon: "/Images/marketability.svg",
                        },
                        {
                            number: 7,
                            title: "Logistics",
                            icon: "/Images/logistics.svg",
                        },
                        {
                            number: 8,
                            title: "Payment terms",
                            icon: "/Images/t&c.svg",
                        },
                    ].map((step, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center flex-1 p-4 md:p-6 lg:p-8 space-x-10"
                        >
                            <div className="relative flex flex-col items-center ">
                                <div className="cntdot1 relative w-4 h-4 bg-green-500 rounded-full" />
                                <div className="mt-6 text-2xl font-bold">{step.number}</div>
                                <div className="text-center">{step.title}</div>
                                <img src={step.icon} alt={step.title} className="w-28 h-20 mt-2" />
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <div className='flex space-x-10 mt-10'>
                <div className='hidden sm:block'>
                    <div className='arrow-left h-2 w-96 bg-[#3FC041] mt-10 relative'></div>
                    <h1 className='mt-5'>End-End Streamlining process</h1>
                </div>
                <img src="/Images/logo.png" alt="Loading.." className='h-24 w-24' />
                <div className='hidden sm:block'>
                    <div className='arrow-right h-2 w-96 bg-[#3FC041] mt-10 relative'></div>
                    <h1 className='mt-5'>Quality and Transparency</h1>
                </div>
            </div>
            <div className='mt-5 h-2 bg-[#3FC041] w-full mb-10'></div>
        </div>
    );
};

export default FlowChart;
