import React, { useState } from "react";
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
} from "@mui/material";
import fpoimg from "../assets/Images/FPOimg.png";
import axios from "axios";
import { toast } from "react-toastify";

const Fporegister: React.FC = () => {
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
  const [supportNeeded, setSupportNeeded] = useState({
    capacityBuilding: false,
    accessToFinance: false,
    marketLinkages: false,
    technicalAssistance: false,
    others: false,
  });
  const [othersSupport, setOthersSupport] = useState("");

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

  const [distributionChannels, setDistributionChannels] = useState({
    localMarkets: false,
    supermarkets: false,
    exports: false,
    exhibitions: false,
    directCustomers: false,
    amazonFlipkart: false,
    ownWebsiteSelling: false,
  });

  const [innovations, setInnovations] = useState("");
  const [partnerships, setPartnerships] = useState("");
  const [successStories, setSuccessStories] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const [challenges, setChallenges] = useState({
    weakFinancials: false,
    lackProfessionalManagement: false,
    inadequateAccessToCredit: false,
    lackRiskMitigationMechanisms: false,
    inadequateAccessToMarket: false,
    inadequateAccessToInfrastructure: false,
    lackTechnicalSkills: false,
    difficultiesInMarketingProduce: false,
    poorCapitalizationAndFundingScope: false,
    accessToFinanceInputsAndTechnology: false,
    increasedCompetitionFromExistingPrivateCompanies: false,
    lackOfSelfSustainability: false,
    lackOfAdministrativeControls: false,
    lackOfProfessionalExpertise: false,
    lowInvolvementOfTheMembers: false,
    others: false,
  });

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

  const handleChallengeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target;
    if (checked && Object.values(challenges).filter(Boolean).length >= 3) {
      alert("You can select up to 3 challenges.");
      return;
    }
    setChallenges({ ...challenges, [name]: checked });
  };

  const handleOthersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOthersText(event.target.value); // Correctly update the new state for "Others" text input
  };

  const handleSupportChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSupportNeeded({ ...supportNeeded, [name]: checked });
    if (name === "others") {
      setOthersSupport(checked ? "" : othersSupport);
    }
  };

  const handleOthersSupportChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOthersSupport(event.target.value);
  };

  const handleDistributionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDistributionChannels({
      ...distributionChannels,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      console.log("enterd try block");
      // Make HTTP POST request to store form data
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/store-data`,
        {
          reasons,
          conferenceAttended,
          conferenceDetails,
          supportNeeded,
          fullName,
          position,
          experience,
          fpoName,
          fpoLocation,
          state,
          contactNumber,
          emailAddress,
          activeFarmerMembers,
          primaryProducts,
          operationalDuration,
          annualProduction,
          annualRevenue,
          percentageGrowthProduction,
          percentageGrowthRevenue,
          distributionChannels,
          innovations,
          partnerships,
          successStories,
          additionalInfo,
          challenges,
          fporegister: {
            fullName,
            position,
            experience,
            fpoName,
            fpoLocation,
            state,
            contactNumber,
            emailAddress,
            activeFarmerMembers,
            primaryProducts,
            operationalDuration,
            annualProduction,
            annualRevenue,
            percentageGrowthProduction,
            percentageGrowthRevenue,
          },
        }
      );
      console.log("regestered");
      toast.success("Congrats, Registration successfull", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(response.data);
    } catch (error) {
      toast.error("Registration Failed, try again", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <div>
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
            Personal Information about the participant:
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
            FPO details
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
                required
                onChange={handleAnnualProductionChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="annualRevenue"
                label="Annual revenue generated (FY 2023-24 in INR)"
                variant="outlined"
                required
                onChange={handleAnnualRevenueChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="percentageGrowthProduction"
                label="Percentage growth in production in Last Years"
                variant="outlined"
                required
                onChange={handlePercentageGrowthProductionChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="percentageGrowthRevenue"
                label="Percentage growth in Revenue in Last Years"
                variant="outlined"
                required
                onChange={handlePercentageGrowthRevenueChange}
              />
            </Grid>
          </Grid>

          {/* Conference Participation Reasons */}
          <Typography variant="h4" className="font-bold text-left text-xl p-5">
            Reasons for Participation:
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
            Have you attended any conferences before?
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="conferenceAttended"
              name="conferenceAttended"
              value={conferenceAttended}
              onChange={handleConferenceAttendedChange}
              className="text-left"
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
            What are the three main challenges faced by you in managing the
            FPOs?
          </Typography>
          <div className="flex flex-col">
            <FormControlLabel
              control={
                <Checkbox
                  checked={challenges.weakFinancials}
                  onChange={handleChallengeChange}
                  name="weakFinancials"
                />
              }
              label="Weak financials"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={challenges.lackProfessionalManagement}
                  onChange={handleChallengeChange}
                  name="lackProfessionalManagement"
                />
              }
              label="Lack of professional management"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={challenges.inadequateAccessToCredit}
                  onChange={handleChallengeChange}
                  name="inadequateAccessToCredit"
                />
              }
              label="Inadequate access to credit"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={challenges.lackRiskMitigationMechanisms}
                  onChange={handleChallengeChange}
                  name="LackOfRiskMitigationMechanisms"
                />
              }
              label="Lack of risk mitigation mechanisms"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={challenges.inadequateAccessToMarket}
                  onChange={handleChallengeChange}
                  name="InadequateAccessToMarket"
                />
              }
              label="Inadequate access to market"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={challenges.inadequateAccessToInfrastructure}
                  onChange={handleChallengeChange}
                  name="InadequateAccessToInfrastructure"
                />
              }
              label="Inadequate access to infrastructure"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={challenges.lackTechnicalSkills}
                  onChange={handleChallengeChange}
                  name="LackOfTechnicalSkills "
                />
              }
              label="Lack of technical skills "
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={challenges.difficultiesInMarketingProduce}
                  onChange={handleChallengeChange}
                  name="Difficulties InMarketingProduce"
                />
              }
              label="Difficulties in marketing produce"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={challenges.poorCapitalizationAndFundingScope}
                  onChange={handleChallengeChange}
                  name="PoorCapitalizationAndFundingScope"
                />
              }
              label="Poor capitalization and funding scope"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={challenges.difficultiesInMarketingProduce}
                  onChange={handleChallengeChange}
                  name="Difficulties InMarketingProduce"
                />
              }
              label="Difficulties in marketing produce"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={challenges.accessToFinanceInputsAndTechnology}
                  onChange={handleChallengeChange}
                  name="AccessToFinanceInputsAndTechnology"
                />
              }
              label="Access to finance, inputs, and technology"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    challenges.increasedCompetitionFromExistingPrivateCompanies
                  }
                  onChange={handleChallengeChange}
                  name="IncreasedCompetitionFromExistingPrivateCompanies"
                />
              }
              label="Increased competition from existing private companies"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={challenges.lackOfSelfSustainability}
                  onChange={handleChallengeChange}
                  name="LackOfSelfSustainability"
                />
              }
              label="Lack of self-sustainability"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={challenges.lackOfAdministrativeControls}
                  onChange={handleChallengeChange}
                  name="LackOfAdministrativeControls"
                />
              }
              label="Lack of administrative controls"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={challenges.lackOfProfessionalExpertise}
                  onChange={handleChallengeChange}
                  name="LackOfProfessionalExpertise"
                />
              }
              label="Lack of professional expertise"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={challenges.lowInvolvementOfTheMembers}
                  onChange={handleChallengeChange}
                  name="LowInvolvementOfTheMembers"
                />
              }
              label="Low involvement of the members"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={challenges.others}
                  onChange={handleChallengeChange}
                  name="others"
                />
              }
              label="Others, Please specify:"
            />
            {challenges.others && (
              <TextField
                fullWidth
                value={othersText} // Use the new state for "Others" text input
                onChange={handleOthersChange}
                placeholder="Please specify the other challenge"
              />
            )}

            <Typography
              variant="h4"
              className="font-bold text-left text-xl p-5"
            >
              What specific support or resources do you feel your FPO needs to
              overcome these challenges?
            </Typography>
            <div className="flex flex-col">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={supportNeeded.capacityBuilding}
                    onChange={handleSupportChange}
                    name="capacityBuilding"
                  />
                }
                label="Capacity building"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={supportNeeded.accessToFinance}
                    onChange={handleSupportChange}
                    name="AccessToFinance"
                  />
                }
                label="Access to finance"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={supportNeeded.marketLinkages}
                    onChange={handleSupportChange}
                    name="MarketLinkages"
                  />
                }
                label="Market linkages"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={supportNeeded.technicalAssistance}
                    onChange={handleSupportChange}
                    name="TechnicalAssistance"
                  />
                }
                label="Technical assistance"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={supportNeeded.others}
                    onChange={handleSupportChange}
                    name="others"
                  />
                }
                label="Others, please specify:"
              />
              {supportNeeded.others && (
                <TextField
                  fullWidth
                  value={othersSupport}
                  onChange={handleOthersSupportChange}
                  placeholder="Please specify the support needed"
                />
              )}
              <Typography
                variant="h4"
                className="font-bold text-left text-xl p-5"
              >
                Market Reach and Distribution: Select the Types of distribution
                channels utilized for marketing the products
              </Typography>
              <div className="flex flex-col">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={distributionChannels.localMarkets}
                      onChange={handleDistributionChange}
                      name="localMarkets"
                    />
                  }
                  label="Local markets"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={distributionChannels.supermarkets}
                      onChange={handleDistributionChange}
                      name="SuperMarkets"
                    />
                  }
                  label="Supermarkets"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={distributionChannels.exports}
                      onChange={handleDistributionChange}
                      name="Exports"
                    />
                  }
                  label="Exports"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={distributionChannels.exhibitions}
                      onChange={handleDistributionChange}
                      name="Exhibitions"
                    />
                  }
                  label="Exhibitions"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={distributionChannels.directCustomers}
                      onChange={handleDistributionChange}
                      name="DirectCustomers"
                    />
                  }
                  label="Direct Customers"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={distributionChannels.amazonFlipkart}
                      onChange={handleDistributionChange}
                      name="AmazonFlipkart"
                    />
                  }
                  label="Amazon/Flipkart"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={distributionChannels.ownWebsiteSelling}
                      onChange={handleDistributionChange}
                      name="OwnWebsiteSelling"
                    />
                  }
                  label="Own website selling"
                />
              </div>
              <Typography
                variant="h4"
                className="font-bold text-left text-xl p-5"
              >
                Innovations and Initiatives: What innovative
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
            <Typography
              variant="h4"
              className="font-bold text-left text-xl p-5"
            >
              Name any partnerships or collaborations the FPO has with
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
            <Typography
              variant="h4"
              className="font-bold text-left text-xl p-5"
            >
              Describe any notable success stories or achievements of the FPO:{" "}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={successStories}
              onChange={(event) => setSuccessStories(event.target.value)}
              placeholder="Please describe the success stories or achievements "
            />
            <Typography
              variant="h4"
              className="font-bold text-left text-xl p-5"
            >
              Provide any additional information or comments or expectation in
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
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Fporegister;
