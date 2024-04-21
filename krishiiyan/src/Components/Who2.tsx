import LearnMoreButton from "./LearnMoreButton";
import welcome from '../assets/Images/revolution.png'
const Who2 = () => {
  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-between p-10 space-y-10 md:space-y-0">
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold text-green-700">"Welcome to KrishiYan" </h1>
          <h1 className="text-2xl"> Revolutionizing Agricultural Supply Chains </h1>
          <p className="text-xl leading-relaxed text-center p-5">
            Krishiyan is a pioneering platform dedicated to transforming the agricultural landscape by bridging the gap between farmers and markets. Our innovative approach leverages technology, strategic partnerships, and sustainable practices to empower farmers, streamline supply chains, and create a more resilient and profitable agricultural sector.
          </p>
        </div>

        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <img
            src={welcome}
            alt="Description for the Image"
            className="w-full h-25 object-cover rounded-lg shadow-md"
          />
        </div>
      </section>

      <section className="flex flex-col-reverse md:flex-row items-center justify-between p-10 space-y-10 md:space-y-0">
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <img
            src="Images\imageonline-co-compressed.jpg"
            alt="Description for the Image"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold text-green-700">About KrishiYan</h1>
          <p className="text-xl leading-relaxed mx-5">
            At Krishiyan, we are passionate about revolutionizing the way agricultural commodities are sourced, traded, and delivered. Our platform serves as a catalyst for change, empowering farmers with market insights, quality assessment tools, and direct access to buyers, while ensuring industries receive consistent, high-quality supplies at competitive prices.

            {/* 
            KrishiYan is the brand of WetAcre Sustainable Solutions LLP, a SaaS
            platform for Agri-input dealers to assist farmers from selecting a
            crop variety to helping them in marketing the farm produces. */}
          </p>
        </div>
      </section>
    </>
  );
};

export default Who2;
