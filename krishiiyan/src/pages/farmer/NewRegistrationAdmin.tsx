// components/FarmersList.tsx

import React, { useState } from "react";

interface Farmer {
  name: string;
  mobile: string;
  state: string;
  city: string;
}

const FarmersList: React.FC = () => {
  const [dealerMobile, setDealerMobile] = useState("");
  const [farmers, setFarmers] = useState<Farmer[]>([]);

  const getFarmers = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/farmers`
      );
      const data = await response.json();
      setFarmers(data);
    } catch (error) {
      console.error("Error fetching farmers:", error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">Farmers Data</h1>
      <div className="flex items-center mb-4">
        <label htmlFor="dealerMobile" className="mr-2">
          Enter Dealer Mobile:
        </label>
        <input
          type="text"
          id="dealerMobile"
          value={dealerMobile}
          onChange={(e) => setDealerMobile(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        />
        <button
          onClick={getFarmers}
          className="ml-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      <ul>
        {farmers.map((farmer, index) => (
          <li key={index} className="mb-2">
            <p>Name: {farmer.name}</p>
            <p>Mobile: {farmer.mobile}</p>
            <p>State: {farmer.state}</p>
            <p>City: {farmer.city}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FarmersList;
