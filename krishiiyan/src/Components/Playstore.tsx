import React from 'react'

function Playstore() {
    return (
        <>
            <div className='bg-green-200 xl:h-[250px] sm:h-[50px] w-full flex space-x-10 container m-auto'>
                <div>
                    <h1 className='xl:text-6xl md:font-bold xl:pl-10 xl:mt-5 font-serif md:text-2xl'>Download Our App</h1>
                    <p className='xl:text-left xl:text-3xl xl:pl-10 font-serif'>From Playstore</p>
                    <img src="/Images/google-play-badge.svg" alt="loading..." className='xl:mt-[-20px] mx-10 h-[150px] w-[250px]' />
                </div>
                <div>
                    <img src="/Images/Section2.png" alt="loading" className='xl:h-[250px]' />
                </div>
            </div>
        </>
    )
}

export default Playstore