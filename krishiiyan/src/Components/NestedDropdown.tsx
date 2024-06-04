import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

type NestedDropdownProps = {
  menus: Array<{ title: string; submenus: string[] }>;
};

const NestedDropdown: React.FC<NestedDropdownProps> = ({ menus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedSubmenu, setSelectedSubmenu] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/home");
    window.location.reload();
  };

  const handleSubmenuClick = (submenu: string) => {
    const routes: { [key: string]: string } = {
      "Crop Health": "/crop_health",
      "Crop Calender": "/crop_calendar",
      "Crop Library": "/crop_library",
      FertiCal: "/fertical",
      "Mandi Prices": "/mandi_prices",
      Sale: "/",
      Inventory: "/inventory",
      Reports: "/report",
      Product: "/purchase",
      "Sales Statement": "/accounting",
      Dashboard: "/dashboard",
      Purchase: "/farm_purchase",
      Cultivation: "/cultivation",
      Credit: "/credit",
      Support: "/support",
      "New Registration": "/new_registration",
      Management: "/problem",
      Problem: "/problem",
      Expert: "/expert",
      Guide: "/mandi_prices",
    };

    const route = routes[submenu];
    console.log(`Submenu: ${submenu}, Route: ${route}`); // Debugging output
    if (route) {
      navigate(route);
    } else {
      navigate("/guide");
    }
    setIsOpen(false);
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (e: any) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navigateToAccountSettings = () => {
    navigate("/account-settings");
    setDropdownOpen(false);
  };

  return (
    <div className="relative mobile:w-[100%]">
      <div className="flex justify-between px-3 py-2 z-50 ">
        <button
          onClick={handleButtonClick}
          className="p-2 focus:outline-none focus:bg-gray-300 rounded"
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setIsOpen(true)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          )}
        </button>
        <img src="Images/logoname.png" alt="Ellipse" className="w-[35%]" />
        <div className="relative">
          <Avatar
            alt="Remy Sharp"
            src="Images/farmer.jpeg"
            sx={{ width: 56, height: 56 }}
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-md z-50">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
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
        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            ></div>
            <div
              ref={(node) => (dropdownRef.current = node)}
              className="absolute mt-2 left-0 bg-white border border-gray-300 rounded-lg shadow-md w-full z-50"
              style={{ marginTop: "55px" }}
            >
              <div className="p-4">
                <ul className="text-start text-sm">
                  {menus.map((menu, index) => (
                    <li
                      key={index}
                      onClick={() => handleMenuClick(menu.title)}
                      className={`cursor-pointer ${
                        selectedMenu === menu.title
                          ? "text-[#311a8f] mix-blend-hard-light underline border-black"
                          : "text-[#13490A]"
                      } mt-3 font-bold`}
                    >
                      {menu.title}
                    </li>
                  ))}
                </ul>
                <hr className="my-2" />
                {selectedMenu && (
                  <ul className="mt-2">
                    {menus
                      .find((menu) => menu.title === selectedMenu)
                      ?.submenus.map((submenu, index) => (
                        <li
                          key={index}
                          onClick={() => handleSubmenuClick(submenu)}
                          className={`cursor-pointer ${
                            selectedSubmenu === submenu
                              ? "text-[#526D4E] mix-blend-hard-light"
                              : "text-[#13490A]"
                          } text-start`}
                        >
                          {submenu}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NestedDropdown;
