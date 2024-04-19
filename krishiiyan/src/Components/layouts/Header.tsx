import React, { useState, useEffect } from "react";
import Weather from "../../pages/farmer/Weather";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import Popup from "../../Components/layouts/PopUp";
import { extractCodeFromDriveLink } from "../../handleImageCode";
import axios from "axios";

const Header = (props: any) => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(
    localStorage.getItem("isPopupOpen") === "true"
  );
  const [popupData, setPopupData] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  let DealerName = localStorage.getItem("dealerName");

  const hasPopupBeenShown = () => {
    return localStorage.getItem("popupShown") === "true";
  };

  const hasButtonBeenClicked = () => {
    return localStorage.getItem("buttonClicked") === "true";
  };

  const setPopupShown = () => {
    localStorage.setItem("popupShown", "true");
  };

  const setButtonClicked = () => {
    localStorage.setItem("buttonClicked", "true");
  };

  const resetButtonClickedOnUnload = () => {
    localStorage.setItem("buttonClicked", "false");
  };

  const resetPopupShownOnUnload = () => {
    localStorage.setItem("popupShown", "false");
  };

  const openPopup = () => {
    setIsPopupOpen(true);
    localStorage.setItem("isPopupOpen", "true");
    resetPopupShownOnUnload();
    sessionStorage.setItem("buttonClicked", "true");
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    resetButtonClickedOnUnload();
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/home");
    window.location.reload();
  };

  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "en"
  );

  const handleLanguageChange = (language: string) => {
    localStorage.setItem("selectedLanguage", language);
    setSelectedLanguage(language);
  };

  useEffect(() => {
    if (!hasPopupBeenShown() || hasButtonBeenClicked()) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/popups`)
        .then((response) => {
          if (response.data.success) {
            setPopupData(response.data.popups[0]);
            setIsPopupOpen(true);
          }
        });
    }
  }, []);

  useEffect(() => {
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.id = "google-translate-script";
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);

  function googleTranslateElementInit() {
    interface WindowWithGoogle extends Window {
      google: any;
    }

    const windowWithGoogle = window as unknown as WindowWithGoogle;

    new windowWithGoogle.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages:
          "en,as,ar,bn,bho,zh-CN,zh-TW,doi,fr,de,gu,hi,ja,kn,ml,mr,ne,or,pa,ru,sa,sd,si,es,ta,te,ur",
      },
      "google_translate_element"
    );
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navigateToAccountSettings = () => {
    navigate("/account-settings");
    setDropdownOpen(false);
  };

  return (
    <header className="bg-[#F3FFF1] invisible md:visible w-full xl:h-[14vh] flex flex-col justify-between xl:flex-row items-center rounded-2xl shadow-md mobile:w-[65vw] mobile:absolute mobile:right-0 ">
      <div className="text-[#13490A] ml-[30px] text-start font-roboto font-black text-lg xl:text-base leading-7 mt-4 p-2">
        <h1>{props?.title}</h1>
        <h1>{props?.subtitle}</h1>
      </div>
      <div className="text-[#13490A] text-center font-roboto mt-4 p-2">
        <Weather />
      </div>
      <div id="google_translate_element"></div>
      <div className="flex items-center justify-center xl:justify-end font-roboto p-2">
        <div className="relative"> {/* Wrapper for avatar and dropdown */}
          <Avatar
            alt="Remy Sharp"
            src="Images\farmer.jpeg"
            sx={{ width: 56, height: 56 }}
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-md">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={navigateToAccountSettings}
                >
                  Account Settings
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
        <button
          className="mt-4 px-4 py-2 border-4 border-blue-600 hover:border-blue-400 bg-blue-600 rounded hover:bg-blue-200 animate-bounce"
          onClick={openPopup}
        >
          <div className="flex flex-row">
            <img
              src={
                popupData?.image
                  ? `https://drive.google.com/uc?export=view&id=${extractCodeFromDriveLink(
                    popupData.image
                  )}`
                  : "Images/Chat.png"
              }
              alt="WhatsApp"
              className="w-8 h-8 "
            />
            <p className="text-white text-2xl text-bold"> Today's Deal</p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
