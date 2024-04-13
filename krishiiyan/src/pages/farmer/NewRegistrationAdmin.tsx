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
        `${process.env.REACT_APP_BACKEND_URL}/farmers/farmers/${dealerMobile}`
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {farmers.map((farmer, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <p className="text-xl font-semibold mb-2">{farmer.name}</p>
            <p className="text-gray-600 mb-2">Mobile: {farmer.mobile}</p>
            <p className="text-gray-600 mb-2">State: {farmer.state}</p>
            <p className="text-gray-600 mb-2">City: {farmer.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmersList;
