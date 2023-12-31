import React, { useEffect, useState } from "react";
import Header from "../../Components/layouts/Header";
import * as Api from "../../Services/Api";
import { toast } from "react-toastify";
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { getCrops, getvariteyByCropId } from "../../Services/Api";
import moment from "moment";

const Cultivation = () => {
  const [openTab, setOpenTab] = useState("New");
  const [loading, setLoading] = useState(false);
  const [farmerID, setFarmerID] = useState("");
  const [farmerDetail, setFarmerDetail] = useState<any>();
  const [currentCultivation, setCurrentCultivation] = useState<any>();
  const [oldCultivation, setOldCultivation] = useState<any>();
  const [fetchData, setFetchData] = useState(false);
  const [selected, setSelected] = useState<string>("progress");

  console.log(currentCultivation?.adoptedSeason);

  const onChangeInput = (e: any) => {
    setFarmerID(e.target.value);
  };
  const getFarmerById = async () => {
    if (farmerID) {
      setLoading(true);
      const [err, res] = await Api.getFarmer(farmerID);
      if (err) {
        console.log(err);
      }
      if (res) {
        console.log(res);

        setFarmerDetail(res?.data);
      }

      setLoading(false);
    }
  };

  const onClickEnter = async () => {
    localStorage.setItem("Number", farmerID);
    await getFarmerById();
  };
  //Cultivation form data
  const [area, setArea] = useState("");
  const [problem, setProblem] = useState("");
  const [allPests, setAllPests] = useState<any[]>([]);
  const [allCrops, setAllCropes] = useState<any[]>([]);
  const [crop, setCrop] = useState("");
  const [variety, setVariety] = useState("");
  const [dateOfSowing, setDateOfSowing] = useState("");
  const [soilType, setSoilType] = useState("");
  const [irrigationType, setIrrigationType] = useState("");
  const [fertilizer, setFertilizer] = useState("");
  const [months, setMonths] = useState<any>("");
  const [expireDateofSowing, setExpireDateofSowing] = useState<any>("");

  // setFuturePrice("18500");

  const onChangeArea = (e: any) => {
    setArea(e.target.value);
  };

  const onChangeCrop = (e: any) => {
    setCrop(e.target.value);
  };
  const onChangevariety = (e: any) => {
    setVariety(e.target.value);
  };
  const onChangedateOfSowing = (e: any) => {
    let date = moment(e.target.value).toISOString(); //ISO 8601 format
    setDateOfSowing(date);
  };
  // const onChangedateOfSowing = (e: any) => {
  //   let date: any = moment(e.target.value).toISOString(); //ISO 8601 format
  //   // let date: any = d.getMonth(e.target.value);
  //   setDateOfSowing(date);
  // };

  // const onChangedateOfSowing = (e: any) => {
  //   Date.prototype.addDays  = function (days: any) {
  //     var date = new Date(this.valueOf());

  //     date.setDate(date.getDate() + days);
  //     return date;
  //   };
  //   let date = new Date();
  //   const expireDate = date.addDays(120);
  //   const selectedDate = moment(e.target.value);
  //   const month = moment(selectedDate).format("MM"); // returns the month number (0-11)
  //   setDateOfSowing(expireDate);

  //   setMonths(month + 1);
  //   console.log(month);
  // };

  const onChangeSoilType = (e: any, val: any) => {
    setSoilType(val.value);
  };

  const onChangeIrrigationType = (e: any, val: any) => {
    setIrrigationType(val.value);
  };

  const onChangeFertilizer = (e: any, val: any) => {
    setFertilizer(val.value);
  };

  const onSubmitHandler = async () => {
    const [err, res] = await Api.createFarmerCultivationData(
      farmerDetail?._id,
      area,
      allCrops.find((c) => c._id === crop).localName,
      allPests.find((v) => v._id === variety).nameOfvariety,
      dateOfSowing,
      expireDateofSowing,
      months,
      soilType,
      irrigationType,
      fertilizer
    );
    if (err) {
      toast.error(err.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (res) {
      toast.success("New cultivation record created!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const onChangeHarvestStatus = async (
    status: string,
    cultivationId: string
  ) => {
    const [err, res] = await Api.updateHarvestStatus(cultivationId, status);
    if (res) {
      const [err, res] = await Api.getFarmerCultivationData(farmerDetail?._id);
      if (res) {
        setOldCultivation(res?.data?.farmerCultivationData);
      }
    }
  };

  // useEffect(()=>{
  //   if(oldCultivation && !Array.isArray(oldCultivation)) return;
  //   oldCultivation.forEach((cultivation:any) => {

  //   });
  // },[oldCultivation])

  //Get Farmer Cultivations
  useEffect(() => {
    const init = async () => {
      const [err, res] = await Api.getFarmerCultivationData(farmerDetail?._id);
      if (res) {
        // let current_cultivation =
        //   res?.data?.farmerCultivationData[
        //     res?.data?.farmerCultivationData.length - 1
        //   ];
        // setCurrentCultivation(current_cultivation);
        setOldCultivation(res?.data?.farmerCultivationData);
      }
    };
    init();
  }, [farmerID, farmerDetail]);

  useEffect(() => {
    const setCrops = async () => {
      const crops: any[] = await getCrops();
      setAllCropes(crops[1].data);
    };
    setCrops();
  }, []);
  useEffect(() => {
    const setPests = async (crop: string) => {
      const pests: any[] = await getvariteyByCropId(crop);
      setAllPests(pests[1].data);
    };
    if (!!crop) setPests(crop);
    else setAllPests([]);
  }, [crop]);

  useEffect(() => {
    if (fetchData) {
      onClickEnter();
    }
  }, [fetchData]);
  useEffect(() => {
    if (localStorage.Number) setFarmerID((prev: any) => localStorage.Number);
    setFetchData(true);

    // onClickEnter();
  }, []);
  console.log(dateOfSowing, "it is dateofSowing");
  return (
    <div>
      <Header title="Farmer Relationship Management" subtitle="Cultivation" />
      <section>
        <div className="grid grid-cols-[70%_30%] items-center box-border w-full">
          <div className="grid grid-cols-[35%_45%_15%_5%] mt-7 flex-row items-center w-full">
            <label className="text-[#13490A] font-roboto font-extrabold text-sm flex justify-center">
              Farmer Mobile Number
            </label>
            <input
              onChange={onChangeInput}
              type="text"
              className="bg-[#F3FFF1] h-8 lg:w-[86%] xl:w-[90%] lg:ml-2 xl:ml-[1%] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-md pr-3 pl-3"
            />
            <button
              type="submit"
              onClick={onClickEnter}
              className="bg-[#05AB2A] text-[#F3FFF1] shadow-[0px_4px_3px_rgba(0,0,0,0.25)] py-1 w-[6vw] rounded text-sm font-thin"
            >
              ENTER
            </button>
          </div>
          {farmerDetail ? (
            <div className="mt-6 leading-4 ml-16">
              <p className="text-[#000000]  text-start">
                Name:{" "}
                <span className="text-[#FB0404] font-bold">
                  {farmerDetail?.name}
                </span>
              </p>
              <p className="text-[#000000]   text-start">
                Area :{" "}
                <span className="text-[#FB0404] font-bold">
                  {farmerDetail?.address?.city}
                </span>
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>

        {farmerDetail ? (
          <>
            {/* Tabs */}
            <div className="mt-10 flex mx-[6%]">
              <button
                className={`text-[#F3FFF1] shadow-[0px_4px_3px_rgba(0,0,0,0.25)] w-[6vw] py-1 px-3 rounded mx-5 text-sm font-thin
                 ${openTab === "New" ? "bg-[#05AB2A]" : "bg-[#526D4E]"}`}
                onClick={() => {
                  setOpenTab("New");
                }}
              >
                New
              </button>
              <button
                className={`text-[#F3FFF1] shadow-[0px_4px_3px_rgba(0,0,0,0.25)] w-[6vw] py-1 px-3 rounded mx-5 text-sm font-thin 
          ${openTab === "Old" ? "bg-[#05AB2A]" : "bg-[#526D4E]"}`}
                onClick={() => {
                  setOpenTab("Old");
                }}
              >
                Old
              </button>
            </div>

            {/* //New Cultivation */}
            <div className={openTab === "New" ? "block" : "hidden"}>
              <div className="w-full max-w-sm mt-10 mb-5 ml-80">
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      // for="inline-password"
                    >
                      Crop
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Select Crop"
                      sx={{
                        width: 260,
                      }}
                      value={crop}
                      onChange={onChangeCrop}
                    >
                      {allCrops.map((crop) => (
                        <MenuItem key={crop._id} value={crop._id}>
                          {crop.localName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      // for="inline-password"
                    >
                      Variety
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Select Variety"
                      sx={{ width: 260 }}
                      value={variety}
                      onChange={onChangevariety}
                    >
                      {allPests.map((pest) => (
                        <MenuItem key={pest._id} value={pest._id}>
                          {pest.nameOfvariety}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      // for="inline-password"
                    >
                      Date of Sowing
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      onChange={onChangedateOfSowing}
                      id="inline-password"
                      type="date"
                      placeholder=""
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      // for="inline-password"
                    >
                      Soil Type
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <Autocomplete
                      onChange={onChangeSoilType}
                      id="plantation-select"
                      sx={{ width: 260 }}
                      options={[
                        {
                          value: "RED",
                        },
                        {
                          value: "BLACK",
                        },
                      ]}
                      autoHighlight
                      getOptionLabel={(option) => option.value}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Soil Type"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password",
                          }}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      // for="inline-password"
                    >
                      Irrigation Type
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <Autocomplete
                      onChange={onChangeIrrigationType}
                      id="plantation-select"
                      sx={{ width: 260 }}
                      options={[
                        {
                          value: "Rain fed land",
                        },
                        {
                          value: "Wetland",
                        },
                      ]}
                      autoHighlight
                      getOptionLabel={(option) => option.value}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose irrigation type"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password",
                          }}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      // for="inline-password"
                    >
                      Area(Acre)
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      onChange={onChangeArea}
                      id="inline-password"
                      type="text"
                      placeholder="Area"
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      // for="inline-password"
                    >
                      Type
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <Autocomplete
                      onChange={onChangeFertilizer}
                      id="plantation-select"
                      sx={{ width: 260 }}
                      options={[
                        {
                          value: "ORGANIC",
                        },
                        {
                          value: "INORGANIC",
                        },
                        {
                          value: "BOTH",
                        },
                      ]}
                      autoHighlight
                      getOptionLabel={(option) => option.value}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Type"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password",
                          }}
                        />
                      )}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={onSubmitHandler}
                  className="bg-[#05AB2A] text-[#F3FFF1] flex shadow-[0px_4px_3px_rgba(0,0,0,0.25)] py-1 px-4 rounded mx-60 my-8 text-sm font-thin"
                >
                  Submit
                </button>
              </div>
            </div>
            {/* Current Cultivation */}
            {/* <div className={openTab === "Current" ? "block" : "hidden"}>
              {currentCultivation ? (
                <>
                  <table className="table-auto bg-[#6E776D] border-collapse border ml-[9%] w-[54vw] lg:w-[70vw] text-sm font-semibold mt-10">
                    <thead>
                      <tr className="text-[#FFFFFF] h-7 font-medium">
                        <th className="border-r-4 border-[#6E776D]">
                          Slot Number
                        </th>
                        <th className="border-r-4 border-[#6E776D]">Area</th>
                        <th>Area Code</th>
                        <th>Area Type</th>
                        <th>Major crop</th>
                        <th className="border-r-4 border-[#6E776D]">Variety</th>
                        <th className="border-r-4 border-[#6E776D]">
                          Date of Sowing
                        </th>
                        <th className="border-r-4 border-[#6E776D]">
                          Adapted Season
                        </th>
                        <th className="border-r-4 border-[#6E776D]">
                          Current Stage
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-[#DEDEDE] h-10">
                        <td className="border-r-4 border-[#6E776D]">
                          {currentCultivation?.slotNumber}
                        </td>
                        <td className="border-r-4 border-[#6E776D]">
                          {currentCultivation?.area}
                        </td>
                        <td className="border-r-4 border-[#6E776D]">
                          {currentCultivation?.areaCode}
                        </td>
                        <td className="border-r-4 border-[#6E776D]">
                          {currentCultivation?.areaType}
                        </td>
                        <td className="border-r-4 border-[#6E776D]">
                          {currentCultivation?.crop}
                        </td>
                        <td className="border-r-4 border-[#6E776D]">
                          {currentCultivation?.variety}
                        </td>
                        <td className="border-r-4 border-[#6E776D]">
                          {currentCultivation?.dateOfSowing}
                        </td>
                        <td className="border-r-4 border-[#6E776D]">
                          {currentCultivation?.adoptedSeason}
                        </td>
                        <td className="border-r-4 border-[#6E776D]">
                          {currentCultivation?.currentStage}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              ) : (
                <></>
              )}
            </div> */}

            {/* Old cultivation List */}
            <div className={openTab === "Old" ? "block" : "hidden"}>
              {oldCultivation ? (
                <>
                  <table className="table-auto border-collapse border border-black font-bold text-base w-[80%] mx-auto mt-10">
                    <thead className="border-b border-black">
                      <tr className="text-center">
                        <th className="border-r border-black py-[1.2%]">
                          S.No
                        </th>
                        <th className="border-r border-black py-[1.2%]">
                          Crop
                        </th>
                        <th className="border-r border-black py-[1.2%]">
                          Variety
                        </th>
                        <th className="border-r border-black py-[1.2%]">
                          Date of Sowing
                        </th>
                        <th className="border-r border-black py-[1.2%]">
                          Soil Type
                        </th>
                        <th className="border-r border-black py-[1.2%]">
                          Irrigation Type
                        </th>
                        <th className="border-r border-black py-[1.2%]">
                          Area (Acre)
                        </th>
                        <th className="border-r border-black py-[1.2%]">
                          Fertilizer
                        </th>
                        <th className="border-r border-black py-[1.2%]">
                          Harvest status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Stage1 */}
                      {oldCultivation?.map((cultivation: any, index: any) => (
                        <tr className="h-10 border-b border-black">
                          <td className="border-r border-black font-thin">
                            {index + 1}
                          </td>
                          <td className="border-r border-black font-thin">
                            {cultivation?.crop}
                          </td>

                          <td className="border-r border-black font-thin">
                            {cultivation?.variety}
                          </td>
                          <td className="border-r border-black font-thin">
                            {moment(cultivation?.dateOfSowing).format(
                              "DD-MM-YYYY"
                            )}
                          </td>

                          <td className="border-r border-black font-thin">
                            {cultivation?.soilType}
                          </td>
                          <td className="border-r border-black font-thin">
                            {cultivation?.irrigationType}
                          </td>
                          <td className="border-r border-black font-thin">
                            {cultivation?.area} acre
                          </td>

                          <td className="border-r border-black font-thin">
                            {cultivation?.fertilizer}
                          </td>
                          <td className="border-r border-black font-thin">
                            <select
                              value={cultivation?.harvestStatus}
                              id="countries"
                              className="bg-[#F3FFF1] shadow-[4px_4px_4px_rgba(0,0,0,0.25) text-black w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 text-sm font-thin"
                              onChange={(e) =>
                                onChangeHarvestStatus(
                                  e.target.value,
                                  cultivation._id
                                )
                              }
                            >
                              <option value="In-progress">In-progress </option>

                              <option value="Done">Done</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
      </section>
    </div>
  );
};

export default Cultivation;
