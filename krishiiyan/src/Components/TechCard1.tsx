import { useState } from 'react'
import mobile1 from '../assets/Images/mobile1.png'
import mobile4 from '../assets/Images/mobile2.png'
import mobile2 from '../assets/Images/home1.png'
import mobile3 from '../assets/Images/home2.png'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';


const slides = [
    {
        image: mobile1,
        content: "Easy Farmer Data Maintenance"
    },
    {
        image: mobile2,
        content: "Maintain Crop Calendar Remainders"
    },
    {
        image: mobile3,
        content: "Optimize Fertilizer Usage"
    },
    {
        image: mobile4,
        content: "Know The Recent Market Trends"
    }

]
const TechCard1 = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex)
    }
    const nextSlide = () => {
        const isNextSlide = currentIndex === slides.length - 1;
        const newIndex = isNextSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex)
    }
    return (

        <>
            <div className='max-w-[1400px] h-[900px] w-full m-auto py-16 px-4 relative'>
                <div className=' rounded-2xl duration-500  md:flex justify-center items-center' >
                    <p className='font-extrabold text-4xl text-green-700'>"{slides[currentIndex].content}"</p>
                    <img src={slides[currentIndex].image} alt='loading...' className='w-[300px] h-[550px] p-5 ' />
                </div>
                <div className='absolute top-[35%] -translate-x-0 transition-y-[-50] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer '>
                    <BsChevronCompactLeft size={30} onClick={prevSlide} />
                </div>
                <div className='absolute top-[35%] -translate-x-0 transition-y-[-50] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer '>
                    <BsChevronCompactRight size={30} onClick={nextSlide} />
                </div>

            </div>
        </>
    );
}

export default TechCard1;
