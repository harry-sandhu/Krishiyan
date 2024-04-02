import React, { useState, useEffect } from "react";
import Header from "../../Components/layouts/Header";
import { Box, Checkbox } from "@mui/material";
import { Input } from "@material-tailwind/react";
import * as Api from "../../Services/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/themes/Loader";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import { log } from "console";
import OTPVerification from "./OTPVerification";
import Popup from "../../Components/layouts/PopUp";
import './NewRegistration.css';
import whatsappimg from '../../assets/Images/whatsapp.png'

const PlantationOptions = [
  {
    value: "ORGANIC",
  },
  {
    value: "In Organic",
  },
  {
    value: "BOTH",
  },
];
const PlantationOption = [
  { label: "Good", value: 1 },
  { label: "Average", value: 0.5 },
  { label: "Excellent", value: 1.5 },
];

const PlantationType = [
  {
    value: "Organic",
  },
  {
    value: "In Organic",
  },
  {
    value: "Both",
  },
];

const NewRegistration = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState<any>();
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [street, setStreet] = useState("");
  const [mobileIsWhatsapp, setMobileIsWhatsapp] = useState(false);
  const [totalLandArea, setTotalLandArea] = useState("");
  const [dealer_farmer_relation, setDealer_farmer_relation] = useState("");
  const [plantation_type, setPlantation_type] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [checkphone, setCheckPhone] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const [loading, setLoading] = useState(false);

  const onChangeName = (e: any) => {
    setName(e.target.value);
  };
  const onChangePhone = async (e: any) => {
    const Phone = e.target.value;
    setPhoneNumber(Phone);
    console.log(Phone);
    console.log(checkphone);
    console.log(Phone.length);
    if (Phone.length === 10) {
      console.log("check function entered");
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/farmers/check-farmer/${Phone}`
      );

      const data = await response.json();
      console.log("function called", data);
      if (data?.exists == false) {
        setCheckPhone(true);
        console.log("check of data ", checkphone);
      } else {
        setCheckPhone(false);
        setPhoneNumber("");

        toast.error("Farmer Already Exists! Enter new mobile Number", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      if (Phone.length > 10) {
        setPhoneNumber("");
        toast.error(
          "Phone number should be 10 digits ! Enter new mobile Number",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      }
    }
  };

  const [messageSent, setMessageSent] = useState(false);

  const onChangeZip = async (e: any) => {
    const zipCode = e.target.value;
    setZip(zipCode);
    console.log(zipCode);
  };

  const onChangeStreet = (e: any) => {
    setStreet(e.target.value);
  };
  const onChangeIsWhatsapp = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMobileIsWhatsapp(event.target.checked);
  };

  const onChangeTotalLandArea = (e: any) => {
    setTotalLandArea(e.target.value);
  };
  const onChangeDealerFarmerRel = (e: any, label: any) => {
    setDealer_farmer_relation(label.value);
  };
  const onChangePlantationType = (e: any, value: any) => {
    setPlantation_type(value.value);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    registerfarer();
  };

  //Get farmer location
  useEffect(() => {
    async function getLoc() {
      if (zip.length > 5) {
        setLoading(true);
        const [err, res] = await Api.getFarmerLocation(zip);
        if (err) {
          toast.error(err.data, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        if (res) {
          let state = res.data.PostOffice.map((o: any) => o?.State);
          let city = res.data.PostOffice.map((o: any) => o?.District);
          setState(state[0]);
          setCity(city[0]);
        }
        setLoading(false);
      }
    }
    getLoc();
  }, [zip]);
  const registerfarer = async () => {
    const registrationData = {
      name,
      mobile: phoneNumber,
      state,
      city,
      zip,
      street,
      mobileIsWhatsapp,
      totalLandArea,
      dealer_farmer_relation,
      plantation_type,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/farmers/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        }
      );

      if (response.ok) {
        console.log("response done ", response);
        toast.success("Farmer Registered Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        window.location.reload();
        setPhoneNumber("");
        setName("");
        setMobileIsWhatsapp(false);
        setZip("");
        setStreet("");
        setTotalLandArea("");
        setDealer_farmer_relation("");
        setPlantation_type("");
      } else {
        console.log("response else", response);
        toast.error("Registration failed , Try Again", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
    }
  };

  const onSubmitHandler = async () => {
    if (checkphone) {
      if (
        state === "" ||
        (state === undefined && city === "") ||
        city === undefined
      ) {
        toast.error("Please enter valid Pincode", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/sendsms`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ phoneNumber }),
            }
          );

          if (response.ok) {
            setMessageSent(true);
            handleOpen();
          } else {
            // Handle error case
            setMessageSent(false);
          }
        } catch (error) {
          console.error("Error sending SMS:", error);
        }
      }
    }
  };

  const verifyMobile = async () => {
    const [err, res] = await Api.sendSMS(mobile);
    if (err) {
      toast.error(err.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (res) {
      console.log({ res });
      toast.success(res?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    handleOpen();
  };
  return (
    <div>
      <Header title="Farmer" subtitle="New Registration" />
      <div><h1 id="newfar-reg-heading">New Farmer Registration</h1></div>
      <div className="form-container">
        <form onSubmit={onSubmitHandler}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              id="mobileNumber"
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className="whatsapp-form-group">
            <Checkbox
              id="whatsapp"
              checked={mobileIsWhatsapp}
              onChange={(e) => setMobileIsWhatsapp(e.target.checked)}
              inputProps={{ "aria-label": "controlled" }}
            />
            {/* <img src={whatsappimg} alt="whatsappimg" id="whatsappimg" /> */}
            <label htmlFor="whatsapp" id="whatsapplabel">Whatsapp</label>
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <div>
              <div className="form-group">
                <label htmlFor="zip" id="pincode">Pincode</label>
                <input
                  id="zip"
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="state" id="state">State</label>
                <input
                  id="state"
                  type="text"
                  value={state}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="city" id="city">City</label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="street" id="area">Area</label>
                <input
                  id="street"
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="totalLandArea">Total Farm Area (Acre)</label>
                <input
                  id="totalLandArea"
                  type="text"
                  value={totalLandArea}
                  onChange={(e) => setTotalLandArea(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="dealerFarmerRel" className="dealerFarmer">Dealer Farmer Relationship</label>
            <Autocomplete
              id="dealerFarmerRel"
              options={PlantationOption}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField

                  {...params}
                  label="Choose Dealer Farmer Relation"
                  className="textFarmer"
                />
              )}
              onChange={(event, value) => {
                if (value) {
                  setDealer_farmer_relation(value.label);
                }
              }}
            />

          </div>
          <div className="form-group">
            <label htmlFor="plantationType">Type</label>
            <Autocomplete
              id="plantationType"
              options={PlantationOptions}
              getOptionLabel={(option) => option.value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose Type"
                />
              )}
              onChange={(event, value) => {
                if (value) {
                  setPlantation_type(value.value);
                }
              }}
            />

          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewRegistration;
