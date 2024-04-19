import { useEffect } from "react";
import whoare from '../assets/Images/whoarebanner.png';
// style={{ backgroundImage: `url(${whoare})` }}
const Who1 = () => {
  return (
    <section
      className="bg-cover bg-bottom h-[300px] sm:h-[400px] md:h-[500px] relative"

    >
      <img src={whoare} alt="loading..." className="xl:h-[500px] w-full" />
      {/* Uncomment and adjust the following div if you want to add text or other content over the image */}
      {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-3xl sm:text-4xl md:text-6xl text-white font-bold text-shadow-md">
          Who are we?
        </h1>
      </div> */}
    </section>
  );
};

export default Who1;
