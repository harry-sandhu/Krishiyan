import farmer from '../assets/Images/ourbeneficiaries.png'
import dealer from '../assets/Images/ourprocure.png'
import industry from '../assets/Images/ourindustry.png'

const TechCard = () => {
    const features = [
        {
            number: '01',
            title: 'Our Beneficiaries',
            description: 'We deliver our valuable services to farmers for proper cultivation practices and Market linkage.',
            items: [farmer]
        },
        {
            number: '02',
            title: 'Our Procurement Partners',
            description: 'We nurture agri-input dealers and FPOs with smart tools to assist farmers from seed to market.',
            items: [dealer]
        },
        {
            number: '03',
            title: 'Our Industry Partners',
            description: 'We assure quality and consistent supply to our Industry partners.',
            items: [industry]
        },
    ];

    return (
        <section className="pt-12 pb-12 bg-gray-100 mt-[-200px] relative">
            <h1 className="mb-20 font-extrabold text-4xl">Our Valuable Stakeholders</h1>
            <div className="container mx-auto px-4 sm:px-8">
                <div className="flex flex-wrap -mx-4 ">
                    {features.map((feature, index) => (
                        <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8 ">
                            <div className="relative border-r border-gray-200 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                                <div className="w-24 h-24 relative bg-white shadow-md mx-auto -mt-16">
                                    <div className="flex items-center justify-center w-24 h-24">
                                        {feature.items.map((item, idx) => (
                                            <img className='text-xl font-semibold' src={item} key={idx} />
                                        ))}
                                    </div>
                                </div>
                                <div className="relative mt-8 text-center">
                                    <div className="text-xl font-bold mb-4 flex items-center justify-center">
                                        <span className="mr-3 text-gray-500">{feature.number}</span>
                                        <span className="px-3 py-1 rounded-full bg-white shadow-md">{feature.title}</span>
                                    </div>
                                    <p className="text-gray-700">
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

