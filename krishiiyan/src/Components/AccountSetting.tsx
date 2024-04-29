import React, { useState, useEffect } from "react";
import { Input, Button, Checkbox, Textarea } from "@material-tailwind/react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Api from "../Services/Api";
import Header from "./layouts/Header";

const AccountSetting = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [address, setAddress] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [primaryContactPerson, setPrimaryContactPerson] = useState("");
  const [primaryContactNumber, setPrimaryContactNumber] = useState("");
  const [numberOfFarmers, setNumberOfFarmers] = useState("");
  const [crops, setCrops] = useState([]);
  const [selectedCrops, setSelectedCrops] = useState([]);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const [error, response] = await Api.getCrops();
        if (error) {
          toast.error("Failed to fetch crops");
        } else {
          const cropNames = response?.data.map(
            (crop: { localName: any }) => crop.localName
          );
          setCrops(cropNames);
        }
      } catch (err) {
        console.error("Error fetching crops:", err);
        toast.error("Error fetching crops");
      }
    };
    fetchCrops();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const accountData = {
      organizationName,
      address,
      organizationType,
      primaryContactPerson,
      primaryContactNumber,
      numberOfFarmers,
      crops: selectedCrops,
    };

    try {
      const response = await fetch("/api/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accountData),
      });

      if (response.ok) {
        toast.success("Account created successfully");
      } else {
        toast.error("Failed to create account");
      }
    } catch (error) {
      console.error("Error submitting account data:", error);
      toast.error("Error submitting account data");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">New Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="organization-name">Organization Name</label>
          <Input
            id="organization-name"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            placeholder="Enter organization name"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address">Full Address</label>
          <Textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter full address"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="organization-type">Organization Type</label>
          <Autocomplete
            id="organization-type"
            options={["Type 1", "Type 2", "Type 3"]} // Customize with your organization types
            onChange={(event, newValue) => setOrganizationType(newValue || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select organization type"
                required
              />
            )}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="primary-contact-person">Primary Contact Person</label>
          <Input
            id="primary-contact-person"
            value={primaryContactPerson}
            onChange={(e) => setPrimaryContactPerson(e.target.value)}
            placeholder="Enter primary contact person"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="primary-contact-number">Primary Contact Number</label>
          <Input
            id="primary-contact-number"
            value={primaryContactNumber}
            onChange={(e) => setPrimaryContactNumber(e.target.value)}
            placeholder="Enter primary contact number"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="number-of-farmers">Number of Farmers</label>
          <Input
            id="number-of-farmers"
            type="number"
            value={numberOfFarmers}
            onChange={(e) => setNumberOfFarmers(e.target.value)}
            placeholder="Enter number of farmers"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="crops">Crops</label>
          <Autocomplete
            multiple
            id="crops"
            options={crops || ""}
            onChange={(event, newValues) => setSelectedCrops(newValues)}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select crops" required />
            )}
          />
        </div>

        <div className="mb-4">
          <Button type="submit" color="blue" variant="filled">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountSetting;
