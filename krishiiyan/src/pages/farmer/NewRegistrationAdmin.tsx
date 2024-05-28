import React, { useState, useEffect } from "react";
import Header from "../../Components/layouts/Header";
import * as XLSX from "xlsx";
import { GiFarmTractor } from "react-icons/gi";
import { FaCity } from "react-icons/fa";
import { RiUserLocationFill } from "react-icons/ri";
import { GiWheat } from "react-icons/gi";
import { FiPhoneCall } from "react-icons/fi";
import { MdFileDownload } from "react-icons/md";

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

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(filteredAndSortedFarmers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Farmers Data");
    XLSX.writeFile(wb, "farmers_data.xlsx");
  };

  return (
    <>
      <div>
        <Header title="Farmer Relationship Management" subtitle="Dashboard" />
        <div className="mobile:top-[10vh] mobile:absolute mobile:left-[2vh] mobile:right-[2vh]  mobile:flex-col mobile:flex mobile:gap-y-[8vh]">
          <h1 className="text-4xl font-extrabold mb-4 text-green-700 mt-20 xl:mt-5 p-5 rounded-lg">
            Farmers Data
          </h1>
          <div className="ml-8">
            <div className="xl:flex xl:space-x-[600px]">
              <div>
                {/* Search Bar */}
                <div className="xl:flex items-center mb-4">
                  <label
                    htmlFor="searchField"
                    className="mr-2 text-green-600 font-bold text-lg"
                  >
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
                    {/* <option value="state">State</option> */}
                    <option value="city">City</option>
                    <option value="mobile">Mobile</option>
                    {/* <option value="zip">Zip</option>
                  <option value="street">Street</option>
                  <option value="mobileIsWhatsapp">Mobile Is WhatsApp</option> */}
                    <option value="totalLandArea">Total Land Area</option>
                    {/* <option value="dealer_farmer_relation">
                    Dealer-Farmer Relation
                  </option> */}
                    <option value="plantation_type">Plantation Type</option>
                    {/* <option value="dealer_mobile">Dealer Mobile</option> */}
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
                <div className="xl:flex items-center mb-4">
                  <label
                    htmlFor="sortField"
                    className="mr-2 text-green-600 font-bold text-lg"
                  >
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
                    {/* <option value="state">State</option> */}
                    <option value="city">City</option>
                    <option value="mobile">Mobile</option>
                    {/* <option value="zip">Zip</option>
                  <option value="street">Street</option>
                  <option value="mobileIsWhatsapp">Mobile Is WhatsApp</option> */}
                    <option value="totalLandArea">Total Land Area</option>
                    {/* <option value="dealer_farmer_relation">
                    Dealer-Farmer Relation
                  </option> */}
                    <option value="plantation_type">Plantation Type</option>
                    {/* <option value="dealer_mobile">Dealer Mobile</option> */}
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
              </div>
              <div className="bg-white rounded-lg p-4">
                {/* Farmer data display */}
                <button
                  className="bg-green-500 hover:bg-green-800 hover:text-white font-bold py-2 px-4 rounded text-lg"
                  onClick={handleDownload}
                >
                  <MdFileDownload className="inline m-1 text-xl" />
                  Download Farmer Data
                </button>
              </div>
            </div>
            {/* Farmers List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg-grid-cols-4 gap-4 xl:mt-10">
              {filteredAndSortedFarmers.map((farmer, index) => (
                <div
                  key={index}
                  className="bg-green-100 rounded-lg shadow-md p-4"
                >
                  <p className="text-xl uppercase tracking-widest bg-green-700 p-5 rounded-lg text-white">
                    {farmer.name}
                  </p>
                  <div className="flex items-center p-2">
                    <RiUserLocationFill className="text-4xl text-black" />
                    <span className="text-black font-bold mb-2 pl-5">
                      {" "}
                      {farmer.city}
                    </span>
                  </div>
                  <div className="flex justify-evenly">
                    <div className="flex items-center p-2">
                      <GiFarmTractor className="text-4xl" />
                      <p className="text-black font-bold mb-2 pl-5">
                        {farmer.totalLandArea} Acres
                      </p>
                    </div>
                    <div className="flex items-center p-2">
                      <GiWheat className="text-4xl" />
                      <p className=" mb-2 pl-5 font-bold">
                        {farmer.plantation_type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-2">
                    <FiPhoneCall className="text-2xl" />
                    <p className=" mb-2 pl-5 font-bold">{farmer.mobile}</p>
                  </div>
                  <div className="bg-blue-gray-200 p-5 rounded-lg">
                    <p className=" mb-2">
                      <span className="font-bold">Crops:</span>
                    </p>
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FarmersList;
