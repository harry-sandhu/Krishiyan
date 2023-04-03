import React, { useState } from "react";
import SeedTable from "../PreSowing/seedTable";
import "../ProductReq.css";
import PestManagement from "./PestMangment";
import WeedManagementT from "./weedManagementT";
import WeatherInjuses from "./WeatherInjuses";
const ProductionReqContent = (props: any) => {
  const [land, setLand] = useState(true);
  const [seedTab, setSeedTab] = useState(false);
  const [interculteral, setinterculteral] = useState(false);
  const [soil, setSoil] = useState(false);
  const [WeedManagement, setWeedManagement] = useState(false);
  const [weather, setWeather] = useState(false);
  const [openTab, setOpenTab] = useState("Pest Management");

  const onClickLand = () => {
    setLand(true);
    setSeedTab(false);
    setinterculteral(false);
    setSoil(false);
    setWeedManagement(false);
    setWeather(false);
  };
  const onClickSeed = () => {
    setLand(false);
    setSeedTab(true);
    setinterculteral(false);
    setSoil(false);
    setWeedManagement(false);
    setWeather(false);
  };
  const onClickInterculteral = () => {
    setLand(false);
    setSeedTab(false);
    setinterculteral(true);
    setSoil(false);
    setWeedManagement(false);
    setWeather(false);
  };
  const onClickSoiltab = () => {
    setLand(false);
    setSeedTab(false);
    setinterculteral(false);
    setSoil(true);
    setWeedManagement(false);
    setWeather(false);
  };
  const onClickWeedManagement = () => {
    setLand(false);
    setSeedTab(false);
    setinterculteral(false);
    setSoil(false);
    setWeedManagement(true);
    setWeather(false);
  };
  const onClickWeather = () => {
    setLand(false);
    setSeedTab(false);
    setinterculteral(false);
    setSoil(false);
    setWeedManagement(false);
    setWeather(true);
  };
  let Col: any = 2;
  return (
    <section>
      <div className="flex rounded-md mb-1 gap-2 btn">
        <button
          onClick={() => {
            onClickLand();
            setOpenTab("Pest Management");
          }}
          className={` text-[#F3FFF1] shadow-[0px_4px_3px_rgba(0,0,0,0.25)] w-[6vw] rounded text-sm font-thin ${
            openTab === "Pest Management" ? "bg-[#526D4E]" : "bg-[#05AB2A]"
          }`}
        >
          Pest Management
        </button>
        <button
          onClick={() => {
            onClickSeed();
            setOpenTab("Disease Management");
          }}
          className={` text-[#F3FFF1] shadow-[0px_4px_3px_rgba(0,0,0,0.25)] w-[6vw] rounded text-sm font-thin ${
            openTab === "Disease Management" ? "bg-[#526D4E]" : "bg-[#05AB2A]"
          }`}
        >
          Disease Management
        </button>
        <button
          onClick={() => {
            onClickInterculteral();
            setOpenTab("Deficiency Management");
          }}
          className={` text-[#F3FFF1] shadow-[0px_4px_3px_rgba(0,0,0,0.25)] w-[6vw] rounded text-sm font-thin ${
            openTab === "Deficiency Management"
              ? "bg-[#526D4E]"
              : "bg-[#05AB2A]"
          }`}
        >
          Deficiency Management
        </button>
        <button
          onClick={() => {
            onClickWeedManagement();
            setOpenTab("weed Management");
          }}
          className={` text-[#F3FFF1] shadow-[0px_4px_3px_rgba(0,0,0,0.25)] w-[6vw] rounded text-sm font-thin ${
            openTab === "weed Management" ? "bg-[#526D4E]" : "bg-[#05AB2A]"
          }`}
        >
          Weed Management
        </button>
        <button
          onClick={() => {
            onClickWeather();
            setOpenTab("weather Injuses");
          }}
          className={` text-[#F3FFF1] shadow-[0px_4px_3px_rgba(0,0,0,0.25)] w-[6vw] rounded text-sm font-thin ${
            openTab === "weather Injuses" ? "bg-[#526D4E]" : "bg-[#05AB2A]"
          }`}
        >
          Weather Injuses
        </button>
      </div>
      <br />

      {land ? (
        <>
          <PestManagement />
        </>
      ) : (
        <></>
      )}

      {seedTab ? (
        <>
          <PestManagement />
        </>
      ) : (
        <></>
      )}

      {WeedManagement ? (
        <>
          <WeedManagementT />
        </>
      ) : (
        <></>
      )}
      {weather ? (
        <>
          <WeatherInjuses />
        </>
      ) : (
        <></>
      )}

      {/* <table className="table-auto border border-black border-collapse my-5 mx-[0.8%]">
        <tr className="h-[6vh] text-center bg-[#C6EDC0]">
          <th
            className="text-[#13490A] font-extrabold text-base w-full"
            colSpan={Col}
          >
            Soil
          </th>
        </tr>
        <tr className="h-[6vh]">
          <td className="border border-black border-collapse text-[#13490A] font-normal text-base w-[50%] px-[0.5%]">
            <span className="font-extrabold mr-[4%]">Texture:</span> Maize can
            be grown successfully in variety of soils ranging from loamy sand to
            clay loam.{" "}
          </td>
          <td className="border border-black border-collapse text-[#13490A] font-normal text-base px-[0.5%]">
            <span className="font-extrabold mr-[4%]">Nitrogen Level:</span>
            {props?.crop?.nitrogen}{" "}
          </td>
        </tr>
        <tr className="h-[6vh]">
          <td className="border border-black border-collapse text-[#13490A] font-normal text-base px-[0.5%]">
            <span className="font-extrabold mr-[4%]">Structure:</span> Fine
            porous.
          </td>
          <td className="border border-black border-collapse text-[#13490A] font-normal text-base px-[0.5%]">
            <span className="font-extrabold mr-[4%]">Phosporus Level:</span>
            {props?.crop?.phosporous}%
          </td>
        </tr>
        <tr className="h-[6vh]">
          <td className="border border-black border-collapse text-[#13490A] font-normal text-base px-[0.5%]">
            <span className="font-extrabold mr-[4%]">
              Water holding Capacity:
            </span>{" "}
            Good water holding Characteristics(150-200mm)
          </td>
          <td className="border border-black border-collapse text-[#13490A] font-normal text-base px-[0.5%]">
            <span className="font-extrabold mr-[4%]">Pottasium Level:</span>
            {props?.crop?.potash}%
          </td>
        </tr>
        <tr className="h-[6vh]">
          <td className="border border-black border-collapse text-[#13490A] font-normal text-base px-[0.5%]">
            <span className="font-extrabold mr-[4%]">Soil Moisture:</span>{" "}
            {props?.crop?.zinc}%
          </td>
          <td className="border border-black border-collapse text-[#13490A] font-normal text-base px-[0.5%]">
            <span className="font-extrabold mr-[4%]">Essential Nutrients:</span>{" "}
          </td>
        </tr>
        <tr className="h-[6vh] bg-[#C6EDC0]">
          <th className="text-[#13490A] font-extrabold text-base" colSpan={Col}>
            Climate
          </th>
        </tr>
        <tr className="h-[6vh]">
          <td className="border border-black border-collapse text-[#13490A] font-normal text-base px-[0.5%]">
            <span className="font-extrabold mr-[4%]">Type:</span>
            {props?.crop?.cropTypes.map((i: any) => (
              <>{i} , </>
            ))}
          </td>
          <td className="border border-black border-collapse text-[#13490A] font-normal text-base px-[0.5%]"></td>
        </tr>
        <tr className="h-[6vh]">
          <td className="border border-black border-collapse text-[#13490A] font-normal text-base px-[0.5%]">
            <span className="font-extrabold mr-[4%]">Temperature:</span>{" "}
            {props?.crop?.temperature}C.
          </td>
          <td className="border border-black border-collapse text-[#13490A] font-normal text-base px-[0.5%]"></td>
        </tr>
        <tr className="h-[6vh]">
          <td className="border border-black border-collapse text-[#13490A] font-normal text-base px-[0.5%]"></td>
          <td className="border border-black border-collapse text-[#13490A] font-normal text-base px-[0.5%]"></td>
        </tr>
        <tr className="h-[6vh]">
          <td className="border border-black border-collapse text-[#13490A] font-normal text-base px-[0.5%]"></td>
          <td className="border border-black border-collapse text-[#13490A] font-normal text-base px-[0.5%]"></td>
        </tr>
        <tr className="h-[6vh]">
          <td className="border border-black border-collapse text-[#13490A] font-normal text-base px-[0.5%]"></td>
          <td className="border border-black border-collapse text-[#13490A] font-normal text-base px-[0.5%]"></td>
        </tr>
      </table> */}
    </section>
  );
};

export default ProductionReqContent;