import React, { useState, useEffect } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
  Container,
  Typography,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Autocomplete,
} from "@mui/material";
import fpoimg from "../assets/Images/FPOimg.png";
import axios from "axios";
import { toast } from "react-toastify";

const Fporegister: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [otherReason, setOtherReason] = useState("");
  const [reasons, setReasons] = useState({
    insights: false,
    connect: false,
    learn: false,
    opportunities: false,
    empower: false,
    other: false,
  });
  const [conferenceAttended, setConferenceAttended] = useState("");
  const [conferenceDetails, setConferenceDetails] = useState("");

  const supportNeeded = [
    "Capacity Building",
    "Access To Finance",
    "Market Linkages",
    "Technical Assistance",
    "Others",
  ];

  const [selectedSupport, setSelectedSupport] = useState<string[]>([]);
  const onChangeSupport = (event: any, newValue: string[]) => {
    setSelectedSupport(newValue);
  };

  const [fullName, setFullName] = useState("");
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState("");
  const [fpoName, setFpoName] = useState("");
  const [fpoLocation, setFpoLocation] = useState("");
  const [state, setState] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [activeFarmerMembers, setActiveFarmerMembers] = useState("");
  const [primaryProducts, setPrimaryProducts] = useState("");
  const [operationalDuration, setOperationalDuration] = useState("");
  const [annualProduction, setAnnualProduction] = useState("");
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [percentageGrowthProduction, setPercentageGrowthProduction] =
    useState("");
  const [percentageGrowthRevenue, setPercentageGrowthRevenue] = useState("");

  const handleFullNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFullName(event.target.value);
  };

  const handlePositionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPosition(event.target.value);
  };

  const handleExperienceChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setExperience(event.target.value);
  };

  const handleFpoNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFpoName(event.target.value);
  };

  const handleFpoLocationChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFpoLocation(event.target.value);
  };

  const handleStateChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setState(event.target.value);
  };

  const handleContactNumberChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setContactNumber(event.target.value);
  };

  const handleEmailAddressChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmailAddress(event.target.value);
  };

  const handleActiveFarmerMembersChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setActiveFarmerMembers(event.target.value);
  };

  const handlePrimaryProductsChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPrimaryProducts(event.target.value);
  };

  const handleOperationalDurationChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setOperationalDuration(event.target.value);
  };

  const handleAnnualProductionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAnnualProduction(event.target.value);
  };

  const handleAnnualRevenueChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAnnualRevenue(event.target.value);
  };

  const handlePercentageGrowthProductionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPercentageGrowthProduction(event.target.value);
  };

  const handlePercentageGrowthRevenueChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPercentageGrowthRevenue(event.target.value);
  };

  const distributionChannels = [
    "Local markets",
    "Super markets",
    "Exports",
    "Exhibitions",
    "Direct Customers",
    "Amazon/Flipkart",
    "Own Website Selling",
  ];

  const [selectedDistribution, setSelectedDistribution] = useState<string[]>(
    []
  );

  const onChangeDistribution = (event: any, newValues: string[]) => {
    setSelectedDistribution(newValues);
  };

  const [innovations, setInnovations] = useState("");
  const [partnerships, setPartnerships] = useState("");
  const [successStories, setSuccessStories] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const challenges = [
    "Weak financials",
    "Lack of professional management",
    "Inadequate access to credit",
    "Lack risk mitigation mechanisms",
    "Inadequate access to market",
    "Inadequate access to infrastructure",
    "Lack technical skills",
    "Difficulties in marketing produce",
    "Poor capitalization and funding scope",
    "Access to finance inputs and technology",
    "Increased competition from existing private companies",
    "Lack of self sustainability",
    "Lack of administrative controls",
    "Lack of professional expertise",
    "Low involvement of the members",
    "Others",
  ];

  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);

  const onChangeChallenges = (event: any, newValue: string[]) => {
    setSelectedChallenges(newValue);
  };

  const [othersText, setOthersText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReasons({ ...reasons, [event.target.name]: event.target.checked });
    if (event.target.name === "other") {
      setOtherReason(event.target.checked ? "" : otherReason);
    }
  };

  const handleOtherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtherReason(event.target.value);
  };

  const handleConferenceAttendedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConferenceAttended(event.target.value);
    if (event.target.value === "yes") {
      // If the user has attended conferences before, show the text field for details
      setConferenceDetails("");
    } else {
      // If the user hasn't attended conferences before, clear the details
      setConferenceDetails("");
    }
  };

  const handleConferenceDetailsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConferenceDetails(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      console.log("entered try block");

      // Prepare the request body data based on the model
      const formData = {
        // Personal Information
        fullName: fullName,
        position: position,
        experience: experience,

        // FPO Information
        fpoName: fpoName,
        fpoLocation: fpoLocation,
        state: state,
        contactNumber: contactNumber,
        emailAddress: emailAddress,
        activeFarmerMembers: activeFarmerMembers,
        primaryProducts: primaryProducts,
        operationalDuration: operationalDuration,
        annualProduction: annualProduction,
        annualRevenue: annualRevenue,
        percentageGrowthProduction: percentageGrowthProduction,
        percentageGrowthRevenue: percentageGrowthRevenue,

        // Distribution Channels
        distributionChannels,

        // FPO Needs
        selectedSupport: supportNeeded,

        // Challenges Faced
        selectedChallenges: challenges,

        // Reasons for Attending Conference
        reasons,
        otherReason: otherReason ? otherReason : "", // Handle empty "other" reason

        // Conference Attendance
        conferenceAttended,
        conferenceDetails: conferenceDetails ? conferenceDetails : "", // Handle empty conference details

        // Additional Information
        innovations,
        partnerships,
        successStories,
        additionalInfo,
      };

      // Make HTTP POST request to store form data
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/store-data`,
        formData
      );

      console.log("registered");
      toast.success("Congrats, Registration successful", {
        position: toast.POSITION.TOP_RIGHT,
      });

      // Reload the current page
      window.location.reload();

      console.log(response.data);
    } catch (error) {
      toast.error("Registration Failed, try again", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="container mx-auto my-page">
      <div className="text-left">
        <img src="Images/logoname.png" alt="Logo" className="h-12 sm:h-16" />
        <div className="rounded-xl overflow-hidden">
          <img src={fpoimg} alt="loading..." />
        </div>
        <Typography variant="h4" className="text-4xl font-extrabold p-5">
          FPO National Conference Registration form
        </Typography>
      </div>
      <Container maxWidth="lg" className="bg-blue-gray-50 rounded-xl">
        <form>
          {/* Personal Information about the participant */}
          <Typography variant="h4" className="font-bold text-left text-xl p-5">
            1.Personal Information about the participant:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="fullName"
                label="Full Name"
                variant="outlined"
                required
                onChange={handleFullNameChange}
              />
            </Grid>
            {/* Add other personal information fields here */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="position"
                label="Position/designation"
                variant="outlined"
                required
                onChange={handlePositionChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="experience"
                label="Years of Experience in FPO Management"
                variant="outlined"
                required
                onChange={handleExperienceChange}
              />
            </Grid>
          </Grid>
          <Typography variant="h4" className="font-bold text-left text-xl p-5">
            2.FPO details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="fpoName"
                label="FPO Name"
                variant="outlined"
                required
                onChange={handleFpoNameChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="fpoLocation"
                label="FPO Location City"
                variant="outlined"
                required
                onChange={handleFpoLocationChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="state"
                label="State"
                variant="outlined"
                required
                onChange={handleStateChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="contactNumber"
                label="Contact Number"
                variant="outlined"
                required
                onChange={handleContactNumberChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="emailAddress"
                label="Email Address"
                variant="outlined"
                required
                onChange={handleEmailAddressChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="activeFarmerMembers"
                label="Number of Active Farmer Members"
                variant="outlined"
                required
                onChange={handleActiveFarmerMembersChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="primaryProducts"
                label="Primary Products/Crops"
                variant="outlined"
                required
                onChange={handlePrimaryProductsChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="operationalDuration"
                label="Operational Duration (From YEAR)"
                variant="outlined"
                required
                onChange={handleOperationalDurationChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="annualProduction"
                label="Annual production output (in tonnes)"
                variant="outlined"
                onChange={handleAnnualProductionChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="annualRevenue"
                label="Annual revenue generated (FY 2023-24 in INR)"
                variant="outlined"
                onChange={handleAnnualRevenueChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="percentageGrowthProduction"
                label="Percentage growth in production in Last Years"
                variant="outlined"
                onChange={handlePercentageGrowthProductionChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="percentageGrowthRevenue"
                label="Percentage growth in Revenue in Last Years"
                variant="outlined"
                onChange={handlePercentageGrowthRevenueChange}
              />
            </Grid>
          </Grid>

          {/* Conference Participation Reasons */}
          <Typography variant="h4" className="font-bold text-left text-xl p-5">
            3.Reasons for Participation:*
          </Typography>
          <div className="text-left">
            <FormControlLabel
              control={
                <Checkbox
                  checked={reasons.insights}
                  onChange={handleChange}
                  name="insights"
                />
              }
              label="Gain insights into the latest trends and developments in the agricultural sector."
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={reasons.connect}
                  onChange={handleChange}
                  name="connect"
                />
              }
              label="Connect with like-minded individuals and organizations working towards rural development."
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={reasons.learn}
                  onChange={handleChange}
                  name="learn"
                />
              }
              label="Learn from industry experts and thought leaders through interactive sessions and panel discussions."
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={reasons.opportunities}
                  onChange={handleChange}
                  name="opportunities"
                />
              }
              label="Discover opportunities for collaboration, investment, and partnership in the FPO ecosystem."
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={reasons.empower}
                  onChange={handleChange}
                  name="empower"
                />
              }
              label="Be a part of the collective effort to empower farmers and build a sustainable future for agriculture."
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={reasons.other}
                  onChange={handleChange}
                  name="other"
                />
              }
              label="Other, please specify:"
            />
            {reasons.other && (
              <TextField
                fullWidth
                value={otherReason}
                onChange={handleOtherChange}
                placeholder="Please specify your reason"
              />
            )}
          </div>
          <Typography variant="h4" className="font-bold text-left text-xl p-5">
            4.Have you attended any conferences before?*
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="conferenceAttended"
              name="conferenceAttended"
              value={conferenceAttended}
              onChange={handleConferenceAttendedChange}
              className="text-left"
              aria-required
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          {conferenceAttended === "yes" && (
            <TextField
              fullWidth
              value={conferenceDetails}
              onChange={handleConferenceDetailsChange}
              placeholder="Please mention the details"
            />
          )}
          <Typography variant="h4" className="font-bold text-left text-xl p-5">
            5.What are the three main challenges faced by you in managing the
            FPOs?*
          </Typography>
          <Autocomplete
            multiple
            id="challenges-select"
            options={challenges}
            getOptionLabel={(option) => option}
            onChange={onChangeChallenges}
            aria-required
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Challenges"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
              />
            )}
          />
          <Typography variant="h4" className="font-bold text-left text-xl p-5">
            6.What specific support or resources do you feel your FPO needs to
            overcome these challenges?
          </Typography>
          <div className="flex flex-col">
            <Autocomplete
              multiple
              id="support-select"
              options={supportNeeded}
              getOptionLabel={(option) => option}
              onChange={onChangeSupport}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Supports needed"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />

            <Typography
              variant="h4"
              className="font-bold text-left text-xl p-5"
            >
              7.Market Reach and Distribution: Select the Types of distribution
              channels utilized for marketing the products
            </Typography>
            <div className="flex flex-col">
              <Autocomplete
                multiple
                id="distribution-select"
                options={distributionChannels}
                getOptionLabel={(option) => option}
                onChange={onChangeDistribution}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Distribution Channels"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
              />
            </div>
            <Typography
              variant="h4"
              className="font-bold text-left text-xl p-5"
            >
              8.Innovations and Initiatives: What innovative
              practices/Developmental projects adopted by the FPO:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={innovations}
              onChange={(event) => setInnovations(event.target.value)}
              placeholder="Please describe the innovations and initiatives"
            />
          </div>
          <Typography variant="h4" className="font-bold text-left text-xl p-5">
            9.Name any partnerships or collaborations the FPO has with
            government agencies, NGOs, or other stakeholders:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={partnerships}
            onChange={(event) => setPartnerships(event.target.value)}
            placeholder="Please describe the partnerships or collaborations"
          />
          <Typography variant="h4" className="font-bold text-left text-xl p-5">
            10.Describe any notable success stories or achievements of the FPO:{" "}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={successStories}
            onChange={(event) => setSuccessStories(event.target.value)}
            placeholder="Please describe the success stories or achievements "
          />
          <Typography variant="h4" className="font-bold text-left text-xl p-5">
            11.Provide any additional information or comments or expectation in
            the conference you deem relevant:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={additionalInfo}
            onChange={(event) => setAdditionalInfo(event.target.value)}
            placeholder="Please describe the Additional Information"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="submit-button"
            style={{
              width: "20%",
              marginTop: "20px",
              backgroundColor: "rgb(132 204 22)",
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Fporegister;