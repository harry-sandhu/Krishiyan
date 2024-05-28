import React, { useState } from "react";
import FerticalPage from "./Ferticalnew";
import FerticalReconPage from "./ferticalrecomander";
import Header from "../../Components/layouts/Header";

const PageSelector: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("fertical");

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <Header title="Crop Advisory" subtitle="Fertical" />
      <div className="grid  z-0 mt-5 flex-row items-center w-full mobile:top-[17vh] mobile:absolute mobile:left-0 mobile:flex-col mobile:flex mobile:gap-y-4">
        <h1 className="text-2xl font-bold text-center mb-4">Page Selector</h1>
        <div className="flex justify-center mb-4">
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="bg-white shadow rounded px-4 py-2"
          >
            <option value="fertical">Fertical</option>
            <option value="ferticalrecon">Fertical Recon</option>
          </select>
        </div>

        <div className="p-4">
          {selectedOption === "fertical" && <FerticalPage />}
          {selectedOption === "ferticalrecon" && <FerticalReconPage />}
        </div>
      </div>
    </div>
  );
};

export default PageSelector;
