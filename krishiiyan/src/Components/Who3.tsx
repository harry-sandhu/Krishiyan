import ExploreMe from "./ExploreMe";
import mission from '../assets/Images/ourmission.png'
import vision from '../assets/Images/ourvision.png'
import { useNavigate } from "react-router-dom";


const Who3 = () => {

  const navigate = useNavigate()
  const readmore = () => {
    navigate('/login')
  }
  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-between p-10 bg-green-100 space-y-10 md:space-y-0">
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold text-green-700 ">Our Mission</h1>
          <p className="text-xl leading-relaxed  text-left">
            Krishiyan is committed to driving positive change in the agricultural sector by:
          </p>
          <div className="text-xl leading-relaxed  text-justify px-7">
            <ul>
              <li className="font-extrabold  list-decimal text-green-700" >Empowering Farmers:</li>
              <p className=""> We provide farmers with the tools, knowledge, and market access they need to maximize their yields, improve quality, and achieve fair prices for their produce.
              </p>

              <li className="font-extrabold list-decimal text-green-700">Streamlining Supply Chains:</li>
              <p className="">
                We optimize supply chains through strategic partnerships, technology integration, and data-driven insights, reducing inefficiencies and ensuring seamless transactions from farm to market.
              </p>
              <li className="font-extrabold list-decimal text-green-700">Fostering Collaboration: </li>
              <p className="">
                We foster collaboration among stakeholders, including farmers, agri-input dealers, industries, and buyers, to create mutually beneficial relationships and promote shared success.
              </p>
            </ul>
          </div>
          {/* 
            Krishiyan empowers Agri input dealers and other farming communities
            with innovative crop production technologies made available to
            farmers of remotest locations in the country with the ultimate aim
            to uplift the farmers by increasing per acre productivity. */}

          {/* <ExploreMe /> */}
        </div>

        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <img
            src={mission}
            alt="Description for the Image"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
      </section >


      <section className="flex flex-col-reverse md:flex-row items-center justify-between p-10 bg-green-100 space-y-10 md:space-y-0">
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <img
            src={vision}
            alt="Description for the Image"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold text-green-700">Our Vision</h1>
          <p className="text-xl leading-relaxed px-5">
            Our vision is to create a sustainable and inclusive agricultural ecosystem where every farmer has the opportunity to thrive, every buyer has access to quality produce, and every stakeholder benefits from transparent and efficient supply chains.
            {/* 
            Our vision is to bring prosperity and growth to farmers for a
            far-reaching impact on global food production. */}
          </p>
          <button className="bg-white hover:bg-[#f8f7fc] text-[#3bc238] hover:text-blue-500 px-6 py-2 rounded text-lg font-bold transition-colors duration-300 mx-auto" onClick={readmore}>
            Read More
          </button>
        </div>
      </section>

    </>
  );
};

export default Who3;
