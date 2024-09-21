import techbanner from '../assets/Images/ourtech.png'
// style={{ backgroundImage: `url(${techbanner})` }}
const TechBanner = () => {
    return (
        <section className="bg-cover bg-bottom h-[300px] sm:h-[400px] md:h-[500px] relative" >

            <img src={techbanner} alt="" className='xl:h-[500px] xl:w-full' />
            <div className="absolute top-[15%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 px-4">
                {/* <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold xl:mr-[300px] ">Our Technology</h1> */}
            </div>
        </section>
    )
}

export default TechBanner;
