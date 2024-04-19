import techimg from '../assets/Images/techimg2.png';

const TechCard4 = () => {
    const points = [
        "Krishiyan ensures the integrity and authenticity of quality reports. This enables stakeholders to verify the quality of agricultural produce at every stage of the supply chain, fostering trust and accountability.",
        "Analyze vast amounts of data to provide farmers with valuable market insights, including demand trends, pricing fluctuations, and consumer preferences. This enables farmers to make informed decisions about crop selection, pricing strategies, and market timing."
    ];

    return (
        <div className="flex flex-col md:flex-row border p-4 sm:p-6 rounded-md shadow-md" style={{ backgroundColor: "rgb(152,223,152)" }}>
            <div className="w-full md:w-1/2 order-2 md:order-1 xl:mt-20 font-semibold text-lg">
                {/* <h2 className="text-xl font-semibold mb-4">KrishiYan works closely with Agri-input dealers to provide solutions for solving:</h2> */}
                <ul className="pl-6 list-disc">
                    {points.map((point, index) => (
                        <li key={index} className="mb-2 text-gray-700 text-justify">
                            {point}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 mb-4 md:mb-0 pr-0 md:pr-4 md:ml-10">
                <img src={techimg} alt="Description" className="w-full rounded-md shadow-xl" />
            </div>
        </div>
    );
}

export default TechCard4;
