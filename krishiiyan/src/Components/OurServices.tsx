import React from "react";
import { motion } from "framer-motion";


interface ServiceCardProps {
    title: string;
    description?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white border-2 hover:border-green-700 rounded-lg shadow-md p-6 m-2 md:w-1/2 lg:w-1/3 xl:w-[250px] cursor-pointer"
    >
        <h3 className="text-md font-bold text-green-700 mb-2 w-[200px]">{title}</h3>
    </motion.div>
);

interface OurServicesProps { }

const OurServices: React.FC<OurServicesProps> = () => {
    const servicesToFPOs = [
        "Farmer Member Management System",
        "Cultivation Insights and Data Analytics",
        "Seamless Networking with Industries",
        "Enquiry Posting and Sales Deal Connectivity",
        "Real-time Communication and Negotiation",
        "Transparent Trade Management",
        "Market Access and Business Growth Opportunities",
        "Training and Capacity Building",
        "Supply Chain Management",
        "Procurement and Sales Support",
    ];

    const servicesToIndustries = [
        "Sourcing high-quality agricultural products directly from farmers and FPOs",
        "Access to a vast network of verified farmers and FPOs",
        "Real-time price discovery and negotiation",
        "Streamlined procurement process",
        "Quality control and assurance",
        "Logistics and supply chain management support",
        "Market intelligence and trends analysis",
        "Customized solutions for specific industry needs",
        "Access to sustainable and traceable agricultural products",
        "Compliance with regulatory requirements",
    ];

    return (
        <section className="">
            <div className="container mx-auto px-4 ">

                {/* Top scrolling row */}
                <div className="overflow-x-hidden ">
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: -1400 }}
                        transition={{ duration: 40, repeat: Infinity }}
                        className="flex space-x-4"
                    >
                        {servicesToFPOs.map((service, index) => (
                            <ServiceCard key={index} title={service} />
                        ))}
                        {servicesToFPOs.map((service, index) => (
                            <ServiceCard key={index + servicesToFPOs.length} title={service} />
                        ))}
                    </motion.div>
                </div>
                <h2 className="text-3xl font-bold  text-center">Our Services to FPO</h2>
                {/* Center image */}
                <div className="text-center">
                    <img src="/Images/ourservices.gif" className="mx-auto" alt="Services Center Image" />
                </div>
                <h2 className="text-3xl font-bold  text-center">Our Services to Industries</h2>
                {/* Bottom scrolling row */}
                <div className="overflow-x-hidden">
                    <motion.div
                        initial={{ x: -1400 }}
                        animate={{ x: 0 }}  // Changed this line
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="flex space-x-4 w-[200px]"
                    >
                        {servicesToIndustries.map((service, index) => (
                            <ServiceCard key={index} title={service} />
                        ))}
                        {servicesToIndustries.map((service, index) => (
                            <ServiceCard key={index + servicesToIndustries.length} title={service} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default OurServices;
