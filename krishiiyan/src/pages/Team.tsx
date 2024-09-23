import React from 'react';
import ankitimg from '../assets/Images/profile.webp';

function Team() {
    return (
        <>
            <section className='bg-green-200 p-4 sm:p-10 font-bold'>
                <h1 className='font-extrabold text-2xl sm:text-3xl p-4 sm:p-10'>Team KrishiYan</h1>
                <div className='xl:flex'>
                    <figure className='w-full sm:w-1/4 m-5'>
                        <img src={"/Images/Ankit_photo.jpg"} alt="Ankit Mutpe" style={{ height: 350, width: 250 }} className="mx-auto rounded-3xl object-cover" />
                        <figcaption className='xl:text-left xl:mx-12 mt-5 text-lg font-bold '>Ankit Mutpe</figcaption>
                        <figcaption className='text-gray-800 xl:text-left mx-12'>Co-Founder</figcaption>
                    </figure>
                    <figure className='w-full sm:w-1/4 m-5'>
                        <img src={"/Images/Priya.jpeg"} alt="Priyadharshini" style={{ height: 350, width: 250 }} className="mx-auto rounded-3xl object-cover" />
                        <figcaption className='xl:text-left xl:mx-12 mt-5 text-lg font-bold '>Priyadharshini</figcaption>
                        <figcaption className='text-gray-800 xl:text-left mx-12'>Co-Founder</figcaption>
                    </figure>
                    <figure className='w-full sm:w-1/4 m-5'>
                        <img src={"/Images/Murali_photo.jpeg"} alt="Murali" style={{ height: 350, width: 250 }} className="mx-auto rounded-3xl object-cover" />
                        <figcaption className='xl:text-left xl:mx-12 mt-5 text-lg font-bold '>Murali</figcaption>
                        <figcaption className='text-gray-800 xl:text-left mx-12'>Developer</figcaption>
                    </figure>
                    <figure className='w-full sm:w-1/4 m-5'>
                        <img src={"/Images/chaitali.jpg"} alt="Vaibhav" style={{ height: 350, width: 250 }} className="mx-auto rounded-3xl object-cover" />
                        <figcaption className='xl:text-left xl:mx-12 mt-5 text-lg font-bold '>Chaitali</figcaption>
                        <figcaption className='text-gray-800 xl:text-left mx-12'>Developer</figcaption>
                    </figure>
                </div>
            </section>
        </>
    );
}

export default Team;
