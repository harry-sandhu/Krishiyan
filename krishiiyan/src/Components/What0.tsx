import React from "react";
import farmerimg from "../assets/Images/Farmer Empowerment.png";
import digital from "../assets/Images/Digitalizing.png";
import supplychain from "../assets/Images/supplychain.png";
import market from "../assets/Images/Market.png";
import quality from "../assets/Images/Quality.png";
import sustain from "../assets/Images/Sustainable.png";
import "./What0.css";

function What0() {
  const cardData = [
    {
      title: "Farmer Empowerment",
      para: "Access market information, quality assessment tools, and training resources to enhance productivity, quality, and profitability.",
      icon: farmerimg,
    },
    {
      title: "Digitizing and Automating",
      para: "Krishiyan works with agri-input dealers, Farmer Producers Organisation to operate more efficiently and effectively, helping them in assisting farmers for appropriate market linkages.",
      icon: digital,
    },
    {
      title: "Supply Chain Optimization",
      para: "Improve efficiency, transparency, and traceability in supply chains through digital platforms, logistic solutions, and data analytics.",
      icon: quality,
    },
    {
      title: "Market Access",
      para: "Connect with buyers, industries, and markets to access lucrative opportunities and maximize returns on agricultural investments.",
      icon: quality,
    },
    {
      title: "Quality Assurance",
      para: "Ensure product quality and consistency through advanced testing facilities, certification programs, and quality control measures.",
      icon: quality,
    },
    {
      title: "Sustainability Initiatives",
      para: "Promote sustainable agricultural practices, environmental stewardship, and social responsibility to build resilient and future-proof supply chains.",
      icon: sustain,
    },
  ];

  return (
    <section className="cardsection">
      <div>
        <h1 className="text-center text-black text-4xl font-bold pt-10">
          Our Services
        </h1>
        <p className="text-center text-black text-xl p-10">
          Krishiyan offers a range of services designed to meet the diverse
          needs of farmers, Farmer Producers Organisation, industries, and other
          stakeholders across the agricultural supply chain
        </p>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cardData.map((card, idx) => (
          <div
            key={idx}
            className="ourservice_card card bg-white shadow-lg rounded p-4 w-full flex flex-col justify-between mb-20"
          >
            {/* Icon image */}
            <img
              src={card.icon}
              alt={`Icon ${idx + 1}`}
              className="mb-4 mx-auto rounded-lg imgbx"
            />

            {/* Heading and Text */}
            <p className="para text-xl text-gray-700 p-5">{card.para}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default What0;
