import { ClassNames } from '@emotion/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Team() {
    const navigate = useNavigate();

    const handleImageClick = () => {
        navigate(""); // Replace "/desired-link" with your path
    };
    return (
        <section className='bg-[#C0DDFF] font-bold pt-10 mt-5' id='team'>
            <h1 className='font-bold text-2xl sm:text-3xl '>Team KrishiYan</h1>
            <div className='h-1 w-14 rounded-xl bg-[#616161] m-auto mt-2'></div>
            <div className='xl:flex mt-14 pb-5'>
                <figure className='w-full sm:w-1/2 mb-7'>
                    <img src={"/Images/Ankit_photo.jpg"} alt="Ankit Mutpe" style={{ height: 230, width: 230 }} className="mx-auto rounded-full object-cover  outline outline-[10px] ring-[15px] ring-[#77CD94] outline-[#3FC041] " />
                    <figcaption className='xl:mx-12 mt-5 text-lg font-bold '>Ankit Mutpe</figcaption>
                    <figcaption className='text-gray-800 mx-12'>Founder & Director</figcaption>
                    <div className='flex w-24 justify-center m-auto'>
                        <img src="/Images/skill-icons_linkedin.png" alt="loading" className='m-auto h-[22px] w-[22px] hover:cursor-pointer' onClick={() => window.open("http://linkedin.com/in/ankit-ajay-mudpe-27401a169", "_blank")} />
                        <img src="/Images/e-mail-filled.png" alt="loading" className='m-auto h-[22px] w-[22px] hover:cursor-pointer' onClick={() => window.open("mailto: ankit@krishiyan.com", "_blank")} />
                    </div>
                </figure>
                <figure className='w-full sm:w-1/2 mb-7'>
                    <img src={"/Images/Priya.jpeg"} alt="Priyadharshini" style={{ height: 230, width: 230 }} className="mx-auto rounded-full object-cover outline outline-[10px] ring-[15px] ring-[#77CD94] outline-[#3FC041]" />
                    <figcaption className=' xl:mx-12 mt-5 text-lg font-bold '>Priyadharshini</figcaption>
                    <figcaption className='text-gray-800  mx-12'>Founder & Director</figcaption>
                    <div className='flex w-24 justify-center m-auto'>
                        <img src="/Images/skill-icons_linkedin.png" alt="loading" className='m-auto h-[22px] w-[22px] hover:cursor-pointer' onClick={() => window.open("https://www.linkedin.com/in/priyadharsinispd/", "_blank")} />
                        <img src="/Images/e-mail-filled.png" alt="loading" className='m-auto h-[22px] w-[22px] hover:cursor-pointer' onClick={() => window.open("mailto: priya@krishiyan.com", "_blank")} />
                    </div>
                </figure>
                <figure className='w-full sm:w-1/2 mb-7'>
                    <img src={"/Images/Murali_photo.jpeg"} alt="Murali" style={{ height: 230, width: 230 }} className="mx-auto rounded-full object-cover outline outline-[10px] ring-[15px] ring-[#77CD94] outline-[#3FC041]" />
                    <figcaption className=' xl:mx-12 mt-5 text-lg font-bold '>Murali</figcaption>
                    <figcaption className='text-gray-800  mx-12'>Web Developer</figcaption>
                    <div className='flex w-24 justify-center m-auto'>
                        <img src="/Images/skill-icons_linkedin.png" alt="loading" className='m-auto h-[22px] w-[22px] hover:cursor-pointer' onClick={() => window.open("https://www.linkedin.com/in/murali-k-738935189/", "_blank")} />
                        <img src="/Images/e-mail-filled.png" alt="loading" className='m-auto h-[22px] w-[22px] hover:cursor-pointer' onClick={() => window.open("mailto: info@krishiyan.com", "_blank")} />
                    </div>
                </figure>
                {/* <figure className='w-full sm:w-1/2 m-5'>
                    <img src={"/Images/chaitali.jpg"} alt="Vaibhav" style={{ height: 230, width: 230 }} className="mx-auto rounded-full object-cover outline outline-[10px] ring-[15px] ring-[#77CD94] outline-[#3FC041]" />
                    <figcaption className=' xl:mx-12 mt-5 text-lg font-bold '>Chaitali</figcaption>
                    <figcaption className='text-gray-800  mx-12'>App Developer</figcaption>
                    <div className='flex w-24 justify-center m-auto'>
                        <img src="/Images/skill-icons_linkedin.png" alt="loading" className='m-auto h-[22px] w-[22px]' />
                        <img src="/Images/e-mail-filled.png" alt="loading" className='m-auto h-[22px] w-[22px]' />
                    </div>
                </figure> */}
            </div>
        </section>
    );
}

export default Team;
