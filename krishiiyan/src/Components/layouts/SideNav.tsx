import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import NestedDropdown from "../NestedDropdown";

const SideNav = ({ menu, submenu }: { menu: string; submenu: string }) => {
  const [pos, setPos] = useState(true);
  const [crop, setCrop] = useState(false);
  const [farm, setFarm] = useState(false);
  const [manage, setManage] = useState(false);
  const [help, setHelp] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [Heading, setHeading] = useState("");
  const [content, setContent] = useState<any>();
  let navigate = useNavigate();
  const [weather, setWeather] = useState<any>({});

  const api = {
    key: "72b05fdfa25a691624fb032c0b0aa2ec",
    base: "https://api.openweathermap.org/data/2.5/weather?",
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position: any) {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      fetch(`${api.base}lat=${lat}&lon=${long}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
        });
    });
  }, []);

  useEffect(() => {
    switch (menu) {
      case "pos":
        posClick();
        break;
      case "crop_advisory":
        cropClick();
        break;
      case "frm":
        farmClick();
        break;
      case "management":
        manageClick();
        break;
      case "help":
        helpClick();
        break;
      case "crop_advisory":
        helpClick();
        break;
    }
  }, [menu, submenu]);

  const posClick = () => {
    setPos(true);
    setCrop(false);
    setFarm(false);
    setManage(false);
    setHelp(false);
  };
  const cropClick = () => {
    setPos(false);
    setCrop(true);
    setFarm(false);
    setManage(false);
    setHelp(false);
  };
  const farmClick = () => {
    setPos(false);
    setCrop(false);
    setFarm(true);
    setManage(false);
    setHelp(false);
  };
  const manageClick = () => {
    setPos(false);
    setCrop(false);
    setFarm(false);
    setManage(true);
    setHelp(false);
  };
  const helpClick = () => {
    setPos(false);
    setCrop(false);
    setFarm(false);
    setManage(false);
    setHelp(true);
  };
  const menus = [
    {
      title: "Crop Advisory",
      submenus: [
        "Crop Library",
        "Crop Calender",
        "Crop Health",
        "FertiCal",
        "Mandi Prices",
      ],
    },
    {
      title: "FRM",
      submenus: [
        "Dashboard",
        // "Purchase",
        // "Cultivation",
        // "Credit",
        // "support",
        "New Registration",
      ],
    },
  ];

  return (
    <div>
      <div className="visible md:invisible z-50 bg-[#C6EDC0] justify-end w-[100vw]">
        <NestedDropdown menus={menus} />
      </div>
      <div
        className="flex flex-row lg:flex-row mobile:w-[50vw] mobile:h-max hidden lg:flex z-0"
        style={{
          position: "fixed",
          top: "0px",
          left: "0px",
          width: "18%",
          height: "100vh",
        }}
      >
        <nav className="bg-[#C6EDC0] w-full lg:w-[9vw] xl:w-[45%] flex flex-col items-center h-full">
          <img
            src="Images/logo.png"
            alt="Ellipse"
            className="my-5 mx-auto lg:w-10 xl:w-20 mobile:px-6"
          />
          <ul
            className="text-start text-sm flex flex-col lg:flex-col items-start gap-y-3 lg:gap-y-0"
            style={{ width: "100%" }}
          >
            <li
              onClick={posClick}
              className={`text-[#13490A] font-semibold font-roboto text-[16px] cursor-pointer px-4 py-2 rounded-lg text-center ${
                pos === true ? "bg-[#526D4E] mix-blend-hard-light" : ""
              }`}
              style={{ width: "100%", textAlign: "start" }}
            >
              Pos
            </li>
            <li
              onClick={cropClick}
              className={`text-[#13490A] font-semibold font-roboto text-[16px] cursor-pointer px-4 py-2  rounded-lg flex-col flex ${
                crop === true ? "bg-[#526D4E] mix-blend-hard-light" : ""
              }`}
              style={{ width: "100%", textAlign: "start" }}
            >
              Crop Advisory
            </li>
            <li
              onClick={farmClick}
              className={`text-[#13490A] font-semibold font-roboto text-[16px] cursor-pointer px-4 py-2 rounded-lg ${
                farm === true ? "bg-[#526D4E] mix-blend-hard-light" : ""
              }`}
              style={{ width: "100%", textAlign: "start" }}
            >
              FRM
            </li>
            <li
              onClick={manageClick}
              className={`text-[#13490A] font-semibold font-roboto text-[16px] cursor-pointer px-4 py-2 rounded-lg ${
                manage === true ? "bg-[#526D4E] mix-blend-hard-light" : ""
              }`}
              style={{ width: "100%", textAlign: "start" }}
            >
              Management
            </li>
            <li
              onClick={helpClick}
              className={`text-[#13490A] font-semibold font-roboto text-[16px] cursor-pointer px-4 py-2 rounded-lg ${
                help === true ? "bg-[#526D4E] mix-blend-hard-light" : ""
              }`}
              style={{ width: "100%", textAlign: "start" }}
            >
              Help
            </li>
          </ul>
        </nav>
        <Menu
          Number="4"
          Heading={Heading}
          Address={weather?.name}
          pos={pos}
          crop={crop}
          farm={farm}
          manage={manage}
          help={help}
          submenu={submenu}
        />
      </div>
    </div>
  );
};

export default SideNav;
