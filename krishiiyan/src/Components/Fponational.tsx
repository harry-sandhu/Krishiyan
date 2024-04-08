import React from 'react';
import img from '../assets/Images/Announce.png';
import fpoimg from '../assets/Images/FPOimg.png';
import Preloader from './Preloader';
import Navbar from './Navbar';
import Footer from './Footer';
import fpowheat from '../assets/Images/fpowheat.png'
import fpofarmer from '../assets/Images/fpofarmer.png'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Fponational() {

    const navigate = useNavigate()
    function handleregisterclick() {
        navigate("/fporegister")
    }

    return (
        <>
            <Preloader />
            <Navbar />
            <section className="bg-cover bg-center h-[300px] sm:h-[400px] lg:h-[500px] relative" style={{ backgroundImage: `url(${img})` }}>
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-4 sm:p-6 md:p-8 lg:pl-10">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold">Announcements</h1>
                </div>
            </section>
            <div className='xl:m-20 sm:mt-5'>
                <div className="rounded-xl overflow-hidden">
                    <img src={fpoimg} alt="loading..." />
                </div>
                <h5 className='text-5xl m-2'>Welcome to the FPO Conference in Patna by Sahakar Bharati</h5>
                <div className='bg-blue-gray-50 flex justify-start flex-col items-start min-w-10 p-2 rounded-lg text-xl'>
                    <h3>Date:</h3>
                    <h3 className='inline-block'>Venue:</h3>
                </div>
                <div className='flex flex-col sm:flex-row xl:m-5 border-spacing-5 gap-5 '>
                    <div className="w-full sm:w-1/2 bg-blue-gray-50 rounded-xl p-2">
                        <h3 className='text-left text-3xl m-2'>About the Conference:</h3>
                        <p className='text-justify p-2'>
                            <span className='ml-5'>
                                Join us for an enriching and empowering experience at the Farmer Producer Organization (FPO) Conference organized by Sahakar Bharati. This conference aims to bring together farmers, stakeholders, experts, and policymakers to explore innovative solutions, share best practices, and foster collaboration in the agricultural sector.
                            </span>
                        </p>
                    </div>
                    <div className="w-full sm:w-1/2 bg-blue-gray-50 rounded-xl p-2">
                        <h3 className='text-left text-3xl'>Our Objectives:</h3>
                        <p className='text-justify p-2'>
                            <span className='ml-5'>
                                Facilitate knowledge exchange and networking opportunities among farmers and FPOs.
                                Showcase success stories and case studies of FPOs driving rural transformation.
                                Discuss policy frameworks and initiatives to support the growth of FPOs.
                                Explore avenues for technology adoption and market linkages for FPOs.
                                Empower farmers through capacity building workshops and training sessions.
                            </span>
                        </p>
                    </div>
                </div>
                <div className=' p-10 rounded-lg' style={{ backgroundImage: `url(${fpowheat})` }}>
                    <h4 className='text-3xl font-extrabold pb-5 '>Why to Attend?</h4>
                    <div className='bg-gray-400/50 rounded-xl'>
                        <ul className='text-justify list-disc pl-10 pb-5 pr-5'>
                            <li>Gain insights into the latest trends and developments in the agricultural sector.</li>
                            <li>Connect with like-minded individuals and organizations working towards rural development.</li>
                            <li>Learn from industry experts and thought leaders through interactive sessions and panel discussions.</li>
                            <li>Discover opportunities for collaboration, investment, and partnership in the FPO ecosystem.</li>
                            <li>Be a part of the collective effort to empower farmers and build a sustainable future for agriculture.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row xl:ml-5'>
                <div className='w-full md:w-1/2 mb-4 md:mb-0 pr-0 md:pr-4 sm:order-1'>
                    <img src={fpofarmer} alt='loading...' className="w-full rounded-md shadow-xl" />
                </div>
                <div className='w-full md:w-1/2 mt-4 md:mt-0 xl:mt-10 sm:order-2'>
                    <h5 className='text-3xl font-extrabold'>Who Should Attend?</h5>
                    <ul className='list-disc p-5 text-justify xl:leading-10 text-xl'>
                        <li>Farmers and farmer producer organizations (FPOs)</li>
                        <li>Agricultural cooperatives and self-help groups</li>
                        <li>Government representatives and policymakers</li>
                        <li>Agribusinesses, NGOs, and development agencies</li>
                        <li>Researchers, academics, and students passionate about agriculture</li>
                    </ul>
                </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">Registration</h3>
                <p className="text-center">
                    Secure your spot at the FPO Conference in Patna by registering online.
                </p>
                <Button style={{ backgroundColor: "rgb(132 204 22)", color: "white" }} onClick={handleregisterclick}>Click to Register</Button>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">Sahakar Bharati</h3>
                <p className="text-justify">
                    Sahakar Bharati is a non-governmental organization committed to promoting the cooperative movement and empowering rural communities across India. With a focus on agriculture and allied sectors, we strive to foster sustainable development and inclusive growth through cooperative principles and practices.
                </p>
            </div>
            <div className="bg-blue-gray-50 p-10 rounded-lg mt-10">
                <h2 className="text-2xl font-bold mb-5">Additional Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div className="bg-white p-5 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-3">Contact Us</h3>
                        <p className="text-justify">
                            For inquiries and assistance regarding the conference, feel free to reach out to us at....
                            We look forward to welcoming you to this transformative event!
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-3">Follow Us</h3>
                        <p className="text-justify">
                            Stay updated on the latest news and announcements about the FPO Conference by following us on social media. Join the conversation using #FPOConferencePatna and be a part of the dialogue shaping the future of agriculture.
                        </p>
                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
}

export default Fponational;
