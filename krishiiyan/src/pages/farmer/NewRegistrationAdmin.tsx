import React, { useState, useEffect } from "react";
import Header from "../../Components/layouts/Header";

interface Crop {
  cropName: string;
}

interface Farmer {
  name: string;
  mobile: string;
  state: string;
  city: string;
  zip: string;
  street: string;
  mobileIsWhatsapp: boolean;
  totalLandArea: string;
  dealer_farmer_relation: string;
  plantation_type: string;
  dealer_mobile: string;
  crops: Crop[];
}

const FarmersList: React.FC = () => {
  const [dealerMobile, setDealerMobile] = useState("");
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchField, setSearchField] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOptions, setSearchOptions] = useState<string[]>([]);

  useEffect(() => {
    const storedDealerMobile = localStorage.getItem("dealermobile");
    if (storedDealerMobile) {
      setDealerMobile(storedDealerMobile);
    }
  }, []);

  useEffect(() => {
    if (dealerMobile) {
      fetchFarmers();
    }
  }, [dealerMobile]);

  useEffect(() => {
    updateSearchOptions();
  }, [farmers, searchField]);

  const fetchFarmers = async () => {
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

  const updateSearchOptions = () => {
    if (!farmers.length || !searchField) {
      return;
    }

    const availableOptions = new Set<string>();
    farmers.forEach((farmer) => {
      if (searchField === "crops") {
        farmer.crops.forEach((crop) => availableOptions.add(crop.cropName));
      } else {
        // Assert searchField as keyof Farmer
        const fieldValue = farmer[searchField as keyof Farmer];

        // Convert field value to string before adding to availableOptions
        availableOptions.add(String(fieldValue));
      }
    });

    setSearchOptions(Array.from(availableOptions));
  };

  const handleSearch = (farmer: Farmer) => {
    if (!searchField || !searchQuery) {
      return true; // If no searchField or searchQuery, return true for all farmers
    }

    // Assert searchField as a key of Farmer
    const fieldValue =
      searchField === "crops"
        ? farmer.crops.map((crop) => crop.cropName).join(", ")
        : String(farmer[searchField as keyof Farmer]);

    // Perform the search
    return fieldValue.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const handleSort = (a: Farmer, b: Farmer) => {
    if (!sortField) {
      return 0;
    }

    // Convert the property access to Farmer type
    const aValue = a[sortField as keyof Farmer];
    const bValue = b[sortField as keyof Farmer];

    // Handle the case where the values might be undefined
    if (aValue === undefined || bValue === undefined) {
      return 0; // Consider them equal if one is undefined
    }

    if (sortOrder === "asc") {
      return aValue.toString().localeCompare(bValue.toString());
    } else {
      return bValue.toString().localeCompare(aValue.toString());
    }
  };

  const filteredAndSortedFarmers = farmers
    .filter(handleSearch)
    .sort(handleSort);

  return (
    <>
      <div className="container mx-auto my-8">
        <Header title="Farmer Relationship Management" subtitle="Dashboard" />
        <h1 className="text-2xl font-bold mb-4">Farmers Data</h1>

        {/* Search Bar */}
        <div className="flex items-center mb-4">
          <label htmlFor="searchField" className="mr-2">
            Search by:
          </label>
          <select
            id="searchField"
            value={searchField || ""}
            onChange={(e) => {
              setSearchField(e.target.value);
              setSearchQuery(""); // Reset search query when search field changes
            }}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          >
            <option value="" disabled>
              Select Field
            </option>
            <option value="name">Name</option>
            <option value="state">State</option>
            <option value="city">City</option>
            <option value="mobile">Mobile</option>
            <option value="zip">Zip</option>
            <option value="street">Street</option>
            <option value="mobileIsWhatsapp">Mobile Is WhatsApp</option>
            <option value="totalLandArea">Total Land Area</option>
            <option value="dealer_farmer_relation">
              Dealer-Farmer Relation
            </option>
            <option value="plantation_type">Plantation Type</option>
            <option value="dealer_mobile">Dealer Mobile</option>
            <option value="crops">Crops</option>
          </select>
          <select
            id="searchQuery"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="">Select an option</option>
            {searchOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting Options */}
        <div className="flex items-center mb-4">
          <label htmlFor="sortField" className="mr-2">
            Sort by:
          </label>
          <select
            id="sortField"
            value={sortField || ""}
            onChange={(e) => setSortField(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          >
            <option value="" disabled>
              Select Field
            </option>
            <option value="name">Name</option>
            <option value="state">State</option>
            <option value="city">City</option>
            <option value="mobile">Mobile</option>
            <option value="zip">Zip</option>
            <option value="street">Street</option>
            <option value="mobileIsWhatsapp">Mobile Is WhatsApp</option>
            <option value="totalLandArea">Total Land Area</option>
            <option value="dealer_farmer_relation">
              Dealer-Farmer Relation
            </option>
            <option value="plantation_type">Plantation Type</option>
            <option value="dealer_mobile">Dealer Mobile</option>
            <option value="crops">Crops</option>
          </select>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Farmers List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg-grid-cols-4 gap-4">
          {filteredAndSortedFarmers.map((farmer, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <p className="text-xl font-semibold mb-2">{farmer.name}</p>
              <p className="text-gray-600 mb-2">Mobile: {farmer.mobile}</p>
              <p className="text-gray-600 mb-2">State: {farmer.state}</p>
              <p className="text-gray-600 mb-2">City: {farmer.city}</p>
              <p className="text-gray-600 mb-2">Zip: {farmer.zip}</p>
              <p className="text-gray-600 mb-2">Street: {farmer.street}</p>
              <p className="text-gray-600 mb-2">
                Mobile Is WhatsApp: {farmer.mobileIsWhatsapp ? "Yes" : "No"}
              </p>
              <p className="text-gray-600 mb-2">
                Total Land Area: {farmer.totalLandArea}
              </p>
              <p className="text-gray-600 mb-2">
                Dealer-Farmer Relation: {farmer.dealer_farmer_relation}
              </p>
              <p className="text-gray-600 mb-2">
                Plantation Type: {farmer.plantation_type}
              </p>
              <p className="text-gray-600 mb-2">
                Dealer Mobile: {farmer.dealer_mobile}
              </p>
              <p className="text-gray-600 mb-2">Crops:</p>
              <ul className="list-disc pl-4">
                {farmer.crops.length > 0 ? (
                  farmer.crops.map((crop, i) => (
                    <li key={i}>{crop.cropName}</li>
                  ))
                ) : (
                  <p className="text-gray-600 mb-2">No crops available</p>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FarmersList;
