import React, { useEffect, useState } from "react";
import Header from "../../Components/layouts/Header";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import * as Api from "../../Services/Api";
import Popup from "../../Components/layouts/PopUp";
import loca from "../../assets/Images/location.png";
import calen from "../../assets/Images/calendar.png";
import crop from "../../assets/Images/crop.png";

interface MandiPricesProps {
  mandiPrices: string[]; // Define the type for 'mandiPrices'
}

interface DistrictOption {
  commodities: string[];
}

interface StateOption {
  [key: string]: {
    [key: string]: DistrictOption;
  };
}

const MandiPricesComponent: React.FC<MandiPricesProps> = () => {
  const [prices, setPrices] = useState<any>();
  const [data, setData] = useState<any>();
  const [filterOptions, setFilterOptions] = useState<StateOption>({});
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortProperty, setSortProperty] = useState<string>("modal_price");

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/filter-options`
        );
        const filterOptions = await response.json();
        setFilterOptions(filterOptions);
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching filter options");
      }
    };

    fetchFilterOptions();
  }, []);

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDistrict(event.target.value);
  };

  const handleCommodityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCommodity(event.target.value);
  };

  const fetchData = async () => {
    setIsLoading(true);
    console.log("fetching mandi data frontend hit");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/mandi-prices?state=${selectedState}&district=${selectedDistrict}&commodity=${selectedCommodity}`
      );

      const fetchedData = await response.json();
      console.log(fetchedData);
      if (!fetchedData || fetchedData.length === 0) {
        console.log("Empty response received");
        toast.warn("No data found for the selected criteria");
      } else {
        // Sort and set the new data
        const sortedData = [...fetchedData];
        sortedData.sort((a: any, b: any) => {
          const aValue = a[sortProperty];
          const bValue = b[sortProperty];
          if (sortOrder === "asc") {
            return (bValue || 0) - (aValue || 0);
          } else {
            return (aValue || 0) - (bValue || 0);
          }
        });
        setData(sortedData);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  // Sorting function
  const sortData = () => {
    const sortedData = [...data];

    sortedData.sort((a: any, b: any) => {
      const aValue = a[sortProperty];
      const bValue = b[sortProperty];

      if (sortOrder === "asc") {
        return (bValue || 0) - (aValue || 0);
      } else {
        return (aValue || 0) - (bValue || 0);
      }
    });

    setData(sortedData);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortOrder = event.target.value as "asc" | "desc";
    setSortOrder(selectedSortOrder);

    // Call sorting function when user selects a different sorting order
    sortData();
  };

  const handleSortPropertyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedSortProperty = event.target.value;
    setSortProperty(selectedSortProperty);

    // Call sorting function when user selects a different sorting property
    sortData();
  };

  return (
    <>
      <Header title="Crop Advisory" subtitle="Market" />
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-5 w-full mt-12 py-5">
        {/* State Dropdown */}
        <div className="py-3 mx-auto">
          <label className="text-[#13490A] font-extrabold text-sm mr-2 ">
            State
          </label>
          <select
            id="states"
            onChange={handleStateChange}
            value={selectedState}
            className="bg-[#F3FFF1] shadow-[4px_4px_3px_rgba(0,0,0,0.25)] rounded-xl text-center h-8 w-60"
          >
            <option value="">Select a state</option>
            {Object.keys(filterOptions).map((state: string) => (
              <option key={state} value={state} className="text-start pl-2">
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* District Dropdown */}
        <div className="py-3 mx-auto">
          <label className="text-[#13490A] font-extrabold text-sm mr-2">
            District
          </label>
          <select
            id="districts"
            onChange={handleDistrictChange}
            value={selectedDistrict}
            className="bg-[#F3FFF1] shadow-[4px_4px_3px_rgba(0,0,0,0.25)] rounded-xl text-center h-8 w-60"
          >
            <option value="">Select a district</option>
            {selectedState &&
              Object.keys(filterOptions[selectedState] || {}).map(
                (district) => (
                  <option
                    key={district}
                    value={district}
                    className="text-start pl-2 ml-2"
                  >
                    {district}
                  </option>
                )
              )}
          </select>
        </div>

        {/* Commodity Dropdown */}
        <div className="py-3 mx-auto">
          <label className="text-[#13490A] font-extrabold text-sm mr-2 ">
            Commodity
          </label>
          <select
            id="commodities"
            onChange={handleCommodityChange}
            value={selectedCommodity}
            className="bg-[#F3FFF1] shadow-[4px_4px_3px_rgba(0,0,0,0.25)] rounded-xl text-center h-8 w-60"
          >
            <option value="">Select a commodity</option>
            {selectedState &&
              selectedDistrict &&
              filterOptions[selectedState]?.[
                selectedDistrict
              ]?.commodities?.map((commodity, mapIndex) => (
                <option
                  key={`${commodity}-${mapIndex}`}
                  value={commodity}
                  className="text-start ml-2"
                >
                  {commodity}
                </option>
              ))}
          </select>
        </div>

        {/* Go Button */}
        <div className="py-3 mx-auto">
          <button
            onClick={fetchData}
            className="bg-[#05AB2A] text-[#F3FFF1] shadow-[0px_4px_3px_rgba(0,0,0,0.25)] rounded text-sm font-thin"
          >
            {isLoading ? (
              <CircularProgress size={20} style={{ color: "white" }} />
            ) : (
              "Go"
            )}
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="py-3 mx-auto">
          <label className="text-[#13490A] font-extrabold text-sm mr-2 ">
            Sort by
          </label>
          <select
            id="sortOrder"
            onChange={handleSortChange}
            value={sortOrder}
            className="bg-[#F3FFF1] shadow-[4px_4px_3px_rgba(0,0,0,0.25)] rounded-md text-center h-8"
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>
      {/* Table view on large screen */}
      {data ? (
        <div className="rounded-xl shadow hidden md:block">
          <table className="mx-auto w-11/12 mt-7 border-collapse rounded-xl">
            <thead className="bg-[#57d272] border-b-2 border-gray-200">
              <tr className="text-center ">
                <th className="w-28 p-3 text-sm font-semibold tracking-wide text-left border-none">
                  Arrival-Date
                </th>
                <th className="w-30 p-3 text-sm font-semibold tracking-wide text-left border-none">
                  Variety
                </th>
                <th className="w-30 p-3 text-sm font-semibold tracking-wide text-left border-none">
                  Market
                </th>
                <th className="w- p-3 text-sm font-semibold tracking-wide text-left border-none">
                  Max-Price <br />
                  (Rs/Quintal)
                </th>
                <th className="w- p-3 text-sm font-semibold tracking-wide text-left border-none">
                  Min-Price <br />
                  (Rs/Quintal)
                </th>
                <th className="w- p-3 text-sm font-semibold tracking-wide text-left border-none">
                  Average-Price <br />
                  (Rs/Quintal)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.length > 0 ? (
                data.map((record: any, index: any) => (
                  <tr
                    className={`h-10 border-b ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-[#F3FFF1]"
                    } border-none `}
                    key={index}
                  >
                    <td className="p-3 text-md text-gray-700 border-none">
                      {record?.arrival_date}
                    </td>
                    <td className="p-3 text-md text-gray-700 border-none">
                      {record?.variety}
                    </td>
                    <td className="p-3 text-md text-gray-700 border-none">
                      {record?.market}
                    </td>
                    <td className="p-3 text-md text-gray-700 border-none">
                      {record?.max_price}
                    </td>
                    <td className="p-3 text-md text-gray-700 border-none">
                      {record?.min_price}
                    </td>
                    <td className="p-3 text-md text-gray-700 border-none">
                      {record?.modal_price}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-[1.2%]">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : null}
      <Popup isOpen={isPopupOpen} onClose={closePopup} />
      {/* SM screen view */}
      {data ? (
        <div className="grid grid-cols-1 gap-1 md:hidden">
          {data.length > 0 ? (
            data.map((record: any, index: any) => (
              <div className="rounded-xl h-48 w-full bg-[#F3FFF1] m-1 text-left p-3 shadow-[4px_4px_3px_rgba(0,0,0,0.25)]">
                <div className="flex ">
                  <div className="m-3 flex items-center">
                    <img
                      src={loca}
                      alt="Market Icon"
                      className=""
                      height={20}
                      width={20}
                    />
                    <span className="font-extrabold ml-2">
                      {record?.market}
                    </span>
                  </div>
                  <div className="m-3 flex items-center">
                    <img
                      src={calen}
                      alt="Calendar Icon"
                      className=""
                      height={20}
                      width={20}
                    />
                    <span className="font-extrabold ml-2">
                      {record?.arrival_date}
                    </span>
                  </div>
                </div>
                <div className=" m-3 flex ">
                  <img
                    src={crop}
                    alt="Crop Icon"
                    className=""
                    height={20}
                    width={20}
                  />
                  <span className="font-extrabold ml-2">{record?.variety}</span>
                </div>

                <div className="font-extrabold text-center">
                  Price per Quintal
                </div>
                <div className="flex items-center mx-auto text-center">
                  <p className="mx-3">
                    <span className="font-bold">
                      Min ₹: {record?.min_price}
                    </span>
                  </p>
                  <p className="mx-3">
                    <span className="font-bold text-lg">
                      Average ₹:{record?.modal_price}
                    </span>
                  </p>
                  <p className="mx-3">
                    <span className="font-bold">
                      Max ₹: {record?.max_price}
                    </span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>NO DATA FOUND</div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default MandiPricesComponent;
