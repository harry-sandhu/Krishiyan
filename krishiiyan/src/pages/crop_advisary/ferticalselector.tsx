import React, { useState } from "react";
import FerticalPage from "./Ferticalnew";
import FerticalReconPage from "./ferticalrecomander";

const PageSelector: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("fertical");

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h1>Page Selector</h1>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="fertical">Fertical</option>
        <option value="ferticalrecon">Fertical Recon</option>
      </select>

      {selectedOption === "fertical" && <FerticalPage />}
      {selectedOption === "ferticalrecon" && <FerticalReconPage />}
    </div>
  );
};

export default PageSelector;
