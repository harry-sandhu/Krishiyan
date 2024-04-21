import techimg from '../assets/Images/outech1.png'

const TechCard2 = () => {
    const points = [
        "Krishiyan employs advanced algorithms to dynamically match surplus agricultural produce with high-demand markets.",
        "By analyzing supply and demand data, these algorithms optimize market opportunities for farmers and enhance efficiency in the distribution of agricultural commodities.",
        "Krishiyan utilizes optimization algorithms to streamline logistics, minimize transportation costs, and optimize resource allocation.",
        "These algorithms ensure timely delivery of agricultural produce while reducing wastage and inefficiencies in the supply chain.",
        "Krishiyan ensures the integrity and authenticity of quality reports.",
        "Enables stakeholders to verify the quality of agricultural produce at every stage of the supply chain, fostering trust and accountability.",
        "Analyze vast amounts of data to provide farmers with valuable market insights, including demand trends, pricing fluctuations, and consumer preferences.",
        "This enables farmers to make informed decisions about crop selection, pricing strategies, and market timing."
    ];

    return (
        <div className="flex flex-col md:flex-row border p-4 sm:p-6 rounded-md shadow-md" style={{ backgroundColor: "rgb(235,255,235)" }}>
            <div className="w-full md:w-1/2 mb-4 md:mb-0 pr-0 md:pr-4">
                <img src={techimg} alt="Description" className="w-full rounded-md shadow-xl" />
            </div>
            <div className="w-full md:w-1/2  font-semibold text-lg">
                {/* <h2 className="text-xl font-semibold mb-4">KrishiYan works closely with Agri-input dealers to provide solutions for solving:</h2> */}
                <ul className="pl-6 list-disc leading-9">
                    {points.map((point, index) => (
                        <li key={index} className="mb-2 text-gray-800 text-justify">
                            {point}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TechCard2;


