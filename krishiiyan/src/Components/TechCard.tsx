import farmer from '../assets/Images/ourbeneficiaries.png'
import dealer from '../assets/Images/ourprocure.png'
import industry from '../assets/Images/ourindustry.png'
import fpowheat from "../assets/Images/fpowheat.png";


const TechCard = () => {
    const features = [
        {
            number: '01',
            title: 'Smart Agri-Management',
            description: "Krishiyan's Farmer Member Management System utilizes cloud-based infrastructure, advanced data analytics, secure authentication, and mobile optimization to ensure seamless and efficient management of farmer members. With automated workflows, robust data backup, and integration with existing agricultural databases, our system enables precise data analysis and informed decision-making would assist FPOs for streamlined management.",
            items: [farmer]
        },
        {
            number: '02',
            title: 'Cultivation Intelligence',
            description: "Maintaining cultivation insights is crucial for FPOs to plan procurement and sales effectively. By tracking crop selection, soil health, irrigation, pest management, and yield expectations, FPOs can offer targeted support, negotiate better prices, reduce post-harvest losses, and make data-driven decisions. Krishiyan's Farmer Member Management System helps FPOs maintain these insights, driving sustainable agricultural growth and enhancing productivity",
            items: [dealer]
        },
        {
            number: '03',
            title: 'AgriConnect Hub',
            description: "Krishiyan's platform enables seamless networking between farmers, FPOs, and industries, facilitating easy posting of enquiries, connecting buyers and sellers for sales deals, and real-time communication. This streamlined process helps farmers and FPOs access new markets, industries source high-quality products, and all parties reduce transaction costs and improve profitability. The platform serves as a perfect marketplace for agricultural trade, empowering farmers, FPOs, and industries to grow their businesses together.",
            items: [industry]
        },
    ];

    return (
        <section className="pt-12 pb-12 bg-[#C8E6C9] relative " style={{ backgroundImage: `url(${fpowheat})` }}>
            <h1 className="mb-20 font-extrabold text-4xl text-[#3FC041]">Empowering Agriculture Through Innovation</h1>
            <div className="container mx-auto px-4 sm:px-8 ">
                <div className="flex flex-wrap -mx-4 ">
                    {features.map((feature, index) => (
                        <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8 ">
                            <div className="relative border-r border-gray-200 p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
                                <div className="w-24 h-24 relative bg-white shadow-md mx-auto -mt-16">
                                    <div className="flex items-center justify-center w-24 h-24">
                                        {feature.items.map((item, idx) => (
                                            <img className='text-xl font-semibold' src={item} key={idx} />
                                        ))}
                                    </div>
                                </div>
                                <div className="relative mt-8 text-center h-[320px] ">
                                    <div className="text-xl font-bold mb-4 flex items-center justify-center">
                                        <span className="mr-3 text-gray-500">{feature.number}</span>
                                        <span className="px-3 py-1 rounded-full bg-white shadow-md">{feature.title}</span>
                                    </div>
                                    <p className="text-gray-700 text-justify ">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TechCard;

