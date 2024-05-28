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
import "./NewRegistration.css";

const PlantationOptions = [
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
  const dealer_mobile = localStorage.getItem("dealermobile");
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
  const [crops, setCrops] = useState<any>();
  const [selectedCropNames, setSelectedCropNames] = useState<string[]>([]);
  const [selectedCrops, setSelectedCrops] = useState<any[]>([]);

  useEffect(() => {
    getCrops();
  }, []);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const getCrops = async () => {
    const [err, res] = await Api.getCrops();

    if (err) {
      toast.error(err.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (res) {
      console.log(res);
      const cropLocalNames = res.data.map(
        (crop: { localName: any }) => crop.localName
      );
      console.log(cropLocalNames);
      setCrops(cropLocalNames);
      console.log("crops ", crops);
    }
  };

  const [loading, setLoading] = useState(false);

  const onChangeName = (e: any) => {
    setName(e.target.value);
  };
  const onChangeCrops = (event: React.SyntheticEvent, value: any) => {
    setSelectedCrops(value);
    // Extract crop names from the selected crops and store them in an array
    const cropNames = value.map((crop: any) => crop.cropName);
    setSelectedCropNames(cropNames);
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
    console.log("regisrer function neterd");
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
      dealer_mobile,
      crops: selectedCrops,
    };

    try {
      console.log("entered response of new registration");
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
      <Header title="Farmer" subtitle="New Registration" />\
      <div className=" mobile:top-[10vh] mobile:absolute mobile:left-[2vh] mobile:right-[2vh]  mobile:flex-col mobile:flex mobile:gap-y-[8vh]">
        <h2 className="regheading">New Farmer Registration</h2>
        <section className="form-group">
          <div>
            <label>Name</label>
            <input type="text" onChange={onChangeName}></input>
          </div>
          <div>
            <div>
              <label>Mobile Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={onChangePhone}
              ></input>
            </div>
            <div className="whatsappdiv">
              <Checkbox
                checked={mobileIsWhatsapp}
                onChange={onChangeIsWhatsapp}
                inputProps={{ "aria-label": "controlled" }}
              />
              <span style={{ fontWeight: "bolder" }}>Whatsapp</span>
            </div>
          </div>
          <div className="addressbar">
            <label>Address</label>
            <div>
              <div>
                <label className="pincodelabel">
                  <input onChange={onChangeZip} placeholder="Pincode"></input>
                </label>
              </div>
              <div>
                <Input label="State" value={state} disabled />{" "}
                {loading ? <Loader /> : null}
              </div>
              <div>
                <Input label="City" value={city} disabled />{" "}
                {loading ? <Loader /> : null}
              </div>
              <div>
                <Input label="Area" onChange={onChangeStreet} />
              </div>
            </div>
          </div>

          <div>
            <label>Total Farm Area(Acre)</label>
            <input type="number" onChange={onChangeTotalLandArea}></input>
          </div>

          <div className="dealerfarmer">
            <label className="dealerlabel">Dealer Farmer Relationship</label>
            <Autocomplete
              onChange={onChangeDealerFarmerRel}
              id="plantation-select"
              options={PlantationOption}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose Relationship"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
          </div>
          <div>
            <label>Type</label>
            <Autocomplete
              onChange={onChangePlantationType}
              id="plantation-select"
              options={PlantationOptions}
              autoHighlight
              getOptionLabel={(option) => option.value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose Type"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
          </div>
          <div>
            <label>Crops</label>
            <Autocomplete
              multiple
              id="crops-select"
              options={crops || []}
              getOptionLabel={(option) => option}
              onChange={onChangeCrops}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Crops"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
          </div>

          <div>
            <div></div>
            <button onClick={onSubmitHandler} type="submit">
              Submit
            </button>
          </div>
        </section>
        <OTPVerification
          open={open}
          handleClose={handleClose}
          Phone={phoneNumber}
        />
        <Popup isOpen={isPopupOpen} onClose={closePopup} />
      </div>
    </div>
  );
};

export default NewRegistration;
