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
  InputAdornment,
} from "@mui/material";
import fpoimg from "../assets/Images/FPOimg.png";
import axios from "axios";
import { toast } from "react-toastify";
import Translator from "./Translator";

interface FpoTranslations {
  [languageCode: string]: {
    formTitle: string;
    personalInformationTitle: string;
    personalInformation: {
      fullName: string;
      position: string;
      experience: string;
    };
    fpoDetailsTitle: string;
    fpoDetails: {
      fpoName: string;
      tonnes: string;
      fpoLocation: string;
      state: string;
      contactNumber: string;
      emailAddress: string;
      activeFarmerMembers: string;
      dateOfRegistration: string;
      numVillagesCovered: string;
      numGramPanchayatBlocksCovered: string;
      primaryProducts: string;
      operationalDuration: string;
      annualProduction: string;
      annualRevenue: string;
      percentageGrowthProduction: string;
      percentageGrowthRevenue: string;
      registeredAs: string;
      otherRegisteredAs: string;
      facilitatingInstitutions: string;
      specify: string;
      society: string;
      cooperative: string;
      trust: string;
      company: string;
      other: string;
    };
    participationReasonsTitle: string;
    participationReasons: {
      insights: string;
      connect: string;
      learn: string;
      opportunities: string;
      empower: string;
      other: string;
      otherPlaceholder: string;
    };
    conferenceAttendanceTitle: string;
    conferenceAttendance: {
      yes: string;
      no: string;
      detailsPlaceholder: string;
    };
    challengesTitle: string;
    challengesPlaceholder: string;
    challengesOptions: {
      weakFinancials: string;
      lackProfessionalManagement: string;
      inadequateAccessToCredit: string;
      lackRiskMitigationMechanisms: string;
      inadequateAccessToMarket: string;
      inadequateAccessToInfrastructure: string;
      lackTechnicalSkills: string;
      difficultiesInMarketingProduce: string;
      poorCapitalizationAndFundingScope: string;
      accessToFinanceInputsAndTechnology: string;
      increasedCompetitionFromExistingPrivateCompanies: string;
      lackOfSelfSustainability: string;
      lackOfAdministrativeControls: string;
      lackOfProfessionalExpertise: string;
      lowInvolvementOfTheMembers: string;
      others: string;
    };
    supportNeededTitle: string;
    supportNeededPlaceholder: string;
    supportNeededOptions: {
      Capacity: string;
      Access: string;
      Market: string;
      Technical: string;
      Others: string;
    };
    distributionChannelsTitle: string;
    distributionChannelsPlaceholder: string;
    distributionChannelsMap: {
      localMarkets: string;
      superMarkets: string;
      exports: string;
      exhibitions: string;
      directCustomers: string;
      amazonFlipkart: string;
      ownWebsiteSelling: string;
    };
    innovationsTitle: string;
    innovationsPlaceholder: string;
    partnershipsTitle: string;
    partnershipsPlaceholder: string;
    successStoriesTitle: string;
    successStoriesPlaceholder: string;
    additionalInfoTitle: string;
    additionalInfoPlaceholder: string;
    submitButton: string;
    error1: string;
    error2: string;
    success: string;
  };
}

const fpoTranslations: FpoTranslations = {
  en: {
    formTitle: "FPO National Conference Registration Form",
    personalInformationTitle: "1. Personal Information about the Participant",
    personalInformation: {
      fullName: "Full Name",
      position: "Position/Designation",
      experience: "Years of Experience in FPO Management",
    },
    fpoDetailsTitle: "2. FPO Details",
    fpoDetails: {
      fpoName: "FPO Name",
      tonnes: "tonnes",
      fpoLocation: "FPO Location City",
      state: "State",
      contactNumber: "Contact Number",
      emailAddress: "Email Address",
      activeFarmerMembers: "Number of Active Farmer Members",
      dateOfRegistration: "FPO-Date of Registration",
      numVillagesCovered: "Number of Villages Covered under FPO",
      numGramPanchayatBlocksCovered: "NO. Gram panchayat & Blocks Under",
      primaryProducts: "Primary Products/Crops",
      operationalDuration: "Operational Duration (From YEAR)",
      annualProduction: "Annual Production Output (tonnes)",
      annualRevenue: "Annual Revenue Generated (FY 2023-24 in INR)",
      percentageGrowthProduction:
        "Percentage Growth in Production in Last Years",
      percentageGrowthRevenue: "Percentage Growth in Revenue in Last Years",
      registeredAs: "FPO Registered As",
      otherRegisteredAs: "Specify Other",
      facilitatingInstitutions: "Name of Facilitating Institutions",
      specify: "please specify name",
      society: "Society",
      cooperative: "Cooperative Society",
      trust: "Trust",
      company: "Company",
      other: "Other",
    },
    participationReasonsTitle: "3. Reasons for Participation",
    participationReasons: {
      insights:
        "Gain insights into the latest trends and developments in the agricultural sector",
      connect:
        "Connect with like-minded individuals and organizations working towards rural development",
      learn:
        "Learn from industry experts and thought leaders through interactive sessions and panel discussions",
      opportunities:
        "Discover opportunities for collaboration, investment, and partnership in the FPO ecosystem",
      empower:
        "Be a part of the collective effort to empower farmers and build a sustainable future for agriculture",
      other: "Other, please specify",
      otherPlaceholder: "Please specify your reason",
    },
    conferenceAttendanceTitle: "4. Have you attended any conferences before?",
    conferenceAttendance: {
      yes: "Yes",
      no: "No",
      detailsPlaceholder: "Please mention the details",
    },
    challengesTitle:
      "5. What are the three main challenges faced by you in managing the FPOs?",
    challengesPlaceholder: "Select Challenges",
    challengesOptions: {
      weakFinancials: "Weak financials",
      lackProfessionalManagement: "Lack of professional management",
      inadequateAccessToCredit: "Inadequate access to credit",
      lackRiskMitigationMechanisms: "Lack risk mitigation mechanisms",
      inadequateAccessToMarket: "Inadequate access to market",
      inadequateAccessToInfrastructure: "Inadequate access to infrastructure",
      lackTechnicalSkills: "Lack technical skills",
      difficultiesInMarketingProduce: "Difficulties in marketing produce",
      poorCapitalizationAndFundingScope:
        "Poor capitalization and funding scope",
      accessToFinanceInputsAndTechnology:
        "Access to finance inputs and technology",
      increasedCompetitionFromExistingPrivateCompanies:
        "Increased competition from existing private companies",
      lackOfSelfSustainability: "Lack of self sustainability",
      lackOfAdministrativeControls: "Lack of administrative controls",
      lackOfProfessionalExpertise: "Lack of professional expertise",
      lowInvolvementOfTheMembers: "Low involvement of the members",
      others: "Others",
    },
    supportNeededTitle:
      "6. What specific support or resources do you feel your FPO needs to overcome these challenges?",
    supportNeededPlaceholder: "Select Supports Needed",
    supportNeededOptions: {
      Capacity: "Capacity Building",
      Access: "Access To Finance",
      Market: "Market Linkages",
      Technical: "Technical Assistance",
      Others: "Others",
    },
    distributionChannelsTitle:
      "7. Market Reach and Distribution: Select the types of distribution channels utilized for marketing the products",
    distributionChannelsPlaceholder: "Select Distribution Channels",
    distributionChannelsMap: {
      localMarkets: "Local markets",
      superMarkets: "Super markets",
      exports: "Exports",
      exhibitions: "Exhibitions",
      directCustomers: "Direct Customers",
      amazonFlipkart: "Amazon/Flipkart",
      ownWebsiteSelling: "Own Website Selling",
    },
    innovationsTitle:
      "8. Innovations and Initiatives: What innovative practices/developmental projects adopted by the FPO",
    innovationsPlaceholder: "Please describe the innovations and initiatives",
    partnershipsTitle:
      "9. Name any partnerships or collaborations the FPO has with government agencies, NGOs, or other stakeholders",
    partnershipsPlaceholder:
      "Please describe the partnerships or collaborations",
    successStoriesTitle:
      "10. Describe any notable success stories or achievements of the FPO",
    successStoriesPlaceholder:
      "Please describe the success stories or achievements",
    additionalInfoTitle:
      "11. Provide any additional information or comments or expectation in the conference you deem relevant",
    additionalInfoPlaceholder: "Please describe the additional information",
    submitButton: "Submit",
    error1: "Email already exists. Please use a different email address.",
    error2: "Registration Failed, try again",
    success: "Congrats, Registration successful",
  },
  //assamese
  as: {
    formTitle: "এফপিঅ' জাতীয় সন্মেলন নিবন্ধন ফৰ্ম",
    personalInformationTitle: "১. অংশগ্ৰহণকাৰীৰ ব্যক্তিগত তথ্য",
    personalInformation: {
      fullName: "পূৰ্ণনাম",
      position: "অৱস্থান/পদ",
      experience: "এফপিঅ' ব্যৱস্থাপনাত অভিজ্ঞতাৰ বছৰ",
    },
    fpoDetailsTitle: "২. এফপিঅ' বিৱৰণ",
    fpoDetails: {
      fpoName: "এফপিঅ' নাম",
      tonnes: "টন",
      fpoLocation: "এফপিঅ' অবস্থান চহৰ",
      state: "ৰাজ্য",
      contactNumber: "যোগাযোগ নম্বৰ",
      emailAddress: "ইমেইল ঠিকনা",
      activeFarmerMembers: "সকৰীয়া কৃষক সদস্যৰ সংখ্যা",
      dateOfRegistration: "FPO-নিবন্ধনৰ তাৰিখ",
      numVillagesCovered: "কুৰা কৰা গাঁৱৰ সংখ্যা",
      numGramPanchayatBlocksCovered: "নহয়. গ্ৰাম পঞ্চায়ত আৰু ব্লকসমূহৰ অধীনত",
      primaryProducts: "প্ৰাথমিক উৎপাদন/ফসল",
      operationalDuration: "কৰ্যকাল (বছৰৰ পৰা)",
      annualProduction: "বার্ষিক উৎপাদন ফলাফল (টন)",
      annualRevenue: "বার্ষিক আয় (আর্থিক বছৰ ২০২৩-২৪ত)",
      percentageGrowthProduction: "পিছলিত বছৰৰ উৎপাদন বৃদ্ধিৰ শতাংশ",
      percentageGrowthRevenue: "পিছলিত বছৰৰ আয় বৃদ্ধিৰ শতাংশ",
      registeredAs: "FPO নিবন্ধিত",
      otherRegisteredAs: "অন্যান্য নিবন্ধিত",
      facilitatingInstitutions: "সহায়ক প্ৰতিষ্ঠানৰ নাম",

      specify: "অনুগ্ৰহ কৰি নাম নিৰ্দিষ্ট কৰি",
      society: "সমাজ",
      cooperative: "সাহকাৰী সমাজ",
      trust: "ট্ৰাষ্ট",
      company: "কাম্পানী",
      other: "অন্য",
    },
    participationReasonsTitle: "৩. অংশগ্ৰহণৰ কাৰণসমূহ",
    participationReasons: {
      insights: "কৃষি ক্ষেত্ৰৰ সাম্প্ৰতিক প্ৰৱণতা আৰু উন্নয়নৰ বিষয়ে জানক",
      connect: "মনে-প্ৰাণে মিলৰ ব্যক্তিবর্গ আৰু সংস্থা সম্পৰ্কত",
      learn:
        "ইণ্টাৰেক্টিভ চেশ্বন আৰু পেনেল আলোচনাৰ জৰিয়তে শিল্প বিশেষজ্ঞ আৰু চিন্তাবিদৰ পৰা শিকক",
      opportunities:
        "এফপিঅ' বাস্তুতন্ত্রত সহযোগিতা, বিনিয়োগ, আৰু অংশীদাৰিত্বৰ সুযোগ পোহিত",
      empower:
        "কৃষকক শক্তিশালী কৰিবলৈ আৰু কৃষিৰ বাবে এটা টেকসই ভবিষ্যত নিৰ্মাণৰ প্ৰয়াসত অংশগ্ৰহণ কৰিব",
      other: "অন্য, অনুগ্ৰহ কৰি নিৰ্দিষ্ট কৰক",
      otherPlaceholder: "অনুগ্ৰহ কৰি আপোনাৰ কাৰণ নিৰ্দিষ্ট কৰক",
    },
    conferenceAttendanceTitle: "৪. আপোনাই পূৰ্বত কোনো সন্মেলনত অংশগ্ৰহণ কৰিছে?",
    conferenceAttendance: {
      yes: "হ্যাঁ",
      no: "নহয়",
      detailsPlaceholder: "অনুগ্ৰহ কৰি বিৱৰণ উল্লেখ কৰক",
    },
    challengesTitle: "৫. এফপিঅ' মেংয়াৰ সময়ত প্ৰধান তিনিটা চ্যালেঞ্জ",
    challengesPlaceholder: "চ্যালেঞ্জসমূহ বাচনি কৰক",
    challengesOptions: {
      weakFinancials: "দুৰ্বল আৰ্থিক",
      lackProfessionalManagement: "পেশাদাৰী প্ৰবন্ধনৰ অভাৱ",
      inadequateAccessToCredit: "ঋণত সীমিত প্ৰৱেশ",
      lackRiskMitigationMechanisms: "ঝুঁকি হ্ৰাস ব্যৱস্থাৰ অভাৱ",
      inadequateAccessToMarket: "বাজারত সীমিত প্ৰৱেশ",
      inadequateAccessToInfrastructure: "অৱকাঠামোবিচাৰপৰা",
      lackTechnicalSkills: "প্ৰযুক্তিগত কৌশলৰ অভাৱ",
      difficultiesInMarketingProduce: "পণ্য বিক্ৰী সমস্যাসমূহ",
      poorCapitalizationAndFundingScope: "অপুৰণীয় পুঁজিবাদ আৰু অর্থায়ন সুযোগ",
      accessToFinanceInputsAndTechnology:
        "আর্থিক ইনপুট আৰু প্ৰযুক্তিগত উপলব্ধি",
      increasedCompetitionFromExistingPrivateCompanies:
        "বিদ্যমান ব্যক্তিগত কোম্পানীসমূহৰ পৰা বৃদ্ধিত প্ৰতিযোগিতা",
      lackOfSelfSustainability: "আত্মনির্ভরতায় অভাব",
      lackOfAdministrativeControls: "প্ৰশাসনিক নিয়ন্ত্ৰণৰ অভাৱ",
      lackOfProfessionalExpertise: "পেশাদাৰী বিশেষজ্ঞতা অভাৱ",
      lowInvolvementOfTheMembers: "সদস্যৰ নিম্ন অংশগ্ৰহণ",
      others: "অন্যান্য",
    },
    supportNeededTitle:
      "৬. কোনো বিশেষ সহায়তা বা সম্পদ যা অনুভূত হয় যে FPO চ্যালেঞ্জসমূহত ক্ষতি পূরণৰ বাবে প্ৰয়োজন?",
    supportNeededPlaceholder: "সহায়তা বাচনি কৰক",
    supportNeededOptions: {
      Capacity: "ক্ষমতা নিৰ্মাণ",
      Access: "আর্থিকত প্ৰৱেশ",
      Market: "বাজার যোগসূত্র",
      Technical: "প্ৰযুক্তিগত সহায়তা",
      Others: "অন্যান্য",
    },
    distributionChannelsTitle:
      "৭. बजार প্ৰৱেশ আৰু বিতৰণ: পণ্য বিক্ৰীৰ বাবে ব্যৱহৃত বণ্টন চেনেলসমূহ বাচনি কৰক",
    distributionChannelsPlaceholder: "বণ্টন চেনেলসমূহ বাচনি কৰক",
    distributionChannelsMap: {
      localMarkets: "স্থানীয় বাজারসমূহ",
      superMarkets: "সুপারমাৰ্কেট",
      exports: "ৰপ্তানি",
      exhibitions: "প্ৰদৰ্শনী",
      directCustomers: "প্ৰত্যক্ষ গ্ৰাহক",
      amazonFlipkart: "আমাজন/ফ্লিপকাৰ্ট",
      ownWebsiteSelling: "নিজৰ ৱেবচাইট বিক্ৰী",
    },
    innovationsTitle:
      "৮. এফপিঅ' দ্বাৰা গ্ৰহণ কৰা উদ্ভাৱনী অভ্যাস/উন্নয়ন প্ৰকল্পসমূহ",
    innovationsPlaceholder: "উদ্ভাৱনী আৰু উদ্যোগসমূহ বৰ্ণনা কৰক",
    partnershipsTitle:
      "৯. চৰকাৰী এজেন্সী, এনজিও, বা অন্যান্য অংশীদাৰৰ সৈতে এফপিঅ'ৰ সহযোগিতা অথবা অংশীদাৰিত্ব",
    partnershipsPlaceholder: "অনুগ্ৰহ কৰি সহযোগিতা অথবা অংশীদাৰিত্ব বৰ্ণনা কৰক",
    successStoriesTitle:
      "১০. এফপিঅ'ৰ উল্লেখযোগ্য সফলতা কিম্বা সাফল্যৰ কাহিনী বৰ্ণনা কৰক",
    successStoriesPlaceholder: "অনুগ্ৰহ কৰি সফলতা বা সাফল্যৰ কাহিনী বৰ্ণনা কৰক",
    additionalInfoTitle:
      "১১. আপনি উপলব্ধি কৰা সন্মেলনসম্পৰ্কীয় কোনো অতিৰিক্ত তথ্য, মন্তব্ব্য কিম্বা আশা",
    additionalInfoPlaceholder: "অতিৰিক্ত তথ্য বৰ্ণনা কৰক",
    submitButton: "জমা দিয়া",
    error1: "ইমেইল ইতিমধ্যেই আছে। অনুগ্রহ কৰি অন্য ইমেইল এড্ৰেছ ব্যৱহাৰ কৰক।",
    error2: "ৰেজিষ্ট্ৰেশ্বন বিফল, পুনৰ চেষ্টা কৰক",
    success: "অভিনন্দন, ৰেজিষ্ট্ৰেশ্বন সফল",
  },
  //hindi
  hi: {
    formTitle: "एफपीओ राष्ट्रीय सम्मेलन पंजीकरण फॉर्म",
    personalInformationTitle: "1. प्रतिभागी के बारे में व्यक्तिगत जानकारी",
    personalInformation: {
      fullName: "पूरा नाम",
      position: "पद/पदनाम",
      experience: "एफपीओ प्रबंधन में अनुभव के वर्ष",
    },
    fpoDetailsTitle: "2. एफपीओ विवरण",
    fpoDetails: {
      fpoName: "एफपीओ नाम",
      tonnes: "टन",
      fpoLocation: "एफपीओ स्थान शहर",
      state: "राज्य",
      contactNumber: "संपर्क नंबर",
      emailAddress: "ईमेल पता",
      activeFarmerMembers: "सक्रिय किसान सदस्यों की संख्या",
      dateOfRegistration: "पंजीकरण की तारीख",
      numVillagesCovered: "एफपीओ के अंतर्गत शामिल गांवों की संख्या",
      numGramPanchayatBlocksCovered:
        " एफपीओ के अंतर्गत ग्राम पंचायत की संख्या एवं ब्लॉक",
      primaryProducts: "प्राथमिक उत्पाद/फसलें",
      operationalDuration: "कार्यकाल अवधि (वर्ष से)",
      annualProduction: "वार्षिक उत्पादन (टन)",
      annualRevenue: "वार्षिक आय (वित्तीय वर्ष 2023-24 में INR)",
      percentageGrowthProduction: "पिछले वर्षों में उत्पादन में प्रतिशत वृद्धि",
      percentageGrowthRevenue: "पिछले वर्षों में राजस्व में प्रतिशत वृद्धि",
      registeredAs: "FPO पंजीकृत",
      otherRegisteredAs: "अन्य निर्दिष्ट करें",
      facilitatingInstitutions: "सुगम संस्थानों के नाम",
      specify: "कृपया नाम निर्दिष्ट करें",
      society: "समाज",
      cooperative: "सहकारी समिति",
      trust: "ट्रस्ट",
      company: "कंपनी",
      other: "अन्य",
    },
    participationReasonsTitle: "3. भागीदारी के कारण",
    participationReasons: {
      insights:
        "कृषि क्षेत्र के नवीनतम रुझान और विकास के बारे में जानकारी प्राप्त करें",
      connect:
        "ग्रामीण विकास की दिशा में काम कर रहे समान विचारधारा वाले व्यक्तियों और संगठनों से जुड़ें",
      learn:
        "इंटरएक्टिव सत्रों और पैनल चर्चाओं के माध्यम से उद्योग विशेषज्ञों और विचारकों से सीखें",
      opportunities:
        "एफपीओ पारिस्थितिकी तंत्र में सहयोग, निवेश और साझेदारी के अवसरों की खोज करें",
      empower:
        "किसानों को सशक्त बनाने और कृषि के लिए एक स्थायी भविष्य के निर्माण के सामूहिक प्रयास में भाग लें",
      other: "अन्य, कृपया निर्दिष्ट करें",
      otherPlaceholder: "कृपया अपना कारण निर्दिष्ट करें",
    },
    conferenceAttendanceTitle: "4. क्या आपने पहले कोई सम्मेलन में भाग लिया है?",
    conferenceAttendance: {
      yes: "हां",
      no: "नहीं",
      detailsPlaceholder: "कृपया विवरण का उल्लेख करें",
    },
    challengesTitle:
      "5. एफपीओ प्रबंधन में आपको सामना करने वाली तीन मुख्य चुनौतियाँ क्या हैं?",
    challengesPlaceholder: "चुनौतियों का चयन करें",
    challengesOptions: {
      weakFinancials: "कमजोर वित्तीय स्थिति",
      lackProfessionalManagement: "पेशेवर प्रबंधन की कमी",
      inadequateAccessToCredit: "ऋण तक अपर्याप्त पहुंच",
      lackRiskMitigationMechanisms: "जोखिम न्यूनीकरण तंत्र की कमी",
      inadequateAccessToMarket: "बाजार तक अपर्याप्त पहुंच",
      inadequateAccessToInfrastructure: "अपर्याप्त अवसंरचना तक पहुंच",
      lackTechnicalSkills: "तकनीकी कौशल की कमी",
      difficultiesInMarketingProduce: "उत्पादन विपणन में कठिनाइयाँ",
      poorCapitalizationAndFundingScope: "कम पूंजीकरण और वित्तपोषण गुंजाइश",
      accessToFinanceInputsAndTechnology: "वित्तीय इनपुट और तकनीकी तक पहुंच",
      increasedCompetitionFromExistingPrivateCompanies:
        "मौजूदा निजी कंपनियों से बढ़ती प्रतिस्पर्धा",
      lackOfSelfSustainability: "स्वयं-संरक्षण की कमी",
      lackOfAdministrativeControls: "प्रशासनिक नियंत्रणों की कमी",
      lackOfProfessionalExpertise: "पेशेवर विशेषज्ञता की कमी",
      lowInvolvementOfTheMembers: "सदस्यों की कम भागीदारी",
      others: "अन्य",
    },
    supportNeededTitle:
      "6. इन चुनौतियों को पार करने के लिए आपके एफपीओ को किस प्रकार का समर्थन या संसाधन चाहिए?",
    supportNeededPlaceholder: "आवश्यक समर्थन का चयन करें",
    supportNeededOptions: {
      Capacity: "क्षमता निर्माण",
      Access: "वित्तीय पहुंच",
      Market: "बाजार संपर्क",
      Technical: "तकनीकी सहायता",
      Others: "अन्य",
    },
    distributionChannelsTitle:
      "7. बाजार पहुंच और वितरण: उत्पाद विपणन के लिए उपयोग की जाने वाली वितरण चैनलों का चयन करें",
    distributionChannelsPlaceholder: "वितरण चैनलों का चयन करें",
    distributionChannelsMap: {
      localMarkets: "स्थानीय बाजार",
      superMarkets: "सुपरमार्केट",
      exports: "निर्यात",
      exhibitions: "प्रदर्शनी",
      directCustomers: "प्रत्यक्ष ग्राहक",
      amazonFlipkart: "अमेज़न/फ्लिपकार्ट",
      ownWebsiteSelling: "स्वयं की वेबसाइट बिक्री",
    },
    innovationsTitle:
      "8. एफपीओ द्वारा अपनाई गई अभिनव प्रथाओं/विकासात्मक परियोजनाओं का वर्णन करें",
    innovationsPlaceholder: "अभिनव प्रथाओं और परियोजनाओं का वर्णन करें",
    partnershipsTitle:
      "9. एफपीओ के सरकार एजेंसियों, एनजीओ, या अन्य हितधारकों के साथ कोई साझेदारी या सहयोग का नाम दें",
    partnershipsPlaceholder: "कृपया साझेदारी या सहयोग का वर्णन करें",
    successStoriesTitle:
      "10. एफपीओ की कोई उल्लेखनीय सफलता की कहानियों या उपलब्धियों का वर्णन करें",
    successStoriesPlaceholder:
      "कृपया सफलता की कहानियों या उपलब्धियों का वर्णन करें",
    additionalInfoTitle:
      "11. सम्मेलन से संबंधित कोई अतिरिक्त जानकारी, टिप्पणी या अपेक्षा प्रदान करें",
    additionalInfoPlaceholder: "कृपया अतिरिक्त जानकारी का वर्णन करें",
    submitButton: "प्रस्तुत करें",
    error1: "ईमेल पहले से मौजूद है। कृपया एक अलग ईमेल पता इस्तेमाल करें।",
    error2: "पंजीकरण विफल, पुनः प्रयास करें",
    success: "बधाई हो, पंजीकरण सफल रहा",
  },
  //bodo
  brx: {
    formTitle: "FPO राष्‍ट्रीय सभा पंजीकरण फॉर्म",
    personalInformationTitle: "1. भागीदार के बारे में व्यक्तिगत जानकारी",
    personalInformation: {
      fullName: "पूरा नाम",
      position: "पद/पदनाम",
      experience: "FPO प्रबंधन में अनुभव के वर्ष",
    },
    fpoDetailsTitle: "2. FPO विवरण",
    fpoDetails: {
      fpoName: "FPO नाम",
      tonnes: "टन",
      fpoLocation: "FPO स्थान शहर",
      state: "राज्य",
      contactNumber: "संपर्क संख्या",
      emailAddress: "ईमेल पता",
      activeFarmerMembers: "सक्रिय किसान सदस्य",
      dateOfRegistration: "पंजीकरण की तारीख",
      numVillagesCovered: "FPO कवर किए गए गांवों की संख्या",
      numGramPanchayatBlocksCovered: "FPO-ग्राम पंचायत और ब्लॉक की संख्या",
      primaryProducts: "प्राथमिक उत्पाद/फसलें",
      operationalDuration: "क्रियान्वयन की अवधि (वर्ष से)",
      annualProduction: "वार्षिक उत्पादन (टन)",
      annualRevenue: "वार्षिक राजस्व (वित्तीय वर्ष 2023-24 में INR)",
      percentageGrowthProduction: "पिछले वर्षों में उत्पादन में प्रतिशत वृद्धि",
      percentageGrowthRevenue: "पिछले वर्षों में राजस्व में प्रतिशत वृद्धि",
      registeredAs: "FPO पंजीकृत के रूप में",
      otherRegisteredAs: "अन्य निर्दिष्ट करें",
      facilitatingInstitutions: "सुगम संस्थाओं के नाम",
      specify: "कृपया निर्दिष्ट करें",
      society: "समाज",
      cooperative: "सहकारी समिति",
      trust: "ट्रस्ट",
      company: "कंपनी",
      other: "अन्य",
    },
    participationReasonsTitle: "3. भागीदारी के कारण",
    participationReasons: {
      insights: "कृषि क्षेत्र में नवीनतम रुझान और विकास के बारे में जानें",
      connect:
        "ग्रामीण विकास के लिए कार्यरत समान विचारधारा वाले लोगों और संगठनों से जुड़ें",
      learn:
        "इंटरैक्टिव सत्रों और पैनल चर्चाओं के माध्यम से उद्योग विशेषज्ञों से सीखें",
      opportunities:
        "सहयोग, निवेश, और FPO पारिस्थितिकी तंत्र में साझेदारी के अवसर खोजें",
      empower: "किसानों को सशक्त बनाने के सामूहिक प्रयास का हिस्सा बनें",
      other: "अन्य, कृपया निर्दिष्ट करें",
      otherPlaceholder: "कृपया अपना कारण निर्दिष्ट करें",
    },
    conferenceAttendanceTitle: "4. क्या आपने पहले कोई सम्मेलन में भाग लिया है?",
    conferenceAttendance: {
      yes: "हां",
      no: "नहीं",
      detailsPlaceholder: "कृपया विवरण का उल्लेख करें",
    },
    challengesTitle:
      "5. FPO के प्रबंधन में आपके सामने आने वाली तीन मुख्य चुनौतियाँ क्या हैं?",
    challengesPlaceholder: "चुनौतियों का चयन करें",
    challengesOptions: {
      weakFinancials: "कमजोर वित्तीय स्थिति",
      lackProfessionalManagement: "पेशेवर प्रबंधन की कमी",
      inadequateAccessToCredit: "ऋण तक अपर्याप्त पहुंच",
      lackRiskMitigationMechanisms: "जोखिम न्यूनीकरण तंत्र की कमी",
      inadequateAccessToMarket: "बाजार तक अपर्याप्त पहुंच",
      inadequateAccessToInfrastructure: "अपर्याप्त अवसंरचना तक पहुंच",
      lackTechnicalSkills: "तकनीकी कौशल की कमी",
      difficultiesInMarketingProduce: "उत्पादन विपणन में कठिनाइयाँ",
      poorCapitalizationAndFundingScope: "कम पूंजीकरण और वित्तपोषण गुंजाइश",
      accessToFinanceInputsAndTechnology:
        "वित्तीय इनपुट और प्रौद्योगिकी तक पहुंच",
      increasedCompetitionFromExistingPrivateCompanies:
        "मौजूदा निजी कंपनियों से बढ़ती प्रतिस्पर्धा",
      lackOfSelfSustainability: "स्वयं-संरक्षण की कमी",
      lackOfAdministrativeControls: "प्रशासनिक नियंत्रणों की कमी",
      lackOfProfessionalExpertise: "पेशेवर विशेषज्ञता की कमी",
      lowInvolvementOfTheMembers: "सदस्यों की कम भागीदारी",
      others: "अन्य",
    },
    supportNeededTitle:
      "6. आपके FPO को इन चुनौतियों को पार करने के लिए किस तरह के समर्थन या संसाधनों की आवश्यकता है?",
    supportNeededPlaceholder: "आवश्यक समर्थन का चयन करें",
    supportNeededOptions: {
      Capacity: "क्षमता निर्माण",
      Access: "वित्तीय पहुंच",
      Market: "बाजार संपर्क",
      Technical: "तकनीकी सहायता",
      Others: "अन्य",
    },
    distributionChannelsTitle:
      "7. बाजार पहुंच और वितरण: उत्पाद विपणन के लिए उपयोग किए जाने वाले वितरण चैनलों का चयन करें",
    distributionChannelsPlaceholder: "वितरण चैनलों का चयन करें",
    distributionChannelsMap: {
      localMarkets: "स्थानीय बाजार",
      superMarkets: "सुपरमार्केट",
      exports: "निर्यात",
      exhibitions: "प्रदर्शनी",
      directCustomers: "प्रत्यक्ष ग्राहक",
      amazonFlipkart: "अमेज़न/फ्लिपकार्ट",
      ownWebsiteSelling: "स्वयं की वेबसाइट बिक्री",
    },
    innovationsTitle:
      "8. FPO द्वारा अपनाई गई अभिनव प्रथाओं/विकासात्मक परियोजनाओं का वर्णन करें",
    innovationsPlaceholder: "अभिनव प्रथाओं और परियोजनाओं का वर्णन करें",
    partnershipsTitle:
      "9. FPO की सरकार एजेंसियों, एनजीओ, या अन्य हितधारकों के साथ साझेदारी या सहयोग के बारे में नाम बताएं",
    partnershipsPlaceholder: "कृपया साझेदारी या सहयोग का वर्णन करें",
    successStoriesTitle:
      "10. FPO की उल्लेखनीय सफलताओं या उपलब्धियों का वर्णन करें",
    successStoriesPlaceholder: "कृपया सफलताओं या उपलब्धियों का वर्णन करें",
    additionalInfoTitle:
      "11. सम्मेलन से संबंधित कोई अतिरिक्त जानकारी, टिप्पणी या अपेक्षा प्रदान करें",
    additionalInfoPlaceholder: "कृपया अतिरिक्त जानकारी का वर्णन करें",
    submitButton: "प्रस्तुत करें",
    error1: "ईमेल बाओ जा, अन्या ईमेल खाबार्सोन ब्यवहार गार्खी.",
    error2: "नोड़ोन फेल, आइयु प्रयास कोरखेन.",
    success: "कुंठुर नायाव जार, नोरोफ़ना स्वाल.",
  },
  //telgu
  te: {
    formTitle: "ఎఫ్‌పీఓ జాతీయ సమావేశ రిజిస్ట్రేషన్ ఫార్మ్",
    personalInformationTitle: "1. పాల్గొనే వ్యక్తి గురించి వ్యక్తిగత సమాచారము",
    personalInformation: {
      fullName: "పూర్తి పేరు",
      position: "స్థానం/హోదా",
      experience: "ఎఫ్‌పీఓ నిర్వహణలో అనుభవ సంవత్సరాలు",
    },
    fpoDetailsTitle: "2. ఎఫ్‌పీఓ వివరాలు",
    fpoDetails: {
      fpoName: "ఎఫ్‌పీఓ పేరు",
      tonnes: "టన్నులు",
      fpoLocation: "ఎఫ్‌పీఓ స్థానం నగరం",
      state: "రాష్ట్రం",
      contactNumber: "సంపర్క సంఖ్య",
      emailAddress: "ఇమెయిల్ చిరునామా",
      activeFarmerMembers: "కార్యర్త మౌస్తులు",
      dateOfRegistration: "నిబంధన తేదీ",
      numVillagesCovered: "FPO పరిధిలో ఉన్న గ్రామాల సంఖ్య",
      numGramPanchayatBlocksCovered: "FPO కింద గ్రామ పంచాయతీ సంఖ్య & బ్లాక్‌లు",
      primaryProducts: "ప్రాథమిక ఉత్పత్తులు/పంటలు",
      operationalDuration: "కార్యాచరణ కాలం (ఏటల నుండి)",
      annualProduction: "వార్షిక ఉత్పత్తి (టన్నులు)",
      annualRevenue: "వార్షిక ఆదాయం (నిధుల సంవత్సరం 2023-24లో INR)",
      percentageGrowthProduction: "కొన్ని సంవత్సరాలలో ఉత్పత్తిలో శాతం వృద్ధి",
      percentageGrowthRevenue: "కొన్ని సంవత్సరాలలో ఆదాయంలో శాతం వృద్ధి",
      registeredAs: "FPO పనిదారి",
      otherRegisteredAs: "ఇతరంగా నమోదు చేయబడింది",
      facilitatingInstitutions: "సౌకర్యవంతమైన సంస్థల పేరు",
      specify: "దయచేసి పేరు తెలియజేయండి",
      society: "సంస్థ",
      cooperative: "సహకార సంఘం",
      trust: "ట్రస్ట్",
      company: "కంపెనీ",
      other: "ఇతర",
    },
    participationReasonsTitle: "3. పాల్గొనే కారణాలు",
    participationReasons: {
      insights: "వ్యవసాయ రంగంలోని తాజా పరిణామాలు మరియు విషయాలను తెలుసుకోండి",
      connect:
        "గ్రామీణాభివృద్ధికి కృషి చేస్తున్న ఇలాంటి మాండలికులను, సంస్థలను కలవండి",
      learn:
        "కార్మిక నిపుణులతో సంభాషణా సెషన్ల ద్వారా పరిశ్రమ నిపుణుల నుండి నేర్చుకోండి",
      opportunities:
        "ఎఫ్‌పీఓ పర్యావరణ వ్యవస్థలో సహకారం, పెట్టుబడులు, భాగస్వామ్య అవకాశాలను కనుగొనండి",
      empower:
        "వ్యవసాయదారులను బలోపేతం చేయడానికి మరియు వ్యవసాయానికి సుస్థిర భవిష్యత్తును నిర్మించడానికి సంపుటిగా ఉండండి",
      other: "ఇతర, దయచేసి తెలియజేయండి",
      otherPlaceholder: "దయచేసి మీ కారణం తెలియజేయండి",
    },
    conferenceAttendanceTitle: "4. మీరు మునుపటి స‌మావేశాన్ని హాజరయ్యారా?",
    conferenceAttendance: {
      yes: "అవును",
      no: "కాదు",
      detailsPlaceholder: "దయచేసి వివరాలను తెలపండి",
    },
    challengesTitle:
      "5. ఎఫ్‌పీఓలు నిర్వహణలో మీరు ఎదుర్కొనే మూడు ప్రధాన సవాళ్లు ఏమిటి?",
    challengesPlaceholder: "సవాళ్లను ఎంచుకోండి",
    challengesOptions: {
      weakFinancials: "బలహీన ఆర్థిక పరిస్థితులు",
      lackProfessionalManagement: "ప్రొఫెషనల్ నిర్వహణ లోపించింద",
      inadequateAccessToCredit: "అల్ప క్రెడిట్",
      lackRiskMitigationMechanisms: "అందుబాటులో రిస్క్ మానేజ్‌మెంట్ మెకానిజం",
      inadequateAccessToMarket: "కూపింగ్ మార్కెట్",
      inadequateAccessToInfrastructure: "సౌకర్యాలు కొరత",
      lackTechnicalSkills: "ప్రొఫెషనల్ పద్ధతుల్లో లోపం",
      difficultiesInMarketingProduce: "అవసరం వెర్రి పొలాల విక్రయాల మీద సమస్యలు",
      poorCapitalizationAndFundingScope:
        "నాణ్యమైన నిధి మరియు సదుపాయాల వల్ల ఎదుర్కొనే",
      accessToFinanceInputsAndTechnology: "నిధి మరియు టెక్నాలజీకు తగిన ప్రవేశ",
      increasedCompetitionFromExistingPrivateCompanies:
        "వ్యవసాయ రంగంలో ఉన్న ప్రైవేట్ కంపెనీలతో పోటీలో మూడింటికిగడ బలహీనం",
      lackOfSelfSustainability: "స్వీయ-నిర్వహణ",
      lackOfAdministrativeControls: "అడ్మినిస్ట్రేటివ్ నియంత్రణలో లోపం",
      lackOfProfessionalExpertise: "ప్రొఫెషనల్ నిపుణత్వం",
      lowInvolvementOfTheMembers: "సభ్యుల తక్కువ పాల్గొనడం",
      others: "ఇతర",
    },
    supportNeededTitle: "6. మీ ఎఫ్‌పీఓకు ఏమైనా ప్రత్యేక సహాయాలు అవసరం ఉండాలా?",
    supportNeededPlaceholder: "మీకు కావాల్సిన సహాయం",
    supportNeededOptions: {
      Capacity: "ক্ষমতা",
      Access: "আর্থিক সূচনা",
      Market: "বাজার সংযোগ",
      Technical: "প্রযুক্তিগত সহায়তা",
      Others: "অন্যান্য",
    },
    distributionChannelsTitle:
      "7. বাজার অনুপ্রবেশ এবং বিতরণ: পণ্য বিপণনের জন্য ব্যবহৃত বিতরণ চ্যানেলগুলি নির্বাচন করুন",
    distributionChannelsPlaceholder: "বিতরণ চ্যানেলগুলি নির্বাচন করুন",
    distributionChannelsMap: {
      localMarkets: "স্থানীয় বাজার",
      superMarkets: "সুপারমার্কেট",
      exports: "রপ্তানি",
      exhibitions: "প্রদর্শনী",
      directCustomers: "সরাসরি গ্রাহক",
      amazonFlipkart: "আমাজন/ফ্লিপকার্ট",
      ownWebsiteSelling: "নিজস্ব ওয়েবসাইট বিক্রি",
    },
    innovationsTitle:
      "8. এফপিও কর্তৃক গৃহীত উদ্ভাবনী অনুশীলন/উন্নয়নমূলক প্রকল্পগুলির বর্ণনা দিন",
    innovationsPlaceholder: "উদ্ভাবনী অনুশীলন এবং উদ্যোগগুলির বর্ণনা দিন",
    partnershipsTitle:
      "9. এফপিওর যে কোনও অংশীদারিত্ব বা সহযোগিতা সম্পর্কে জানান",
    partnershipsPlaceholder:
      "এফপিওর যে কোনও অংশীদারিত্ব বা সহযোগিতা সম্পর্কে বর্ণনা করুন",
    successStoriesTitle:
      "10. এফপিওর যে কোনও উল্লেখযোগ্য সাফল্যের কাহিনীর বর্ণনা দিন",
    successStoriesPlaceholder:
      "দয়া করে এফপিওর যে কোনও উল্লেখযোগ্য সাফল্যের কাহিনীর বর্ণনা দিন",
    additionalInfoTitle:
      "11. সম্মেলন সম্পর্কিত যে কোনও অতিরিক্ত তথ্য, মন্তব্য বা প্রত্যাশা প্রদান করুন",
    additionalInfoPlaceholder: "দয়া করে যে কোনও অতিরিক্ত তথ্যের বর্ণনা দিন",
    submitButton: "জমা দিন",
    error1:
      "ఇ-మెయిల్ ఇప్పటికే ఉంది. దయచేసి వేరే ఇ-మెయిల్ చిరునామా ఉపయోగించండి.",
    error2: "నోటీసు విఫలమైంది, మరల ప్రయత్నించండి",
    success: "ధన్యవాదాలు, నమోదు విజయవంతమైంది",
  },
  //maihili
  mai: {
    formTitle: "FPO राष्ट्रिय सम्मेलन पंजीकरण फार्म",
    personalInformationTitle: "1. भागीदारक व्यक्तिगत जानकारी",
    personalInformation: {
      fullName: "पूरा नाम",
      position: "पद/पदनाम",
      experience: "FPO प्रबंधन में अनुभव कतेक वर्ष",
    },
    fpoDetailsTitle: "2. FPO विवरण",
    fpoDetails: {
      fpoName: "FPO नाम",
      tonnes: "टन",
      fpoLocation: "FPO स्थान शहर",
      state: "राज्य",
      contactNumber: "संपर्क संख्या",
      emailAddress: "ईमेल पता",
      activeFarmerMembers: "सक्रिय किसान सदस्य",
      dateOfRegistration: "पंजीकरणक तिथि",
      numVillagesCovered: "एफपीओ कें तहत कवर कैल गेल गामक कें संख्या",
      numGramPanchayatBlocksCovered:
        "ग्राम पंचायत के नम्बर एवं ब्लॉक एफपीओ के तहत",
      primaryProducts: "प्राथमिक उत्पाद/फसलें",
      operationalDuration: "कार्यकाल अवधि (साल से)",
      annualProduction: "वार्षिक उत्पादन (टन)",
      annualRevenue: "वार्षिक राजस्व (वित्तीय साल 2023-24 में INR)",
      percentageGrowthProduction: "पिछले सालक उत्पादन में प्रतिशत वृद्धि",
      percentageGrowthRevenue: "पिछला सालक राजस्व में प्रतिशत वृद्धि",
      registeredAs: "FPO पंजीकृत क लेल",
      otherRegisteredAs: "अन्य निर्दिष्ट करू",
      facilitatingInstitutions: "सुगम संस्थानक नाम",
      specify: "कृपया नाम निर्दिष्ट करू",
      society: "समाज",
      cooperative: "सहकारी समिति",
      trust: "ट्रस्ट",
      company: "कंपनी",
      other: "अन्य",
    },
    participationReasonsTitle: "3. भागीदारीक कारण",
    participationReasons: {
      insights:
        "कृषि क्षेत्रक नवीनतम रुझान आ विकास के बारे में जानकारी प्राप्त करू",
      connect:
        "ग्रामीण विकास के दिशा में काज क रहल समान विचारधारा वाले व्यक्तिहरू आ संगठनों से जुड़े",
      learn:
        "इंटरैक्टिव सत्र आ पैनल चर्चा के माध्यम से उद्योगक विशेषज्ञ आ विचारक से सिखू",
      opportunities:
        "FPO पारिस्थितिकी तंत्र में सहयोग, निवेश आ भागीदारीक अवसर के खोज करू",
      empower: "किसान के सशक्त बनबाक सामूहिक प्रयासक भाग बनू",
      other: "अन्य, कृपया निर्दिष्ट करू",
      otherPlaceholder: "कृपया आपन कारण निर्दिष्ट करू",
    },
    conferenceAttendanceTitle: "4. पहिने कोनो सम्मेलन मे भाग लेने छी?",
    conferenceAttendance: {
      yes: "हाँ",
      no: "नहीं",
      detailsPlaceholder: "कृपया विवरणक उल्लेख करू",
    },
    challengesTitle:
      "5. FPO प्रबंधनक समय में आपक सामने कउन-कउन मुख्य चुनौतियाँ हैं?",
    challengesPlaceholder: "चुनौतियोंक चयन करू",
    challengesOptions: {
      weakFinancials: "कमजोर आर्थिक स्थिति",
      lackProfessionalManagement: "पेशेवर प्रबंधनक अभाव",
      inadequateAccessToCredit: "ऋण में अपर्याप्त पहुंच",
      lackRiskMitigationMechanisms: "जोखिम न्यूनीकरण तंत्रक अभाव",
      inadequateAccessToMarket: "बाजार में अपर्याप्त पहुंच",
      inadequateAccessToInfrastructure: "अपर्याप्त बुनियादी ढांचा में पहुंच",
      lackTechnicalSkills: "तकनीकी कौशलक अभाव",
      difficultiesInMarketingProduce: "उत्पादन विपणन में कठिनाइयाँ",
      poorCapitalizationAndFundingScope: "कम पूंजीकरण आ वित्तपोषण क गुंजाइश",
      accessToFinanceInputsAndTechnology: "वित्तीय इनपुट आ तकनीकक पहुंच",
      increasedCompetitionFromExistingPrivateCompanies:
        "मौजूदा निजी कंपनियोंक से बढ़ती प्रतिस्पर्धा",
      lackOfSelfSustainability: "स्वयं-निरंतरताक अभाव",
      lackOfAdministrativeControls: "प्रशासनिक नियंत्रणक अभाव",
      lackOfProfessionalExpertise: "पेशेवर विशेषज्ञताक अभाव",
      lowInvolvementOfTheMembers: "सदस्यक कम सहभागिता",
      others: "अन्य",
    },
    supportNeededTitle: "6. कउन-कउन समर्थनक आवश्यकता आपक FPOकेकिए आवश्यक है?",
    supportNeededPlaceholder: "आवश्यक समर्थनक चयन करू",
    supportNeededOptions: {
      Capacity: "क्षमता निर्माण",
      Access: "वित्तीय पहुंच",
      Market: "बाजार संपर्क",
      Technical: "तकनीकी सहायता",
      Others: "अन्य",
    },
    distributionChannelsTitle:
      "7. बाजारक पहुँच आ वितरण: उत्पाद विपणनक लिए उपयोग कएल वितरण चैनलक चयन करू",
    distributionChannelsPlaceholder: "वितरण चैनलक चयन करू",
    distributionChannelsMap: {
      localMarkets: "स्थानीय बाजार",
      superMarkets: "सुपरमार्केट",
      exports: "निर्यात",
      exhibitions: "प्रदर्शनी",
      directCustomers: "प्रत्यक्ष ग्राहक",
      amazonFlipkart: "अमेज़न/फ्लिपकार्ट",
      ownWebsiteSelling: "स्वयंक वेबसाइट बिक्री",
    },
    innovationsTitle:
      "8. FPO द्वारा अपनाई गई नवाचारी प्रथाएँ/विकासात्मक परियोजनाएँ के विवरण",
    innovationsPlaceholder: "नवाचारी प्रथाएँ आ परियोजनाक विवरण",
    partnershipsTitle:
      "9. FPOक सरकारक संस्थान, एनजीओ, आ अन्य हितधारकक संगत में साझेदारी आ सहयोगक नाम",
    partnershipsPlaceholder: "कृपया साझेदारी आ सहयोगक विवरण बताबू",
    successStoriesTitle: "10. FPOक उल्लेखनीय सफलताएँ आ उपलब्धियाँ के वर्णन करू",
    successStoriesPlaceholder:
      "कृपया FPOक उल्लेखनीय सफलताएँ आ उपलब्धियाँ के वर्णन करू",
    additionalInfoTitle:
      "11. सम्मेलन से संबंधित अन्य कोई जानकारी, टिप्पणी आ अपेक्षा जो देनी हो",
    additionalInfoPlaceholder: "कृपया अतिरिक्त जानकारीक विवरण करू",
    submitButton: "प्रस्तुत करू",
    error1: "ईमेल पहिले सँ अवस्थित अछि। कृपया अन्य ईमेल ठिकाना प्रयोग करू।",
    error2: "पंजीकरण असफल, फेर सँ कोशिश करू",
    success: "बधाई, पंजीकरण सफल भेल अछि",
  },
  //marathi
  mr: {
    formTitle: "FPO राष्ट्रीय परिषद नोंदणी फॉर्म",
    personalInformationTitle: "1. सहभागीबद्दल वैयक्तिक माहिती",
    personalInformation: {
      fullName: "पूर्ण नाव",
      position: "पद/हुद्दा",
      experience: "FPO व्यवस्थापनात अनुभवाची वर्षे",
    },
    fpoDetailsTitle: "2. FPO तपशील",
    fpoDetails: {
      fpoName: "FPO नाव",
      tonnes: "टन",
      fpoLocation: "FPO स्थान शहर",
      state: "राज्य",
      contactNumber: "संपर्क क्रमांक",
      emailAddress: "ईमेल पत्ता",
      activeFarmerMembers: "सक्रिय शेतकरी सदस्यांची संख्या",
      dateOfRegistration: "नोंदणीची तारीख",
      numVillagesCovered: "FPO अंतर्गत समाविष्ट गावांची संख्या",
      numGramPanchayatBlocksCovered:
        "FPO अंतर्गत ग्रामपंचायतींची संख्या आणि ब्लॉक",
      primaryProducts: "मुख्य उत्पादने/पिके",
      operationalDuration: "कार्यक्षेत्र (वर्षापासून)",
      annualProduction: "वार्षिक उत्पादन (टन)",
      annualRevenue: "वार्षिक उत्पन्न (आर्थिक वर्ष 2023-24 मध्ये INR)",
      percentageGrowthProduction: "गेल्या वर्षांतील उत्पादनात वाढ प्रतिशत",
      percentageGrowthRevenue: "गेल्या वर्षांतील उत्पन्नात वाढ प्रतिशत",
      registeredAs: "FPO नोंदणीकृत",
      otherRegisteredAs: "इतर निर्दिष्ट करा",
      facilitatingInstitutions: "सुविधा देणाऱ्या संस्थांची नावे",
      specify: "कृपया निर्दिष्ट करा",
      society: "समाज",
      cooperative: "सहकारी संस्था",
      trust: "ट्रस्ट",
      company: "कंपनी",
      other: "इतर",
    },
    participationReasonsTitle: "3. सहभागिता कारणे",
    participationReasons: {
      insights: "कृषी क्षेत्रातील नवीनतम ट्रेंड आणि विकासाबद्दल जाणून घ्या",
      connect:
        "ग्रामीण विकासाच्या दिशेने काम करणाऱ्या समान विचारसरणीच्या व्यक्ती आणि संस्थांशी संपर्क साधा",
      learn:
        "संवाद सत्रे आणि पॅनेल चर्चांद्वारे उद्योग तज्ज्ञ आणि विचारकांकडून शिका",
      opportunities:
        "FPO पर्यावरणात सहकार्य, गुंतवणूक आणि भागीदारीच्या संधी शोधा",
      empower:
        "शेतकऱ्यांना सशक्त करण्यासाठी आणि शेतीसाठी स्थिर भविष्य निर्माण करण्यासाठी सामूहिक प्रयत्नांचा भाग व्हा",
      other: "इतर, कृपया निर्दिष्ट करा",
      otherPlaceholder: "कृपया आपले कारण निर्दिष्ट करा",
    },
    conferenceAttendanceTitle:
      "4. आपण आधी कोणत्याही परिषदेत सहभागी झाला आहात का?",
    conferenceAttendance: {
      yes: "होय",
      no: "नाही",
      detailsPlaceholder: "कृपया तपशीलांचा उल्लेख करा",
    },
    challengesTitle:
      "5. FPO व्यवस्थापनात आपल्याला समोर आलेल्या तीन मुख्य आव्हाने काय आहेत?",
    challengesPlaceholder: "आव्हाने निवडा",
    challengesOptions: {
      weakFinancials: "कमकुवत आर्थिक स्थिती",
      lackProfessionalManagement: "व्यावसायिक व्यवस्थापनाची कमतरता",
      inadequateAccessToCredit: "क्रेडिटमध्ये अपर्याप्त प्रवेश",
      lackRiskMitigationMechanisms: "जोखिम कमी करण्याचे उपाय नाहीत",
      inadequateAccessToMarket: "बाजारात अपर्याप्त प्रवेश",
      inadequateAccessToInfrastructure: "अपर्याप्त पायाभूत सुविधा",
      lackTechnicalSkills: "तांत्रिक कौशल्याची कमतरता",
      difficultiesInMarketingProduce: "उत्पादन विपणनात अडचणी",
      poorCapitalizationAndFundingScope:
        "कमकुवत भांडवल आणि वित्तपुरवठा क्षेत्र",
      accessToFinanceInputsAndTechnology:
        "वित्त इनपुट आणि तंत्रज्ञानातील प्रवेश",
      increasedCompetitionFromExistingPrivateCompanies:
        "अस्तित्वात असलेल्या खाजगी कंपन्यांकडून वाढती स्पर्धा",
      lackOfSelfSustainability: "स्वयं-संरक्षणाची कमतरता",
      lackOfAdministrativeControls: "प्रशासनिक नियंत्रणाची कमतरता",
      lackOfProfessionalExpertise: "व्यावसायिक तज्ज्ञतेची कमतरता",
      lowInvolvementOfTheMembers: "सदस्यांची कमी सहभागिता",
      others: "इतर",
    },
    supportNeededTitle:
      "6. या आव्हानांवर मात करण्यासाठी आपल्या FPO ला कोणत्या प्रकारच्या समर्थनाची आवश्यकता आहे?",
    supportNeededPlaceholder: "आवश्यक समर्थन निवडा",
    supportNeededOptions: {
      Capacity: "क्षमता निर्माण",
      Access: "वित्तीय प्रवेश",
      Market: "बाजार संपर्क",
      Technical: "तांत्रिक सहाय्य",
      Others: "इतर",
    },
    distributionChannelsTitle:
      "7. बाजार पोहोच आणि वितरण: उत्पादन विपणनासाठी वापरलेल्या वितरण चॅनेल्स निवडा",
    distributionChannelsPlaceholder: "वितरण चॅनेल्स निवडा",
    distributionChannelsMap: {
      localMarkets: "स्थानिक बाजारपेठा",
      superMarkets: "सुपरमार्केट",
      exports: "निर्यात",
      exhibitions: "प्रदर्शने",
      directCustomers: "प्रत्यक्ष ग्राहक",
      amazonFlipkart: "अमेजॉन/फ्लिपकार्ट",
      ownWebsiteSelling: "स्वत: ची वेबसाइट विक्री",
    },
    innovationsTitle: "8. FPO ने घेतलेली नवाचार आणि विकास प्रकल्पांची वर्णने",
    innovationsPlaceholder: "नवीन कल्पना आणि उपक्रमांची वर्णने",
    partnershipsTitle:
      "9. FPO कडे सरकारी संस्था, एनजीओ, किंवा इतर हितधारकांशी भागीदारी आहे की नाही?",
    partnershipsPlaceholder: "कृपया भागीदारी किंवा सहकार्याचे वर्णन करा",
    successStoriesTitle:
      "10. FPO च्या उल्लेखनीय यशस्वी कहाण्या किंवा कामगिरीचे वर्णन करा",
    successStoriesPlaceholder:
      "कृपया यशोगाथा किंवा यशस्वी कहाण्यांचे वर्णन करा",
    additionalInfoTitle:
      "11. परिषदाशी संबंधित अतिरिक्त माहिती, टिप्पणी किंवा अपेक्षा",
    additionalInfoPlaceholder: "कृपया अतिरिक्त माहितीचे वर्णन करा",
    submitButton: "प्रस्तुत करा",
    error1: "ईमेल आधीच अस्तित्वात आहे. कृपया वेगळी ईमेल पत्ता वापरा.",
    error2: "नोंदणी अयशस्वी, पुन्हा प्रयत्न करा",
    success: "अभिनंदन, नोंदणी यशस्वी",
  },
  //tamil
  ta: {
    formTitle: "FPO தேசிய மாநாடு பதிவேற்ற படிவம்",
    personalInformationTitle: "1. பங்கு பெறுபவரைப் பற்றிய தனிப்பட்ட தகவல்",
    personalInformation: {
      fullName: "முழு பெயர்",
      position: "நிலை/பதவி",
      experience: "FPO நிர்வாகத்தில் அனுபவ ஆண்டுகள்",
    },
    fpoDetailsTitle: "2. FPO விவரங்கள்",
    fpoDetails: {
      fpoName: "FPO பெயர்",
      tonnes: "டன்",
      fpoLocation: "FPO இடம் நகரம்",
      state: "மாநிலம்",
      contactNumber: "தொடர்பு எண்",
      emailAddress: "மின்னஞ்சல் முகவரி",
      activeFarmerMembers: "செயல்பாட்டிலுள்ள விவசாயி உறுப்பினர்களின் எண்ணிக்கை",
      dateOfRegistration: "பதிவு தேதி",
      numVillagesCovered: "FPO இன் கீழ் உள்ள கிராமங்களின் எண்ணிக்கை",
      numGramPanchayatBlocksCovered:
        "கிராம பஞ்சாயத்தின் எண் & தொகுதிகள் FPO கீழ்",
      primaryProducts: "முதன்மை உற்பத்திகள்/தரைகள்",
      operationalDuration: "செயல்பாட்டு காலம் (வருடத்திலிருந்து)",
      annualProduction: "வருடாந்த உற்பத்தி (டன்)",
      annualRevenue: "வருடாந்த வருமானம் (நிதி வருடம் 2023-24இல் INR)",
      percentageGrowthProduction:
        "கடந்த ஆண்டுகளில் உற்பத்தியில் சதவீத வளர்ச்சி",
      percentageGrowthRevenue: "கடந்த ஆண்டுகளில் வருமானத்தில் சதவீத வளர்ச்சி",
      registeredAs: "FPO பதிவு செய்யப்பட்டதைப் போல",
      otherRegisteredAs: "மற்றவைகளை குறிப்பிடவும்",
      facilitatingInstitutions: "திறம்படமாக்கும் நிறுவனங்களின் பெயர்",
      specify: "குறிப்பிடவும்",
      society: "சமூக அமைப்பு",
      cooperative: "கூட்டுறவு சங்கம்",
      trust: "டிரஸ்ட்",
      company: "நிறுவனம்",
      other: "மற்றவை",
    },
    participationReasonsTitle: "3. பங்குகொள்வதற்கான காரணங்கள்",
    participationReasons: {
      insights:
        "விவசாய துறையில் சமீபத்திய நயங்கள் மற்றும் வளர்ச்சிகளைப் பற்றி அறிக",
      connect:
        "கிராமப்புற மேம்பாட்டுக்காக வேலை செய்யும் ஒரே மனப்பான்மையுடைய நபர்களை மற்றும் நிறுவனங்களுடன் இணைக",
      learn:
        "தொழில்நுட்ப நிபுணர்களிடமிருந்து கலந்துரையாடல் அமர்வுகள் மற்றும் குழு விவாதங்கள் மூலம் கற்கவும்",
      opportunities:
        "FPO சூழலமைப்பில் ஒத்துழைப்பு, முதலீடு மற்றும் கூட்டுப் பங்கு வாய்ப்புகளை கண்டறியவும்",
      empower:
        "விவசாயிகளை வலுப்படுத்துவதற்கும் மற்றும் விவசாயத்துக்கான நிலைத்தன்மையான எதிர்காலத்தை கட்டும் பொதுமுயற்சியில் பங்குகொள்க",
      other: "மற்றவை, குறிப்பிடவும்",
      otherPlaceholder: "தாங்கள் தெரிவிக்கும் காரணத்தை குறிப்பிடவும்",
    },
    conferenceAttendanceTitle:
      "4. நீங்கள் முன்னர் எந்த மாநாட்டிலும் பங்குகொண்டீர்களா?",
    conferenceAttendance: {
      yes: "ஆம்",
      no: "இல்லை",
      detailsPlaceholder: "விவரங்களை குறிப்பிடவும்",
    },
    challengesTitle:
      "5. FPOக்களை நிர்வகிக்கும் போது நீங்கள் எதிர்கொள்ளும் மூன்று முக்கிய சவால்கள்?",
    challengesPlaceholder: "சவால்களை தேர்வு செய்க",
    challengesOptions: {
      weakFinancials: "பிழையான நிதிநிலை",
      lackProfessionalManagement: "தொழில்நுட்ப நிர்வாகம் இல்லாமை",
      inadequateAccessToCredit: "கடனுக்கு தகுந்த அணுகல் இல்லாமை",
      lackRiskMitigationMechanisms: "ஆபத்து குறைக்க உதவுவதற்கு வழி இல்லாமை",
      inadequateAccessToMarket: "சந்தைக்கு தகுந்த அணுகல் இல்லாமை",
      inadequateAccessToInfrastructure:
        "உள்கட்டமைப்புக்கு தகுந்த அணுகல் இல்லாமை",
      lackTechnicalSkills: "தொழில்நுட்ப திறமைகள் இல்லாமை",
      difficultiesInMarketingProduce: "விளைபொருட்களை விற்பனை செய்ய சிரமங்கள்",
      poorCapitalizationAndFundingScope:
        "பால் மூலதனம் மற்றும் நிதியளித்தல்குறித்து",
      accessToFinanceInputsAndTechnology:
        "நிதிநிலைக்கு, உள்ளீடுகளுக்கு மற்றும் தொழில்நுட்பத்திற்கான அணுகல்",
      increasedCompetitionFromExistingPrivateCompanies:
        "உள்ளதுஉள்ள தன்னியந்திரதொழிற்சாலைகளின்கிடையில் கடும் போட்டி",
      lackOfSelfSustainability: "சுயநிகழ்வாற்றல் இல்லாமை",
      lackOfAdministrativeControls: "நிர்வாக கட்டுப்பாடுகள் இல்லாமை",
      lackOfProfessionalExpertise: "தொழில்நுட்ப நிபுணத்துவம் இல்லாமை",
      lowInvolvementOfTheMembers: "உறுப்பினர்களின் குறைந்த ஈடுபாடு",
      others: "மற்றவை",
    },
    supportNeededTitle:
      "6. இந்த சவால்களை முந்துவதற்கான உங்கள் FPOக்கு எப்படிப்பட்ட உதவிகள் தேவை?",
    supportNeededPlaceholder: "தேவையான ஆதரவை தேர்ந்தெடுக்கவும்",
    supportNeededOptions: {
      Capacity: "திறன் கட்டமைப்பு",
      Access: "நிதி அணுகல்",
      Market: "சந்தை இணைப்புகள்",
      Technical: "தொழில்நுட்ப உதவிகள்",
      Others: "மற்றவை",
    },
    distributionChannelsTitle:
      "7. சந்தை பிரவேசம் மற்றும் விநியோகிப்பது: தயாரிப்புகளை விற்பனை செய்ய பயன்படுத்தப்படும் விநியோகம் சேனல்களை தேர்ந்தெடுக்கவும்",
    distributionChannelsPlaceholder: "விநியோக சேனல்களை தேர்ந்தெடுக்கவும்",
    distributionChannelsMap: {
      localMarkets: "உள்ளூர் சந்தைகள்",
      superMarkets: "சூப்பர்மார்க்கெட்கள்",
      exports: "ஏற்றுமதி",
      exhibitions: "கண்காட்சிகள்",
      directCustomers: "நேரடி வாடிக்கையாளர்கள்",
      amazonFlipkart: "அமேசான்/பிளிப்கார்ட்",
      ownWebsiteSelling: "தனியார் இணையதள விற்பனை",
    },
    innovationsTitle:
      "8. FPO எடுத்துள்ள புத்தாக்க நடைமுறைகள்/மேம்பாட்டு திட்டங்கள்",
    innovationsPlaceholder: "புத்தாக்கங்களின் மற்றும் முயற்சிகளின் விளக்கம்",
    partnershipsTitle:
      "9. அரசு நிறுவனங்கள், NGO அல்லது மற்றஉறுப்பினர்கள் ஆகியவற்றுடன் FPO கொண்டுள்ள ஒத்துழைப்புகளை அல்லது கூட்டுப் பங்குகொள்ளிகளின் பெயர்களைத் தெரிக",
    partnershipsPlaceholder:
      "FPO கொண்டுள்ள ஒத்துழைப்புகளை அல்லது கூட்டுப் பங்குகொள்ளிகளின் விளக்கம்",
    successStoriesTitle:
      "10. FPOக்களின் குறிப்பிடத்தக்க வெற்றிக்கதைகள் அல்லது சாதனைகளின் விளக்கம்",
    successStoriesPlaceholder:
      "தயவுசெய்து வெற்றிக்கதைகள் அல்லது சாதனைகளின் விளக்கம்",
    additionalInfoTitle:
      "11. நீங்கள் மிகவும் அறிவுக்கும் கருத்திற்கும் அர்த்தமானதாகவும் இருக்கிறவர்களால் கூடுதல் தகவல்களையும் கருத்துகளையும் தெரிவிக்க",
    additionalInfoPlaceholder:
      "தயவுசெய்து கூடுதல் தகவல்களையும் கருத்துகளையும் தெரிவிக்க",
    submitButton: "சமர்ப்பிக்கவும்",
    error1:
      "மின்னஞ்சல் ஏற்கனவே உள்ளது. தயவுசெய்து மாறுபட்ட மின்னஞ்சல் முகவரியைப் பயன்படுத்துங்கள்.",
    error2: "பதிவு தோல்வி, மீண்டும் முயற்சிக்கவும்",
    success: "வாழ்த்துக்கள், பதிவு வெற்றியடையுள்ளது",
  },
  //bengali
  bn: {
    formTitle: "FPO জাতীয় সম্মেলন নিবন্ধন ফরম",
    personalInformationTitle: "১. অংশগ্রহণকারী সম্পর্কে ব্যক্তিগত তথ্য",
    personalInformation: {
      fullName: "পূর্ণ নাম",
      position: "পদ/পদবী",
      experience: "FPO ব্যবস্থাপনায় অভিজ্ঞতার বছর",
    },
    fpoDetailsTitle: "২. FPO বিবরণ",
    fpoDetails: {
      fpoName: "FPO নাম",
      tonnes: "টন",
      fpoLocation: "FPO অবস্থান শহর",
      state: "রাজ্য",
      contactNumber: "যোগাযোগ নম্বর",
      emailAddress: "ইমেল ঠিকানা",
      activeFarmerMembers: "সক্রিয় কৃষক সদস্য সংখ্যা",
      dateOfRegistration: "নিবন্ধনের তারিখ",
      numVillagesCovered: "FPO-এর আওতায় গ্রামের সংখ্যা",
      numGramPanchayatBlocksCovered:
        "FPO-এর অধীনে গ্রাম পঞ্চায়েতের নম্বর ও ব্লক",
      primaryProducts: "প্রাথমিক পণ্য/ফসল",
      operationalDuration: "কার্যকাল (বছর থেকে)",
      annualProduction: "বার্ষিক উৎপাদন (টন)",
      annualRevenue: "বার্ষিক আয় (আর্থিক বছর ২০২৩-২৪-এ INR)",
      percentageGrowthProduction: "গত বছরের উৎপাদনে শতকরা বৃদ্ধির হার",
      percentageGrowthRevenue: "গত বছরের আয়ে শতকরা বৃদ্ধির হার",
      registeredAs: "FPO নিবন্ধিত হিসেবে",
      otherRegisteredAs: "অন্যান্য নিবন্ধিত",
      facilitatingInstitutions: "সহায়ক প্রতিষ্ঠানের নাম",
      specify: "অনুগ্রহ করে নাম উল্লেখ করুন",
      society: "সমাজ",
      cooperative: "সহকারী সমিতি",
      trust: "ট্রাস্ট",
      company: "কোম্পানি",
      other: "অন্যান্য",
    },
    participationReasonsTitle: "৩. অংশগ্রহণের কারণ",
    participationReasons: {
      insights: "কৃষি ক্ষেত্রের সাম্প্রতিক প্রবণতা এবং উন্নয়ন সম্পর্কে জানুন",
      connect:
        "গ্রামীণ উন্নয়নের জন্য কাজ করে এমন একমত মানুষ এবং সংস্থার সাথে যুক্ত",
      learn:
        "ইন্টারেক্টিভ সেশনের মাধ্যমে শিল্প বিশেষজ্ঞ এবং চিন্তাবিদদের কাছ থেকে শিখুন",
      opportunities:
        "FPO বাস্তুতন্ত্রে সহযোগিতা, বিনিয়োগ এবং অংশীদারিত্বের সুযোগ খুঁজুন",
      empower:
        "কৃষকদেরকে শক্তিশালী করার জন্য এবং কৃষির জন্য একটি স্থিতিশীল ভবিষ্যত গড়ে তোলার জন্য দলবদ্ধ প্রচেষ্টার অংশ হোন",
      other: "অন্যান্য, অনুগ্রহ করে উল্লেখ করুন",
      otherPlaceholder: "আপনার কারণ উল্লেখ করুন",
    },
    conferenceAttendanceTitle: "৪. আপনি কি আগেও কোন সম্মেলনে অংশগ্রহণ করেছেন?",
    conferenceAttendance: {
      yes: "হ্যাঁ",
      no: "না",
      detailsPlaceholder: "অনুগ্রহ করে বিস্তারিত উল্লেখ করুন",
    },
    challengesTitle:
      "৫. FPO পরিচালনায় আপনার মুখোমুখি হওয়া তিনটি প্রধান চ্যালেঞ্জ কি?",
    challengesPlaceholder: "চ্যালেঞ্জসমূহ বাছাই করুন",
    challengesOptions: {
      weakFinancials: "দুর্বল আর্থিক অবস্থা",
      lackProfessionalManagement: "পেশাদার ব্যবস্থাপনার অভাব",
      inadequateAccessToCredit: "ঋণ পর্যাপ্ত না পাওয়া",
      lackRiskMitigationMechanisms: "ঝুঁকি হ্রাস করার উপায় নেই",
      inadequateAccessToMarket: "বাজারে পর্যাপ্ত প্রবেশাধিকার নেই",
      inadequateAccessToInfrastructure: "অপর্যাপ্ত অবকাঠামোতে প্রবেশ",
      lackTechnicalSkills: "প্রযুক্তিগত দক্ষতার অভাব",
      difficultiesInMarketingProduce: "পণ্য বিপণনে অসুবিধা",
      poorCapitalizationAndFundingScope:
        "নিম্ন মানের মূলধন এবং অর্থায়ন ক্ষেত্র",
      accessToFinanceInputsAndTechnology: "আর্থিক ইনপুট এবং প্রযুক্তিতে প্রবেশ",
      increasedCompetitionFromExistingPrivateCompanies:
        "বিদ্যমান ব্যক্তিগত কোম্পানির থেকে প্রতিযোগিতার বৃদ্ধি",
      lackOfSelfSustainability: "স্বনির্ভরতার অভাব",
      lackOfAdministrativeControls: "প্রশাসনিক নিয়ন্ত্রণের অভাব",
      lackOfProfessionalExpertise: "পেশাদার দক্ষতার অভাব",
      lowInvolvementOfTheMembers: "সদস্যদের কম অংশগ্রহণ",
      others: "অন্যান্য",
    },
    supportNeededTitle:
      "৬. এই চ্যালেঞ্জগুলি মোকাবেলায় আপনার FPO কী ধরনের সহায়তা বা সম্পদের প্রয়োজন?",
    supportNeededPlaceholder: "প্রয়োজনীয় সহায়তা নির্বাচন করুন",
    supportNeededOptions: {
      Capacity: "ক্ষমতা নির্মাণ",
      Access: "আর্থিক প্রবেশ",
      Market: "বাজার লিঙ্কেজ",
      Technical: "প্রযুক্তিগত সহায়তা",
      Others: "অন্যান্য",
    },
    distributionChannelsTitle:
      "৭. বাজার প্রবেশ এবং বিতরণ: পণ্য বিপণনের জন্য ব্যবহৃত বিতরণ চ্যানেলগুলি নির্বাচন করুন",
    distributionChannelsPlaceholder: "বিতরণ চ্যানেলগুলি নির্বাচন করুন",
    distributionChannelsMap: {
      localMarkets: "স্থানীয় বাজার",
      superMarkets: "সুপারমার্কেট",
      exports: "রপ্তানি",
      exhibitions: "প্রদর্শনী",
      directCustomers: "সরাসরি গ্রাহক",
      amazonFlipkart: "আমাজন/ফ্লিপকার্ট",
      ownWebsiteSelling: "নিজস্ব ওয়েবসাইট বিক্রি",
    },
    innovationsTitle:
      "৮. FPO কর্তৃক গৃহীত উদ্ভাবনী প্রথা/উন্নয়নমূলক প্রকল্পগুলি কী?",
    innovationsPlaceholder: "উদ্ভাবনী প্রথা এবং প্রকল্পগুলির বর্ণনা",
    partnershipsTitle:
      "৯. FPOর সাথে সরকারি প্রতিষ্ঠান, এনজিও, বা অন্য অংশীদারদের সাথে অংশীদারিত্ব বা সহযোগিতার নাম",
    partnershipsPlaceholder: "অনুগ্রহ করে অংশীদারিত্ব বা সহযোগিতার বর্ণনা",
    successStoriesTitle: "১০. FPOর উল্লেখযোগ্য সফলতার কাহিনীগুলি কী?",
    successStoriesPlaceholder: "অনুগ্রহ করে FPOর সফলতার কাহিনীগুলির বর্ণনা",
    additionalInfoTitle:
      "১১. সম্মেলন সম্পর্কিত অন্য কোন অতিরিক্ত তথ্য, মন্তব্য বা প্রত্যাশা",
    additionalInfoPlaceholder: "অনুগ্রহ করে অতিরিক্ত তথ্যের বর্ণনা",
    submitButton: "জমা দিন",
    error1:
      "ইমেইল ইতিমধ্যে রয়েছে। অনুগ্রহ করে একটি ভিন্ন ইমেইল ঠিকানা ব্যবহার করুন।",
    error2: "নিবন্ধন ব্যর্থ, পুনরায় চেষ্টা করুন",
    success: "অভিনন্দন, নিবন্ধন সফল",
  },
  //gujrati
  gu: {
    formTitle: "FPO નેશનલ કોનફરન્સ રજિસ્ટ્રેશન ફોર્મ",
    personalInformationTitle: "1. ભાગ લેનાર વિશે વ્યક્તિગત માહિતી",
    personalInformation: {
      fullName: "પૂર્ણ નામ",
      position: "સ્થાન/પદવી",
      experience: "FPO વ્યવસ્થાપનમાં અનુભવના વર્ષ",
    },
    fpoDetailsTitle: "2. FPO વિગત",
    fpoDetails: {
      fpoName: "FPO નામ",
      tonnes: "ટન",
      fpoLocation: "FPO સ્થાન શહેર",
      state: "રાજ્ય",
      contactNumber: "સંપર્ક નંબર",
      emailAddress: "ઇમેલ સરનામું",
      activeFarmerMembers: "સક્રિય ખેડૂત સભ્યોની સંખ્યા",
      dateOfRegistration: "રજિસ્ટ્રેશન તારીખ",
      numVillagesCovered: "FPO હેઠળ આવરી લેવાયેલા ગામોની સંખ્યા",
      numGramPanchayatBlocksCovered:
        "FPO હેઠળ ગ્રામ પંચાયતની સંખ્યા અને બ્લોક્સ",
      primaryProducts: "મૂળ ઉત્પાદન/પાક",
      operationalDuration: "કામ ચલાવવાની અવધિ (વર્ષથી)",
      annualProduction: "વાર્ષિક ઉત્પાદન (ટન)",
      annualRevenue: "વાર્ષિક આવક (આર્થિક વર્ષ 2023-24 માં INR)",
      percentageGrowthProduction: "ગયા વર્ષોમાં ઉત્પાદનમાં ટકા વૃદ્ધિ",
      percentageGrowthRevenue: "ગયા વર્ષોમાં આવકમાં ટકા વૃદ્ધિ",
      registeredAs: "FPO નોંધાયેલ છે",
      otherRegisteredAs: "બીજું નોંધાયેલ",
      facilitatingInstitutions: "સુવિધા આપતી સંસ્થાઓના નામ",
      specify: "કૃપા કરીને નામ સ્પષ્ટ કરો",
      society: "સમાજ",
      cooperative: "સહકારી સંગઠન",
      trust: "ટ્રસ્ટ",
      company: "કંપની",
      other: "અન્ય",
    },
    participationReasonsTitle: "3. ભાગ لینےનાં કારણો",
    participationReasons: {
      insights: "ખેતરખાતાના તાજા ટ્રેન્ડ અને વિકાસ વિશે જાણો",
      connect:
        "ગ્રામીણ વિકાસ તરફ કાર્યરત સમાન વિચારોવાળા વ્યક્તિઓ અને સંસ્થાઓ સાથે જોડાઓ",
      learn:
        "ઉદ્યોગ નિષ્ણાતો અને વિચારવন্তાઓ પાસેથી ઇન્ટરએક્ટિવ સત્રો અને પેનલ ચર્ચાઓ મારફતે શીખો",
      opportunities:
        "FPO ઇકોસિસ્ટમમાં સહકાર, રોકાણ અને ભાગીદારીના શક્યતાઓ શોધો",
      empower:
        "ખેડૂતને સશક્ત બનાવવા માટે અને કૃષિ માટે એક સ્થાયી ભવિષ્ય નિર્માણ કરવાની સામૂહિક પ્રયત્નમાં ભાગ લો",
      other: "બીજું, કૃપા કરીને સ્પષ્ટ કરો",
      otherPlaceholder: "કૃપા કરીને તમારું કારણ સ્પષ્ટ કરો",
    },
    conferenceAttendanceTitle:
      "4. શું તમે પહેલાથી કોઈ કોન્ફરન્સમાં ભાગ લીધો છે?",
    conferenceAttendance: {
      yes: "હા",
      no: "નહીં",
      detailsPlaceholder: "કૃપા કરીને વિગતોની નોંધ કરો",
    },
    challengesTitle:
      "5. FPOઓને વ્યવસ્થિત કરવા માટે તમને ત્રણ મુખ્ય પડકારો શું છે?",
    challengesPlaceholder: "પડકારો પસંદ કરો",
    challengesOptions: {
      weakFinancials: "ઘટીલે નાણાકીય",
      lackProfessionalManagement: "વ્યવસાયિક વ્યવસ્થાપનની અભાવ",
      inadequateAccessToCredit: "ક્રેડિટને પૂરતું પહોંચ",
      lackRiskMitigationMechanisms: "ঝૂકી ઘટાડવાના ઉપાયોનો અભાવ",
      inadequateAccessToMarket: "બજાર સુધી અપૂરતી પહોંચ",
      inadequateAccessToInfrastructure: "અપૂરતું ઇન્ફ્રાસ્ટ્રક્ચર",
      lackTechnicalSkills: "તકલાદી કૌશલ્ય",
      difficultiesInMarketingProduce: "ઉત્પાદનના માર્કેટિંગમાં મુશ્કેલીઓ",
      poorCapitalizationAndFundingScope: "ગરીબ મૂડીકરણ અને ફંડિંગ વિભાગ",
      accessToFinanceInputsAndTechnology:
        "નાણાકીય ઇનપુટ્સ અને ટેક્નોલોજી પર પહોંચ",
      increasedCompetitionFromExistingPrivateCompanies:
        "મોજુદા ખાનગી કંપનીઓથી વધતી સ્પર્ધા",
      lackOfSelfSustainability: "આપણે નિરર્થકતાની અભાવ",
      lackOfAdministrativeControls: "વહીવટી નિયંત્રણની અભાવ",
      lackOfProfessionalExpertise: "વ્યવસાયિક નિષ્ણાતતા",
      lowInvolvementOfTheMembers: "સભ્યોના ઓછા ભાગ",
      others: "બીજું",
    },
    supportNeededTitle:
      "6. આ પડકારોને પરિષ્કારવા માટે તમારા FPO ને વિશિષ્ટ સહાય અથવા સંસાધનોની જરૂર છે?",
    supportNeededPlaceholder: "સમર્થનની જરૂર",
    supportNeededOptions: {
      Capacity: "ક્ષમતાનાં નિર્માણ",
      Access: "આર્થિક પહોંચી",
      Market: "માર્કેટ લિંકેજ",
      Technical: "તંત્રિક સહાય",
      Others: "બીજું",
    },
    distributionChannelsTitle:
      "7. બજાર પહોંચ અને વિતરણ: ઉત્પન્નનના માર્કેટિંગ માટે ઉપયોગ થનારા વિતરણ ચેનલો પસંદ કરો",
    distributionChannelsPlaceholder: "વિતરણ ચેનલો પસંદ કરો",
    distributionChannelsMap: {
      localMarkets: "સ્થાનિક બજાર",
      superMarkets: "સુપરમાર્કેટ",
      exports: "રફ્તાન",
      exhibitions: "પ્રદર્શિત",
      directCustomers: "પ્રત્યક્ષ ગ્રાહકો",
      amazonFlipkart: "અમેઝોન/ફ્લિપકાર્ટ",
      ownWebsiteSelling: "ખુદનો વેબસાઇટ વેચાણ",
    },
    innovationsTitle: "8. FPO દ્વારા અપનાવેલ નવીન સંચાલન/વિકાસમક परियोजनाएँ",
    innovationsPlaceholder: "નવિન ઉપાયોમાં અને કાર્યક્રમોમાં વર્ણન કરો",
    partnershipsTitle:
      "9. FPO ની કોઇપણ ભાગીદારી કે સહકારમાં સરકારી એજન્સીઓ, એનજીઓ, અથવા બીજા હિતાધિકારીઓનું નામ",
    partnershipsPlaceholder: "કૃપા કરીને સહકાર કે ભાગીદારીનું વર્ણન કરો",
    successStoriesTitle:
      "10. FPO ની કોઇપણ નોંધનીય સફળતા કૉહાની કે સિદ્ધિનું વર્ણન કરો",
    successStoriesPlaceholder:
      "કૃપા કરીને FPO ની સફળ કૉહાની કે સિદ્ધિનું વર્ણન કરો",
    additionalInfoTitle:
      "11. તમે સંબંધિત માનતા હો તે કોન્ફરન્સમાં કોઈપણ વધારાની માહિતી અથવા ટિપ્પણીઓ અથવા અપેક્ષાઓ પ્રદાન કરો",
    additionalInfoPlaceholder: "કૃપા કરીને વધારાની માહિતીનું વર્ણન કરો",
    submitButton: "સબમિટ કરો",
    error1: "ઈમેઇલ પહેલાથી જ છે. કૃપા કરીને અલગ ઈમેઇલ સરનામું વાપરો.",
    error2: "નોંધણી નિષ્ફળ, ફરીથી પ્રયત્ન કરો",
    success: "અભિનંદન, નોંધણી સફળ",
  },
  //odia

  or: {
    formTitle: "FPO ଜାତୀୟ ସମ୍ମେଳନ ନିବନ୍ଧନ ଫର୍ମ",
    personalInformationTitle: "1. ଅଂଶଗ୍ରହଣକାରୀ ବାବଦେ ବ୍ୟକ୍ତିଗତ ତଥ୍ୟ",
    personalInformation: {
      fullName: "ପୂରା ନାମ",
      position: "ପଦ/ହୋଦା",
      experience: "FPO ବ୍ୟବସ୍ଥାପନରେ ଅନୁଭବ ବର୍ଷ",
    },
    fpoDetailsTitle: "2. FPO ବିବରଣୀ",
    fpoDetails: {
      fpoName: "FPO ନାମ",
      tonnes: "ଟନ",
      fpoLocation: "FPO ସ୍ଥାନ ଶହର",
      state: "ରାଜ୍ୟ",
      contactNumber: "ଯୋଗାଯୋଗ ନମ୍ବର",
      emailAddress: "ଇମେଲ ଠିକଣା",
      activeFarmerMembers: "ସକ୍ରିୟ ଚାଷୀ ସଦସ୍ୟ ସଂଖ୍ୟା",
      dateOfRegistration: "ନିବନ୍ଧନ ତାରିଖ",
      numVillagesCovered: "FPO ଅଧୀନରେ ଆଚ୍ଛାଦିତ ଗ୍ରାମ ସଂଖ୍ୟା |",
      numGramPanchayatBlocksCovered:
        "FPO ଅଧୀନରେ ଗ୍ରାମ ପଞ୍ଚାୟତର ସଂଖ୍ୟା ଏବଂ ବ୍ଲକଗୁଡିକ |",
      primaryProducts: "ମୂଳ ଉତ୍ପାଦନ/ଖେତି",
      operationalDuration: "କାର୍ଯ୍ୟାବଧି (ବର୍ଷରୁ)",
      annualProduction: "ବାର୍ଷିକ ଉତ୍ପାଦନ (ଟନ)",
      annualRevenue: "ବାର୍ଷିକ ଆୟ (ଆର୍ଥିକ ବର୍ଷ 2023-24ରେ INR)",
      percentageGrowthProduction: "ଗତ ବର୍ଷରେ ଉତ୍ପାଦନରେ ପ୍ରତିଶତ ବୃଦ୍ଧି",
      percentageGrowthRevenue: "ଗତ ବର୍ଷରେ ଆୟରେ ପ୍ରତିଶତ ବୃଦ୍ଧି",
      registeredAs: "FPO ନିବନ୍ଧିତ ରୂପେଣ",
      otherRegisteredAs: "ଅନ୍ୟ ନିବନ୍ଧିତ",
      facilitatingInstitutions: "ସୁବିଧାକାରୀ ସଂସ୍ଥାମାନଙ୍କ ନାମ",
      specify: "ନାମ ସ୍ପଷ୍ଟ କରନ୍ତୁ",
      society: "ସମାଜ",
      cooperative: "ସହକାରୀ ସମାଜ",
      trust: "ଟ୍ରସ୍ଟ",
      company: "କମ୍ପାନୀ",
      other: "ଅନ୍ୟ",
    },
    participationReasonsTitle: "3. ଅଂଶଗ୍ରହଣ କରିବାକୁ କାରଣ",
    participationReasons: {
      insights: "ଖେତି କ୍ଷେତ୍ରରେ ସାମ୍ପ୍ରତିକ ପ୍ରବୃତି ଏବଂ ବିକାଶ ବିଷୟରେ ଜାଣିବା",
      connect:
        "ଗ୍ରାମୀଣ ବିକାଶରେ କାର୍ଯ୍ୟ କରୁଥିବା ସମାନ ମନୋଭାବୀକ ଏବଂ ସଂସ୍ଥାନମାନଙ୍କ ସହିତ ସଂପର୍କ କରନ୍ତୁ",
      learn:
        "କାର୍ଯ୍ୟଶୀଳ ସେସନ ଏବଂ ପାନେଲ ଆଲୋଚନା ମାଧ୍ୟମରେ ଉଦ୍ୟୋଗ ନିଶ୍ଣାନ୍ତ ଏବଂ ଚିନ୍ତାବାଦୀଙ୍କୁ ପଢିବା",
      opportunities: "FPO ପରିବେଶରେ ସହଯୋଗ, ନିବେଶ ଏବଂ ସହଯୋଗୀତା ସୁଯୋଗ ଖୋଜନ୍ତୁ",
      empower: "ଚାଷୀଙ୍କୁ ଶକ୍ତିଶାଳୀ କରିବା ଏବଂ କୃଷି ପାଇଁ ଏକ ସ୍ଥାୟୀ ଭବିଷ୍ୟତ ନି�",
      other: "ଅନ୍ୟ, କୃପା ନାମ ଦାୟାକରି ସ୍ପଷ୍ଟ କରନ୍ତୁ",
      otherPlaceholder: "ଦୟାକରି ଆପଣଙ୍କର କାରଣ ସ୍ପଷ୍ଟ କରନ୍ତୁ",
    },
    conferenceAttendanceTitle: "4. ଆପଣ କେବେ କୌଣସି ସମ୍ମେଳନରେ ଯୋଗ ଦେଇଛନ୍ତି କି?",
    conferenceAttendance: {
      yes: "ହଁ",
      no: "ନାହିଁ",
      detailsPlaceholder: "ଦୟାକରି ତାଥ୍ୟ ଉଲ୍ଲେଖ କରନ୍ତୁ",
    },
    challengesTitle:
      "5. FPO ମାନେଜ୍ମେଣ୍ଟ ମଧ୍ୟରେ ଆପଣଙ୍କୁ ମୁଖ୍ୟ ତିନିଟି ଚ୍ୟାଲେଞ୍ଜ ସାମନା କରିବାକୁ ପଡିଥିଲା କି?",
    challengesPlaceholder: "ଚ୍ୟାଲେଞ୍ଜ ଚୟନ କରନ୍ତୁ",
    challengesOptions: {
      weakFinancials: "ଦୁର୍ବଳ ଆର୍ଥିକ ବ୍ୟବସ୍ଥା",
      lackProfessionalManagement: "ବୃତ୍ତିଗତ ମାନେଜ୍ମେଣ୍ଟର ଅଭାବ",
      inadequateAccessToCredit: "ଋଣକୁ ଅପ୍ୟାପ୍ତ ପ୍ରବେଶ",
      lackRiskMitigationMechanisms: "ଝୁଝାର ନିମନ୍ତେ ଯୋଗାଇବାର ସାଧନ ନାହିଁ",
      inadequateAccessToMarket: "ବାଜାରକୁ ଅପ୍ୟାପ୍ତ ପ୍ରବେଶ",
      inadequateAccessToInfrastructure: "ଅପର୍ୟାପ୍ତ ପ୍ରାଥମିକ ସାଧନକୁ ପ୍ରବେଶ",
      lackTechnicalSkills: "ପ୍ରାଯୁକ୍ତିକ ଦକ୍ଷତାର ଅଭାବ",
      difficultiesInMarketingProduce: "ସାମାନ୍ୟ ପଦାର୍ଥମାନ ଜବ ପାଇଁ ସମସ୍ୟା",
      poorCapitalizationAndFundingScope: "ଖରାପ ଧନାଗମନ ଏବଂ ଆୟତିତ ମଧ୍ୟସ୍ଥତା",
      accessToFinanceInputsAndTechnology: "ଧନ, ଇନପୁଟ୍ସ ଏବଂ ପ୍ରାଯୁକ୍ତିକୁ ପ୍ରବେଶ",
      increasedCompetitionFromExistingPrivateCompanies:
        "ପୂର୍ବରୁ ସାଂଘିକ କମ୍ପାନୀମାନଙ୍କୁ ସହିତ ମଧ୍ୟରେ ପ୍ରତିଯୋଗିତା",
      lackOfSelfSustainability: "ଆପଣଙ୍କ ନିଜା ପ୍ରତିଯୋଗିତାର ଲାଭ",
      lackOfAdministrativeControls: "ପ୍ରଶାସନିକ ନିୟନ୍ତ୍ରଣର ଅଭାବ",
      lackOfProfessionalExpertise: "ବୃତ୍ତିଗତ ନିପୁଣତାର ଅଭାବ",
      lowInvolvementOfTheMembers: "ସଦସ୍ୟମାନଙ୍କ ନିମ୍ନ ସାମିଲିତା",
      others: "ଅନ୍ୟାନ୍ୟ",
    },
    supportNeededTitle:
      "6. ଏହି ଚ୍ୟାଲେଞ୍ଜଗୁଡ଼ିକୁ ଟ୍ରାକ କରିବାକୁ ଆପଣଙ୍କର FPO କେହି ଉପକର୍ମ କି ସାଧନ ଆବଶ୍ୟକ କରେ?",

    supportNeededPlaceholder: "ଆବଶ୍ୟକ ସାଧନଗୁଡ଼ିକ ଚୟନ କରନ୍ତୁ",
    supportNeededOptions: {
      Capacity: "କ୍ଷମତା ବିକାଶ",
      Access: "ଧନର ଲାଗି ପ୍ରବେଶ",
      Market: "ବାଜାର ସଂପର୍କ",
      Technical: "ପ୍ରାଯୁକ୍ତିକ ସହାୟତା",
      Others: "ଅନ୍ୟ",
    },
    distributionChannelsTitle:
      "7. ବାଜାର ପ୍ରବେଶ ଏବଂ ବିତରଣ: ଉତ୍ପାଦମାନଙ୍କ ବିପଣନୀକରଣ ପାଇଁ ବ୍ୟବହୃତ ବିତରଣ ଚାନେଲଗୁଡ଼ିକ ଚୟନ କରନ୍ତୁ",
    distributionChannelsPlaceholder: "ବିତରଣ ଚାନେଲଗୁଡ଼ିକ ଚୟନ କରନ୍ତୁ",
    distributionChannelsMap: {
      localMarkets: "ସ୍ଥାନୀୟ ବାଜାର",
      superMarkets: "ସୁପରମାର୍କେଟଗୁଡ଼ିକ",
      exports: "ନିର୍ଯାତ",
      exhibitions: "ପ୍ରଦର୍ଶନୀଗୁଡ଼ିକ",
      directCustomers: "ପ୍ରତିକ୍ଷ ଗ୍ରାହକ",
      amazonFlipkart: "ଆମାଜନ/ଫ୍ଲିପକାର୍ଟ",
      ownWebsiteSelling: "ନିଜର ଏବସାଇଟ ବିକ୍ରୀ",
    },
    innovationsTitle:
      "8. ଅଭିନବତା ଏବଂ ଉଦ୍ୟୋଗ: FPO ଦ୍ୱାରା ଅପନାଇତ ଆଭିନବ ପ୍ରଯୋଜନା/ଉଦ୍ୟୋଗ",
    innovationsPlaceholder: "ଦୟାକରି ଆଭିନବତା ଏବଂ ଉଦ୍ୟୋଗବାଦୀ ଦାୟା କରନ୍ତୁ",
    partnershipsTitle:
      "9. FPO ଦ୍ୱାରା ସରକାରୀ ଏଜେନ୍ସିଗୁଡ଼ିକ, ଏନଜିଓଗୁଡ଼ିକ, କିମ୍ବା ଅନ୍ୟ ହିତାଧିକାରୀଙ୍କ ସହିତ ଉତ୍ସବ କିମ୍ବା ସହଯୋଗୀତା",
    partnershipsPlaceholder: "ଦୟାକରି ଉତ୍ସବ କିମ୍ବା ସହଯୋଗୀତା ବାବଦେ ବିବରଣୀ କରନ୍ତୁ",
    successStoriesTitle:
      "10. FPO ଯେହି ଗୁଡ଼ିକ ବିଶେଷ ଉସ୍ପଳତା କିମ୍ବା କାର୍ଯ୍ୟକୁ ସାର୍ଠକ କରିଛି, ଏହାର ବିବରଣୀ ଦିଅନ୍ତୁ",
    successStoriesPlaceholder:
      "ଦୟାକରି ଉତ୍ସବ କିମ୍ବା ସାର୍ଠକ କାର୍ଯ୍ୟ ବିବରଣୀ କରନ୍ତୁ",
    additionalInfoTitle:
      "11. ସମ୍ମେଳନ ସହିତ ସଂପକ୍ତ ଆପଣଙ୍କ ଅନୁମାନ କିମ୍ବା ଅଧିକ ତଥ୍ୟ ଦାୟା କରନ୍ତୁ",
    additionalInfoPlaceholder: "ଦୟା କରି ଆପଣଙ୍କର ଅଧିକ ତଥ୍ୟ ଦାୟା କରନ୍ତୁ",
    submitButton: "ସୁବିତ କରନ୍ତୁ",
    error1:
      "ଇମେଲ୍ ଏଠେଇ ଥିବା ରହିଛି। ଦୟାକରି ଏକ ବିପରୀତ ଇମେଲ୍ ଠିକାଣା ବ୍ୟବହାର କରନ୍ତୁ।",
    error2: "ନୋନ୍ଦାନ୍ ସଫଳ ହୋଇନି, ତୁମେ ପୁଣି ଚେଷ୍ଟା କର।",
    success: "ଅଭିନନ୍ଦନ, ନୋନ୍ଦାନ୍ ସଫଳ",
  },

  //kannada
  kn: {
    formTitle: "FPO ರಾಷ್ಟ್ರೀಯ ಸಭಾ ನೋಂದಣಿ ನಮೂನೆ",
    personalInformationTitle: "1. ಭಾಗವಹಿಸಿದ ವ್ಯಕ್ತಿ ಬಗ್ಗೆ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ",
    personalInformation: {
      fullName: "ಸಂಪೂರ್ಣ ಹೆಸರು",
      position: "ಪದ/ಪದವಿ",
      experience: "FPO ನಿರ್ವಹಣೆಯಲ್ಲಿ ಅನುಭವದ ವರ್ಷಗಳು",
    },
    fpoDetailsTitle: "2. FPO ವಿವರಗಳು",
    fpoDetails: {
      fpoName: "FPO ಹೆಸರು",
      tonnes: "ಟನ್‌ಗಳು",
      fpoLocation: "FPO ಸ್ಥಳ ನಗರ",
      state: "ರಾಜ್ಯ",
      contactNumber: "ಸಂಪರ್ಕ ಸಂಖ್ಯೆ",
      emailAddress: "ಇಮೇಲ್ ವಿಳಾಸ",
      activeFarmerMembers: "ಸಕ್ರಿಯ ರೈತ ಸದಸ್ಯರ ಸಂಖ್ಯೆ",
      dateOfRegistration: "ನೋಂದಣಿಯ ದಿನಾಂಕ",
      numVillagesCovered: "FPO ಅಡಿಯಲ್ಲಿ ಆವರಿಸಿರುವ ಗ್ರಾಮಗಳ ಸಂಖ್ಯೆ",
      numGramPanchayatBlocksCovered:
        "FPO ಅಡಿಯಲ್ಲಿ ಗ್ರಾಮ ಪಂಚಾಯತ್‌ನ ಸಂಖ್ಯೆ ಮತ್ತು ಬ್ಲಾಕ್‌ಗಳು",
      primaryProducts: "ಮೂಲ ಉತ್ಪನ್ನಗಳು/ಬೆಳೆಗಳು",
      operationalDuration: "ಕಾರ್ಯಾಚರಣಾ ಅವಧಿ (ವರ್ಷದಿಂದ)",
      annualProduction: "ವಾರ್ಷಿಕ ಉತ್ಪಾದನೆ (ಟನ್‌ಗಳು)",
      annualRevenue: "ವಾರ್ಷಿಕ ಆದಾಯ (ಆರ್ಥಿಕ ವರ್ಷ 2023-24 ನಲ್ಲಿ INR)",
      percentageGrowthProduction:
        "ಹಿಂದಿನ ವರ್ಷಗಳಲ್ಲಿ ಉತ್ಪಾದನೆಯಲ್ಲಿ ಶೇಕಡಾವಾರು ವೃದ್ಧಿ",
      percentageGrowthRevenue: "ಹಿಂದಿನ ವರ್ಷಗಳಲ್ಲಿ ಆದಾಯದಲ್ಲಿ ಶೇಕಡಾವಾರು ವೃದ್ಧಿ",
      registeredAs: "FPO ನೋಂದಾಯಿಸಲಾಗಿದೆ",
      otherRegisteredAs: "ಇತರವುಗಳನ್ನು ಸೂಚಿಸಿ",
      facilitatingInstitutions: "ಸುಧಾರಣೆಗೆ ಸಹಾಯ ಮಾಡುವ ಸಂಸ್ಥೆಗಳ ಹೆಸರು",
      specify: "ದಯವಿಟ್ಟು ಹೆಸರು ತಿಳಿಸಿ",
      society: "ಸಮಾಜ",
      cooperative: "ಸಹಕಾರಿ ಸಂಘ",
      trust: "ಟ್ರಸ್ಟ್",
      company: "ಕಂಪನಿ",
      other: "ಇತರೆ",
    },
    participationReasonsTitle: "3. ಭಾಗವಹಿಸುವ ಕಾರಣಗಳು",
    participationReasons: {
      insights:
        "ಕೃಷಿ ಕ್ಷೇತ್ರದ ಇತ್ತೀಚಿನ ಪ್ರವೃತ್ತಿಗಳು ಮತ್ತು ಬೆಳವಣಿಗೆಗಳ ಬಗ್ಗೆ ಜ್ಞಾನ ಪಡೆಯಿರಿ",
      connect:
        "ಗ್ರಾಮೀಣ ಅಭಿವೃದ್ಧಿಗೆ ಕೆಲಸ ಮಾಡುತ್ತಿರುವ ಹೋಮಾರ್ಟ್ಟ್‌ನಂತಹ ವ್ಯಕ್ತಿಗಳೊಂದಿಗೆ ಮತ್ತು ಸಂಘಟನೆಯೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿಕೊಳ್ಳಿ",
      learn:
        "ಉದ್ಯಮ ತಜ್ಞರು ಮತ್ತು ಚಿಂತಕರಿಂದ ನಿರಂತರ ಸಮಾವೇಶಗಳು ಮತ್ತು ಪ್ಯಾನಲ್ ಚರ್ಚೆಗಳ ಮೂಲಕ ಕಲಿಯಿರಿ",
      opportunities:
        "FPO ಈಕೋಸಿಸ್ಟಮ್‌ನಲ್ಲಿ ಸಹಕಾರ, ಹೂಡಿಕೆ, ಮತ್ತು ಪಾಲುದಾರಿಕೆಯ ಅವಕಾಶಗಳನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ",
      empower:
        "ರೈತರನ್ನು ಅಧಿಕಾರೀಕರಿಸಲು ಮತ್ತು ಕೃಷಿಗೆ ಸ್ಥಿರತೆಯ ಯಶಸ್ವಿ ಭವಿಷ್ಯವನ್ನು ಕಟ್ಟಲು ಕೂಟದಲ್ಲಿ ಭಾಗವಹಿಸಿ",
      other: "ಇತರೆ, ದಯವಿಟ್ಟು ವಿವರಿಸಿ",
      otherPlaceholder: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಕಾರಣವನ್ನು ತಿಳಿಸಿ",
    },
    conferenceAttendanceTitle: "4. ನೀವು ಮೊದಲು ಯಾವುದೇ ಸಭೆಯನ್ನು ಪಾಲ್ಗೊಂಡಿದ್ದೀರಾ?",
    conferenceAttendance: {
      yes: "ಹೌದು",
      no: "ಇಲ್ಲ",
      detailsPlaceholder: "ದಯವಿಟ್ಟು ವಿವರಗಳನ್ನು குறிப்பிடಿ",
    },
    challengesTitle:
      "5. FPO‌ಗಳನ್ನು ನಿರ್ವಹಣೆಯಲ್ಲಿ ನೀವು ಎದುರಿಸುತ್ತಿರುವ ಮೂರು ಪ್ರಮುಖ ಸವಾಲುಗಳೇನು?",
    challengesPlaceholder: "ಸವಾಲುಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    challengesOptions: {
      weakFinancials: "ದೊಡ್ಡವ مالية",
      lackProfessionalManagement: "ವೃತ್ತಿಪರ ನಿರ್ವಹಣೆಯ ದಾರಿಯಿಲ್ಲ",
      inadequateAccessToCredit: "ಕ್ರೆಡಿಟ್‌ಗೆ ಪರಿಶೀಲನಿಲ್ಲ",
      lackRiskMitigationMechanisms: "ಆಪತ್ತು ನಿವಾರಣೆಗೆ ಬೇಕಾದ ವ್ಯವಸ್ಥೆಯಿಲ್ಲ",
      inadequateAccessToMarket: "ಮಾರುಕಟ್ಟೆಗಳಿಗೆ ಪ್ರವೇಶ ಕಠಿಣವಾಗಿದೆ",
      inadequateAccessToInfrastructure: "ಅಪೌರತ್ವ ಬನ್ನಿಗೆ ಲಭ್ಯವಿಲ್ಲ",
      lackTechnicalSkills: "ತಾಂತ್ರಿಕ ಜ್ಞಾನದಲ್ಲಿ ದಾರಿ ಇಲ್ಲ",
      difficultiesInMarketingProduce: "ಮಾರ್ಕೆಟಿಂಗ್ ಉತ್ಪನ್ನದಲ್ಲಿ ತೊಂದರೆ",
      poorCapitalizationAndFundingScope:
        "ನೂತನ ಬಂಡವಾಳ ಕ್ರಿಯೆಗಳ ಮತ್ತು ಹಣದ ಲಾಭದ ಶಕ್ತಿಯಿಲ್ಲ",
      accessToFinanceInputsAndTechnology:
        "ಹಣಕಾಸು ಇನ್‌ಪುಟ್‌ಗಳ ಮತ್ತು ತಂತ್ರಜ್ಞಾನಕ್ಕೆ ಲಭ್ಯವಿಲ್ಲ",
      increasedCompetitionFromExistingPrivateCompanies:
        "ಮಾಹಿತಿಯ ನೆಲದಲ್ಲಿ ಹೆಚ್ಚಿದ ಸ್ಪರ್ಧ",
      lackOfSelfSustainability: "ಸ್ವತಂತ್ರ ವ್ಯಕ್ತಿತ್ವದ ಸ್ಥಾನನಿಲ್ಲ",
      lackOfAdministrativeControls: "ಪ್ರಶಾಸನ ನಿಯಂತ್ರಣದಷ್ಟುಪ",
      lackOfProfessionalExpertise: "ವೃತ್ತಿಪರ փորձವನ್ನು ಗುರಿತ ಮಾಡುವುದು",
      lowInvolvementOfTheMembers: "ಸದಸ್ಯರಿಗೆ ತಕ್ಕಂಟಿದ್ದೆ",
      others: "ಇತರೆ",
    },
    supportNeededTitle:
      "6. ಈ ಸವಾಲುಗಳನ್ನು ಎದುರಿಸಲು FPO ಗೆ ನಿಮಗೆ ಬೇಕಾದ ವಿಶೇಷ ಸಹಾಯ ಅಥವಾ ಸಂಸಾಧನೆಗಳೇನು?",
    supportNeededPlaceholder: "ಪರವಾನಗಿ ಬೇಕಾದ ಸಹಾಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    supportNeededOptions: {
      Capacity: "ಕ್ಷಮತಾ ಅಭಿವೃದ್ಧಿ",
      Access: "ಹಣಕಾಸು ಪ್ರವೇಶ",
      Market: "ಮಾರುಕಟ್ಟೆ ಸಂಪರ್ಕ",
      Technical: "ತಾಂತ್ರಿಕ ನೆರವು",
      Others: "ಇತರೆ",
    },
    distributionChannelsTitle:
      "7. ಮಾರುಕಟ್ಟೆ ಲಭ್ಯತೆ ಮತ್ತು ವಿತರಣಾ: ಉತ್ಪನ್ನಗಳ ಮಾರಾಟಕ್ಕೆ ಉಪಯೋಗಿಸಿದ ವಿತರಣಾ ಚಾನೆಲ್‌ಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    distributionChannelsPlaceholder: "ವಿತರಣಾ ಚಾನೆಲ್‌ಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    distributionChannelsMap: {
      localMarkets: "ಸ್ಥಾನೀಯ ಮಾರುಕಟ್ಟೆಗಳು",
      superMarkets: "ಸೂಪರ್‌ಮಾರ್ಕೆಟ್ಗಳು",
      exports: "ಏರಿಸಿವೆ",
      exhibitions: "ಪ್ರದರ್ಶನಗಳು",
      directCustomers: "ನೆರೆಹೊರೆಯ ಗ್ರಾಹಕರು",
      amazonFlipkart: "ಅಮೇಜಾನ್/ಫ್ಲಿಪ್ಕಾರ್ಟ್",
      ownWebsiteSelling: "ಸ್ವಂತ ವೆಬ್‌ಸೈಟ್ ಮಾರಾಟ",
    },
    innovationsTitle:
      "8. ನಾವೀನ್ಯತೆ ಮತ್ತು ಯೋಜನೆಗಳು: FPO ವತಿಯಿಂದ ಅಳವಡಿಸಲ್ಪಟ್ಟ ನಾವೀನ್ಯತೆಯ ಅಭ್ಯಾಸ/ವಿಕಾಸ ಯೋಜನೆಗಳು",
    innovationsPlaceholder: "ದಯವಿಟ್ಟು ನಾವೀನ್ಯತೆ ಮತ್ತು ಯೋಜನೆಗಳನ್ನು ವಿವರಿಸಿ",
    partnershipsTitle:
      "9. FPO ಸರಕಾರದ ಸಂಸ್ಥೆಗಳೊಂದಿಗೆ, NGOಗಳೊಂದಿಗೆ ಅಥವಾ ಇತರ ಹಿತಸಾಧಕರೊಂದಿಗೆ ಹೊಂದಿರುವ ಪಾಲುದಾರಿಕೆಗಳು ಅಥವಾ ಸಹಕಾರಗಳು",
    partnershipsPlaceholder: "ದಯವಿಟ್ಟು ಪಾಲುದಾರಿಕೆಗಳು ಅಥವಾ ಸಹಕಾರಗಳನ್ನು ವಿವರಿಸಿ",
    successStoriesTitle: "10. FPO‌ಗಳ ಪ್ರಮುಖ ಯಶೋಗಾಥೆಗಳು ಅಥವಾ ಸಾಧನೆಗಳು",
    successStoriesPlaceholder: "ದಯವಿಟ್ಟು ಯಶೋಗಾಥೆಗಳು ಅಥವಾ ಸಾಧನೆಗಳನ್ನು ವಿವರಿಸಿ",
    additionalInfoTitle:
      "11. ಸಮಾವೇಶದಲ್ಲಿ ನೀವು ಪ್ರಮುಖ ಎಂದು ಪರಿಗಣಿಸಿದ ಯಾವುದೇ ಅತಿರিক্ত ಮಾಹಿತಿ ಅಥವಾ ಟಿಪ್ಪಣಿಗಳು",
    additionalInfoPlaceholder: "ದಯವಿಟ್ಟು ಮಾಹಿತಿಯನ್ನು ವಿವರಿಸಿ",
    submitButton: "ಸಲ್ಲಿಸಿರಿ",
    error1: "ಇಮೇಲ್ ಈಗಾಗಲೇ ಇದೆ. ದಯವಿಟ್ಟು ಬೇರೆ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ಬಳಸಿ.",
    error2: "ನೋಂದಣಿ ವಿಫಲವಾಗಿದೆ, ಪುನಃ ಪ್ರಯತ್ನಿಸಿ",
    success: "ಅಭಿನಂದನೆಗಳು, ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ",
  },
  //konkani
  kok: {
    formTitle: "FPO राष्ट्रीय संमेलन नोंदणी फॉर्म",
    personalInformationTitle: "1. सहभागीविषयी वैयक्तिक माहिती",
    personalInformation: {
      fullName: "पूर्ण नाव",
      position: "स्थान/हुद्दा",
      experience: "FPO व्यवस्थापनात अनुभवाची वर्षे",
    },
    fpoDetailsTitle: "2. FPO तपशील",
    fpoDetails: {
      fpoName: "FPO नाव",
      tonnes: "टन",
      fpoLocation: "FPO स्थान शहर",
      state: "राज्य",
      contactNumber: "संपर्क क्रमांक",
      emailAddress: "ईमेल पत्ता",
      activeFarmerMembers: "सक्रिय शेतकरी सदस्यांची संख्या",
      dateOfRegistration: "नोंदणीची तारीख",
      numVillagesCovered: "FPO-आच्छादन केलेल्या गावांची संख्या",
      numGramPanchayatBlocksCovered:
        "FPO-आच्छादन केलेल्या ग्रामपंचायत आणि ब्लॉक",
      primaryProducts: "मुख्य उत्पादने/पिके",
      operationalDuration: "कार्यक्षेत्र (वर्षापासून)",
      annualProduction: "वार्षिक उत्पादन (टन)",
      annualRevenue: "वार्षिक उत्पन्न (आर्थिक वर्ष 2023-24 मध्ये INR)",
      percentageGrowthProduction: "गेल्या वर्षांतील उत्पादनात वाढ टक्केवारी",
      percentageGrowthRevenue: "गेल्या वर्षांतील उत्पन्नात वाढ टक्केवारी",
      registeredAs: "FPO नोंदणीकृत आहे",
      otherRegisteredAs: "इतर नोंदणीकृत",
      facilitatingInstitutions: "सुविधा पुरवणाऱ्या संस्थांची नावे",
      specify: "कृपया नावे स्पष्ट करा",
      society: "समाज",
      cooperative: "सहकारी संस्था",
      trust: "ट्रस्ट",
      company: "कंपनी",
      other: "इतर",
    },
    participationReasonsTitle: "3. सहभाग घेण्याची कारणे",
    participationReasons: {
      insights:
        "कृषी क्षेत्रातील नव्या प्रवाहांबद्दल आणि विकासांबद्दल जाणून घ्या",
      connect:
        "ग्रामीण विकासाच्या दिशेने काम करणाऱ्या समान विचारसरणीच्या व्यक्तींशी आणि संस्थांशी जोडले जाऊन घ्या",
      learn:
        "इंटरॅक्टिव्ह सत्रे आणि पॅनेल चर्चांद्वारे उद्योगातील तज्ज्ञ आणि विचारवंतांकडून शिका",
      opportunities:
        "FPO पारिस्थितिकेत सहयोग, गुंतवणूक आणि भागीदारीच्या संधी शोधा",
      empower:
        "शेतकऱ्यांना सशक्त करण्यासाठी आणि शेतीला एक स्थिर भविष्य निर्माण करण्यासाठी सामूहिक प्रयत्नांचा भाग व्हा",
      other: "इतर, कृपया निर्दिष्ट करा",
      otherPlaceholder: "कृपया आपले कारण निर्दिष्ट करा",
    },
    conferenceAttendanceTitle:
      "4. तुम्ही आधी कोणत्या संमेलनांमध्ये सहभागी झाला आहात का?",
    conferenceAttendance: {
      yes: "होय",
      no: "नाही",
      detailsPlaceholder: "कृपया तपशीलांचा उल्लेख करा",
    },
    challengesTitle:
      "5. FPO व्यवस्थापन करताना तुम्हाला तिन्ही मुख्य आव्हाने कोणती आहेत?",
    challengesPlaceholder: "आव्हाने निवडा",
    challengesOptions: {
      weakFinancials: "कमजोर आर्थिक स्थिती",
      lackProfessionalManagement: "व्यावसायिक व्यवस्थापनाचा अभाव",
      inadequateAccessToCredit: "क्रेडिटमध्ये अपर्याप्त प्रवेश",
      lackRiskMitigationMechanisms: "जोखिम कमी करण्याचे उपाय नाहीत",
      inadequateAccessToMarket: "बाजारात अपर्याप्त प्रवेश",
      inadequateAccessToInfrastructure: "अपर्याप्त पायाभूत सुविधा",
      lackTechnicalSkills: "तांत्रिक कौशल्याचा अभाव",
      difficultiesInMarketingProduce: "उत्पादन विक्रीत अडचणी",
      poorCapitalizationAndFundingScope: "कमजोर भांडवल आणि निधीची व्याप्ती",
      accessToFinanceInputsAndTechnology:
        "आर्थिक इनपुट्स आणि तंत्रज्ञानाचा प्रवेश",
      increasedCompetitionFromExistingPrivateCompanies:
        "अस्तित्वात असलेल्या खाजगी कंपन्यांकडून वाढलेली स्पर्धा",
      lackOfSelfSustainability: "स्वावलंबनाचा अभाव",
      lackOfAdministrativeControls: "प्रशासनिक नियंत्रणाचा अभाव",
      lackOfProfessionalExpertise: "व्यावसायिक कौशल्याचा अभाव",
      lowInvolvementOfTheMembers: "सदस्यांची कमी सहभागिता",
      others: "इतर",
    },
    supportNeededTitle:
      "6. या आव्हानांना मात देण्यासाठी तुमच्या FPO ला कोणत्या प्रकारचा आधार किंवा संसाधनांची आवश्यकता आहे?",
    supportNeededPlaceholder: "आवश्यक आधार निवडा",
    supportNeededOptions: {
      Capacity: "क्षमता वाढ",
      Access: "आर्थिक स्रोतांकडे प्रवेश",
      Market: "बाजार संपर्क",
      Technical: "तांत्रिक मदत",
      Others: "इतर",
    },
    distributionChannelsTitle:
      "7. बाजारातील प्रवेश आणि वितरण: उत्पादने विकण्यासाठी वापरलेल्या वितरण मार्गांची निवड करा",
    distributionChannelsPlaceholder: "वितरण मार्ग निवडा",
    distributionChannelsMap: {
      localMarkets: "स्थानीय बाजार",
      superMarkets: "सुपरमार्केट्स",
      exports: "निर्यात",
      exhibitions: "प्रदर्शन",
      directCustomers: "प्रत्यक्ष ग्राहक",
      amazonFlipkart: "अमेज़ॉन/फ्लिपकार्ट",
      ownWebsiteSelling: "स्वतःच्या वेबसाइटद्वारे विक्री",
    },
    innovationsTitle: "8. FPO द्वारे स्वीकारलेल्या नवकल्पना/विकासात्मक प्रकल्प",
    innovationsPlaceholder: "कृपया नवकल्पना आणि उपक्रमांचे वर्णन करा",
    partnershipsTitle:
      "9. FPO कडे असलेल्या सरकारी संस्थांसह भागीदारी किंवा सहयोग कोणत्याही प्रकारचे आहे का?",
    partnershipsPlaceholder: "कृपया भागीदारी किंवा सहकार्याचे वर्णन करा",
    successStoriesTitle:
      "10. FPO च्या कोणत्याही उल्लेखनीय यशस्वी कथा किंवा यशोगाथेचे वर्णन करा",
    successStoriesPlaceholder: "कृपया यशोगाथेचे वर्णन करा",
    additionalInfoTitle:
      "11. संमेलनाबद्दल कोणतेही अतिरिक्त माहिती, टिप्पणी किंवा अपेक्षेची माहिती प्रदान करा",
    additionalInfoPlaceholder: "कृपया अतिरिक्त माहिती वर्णन करा",
    submitButton: "सबमिट करा",
    error1: "ईमेल आसा आगयाच अस्ति. करपया वेगल्य ईमेल पत्ता उपयाग करताय्‌त.",
    error2: "नोंदणी फुडुच आसा, फाटी झयाचो प्रयत्न करात.",
    success: "बधाई हो, नोंदणी फलीभूत झयात.",
  },
  //manipuri
  mni: {
    formTitle: "FPO ନାସନାଲ କନ୍ଫାରେନ୍ସ ରେଜିସ୍ଟ୍ରେସନ୍ ପ୍ରାପ୍ତ ଫର୍ମ",
    personalInformationTitle: "1. ଚାରିଏ ପ୍ରବାନାବଦୁ ପାନ୍ତ ବିଶେନାବା",
    personalInformation: {
      fullName: "ପୂରା ନାମ",
      position: "ସ୍ଥାନ/ପଦବୀ",
      experience: "FPO ପ୍ରବାନାବାନେଇନ୍ ପ୍ରବାସ ଚାରିଏସି",
    },
    fpoDetailsTitle: "2. FPO ବିଶେନାବା",
    fpoDetails: {
      fpoName: "FPO ନାମ",
      tonnes: "ଟନ୍",
      fpoLocation: "FPO ଜୁନ୍ ଲୋକେସନ୍ ସିଟି",
      state: "ସେତେଇ",
      contactNumber: "ସମ୍ପର୍କ ନମ୍ବର",
      emailAddress: "ଇମେଲ ଠିକାନା",
      activeFarmerMembers: "ସାଖାଲିକାରୀଙ୍କ ସଦସ୍ୟ ଆମସିଙ୍ଗ ଣୁଓହେଓ",
      dateOfRegistration: "ପ୍ରାପ୍ତ ଦିନ",
      numVillagesCovered: "FPO-କଭର୍ କରିଇଛା କୋମା",
      numGramPanchayatBlocksCovered: "FPO-କଭର୍ କରିଇଛା ଗ୍ରାମ ପଞ୍ଚାୟତ ଏବଂ ବ୍ଲକ୍ସ",
      primaryProducts: "ମୂଳାଧାର ଶିଲ୍ପ/ଖେତି",
      operationalDuration: "କାମ କାରିବା ସମୟ (ବର୍ଷରୁ)",
      annualProduction: "ବାର୍ଷିକ ଉତ୍ପାଦନ (ଟନ୍)",
      annualRevenue: "ବାର୍ଷିକ ଆୟ (ଆର୍ଥିକ ବର୍ଷ 2023-24ରେ INR)",
      percentageGrowthProduction: "ଗତ ବର୍ଷରେ ଉତ୍ପାଦନରେ ପ୍ରତିଶତ ବୃଦ୍ଧି",
      percentageGrowthRevenue: "ଗତ ବର୍ଷରେ ଆୟରେ ପ୍ରତିଶତ ବୃଦ୍ଧି",
      registeredAs: "FPO ନିବନ୍ଧିତ",
      otherRegisteredAs: "ଅନ୍ୟ ପ୍ରିଶ୍ଠାକାରଣ",
      facilitatingInstitutions: "ସାହାୟିକ ସଂସ୍ଥାମାନଙ୍କ ନାମ",
      specify: "ନାମ ସ୍ପଷ୍ଟ କରନ୍ତୁ",
      society: "ସମାଜ",
      cooperative: "ସହକାରୀ ସମସିଆ",
      trust: "ଟ୍ରସ୍ଟ",
      company: "କମ୍ପାନୀ",
      other: "ଅନ୍ୟ",
    },
    participationReasonsTitle: "3. ଚାରିଏ ପ୍ରବାନାବାବା ଦୁଇତା କାରଣ",
    participationReasons: {
      insights: "କୁଷୀ କ୍ଷେତ୍ରରେ ପ୍ରବର୍ତି କରିବା",
      connect: "ଅନ୍ୟ କାମ କରିବା ପାଁସର୍ଦାର ବ୍ୟାଇମସିରେ କରିବା",
      learn: "ଉଦ୍ୟୋଗୀୟ ଗୁରିବା ସେସିନ ଏବଂ ପାନେଲ ଆଲୋଚନା ମାଧ୍ୟମ",
      opportunities: "ସହଯୋଗ, ନିବେଶ ଏବଂ ସହଯୋଗୀତା ଖୋଜାଇବା",
      empower: "ଚାଷୀଙ୍କୁ ଶକ୍ତିଶାଳୀ କରିବା",
      other: "ଅନ୍ୟ, କୃପାକରି ସ୍ପଷ୍ଟ କରନ୍ତୁ",
      otherPlaceholder: "କୃପାକରି କାରଣ ",
    },
    conferenceAttendanceTitle: "4. तपाईंले कुनै सम्मेलनमा भाग लिनुभएको छ?",
    conferenceAttendance: {
      yes: "हो",
      no: "होइन",
      detailsPlaceholder:
        "कृपया तपाईँले सहभागी भएको सम्मेलनहरूको विवरण दिनुहोस्",
    },
    challengesTitle:
      "5. तपाईँले FPO को व्यवस्थापन गर्दा सामना गर्ने तीन प्रमुख चुनौतीहरू के हुन्?",
    challengesPlaceholder: "कृपया चुनौतीहरू छनौट गर्नुहोस्",
    challengesOptions: {
      weakFinancials: "कमजोर आर्थिक स्थिति",
      lackProfessionalManagement: "व्यावसायिक व्यवस्थापनको अभाव",
      inadequateAccessToCredit: "क्रेडिटमा अपर्याप्त पहुँच",
      lackRiskMitigationMechanisms: "जोखिम न्यूनीकरणका उपायहरूको अभाव",
      inadequateAccessToMarket: "बजारमा अपर्याप्त पहुँच",
      inadequateAccessToInfrastructure: "अपर्याप्त आधारभूत संरचनामा पहुँच",
      lackTechnicalSkills: "प्राविधिक कौशलको अभाव",
      difficultiesInMarketingProduce: "उत्पादनहरूको विपणनमा कठिनाइहरू",
      poorCapitalizationAndFundingScope:
        "कमजोर पूँजीकरण र वित्त पोषणको सीमित दायरा",
      accessToFinanceInputsAndTechnology: "वित्तीय इनपुटहरू र प्रविधि प्राप्ति",
      increasedCompetitionFromExistingPrivateCompanies:
        "मौजूदा निजी कम्पनीहरूबाट बढ्दो प्रतिस्पर्धा",
      lackOfSelfSustainability: "आत्मनिर्भरताको अभाव",
      lackOfAdministrativeControls: "प्रशासनिक नियन्त्रणको अभाव",
      lackOfProfessionalExpertise: "व्यावसायिक विशेषज्ञताको अभाव",
      lowInvolvementOfTheMembers: "सदस्यहरूको कम सहभागिता",
      others: "अन्य",
    },
    supportNeededTitle:
      "6. तपाईँले यी चुनौतीहरूको सामना गर्न तपाईँको FPO लाई कुन प्रकारको समर्थन वा स्रोतहरू चाहिएको हो?",
    supportNeededPlaceholder: "आवश्यक समर्थनहरू छनौट गर्नुहोस्",
    supportNeededOptions: {
      Capacity: "क्षमता निर्माण",
      Access: "वित्तीय पहुँच",
      Market: "बजार संपर्क",
      Technical: "प्राविधिक सहायता",
      Others: "अन्य",
    },
    distributionChannelsTitle:
      "7. बजारको पहुँच र वितरण: उत्पादनहरू विपणन गर्न प्रयोग गरिएका वितरण च्यानलहरू छनौट गर्नुहोस्",
    distributionChannelsPlaceholder: "वितरण च्यानलहरू छनौट गर्नुहोस्",
    distributionChannelsMap: {
      localMarkets: "स्थानीय बजारहरू",
      superMarkets: "सुपरमार्केटहरू",
      exports: "निर्यात",
      exhibitions: "प्रदर्शनीहरू",
      directCustomers: "प्रत्यक्ष ग्राहकहरू",
      amazonFlipkart: "अमेज़न/फ्लिपकार्ट",
      ownWebsiteSelling: "आफ्नै वेबसाइटमार्फत बिक्री",
    },
    innovationsTitle:
      "8. नवाचार र पहलहरू: FPO द्वारा अपनाइएका नवीन अभ्यासहरू/विकास परियोजनाहरू",
    innovationsPlaceholder: "कृपया नवाचार र पहलकदमीहरूको वर्णन गर्नुहोस्",
    partnershipsTitle:
      "9. FPO ले सरकारी एजेन्सीहरू, NGOs वा अन्य साझेदारहरूसँग कुनै साझेदारी गरेको छ?",
    partnershipsPlaceholder: "कृपया साझेदारी वा सहयोगहरूको विवरण दिनुहोस्",
    successStoriesTitle:
      "10. FPO को कुनै पनि उल्लेखनीय सफलताहरू वा उपलब्धिहरूको वर्णन गर्नुहोस्",
    successStoriesPlaceholder: "कृपया सफलताहरू वा उपलब्धिहरूको वर्णन गर्नुहोस्",
    additionalInfoTitle:
      "11. तपाईंले महत्त्वपूर्ण ठानेका सम्मेलनको बारेमा कुनै पनि अतिरिक्त जानकारी वा टिप्पणीहरू प्रदान गर्नुहोस्",
    additionalInfoPlaceholder: "कृपया अतिरिक्त जानकारी वर्णन गर्नुहोस्",
    submitButton: "सबमिट गर्नुहोस्",
    error1: "ইমেইল ই-ডং পুড্ৰাখ্রে। ইয়াঞ্জু দিগ়পা ইমেইল মমাং থুঙ্গনি",
    error2: "তনবিরবীং হাং-ফোং। আরূ হীডাং লবিরগা চুঙনা",
    success: "খংজিপা, তনবিরবীং হাং-ফোং",
  },

  //malayalam
  ml: {
    formTitle: "FPO നാഷണൽ കോൺഫറൻസ് രജിസ്ട്രേഷൻ ഫോം",
    personalInformationTitle: "1. പങ്കെടുക്കുന്നയാളുടെ വ്യക്തിപരമായ വിവരങ്ങൾ",
    personalInformation: {
      fullName: "പൂർണ്ണ നാമം",
      position: "പദവി/പതിവിട്ടത്",
      experience: "FPO മാനേജ്മെന്റിൽ അനുഭവത്തിന്റെ വർഷങ്ങൾ",
    },
    fpoDetailsTitle: "2. FPO വിവരങ്ങൾ",
    fpoDetails: {
      fpoName: "FPO നാമം",
      tonnes: "ടണ്‍",
      fpoLocation: "FPO സ്ഥാനം നഗരത്തിലെ",
      state: "സംസ്ഥാനം",
      contactNumber: "സമ്പർക്ക നമ്പർ",
      emailAddress: "ഈമെയിൽ വിലാസം",
      activeFarmerMembers: "സജീവ കൃഷികാർ അംഗങ്ങളുടെ എണ്ണം",
      dateOfRegistration: "രജിസ്ട്രേഷൻ തീയതി",
      numVillagesCovered: "FPO യുടെ കീഴിൽ വരുന്ന ഗ്രാമങ്ങളുടെ എണ്ണം",
      numGramPanchayatBlocksCovered:
        "FPO യുടെ കീഴിലുള്ള ഗ്രാമപഞ്ചായത്തിൻ്റെ നമ്പറും ബ്ലോക്കുകളും",
      primaryProducts: "പ്രാഥമിക ഉൽപന്നങ്ങൾ/പടികൾ",
      operationalDuration: "പ്രവണതയുടെ കാലയളവിൽ (വർഷം മുതൽ)",
      annualProduction: "വാർഷിക ഉൽപാദനം (ടണ്‍)",
      annualRevenue: "വാർഷിക വരുമാനം (ആർത്ഥിക വർഷം 2023-24 ൽ INR)",
      percentageGrowthProduction: "കഴിഞ്ഞ വർഷങ്ങളിൽ ഉൽപാദനത്തിൽ വർധന ശതമാനം",
      percentageGrowthRevenue: "കഴിഞ്ഞ വർഷങ്ങളിൽ വരുമാനത്തിൽ വർദ്ധന ശതമാനം",
      registeredAs: "FPO രജിസ്ട്രേഡ് ആയി",
      otherRegisteredAs: "മറ്റുള്ളവ ആയി രജിസ്റ്റർ ചെയ്തു",
      facilitatingInstitutions: "സഹായിക്കുന്ന സ്ഥാപനങ്ങളുടെ പേരുകൾ",
      specify: "ദയവായി വ്യക്തമാക്കുക",
      society: "സമൂഹം",
      cooperative: "സഹകരണ സമിതി",
      trust: "ട്രസ്റ്റ്",
      company: "കമ്പനി",
      other: "മറ്റുള്ളവ",
    },
    participationReasonsTitle: "3. പങ്കെടുക്കുന്ന കാരണം",
    participationReasons: {
      insights: "കൃഷി മേഖലയിൽ പുതിയ ട്രെൻഡുകളും വികാസങ്ങളും മനസ്സിലാക്കുക",
      connect:
        "ഗ്രാമീണ വികസനത്തിന് പ്രവർത്തിക്കുന്ന സമാന മനസ്സുള്ള വ്യക്തികളും സംഘടനകളും ബന്ധപ്പെടുത്തുക",
      learn:
        "വ്യവസായ വിദഗ്ധരായും ചിന്തനക്കാരായും സംസാരിക്കുന്നതിനുള്ള ഇന്ററാക്ടീവ് സെഷനുകളും പാനൽ ചർച്ചകളും",
      opportunities:
        "FPO ഇക്കോസിസ്റ്റത്തിലുളള സഹകരണം, നിക്ഷേപം, പങ്കാളിത്തം എന്നിവയുടെ അവസരങ്ങൾ അന്വേഷിക്കുക",
      empower:
        "കർഷകരെ ശക്തമാക്കുന്നതിന് സംഭാവന നൽകുന്നതിന് സമൃദ്ധമായ കാർഷിക ഭാവിയെ സൃഷ്ടിക്കുക",
      other: "മറ്റുള്ളവ, ദയവായി വ്യക്തമാക്കുക",
      otherPlaceholder: "ദയവായി നിങ്ങളുടെ കാരണങ്ങൾ വ്യക്തമാക്കുക",
    },
    conferenceAttendanceTitle:
      "4. നേരത്തെയുണ്ടായിരുന്ന സമ്മേളനങ്ങളിൽ നിങ്ങൾ പങ്കെടുത്തിട്ടുണ്ടോ?",
    conferenceAttendance: {
      yes: "അതെ",
      no: "അല്ല",
      detailsPlaceholder: "വിവരങ്ങൾ വ്യക്തമാക്കുക",
    },
    challengesTitle:
      "5. FPO എൻറെ മാനേജ്മെന്റ് ചെയ്യുമ്പോൾ നിങ്ങൾക്ക് നേരിടേണ്ടി വരുന്ന മൂന്നു പ്രധാന വെല്ലുവിളികൾ എന്താണ്?",
    challengesPlaceholder: "വെല്ലുവിളികൾ തിരഞ്ഞെടുക്കുക",
    challengesOptions: {
      weakFinancials: "കുറഞ്ഞ സാമ്പത്തിക സ്ഥിതി",
      lackProfessionalManagement: "വ്യവസായിക മാനേജ്മെന്റ് പര്യാപ്തത",
      inadequateAccessToCredit: "ഋണത്തിൽ പര്യാപ്ത ലഭ്യത",
      lackRiskMitigationMechanisms: "ഉപകരണങ്ങളും ഉപയോഗങ്ങളും",
      inadequateAccessToMarket: "മാർക്കറ്റിൽ പര്യാപ്ത ലഭ്യത",
      inadequateAccessToInfrastructure: "സൗകര്യങ്ങൾക്ക് പര്യാപ്ത ലഭ്യത",

      lackTechnicalSkills: "തന്ത്രപരമായ കൌശലങ്ങളുടെ പര്യാപ്തത",
      difficultiesInMarketingProduce:
        "ഉത്പന്നം വിപണനത്തിൽ ബാധിക്കുന്ന പ്രശ്നങ്ങൾ",
      poorCapitalizationAndFundingScope: "നാഴികാ നിലയും ഫണ്ടിംഗ് വ്യാപ്തിയും",
      accessToFinanceInputsAndTechnology: "വിത്തങ്ങൾ, ഇൻപുട്ടുകൾ, ടെക്നോളജി",
      increasedCompetitionFromExistingPrivateCompanies:
        "വഴങ്ങി വരുന്ന സ്വകാര്യ സ്ഥാപനങ്ങളിൽ നിന്ന് കൂടുന്ന മത്സരം",
      lackOfSelfSustainability: "സ്വയം നിലനിറക്കുന്നതിലെ പരാജയം",
      lackOfAdministrativeControls: "പാലന നിയന്ത്രണങ്ങളുടെ പരാജയം",
      lackOfProfessionalExpertise: "വ്യവസായിക വിദഗ്ധതയുടെ പരാജയം",
      lowInvolvementOfTheMembers: "അംഗങ്ങളുടെ കുറവുള്ള പങ്കാളിത്തം",
      others: "മറ്റുള്ളവ",
    },
    supportNeededTitle:
      "6. ഈ വെല്ലുവിളികൾ മറികടക്കുന്നതിന് നിങ്ങളുടെ FPOയ്ക്ക് ത്രേഡിലുള്ള സഹായം അതോ നിർദ്ദേശങ്ങൾ എന്താണ്?",
    supportNeededPlaceholder: "പിന്തുണ തിരഞ്ഞെടുക്കുക",
    supportNeededOptions: {
      Capacity: "ശേഷി വർധന",
      Access: "വിത്തങ്ങൾക്ക് പടയ്ക്ക",
      Market: "മാർക്കറ്റ് ലിങ്കേജുകൾ",
      Technical: "തന്ത്രസഹായം",
      Others: "മറ്റുള്ളവ",
    },
    distributionChannelsTitle:
      "7. വിപണിയിൽ എത്തുകയും വിതരണവും: ഉത്പന്നങ്ങളെ വിപണനത്തിൻ്റെ ചാനലുകൾ തിരഞ്ഞെടുക്കുക",
    distributionChannelsPlaceholder: "വിതരണ ചാനലുകൾ തിരഞ്ഞെടുക്കുക",
    distributionChannelsMap: {
      localMarkets: "സ്ഥാനിക മാർക്കറ്റുകൾ",
      superMarkets: "സൂപ്പർ മാർക്കറ്റുകൾ",
      exports: "നിറയത്",
      exhibitions: "പ്രദർശനങ്ങൾ",
      directCustomers: "നേരിട്ടു ഉപഭോക്താക്കൾ",
      amazonFlipkart: "ആമസോൺ/ഫ്ലിപ്കാർട്ട്",
      ownWebsiteSelling: "സ്വന്തം വെബ്‌സൈറ്റ് വഴി വിൽപ്പന",
    },
    innovationsTitle:
      "8. നവോത്സാഹിത്യം & പദ്ധതികൾ: FPO അംഗീകരിച്ചിട്ടുള്ള നവാപകരങ്ങൾ/വികാസപരമായ പദ്ധതികൾ",
    innovationsPlaceholder: "കൃപയേനെ നവോത്സാഹിത്യം & പദ്ധതികൾ വിശദീകരിക്കുക",
    partnershipsTitle:
      "9. FPO ക്ക് ഉള്ള സർക്കാറിനോ, NGOs, അല്ലെങ്കിൽ മറ്റ് പങ്കാളികൾക്ക്",
    partnershipsPlaceholder:
      "കൃപയേനെ പങ്കാളികൾ അല്ലെങ്കിൽ സഹകരണങ്ങൾ വിശദീകരിക്കുക",
    successStoriesTitle:
      "10. FPO യുടെ സാധ്യസാധനങ്ങളിലെ വിജയകഥകൾ അല്ലെങ്കിൽ നേട്ടങ്ങൾ",
    successStoriesPlaceholder:
      "കൃപയേനെ വിജയകഥകൾ അല്ലെങ്കിൽ നേട്ടങ്ങൾ വിശദീകരിക്കുക",
    additionalInfoTitle:
      "11. കൂടിയ വിവരങ്ങൾ, അഭിപ്രായങ്ങൾ, കോൺഫറൻസ് ഏകീക്ഷണങ്ങൾ എന്നിവ നിർവചന",
    additionalInfoPlaceholder: "കൂടിയ വിവരങ്ങൾ നിർവചന",
    submitButton: "സമർപ്പിക്കുക",
    error1: "ഇമെയിൽ ഇതിനകം ഉണ്ട്. മറ്റു ഇമെയിൽ വിലാസം ഉപയോഗിക്കുക.",
    error2: "രജിസ്ട്രേഷൻ പരാജയം, വീണ്ടും ശ്രമിക്കുക",
    success: "അഭിനന്ദനങ്ങൾ, രജിസ്ട്രേഷൻ വിജയിച്ചിരിക്കുന്നു",
  },
  //punjabi

  pa: {
    formTitle: "FPO ਨੈਸ਼ਨਲ ਕਾਨਫਰੰਸ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਫਾਰਮ",
    personalInformationTitle: "1. ਭਾਗ ਲੈਣ ਵਾਲੇ ਵਿਅਕਤੀ ਦੇ ਬਾਰੇ ਵਿਅਕਤੀਗਤ ਜਾਣਕਾਰੀ",
    personalInformation: {
      fullName: "ਪੂਰਾ ਨਾਂ",
      position: "ਹੁੱਦੀ/ਉਦਾਹਰਣ",
      experience: "FPO ਪ੍ਰਬੰਧਨ ਵਿੱਚ ਤਜਰਬੇ ਦੇ ਸਾਲ",
    },
    fpoDetailsTitle: "2. FPO ਵੇਰਵੇ",
    fpoDetails: {
      fpoName: "FPO ਨਾਂ",
      tonnes: "ਟਨ",
      fpoLocation: "FPO ਸਥਾਨ ਸ਼ਹਿਰ",
      state: "ਰਾਜ",
      contactNumber: "ਸੰਪਰਕ ਨੰਬਰ",
      emailAddress: "ਈਮੇਲ ਪਤਾ",
      activeFarmerMembers: "ਸਰਗਰਮ ਕਿਸਾਨ ਸਦਸਾਂ ਦੀ ਗਿਣਤੀ",
      dateOfRegistration: "ਨੋਧ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਤਾਰੀਕ",
      numVillagesCovered: "FPO ਅਧੀਨ ਆਉਂਦੇ ਪਿੰਡਾਂ ਦੀ ਗਿਣਤੀ",
      numGramPanchayatBlocksCovered: "FPO ਅਧੀਨ ਗ੍ਰਾਮ ਪੰਚਾਇਤ ਦੀ ਗਿਣਤੀ ਅਤੇ ਬਲਾਕ",
      primaryProducts: "ਮੁੱਖ ਉਤਪਾਦ/ਫਸਲਾਂ",
      operationalDuration: "ਕਾਰੀਗਰਤਾ ਦੀ ਮਿਆਦ (ਸਾਲ ਤੱਕ)",
      annualProduction: "ਸਲਾਨਾ ਉਤਪਾਦਨ ਆਊਟਪੁਟ (ਟਨ)",
      annualRevenue: "ਸਲਾਨਾ ਆਮਦਨ (ਆਰਥਿਕ ਸਾਲ 2023-24 ਵਿੱਚ INR)",
      percentageGrowthProduction: "ਪਿਛਲੇ ਸਾਲਾਂ ਵਿੱਚ ਉਤਪਾਦਨ ਵਿੱਚ ਪ੍ਰਤਿਸ਼ਤ ਵਾਧਾ",
      percentageGrowthRevenue: "ਪਿਛਲੇ ਸਾਲਾਂ ਵਿੱਚ ਆਮਦਨ ਵਿੱਚ ਪ੍ਰਤਿਸ਼ਤ ਵਾਧਾ",
      registeredAs: "FPO ਰਜਿਸਟ੍ਰੀਡ ਦੇ ਤੌਰ 'ਤੇ",
      otherRegisteredAs: "ਹੋਰ ਕਿਸੇ ਤਰ੍ਹਾਂ ਰਜਿਸਟ੍ਰੀਡ",
      facilitatingInstitutions: "ਸਹਾਇਕ ਸੰਗਠਨਾਂ ਦੇ ਨਾਂ",
      specify: "ਕ੍ਰਿਪਾ ਕਰਕੇ ਨਾਂ ਸਪਸ਼ਟ ਕਰੋ",
      society: "ਸਮਾਜ",
      cooperative: "ਸਹਕਾਰੀ ਸੋਸਾਇਟੀ",
      trust: "ਟ੍ਰਸਟ",
      company: "ਕੰਪਨੀ",
      other: "ਹੋਰ",
    },
    participationReasonsTitle: "3. ਹਿੱਸਾ ਲੈਣ ਦੇ ਕਾਰਨ",
    participationReasons: {
      insights:
        "ਕ੍ਰਿਸ਼ੀ ਖੇਤਰ ਵਿੱਚ ਨਵੀਨ ਤਰਾਂ ਅਤੇ ਵਿਕਾਸਾਂ ਵਿੱਚ ਪੂਰੀ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰੋ",
      connect:
        "ਗ੍ਰਾਮੀਣ ਵਿਕਾਸ ਦੀ ਓਰ ਕੰਮ ਕਰਨ ਵਾਲੀਆਂ ਸਮਾਨ ਸੋਚ ਵਾਲੀਆਂ ਵਿਅਕਤੀਆਂ ਅਤੇ ਸੰਗਠਨਾਂ ਨਾਲ ਜੁੜੋ",
      learn:
        "ਇੰਟਰਐਕਟਿਵ ਸੈਸ਼ਨਾਂ ਅਤੇ ਪੈਨਲ ਚਰਚਾਵਾਂ ਰਾਹੀਂ ਉਦਯੋਗ ਦੇ ਮਾਹਰਾਂ ਅਤੇ ਵਿਚਾਰਵਾਨ ਨੇਤਾਵਾਂ ਤੋਂ ਸਿੱਖੋ",
      opportunities:
        "FPO ਪੈਰੀਵਾਰਤਨ ਵਿੱਚ ਸਹਿਯੋਗ, ਨਿਵੇਸ਼ ਅਤੇ ਭਾਗੀਦਾਰੀ ਦੇ ਮੌਕੇ ਖੋਜੋ",
      empower:
        "ਕਿਸਾਨਾਂ ਨੂੰ ਸਸ਼ਕਤ ਕਰਨ ਅਤੇ ਕ੍ਰਿਸ਼ੀ ਲਈ ਇੱਕ ਟਿਕਾਉ ਭਵਿੱਖ ਬਣਾਉਣ ਦੇ ਸੰਗਠਨ ਯੋਗਦਾਨ ਦਾ ਹਿੱਸਾ ਬਣੋ",
      other: "ਹੋਰ, ਕ੍ਰਿਪਾ ਕਰਕੇ ਸਪਸ਼ਟ ਕਰੋ",
      otherPlaceholder: "ਕ੍ਰਿਪਾ ਕਰਕੇ ਆਪਣਾ ਕਾਰਨ ਸਪਸ਼ਟ ਕਰੋ",
    },
    conferenceAttendanceTitle:
      "4. ਕੀ ਤੁਸੀਂ ਪਿਛਲੇ ਕੁਝ ਸੰਮੇਲਨਾਂ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਏ ਹੋ?",
    conferenceAttendance: {
      yes: "ਹਾਂ",
      no: "ਨਹੀਂ",
      detailsPlaceholder: "ਕ੍ਰਿਪਾ ਕਰਕੇ ਤਫਸੀਲਾਂ ਦਿਓ",
    },
    challengesTitle:
      "5. FPO ਦੇ ਪ੍ਰਬੰਧਨ ਵਿੱਚ ਤੁਹਾਡੇ ਸਾਹਮਣੇ ਆਉਂਦੀਆਂ ਤਿੰਨ ਮੁੱਖ ਚੁਣੌਤੀਆਂ ਕੀ ਹਨ?",
    challengesPlaceholder: "ਚੁਣੌਤੀਆਂ ਚੁਣੋ",
    challengesOptions: {
      weakFinancials: "ਕਮਜ਼ੋਰ ਵਿੱਤੀਆਲ",
      lackProfessionalManagement: "ਵਿਅਵਸਾਇਕ ਪ੍ਰਬੰਧਨ ਦੀ ਘਾਟ",
      inadequateAccessToCredit: "ਕ੍ਰੈਡਿਟ ਵਿੱਚ ਅਪਰਿਆਪਤ ਪਹੁੰਚ",
      lackRiskMitigationMechanisms: "ਜੋखिम ਘਟਾਉਣ ਵਾਲੇ ਢਾਂਚੇ ਦੀ ਘਾਟ",
      inadequateAccessToMarket: "ਬਾਜ਼ਾਰ ਵਿੱਚ ਅਪਰਿਆਪਤ ਪਹੁੰਚ",
      inadequateAccessToInfrastructure: "ਸੰਰਚਨਾ ਵਿੱਚ ਅਪਰਿਆਪਤ ਪਹੁੰਚ",
      lackTechnicalSkills: "ਤਕਨੀਕੀ ਨਿਪੁਨਤਾ ਦੀ ਘਾਟ",
      difficultiesInMarketingProduce: "ਉਤਪਾਦ ਦੇ ਮਾਰਕੀਟਿੰਗ ਵਿੱਚ ਮੁਸ਼ਕਿਲਾਂ",
      poorCapitalizationAndFundingScope: "ਘੱਟੇ ਪੂੰਜੀਭਰਨ ਅਤੇ ਫੰਡਿੰਗ ਦੀ ਵਿਆਪਕਤਾ",
      accessToFinanceInputsAndTechnology: "ਵਿੱਤ, ਇਨਪੁੱਟ ਅਤੇ ਤਕਨੀਕ ਵਿੱਚ ਪਹੁੰਚ",
      increasedCompetitionFromExistingPrivateCompanies:
        "ਮੌਜੂਦਾ ਨਿੱਜੀ ਕੰਪਨੀਆਂ ਦੇ ਨਾਲ ਵੱਧ ਰਹੀ ਮੁਕਾਬਲਤ",
      lackOfSelfSustainability: "ਆਪਣੇ ਆਪ ਕਬਜ਼ਿਆਂ ਦੀ ਘਾਟ",
      lackOfAdministrativeControls: "ਪ੍ਰਸ਼ਾਸਨਿਕ ਕੰਟਰੋਲ ਦੀ ਘਾਟ",
      lackOfProfessionalExpertise: "ਪ੍ਰੋਫੈਸ਼ਨਲ ਮਾਹਰ ਦੀ ਘਾਟ",
      lowInvolvementOfTheMembers: "ਸਦਸਿਆਂ ਦੀ ਘਟ ਜ਼ੁਝਿਆਰਤਾ",
      others: "ਹੋਰ",
    },
    supportNeededTitle:
      "6. ਕਿਸੇ ਵੀ ਚੁਣੌਤੀ ਨੂੰ ਮੁਕਾਬਲਾ ਕਰਨ ਲਈ ਤੁਹਾਡੇ FPO ਨੂੰ ਕਿਸ ਤਰ੍ਹਾਂ ਦੀ ਸਹਾਇਕਤਾ ਜਾਂ ਸਧਨਾਂ ਦੀ ਲੋੜ ਹੈ?",
    supportNeededPlaceholder: "ਸਧਨ ਚੁਣੋ",
    supportNeededOptions: {
      Capacity: "ਸ਼ਮਤਾ ਵਿਕਾਸ",
      Access: "ਵਿੱਤ ਲਈ ਪਹੁੰਚ",
      Market: "ਬਾਜ਼ਾਰ ਲਿੰਕੇਜ",
      Technical: "ਤਕਨੀਕੀ ਮਦਦ",
      Others: "ਹੋਰ",
    },
    distributionChannelsTitle:
      "7. ਮਾਰਕੀਟ ਪਹੁੰਚ ਅਤੇ ਵੰਡ: ਉਤਪਾਦਾਂ ਦੇ ਵਿਪਣਨ ਲਈ ਵਰਤੇ ਜਾਣ ਵਾਲੇ ਵੰਡ ਚੈਨਲਾਂ ਨੂੰ ਚੁਣੋ",
    distributionChannelsPlaceholder: "ਵੰਡ ਚੈਨਲਾਂ ਚੁਣੋ",
    distributionChannelsMap: {
      localMarkets: "ਸਥਾਨਕ ਬਾਜ਼ਾਰ",
      superMarkets: "ਸੁਪਰਮਾਰਕਿਟ",
      exports: "ਨਿਰਯਾਤ",
      exhibitions: "ਨਿਰਯਾਤ",
      directCustomers: "ਸੀਧੇ ਗਾਹਕ",
      amazonFlipkart: "ਐਮਾਜ਼ਾਨ/ਫਲਿਪਕਾਰਟ",
      ownWebsiteSelling: "ਆਪਣੀ ਵੈਬਸਾਈਟ ਤੋਂ ਵੇਚਣਾ",
    },
    innovationsTitle:
      "8. ਨਵੀਂ ਪਦਾਂਪ੍ਰਾਪਤੀ ਅਤੇ ਪ੍ਰਯੋਗ: FPO ਦੇ ਦੁਆਰਾ ਅਪਨਾਈ ਗਈ ਨਵੀਂ ਪ੍ਰਯੋਗਸ਼ੀਲ ਪਦਾਂਪ੍ਰਾਪਤੀ",
    innovationsPlaceholder: "ਨਵੀਂ ਪਦਾਂਪ੍ਰਾਪਤੀ ਅਤੇ ਪ੍ਰਯੋਗਸ਼ੀਲ ਦੀ وضاحت ਕਰੋ",
    partnershipsTitle:
      "9. FPO ਨੇ ਸਰਕਾਰੀ ਏਜੰਸੀ, NGO ਜਾਂ ਹੋਰ ਹਿੱਸੇਦਾਰਾਂ ਨਾਲ ਕੋਈ ਸਾਂਝ ਕਿਤੀ ਹੈ?",
    partnershipsPlaceholder: "ਸਾਂਝਕਾਰੀ ਜਾਂ ਸਹਿਯੋਗ ਦੀ وضاحت ਕਰੋ",
    successStoriesTitle:
      "10. FPO ਦੇ ਕੋਈ ਵੀ ਵਿਸ਼ੇਸ਼ ਸਫ਼ਲਤਾ ਕਹਾਣੀਆਂ ਜਾਂ ਪ੍ਰਾਪਤੀਆਂ ਦੀ وضاحت ਕਰੋ",
    successStoriesPlaceholder:
      "ਕ੍ਰਿਪਾ ਕਰਕੇ ਸਫ਼ਲਤਾ ਕਹਾਣੀਆਂ ਜਾਂ ਪ੍ਰਾਪਤੀਆਂ ਦੀ وضاحت ਕਰੋ",
    additionalInfoTitle:
      "11. ਕੁਛ ਹੋਰ ਜਾਣਕਾਰੀ ਜਾਂ ਟਿੱਪਣੀਆਂ ਜਾਂ ਸੰਮੇਲਨ ਵਿੱਚ ਤੁਹਾਡੀਆਂ ਉਮੀਦਾਂ ਨੂੰ ਸਪਸ਼ਟ ਕਰੋ",
    additionalInfoPlaceholder: "ਦੋਜੀ ਜਾਣਕਾਰੀ ਦੀ وضاحت ਕਰੋ",
    submitButton: "ਪੇਸ਼ ਕਰੋ",
    error1: "ਈਮੇਲ ਪਹਿਲਾਂ ਹੀ ਮੌਜੂਦ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਕੋਈ ਹੋਰ ਈਮੇਲ ਪਤਾ ਵਰਤੋ।",
    error2: "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਫੇਲ ਹੋ ਗਿਆ, ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ",
    success: "ਮੁਬਾਰਕباد, ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਕਾਮਯਾਬ ਰਿਹਾ",
  },
  //nepali
  ne: {
    formTitle: "FPO राष्ट्रिय सम्मेलन दर्ता फारम",
    personalInformationTitle: "1. सहभागीको बारेमा व्यक्तिगत जानकारी",
    personalInformation: {
      fullName: "पूरा नाम",
      position: "पद/पदस्थापन",
      experience: "FPO व्यवस्थापनमा अनुभवको वर्षहरू",
    },
    fpoDetailsTitle: "2. FPO विवरणहरू",
    fpoDetails: {
      fpoName: "FPO नाम",
      tonnes: "टन",
      fpoLocation: "FPO स्थान शहर",
      state: "राज्य",
      contactNumber: "सम्पर्क नम्बर",
      emailAddress: "ईमेल ठेगाना",
      activeFarmerMembers: "सक्रिय किसान सदस्यहरूको संख्या",
      dateOfRegistration: "दर्ता मिति",
      numVillagesCovered: "FPO अन्तर्गत समेटिएका गाउँहरूको सङ्ख्या",
      numGramPanchayatBlocksCovered:
        "FPO अन्तर्गत ग्राम पंचायतको संख्या र ब्लकहरू",
      primaryProducts: "प्राथमिक उत्पाद/बालीहरू",
      operationalDuration: "सञ्चालन अवधि (वर्षदेखि)",
      annualProduction: "वार्षिक उत्पादन उत्पादन (टन)",
      annualRevenue: "वार्षिक राजस्व (आर्थिक वर्ष 2023-24 मा INR)",
      percentageGrowthProduction: "पछिल्लो वर्षहरूमा उत्पादनमा वृद्धि प्रतिशत",
      percentageGrowthRevenue: "पछिल्लो वर्षहरूमा राजस्वमा वृद्धि प्रतिशत",
      registeredAs: "FPO दर्ता गरिएका रूपमा",
      otherRegisteredAs: "अन्य रूपमा दर्ता गरिएका",
      facilitatingInstitutions: "सुविधा प्रदान गर्ने संस्थाहरूको नाम",
      specify: "कृपया नाम निर्दिष्ट गर्नुहोस्",
      society: "समाज",
      cooperative: "सहकारी संस्था",
      trust: "ट्रस्ट",
      company: "कम्पनी",
      other: "अन्य",
    },
    participationReasonsTitle: "3. सहभागीको कारणहरू",
    participationReasons: {
      insights:
        "कृषि क्षेत्रमा नवीनतम प्रवृत्तिहरू र विकासहरूमा जानकारी लिनुहोस्",
      connect:
        "ग्रामीण विकासतर्फ काम गर्ने समान विचारधारा भएका व्यक्तिहरू र संस्थाहरूसँग जोडिनुहोस्",
      learn:
        "उद्योग विशेषज्ञहरू र विचारक नेताहरूबाट अन्तरक्रियात्मक सत्रहरू र प्यानल छलफलहरूको माध्यमबाट सिक्नुहोस्",
      opportunities:
        "FPO पारिस्थितिकतामा सहकार्य, लगानी, र साझेदारीका अवसरहरू पत्ता लगाउनुहोस्",
      empower:
        "किसानहरूलाई सशक्त पार्न र कृषि लागि स्थायी भविष्य निर्माण गर्न सामूहिक प्रयासको हिस्सा बन्नुहोस्",
      other: "अन्य, कृपया निर्दिष्ट गर्नुहोस्",
      otherPlaceholder: "कृपया आफ्नो कारण निर्दिष्ट गर्नुहोस्",
    },
    conferenceAttendanceTitle:
      "4. तपाईँले पहिल्यै कुनै सम्मेलनमा भाग लिनुभएको छ?",
    conferenceAttendance: {
      yes: "हो",
      no: "होइन",
      detailsPlaceholder: "कृपया विवरण उल्लेख गर्नुहोस्",
    },
    challengesTitle:
      "5. तपाईँले FPO हरूको व्यवस्थापन गर्दा सामना गर्ने तीन मुख्य चुनौतीहरू के हुन्?",
    challengesPlaceholder: "चुनौतीहरू छनौट गर्नुहोस्",
    challengesOptions: {
      weakFinancials: "कमजोर आर्थिक स्थिति",
      lackProfessionalManagement: "व्यावसायिक व्यवस्थापनको अभाव",
      inadequateAccessToCredit: "क्रेडिटमा अपर्याप्त पहुँच",
      lackRiskMitigationMechanisms: "जोखिम न्यूनीकरण मेकानिजमहरूको अभाव",
      inadequateAccessToMarket: "बजारमा अपर्याप्त पहुँच",
      inadequateAccessToInfrastructure: "अपर्याप्त पूर्वाधारमा पहुँच",
      lackTechnicalSkills: "प्राविधिक कौशलको अभाव",
      difficultiesInMarketingProduce: "उत्पादनको विपणनमा कठिनाइहरू",
      poorCapitalizationAndFundingScope: "कमजोर पूँजीकरण र वित्त पोषणको दायरा",
      accessToFinanceInputsAndTechnology: "वित्त, इनपुट्स, र प्रविधिमा पहुँच",
      increasedCompetitionFromExistingPrivateCompanies:
        "मौजूदा निजी कम्पनीहरूबाट बढ्दो प्रतिस्पर्धा",
      lackOfSelfSustainability: "स्वावलम्बनको अभाव",
      lackOfAdministrativeControls: "प्रशासनिक नियन्त्रणको अभाव",
      lackOfProfessionalExpertise: "व्यावसायिक विशेषज्ञताको अभाव",
      lowInvolvementOfTheMembers: "सदस्यहरूको कम सहभागिता",
      others: "अन्य",
    },
    supportNeededTitle:
      "6. यी चुनौतीहरूको सामना गर्न तपाईँको FPO लाई के किसिमको समर्थन वा स्रोतहरूको आवश्यकता छ?",
    supportNeededPlaceholder: "आवश्यक समर्थनहरू छनौट गर्नुहोस्",
    supportNeededOptions: {
      Capacity: "क्षमता निर्माण",
      Access: "वित्तीय पहुँच",
      Market: "बजार संपर्क",
      Technical: "प्राविधिक सहायता",
      Others: "अन्य",
    },
    distributionChannelsTitle:
      "7. बजार पहुँच र वितरण: उत्पादनहरूको विपणन गर्न प्रयोग गरिएका वितरण च्यानलहरू छनौट गर्नुहोस्",
    distributionChannelsPlaceholder: "वितरण च्यानलहरू छनौट गर्नुहोस्",
    distributionChannelsMap: {
      localMarkets: "स्थानीय बजारहरू",
      superMarkets: "सुपरमार्केटहरू",
      exports: "निर्यात",
      exhibitions: "प्रदर्शनीहरू",
      directCustomers: "प्रत्यक्ष ग्राहकहरू",
      amazonFlipkart: "अमेज़न/फ्लिपकार्ट",
      ownWebsiteSelling: "स्वतन्त्र वेबसाइट बिक्री",
    },
    innovationsTitle:
      "8. नवाचार र प्रयासहरू: FPO द्वारा अपनाइएका नवाचार/विकासात्मक परियोजनाहरू",
    innovationsPlaceholder: "कृपया नवाचार र प्रयासहरूको विवरण गर्नुहोस्",
    partnershipsTitle:
      "9. FPO को सरकारी एजेन्सीहरू, NGOs, वा अन्य साझेदारहरूसँग कुनै साझेदारीहरू छन्?",
    partnershipsPlaceholder: "कृपया साझेदारीहरू वा सहयोगहरूको विवरण गर्नुहोस्",
    successStoriesTitle:
      "10. FPO को कुनै पनि उल्लेखनीय सफलताहरू वा उपलब्धिहरूको विवरण गर्नुहोस्",
    successStoriesPlaceholder: "कृपया सफलताहरू वा उपलब्धिहरूको विवरण गर्नुहोस्",
    additionalInfoTitle:
      "11. तपाईँले महत्त्वपूर्ण ठान्नुभएको सम्मेलनको बारेमा कुनै पनि अतिरिक्त जानकारी वा टिप्पणीहरू प्रदान गर्नुहोस्",
    additionalInfoPlaceholder: "कृपया अतिरिक्त जानकारी वर्णन गर्नुहोस्",
    submitButton: "सबमिट गर्नुहोस्",
    error1: "इमेल पहिले नै छ। कृपया अर्को इमेल ठेगाना प्रयोग गर्नुहोस्।",
    error2: "पञ्जीकरण असफल भयो, फेरि प्रयास गर्नुहोस्",
    success: "धन्यवाद, पञ्जीकरण सफल भयो",
  },
};

const Fporegister: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getInitialLanguage = () => {
    const storedLanguage = localStorage.getItem("preferredLanguage");
    return storedLanguage ? storedLanguage : "en";
  };

  // Set initial state of currentLanguage
  const [currentLanguage, setCurrentLanguage] = useState(getInitialLanguage());

  // Destructure the translations object using the current language
  // Make sure to adjust the import path for `fpoTranslations` if needed
  const {
    formTitle,
    personalInformationTitle,
    personalInformation,
    fpoDetailsTitle,
    fpoDetails,
    participationReasonsTitle,
    participationReasons,
    conferenceAttendanceTitle,
    conferenceAttendance,
    challengesTitle,
    challengesPlaceholder,
    challengesOptions,
    supportNeededTitle,
    supportNeededPlaceholder,
    supportNeededOptions,
    distributionChannelsTitle,
    distributionChannelsPlaceholder,
    distributionChannelsMap,
    innovationsTitle,
    innovationsPlaceholder,
    partnershipsTitle,
    partnershipsPlaceholder,
    successStoriesTitle,
    successStoriesPlaceholder,
    additionalInfoTitle,
    additionalInfoPlaceholder,
    submitButton,
    error1,
    error2,
    success,
  } = fpoTranslations[currentLanguage];

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
    supportNeededOptions.Capacity,
    supportNeededOptions.Access,
    supportNeededOptions.Market,
    supportNeededOptions.Technical,
    supportNeededOptions.Others,
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
  const [registeredAs, setRegisteredAs] = useState("");
  const [dateOfRegistration, setDateOfRegistration] = useState("");
  const [facilitatingInstitutions, setFacilitatingInstitutions] = useState("");
  const [numVillagesCovered, setNumVillagesCovered] = useState("");
  const [numGramPanchayatBlocksCovered, setNumGramPanchayatBlocksCovered] =
    useState("");
  const [otherRegisteredAs, setOtherRegisteredAs] = useState("");
  const [otherFacilitatingInstitution, setOtherFacilitatingInstitution] =
    useState("");

  const handleRegisteredAsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisteredAs(event.target.value);
    if (event.target.value !== "5") {
      setOtherRegisteredAs(""); // Clear the other input if not "Other"
    }
  };

  const handleDateOfRegistrationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDateOfRegistration(event.target.value);
  };

  const handleFacilitatingInstitutionsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFacilitatingInstitutions(event.target.value);

    // Clear otherFacilitatingInstitution input if not POPI or CBBO
    if (event.target.value !== "1" && event.target.value !== "2") {
      setOtherFacilitatingInstitution("");
    }
  };
  const handleNumVillagesCoveredChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumVillagesCovered(event.target.value);
  };

  const handleNumGramPanchayatBlocksCoveredChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumGramPanchayatBlocksCovered(event.target.value);
  };

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

  const handleEmailAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newEmail = event.target.value;
    setEmailAddress(newEmail);

    // Call the checkEmailExists function if the email is not empty
    if (newEmail) {
      checkEmailExists(newEmail);
    }
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
    distributionChannelsMap.localMarkets,
    distributionChannelsMap.superMarkets,
    distributionChannelsMap.exports,
    distributionChannelsMap.exhibitions,
    distributionChannelsMap.directCustomers,
    distributionChannelsMap.amazonFlipkart,
    distributionChannelsMap.ownWebsiteSelling,
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
    challengesOptions.weakFinancials,
    challengesOptions.lackProfessionalManagement,
    challengesOptions.inadequateAccessToCredit,
    challengesOptions.lackRiskMitigationMechanisms,
    challengesOptions.inadequateAccessToMarket,
    challengesOptions.inadequateAccessToInfrastructure,
    challengesOptions.lackTechnicalSkills,
    challengesOptions.difficultiesInMarketingProduce,
    challengesOptions.poorCapitalizationAndFundingScope,
    challengesOptions.accessToFinanceInputsAndTechnology,
    challengesOptions.increasedCompetitionFromExistingPrivateCompanies,
    challengesOptions.lackOfSelfSustainability,
    challengesOptions.lackOfAdministrativeControls,
    challengesOptions.lackOfProfessionalExpertise,
    challengesOptions.lowInvolvementOfTheMembers,
    challengesOptions.others,
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

  const checkEmailExists = async (email: string) => {
    try {
      const lowercaseEmail = email.toLowerCase();
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/check-email`,
        { email: lowercaseEmail }
      );
      if (response.data.exists) {
        // Show error toast message
        toast.error(error1);

        setEmailAddress("");
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
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
        registeredAs: registeredAs,
        dateOfRegistration: dateOfRegistration,
        facilitatingInstitutions: facilitatingInstitutions,
        numVillagesCovered: numVillagesCovered,
        numGramPanchayatBlocksCovered: numGramPanchayatBlocksCovered,
        otherRegisteredAs,
        otherFacilitatingInstitution: otherFacilitatingInstitution,
        primaryProducts: primaryProducts,
        operationalDuration: "NOT NEEDED",
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
      toast.success(success, {
        position: toast.POSITION.TOP_RIGHT,
      });

      // Reload the current page
      window.location.reload();

      console.log(response.data);
    } catch (error) {
      toast.error(error2, {
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
          <div className=" p-2">
            <Translator />
          </div>
        </div>
        <Typography variant="h4" className="text-4xl font-extrabold p-5">
          {formTitle}
        </Typography>
      </div>
      <Container maxWidth="lg" className="bg-blue-gray-50 rounded-xl">
        <form>
          {/* Personal Information about the participant */}
          <Typography variant="h4" className="font-bold text-left text-xl p-5">
            {personalInformationTitle}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="fullName"
                label={personalInformation.fullName}
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
                label={personalInformation.position}
                variant="outlined"
                required
                onChange={handlePositionChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="experience"
                label={personalInformation.experience}
                variant="outlined"
                required
                onChange={handleExperienceChange}
                inputProps={{ min: 0 }}
                type="number"
              />
            </Grid>
          </Grid>
          <Typography variant="h4" className="font-bold text-left text-xl p-5">
            {fpoDetailsTitle}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="fpoName"
                label={fpoDetails.fpoName}
                variant="outlined"
                required
                onChange={handleFpoNameChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="fpoLocation"
                label={fpoDetails.fpoLocation}
                variant="outlined"
                required
                onChange={handleFpoLocationChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="state"
                label={fpoDetails.state}
                variant="outlined"
                required
                onChange={handleStateChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="contactNumber"
                label={fpoDetails.contactNumber}
                variant="outlined"
                required
                onChange={handleContactNumberChange}
                inputProps={{ min: 0 }}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+91</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="emailAddress"
                label={fpoDetails.emailAddress}
                variant="outlined"
                required
                onChange={handleEmailAddressChange}
                value={emailAddress}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="activeFarmerMembers"
                label={fpoDetails.activeFarmerMembers}
                variant="outlined"
                required
                onChange={handleActiveFarmerMembersChange}
                inputProps={{ min: 0 }}
                type="number"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="dateOfRegistration"
                label={fpoDetails.dateOfRegistration}
                type="date"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleDateOfRegistrationChange}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="numVillagesCovered"
                label={fpoDetails.numVillagesCovered}
                variant="outlined"
                onChange={handleNumVillagesCoveredChange}
                inputProps={{ min: 0 }}
                type="number"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="numGramPanchayatBlocksCovered"
                label={fpoDetails.numGramPanchayatBlocksCovered}
                variant="outlined"
                onChange={handleNumGramPanchayatBlocksCoveredChange}
                inputProps={{ min: 0 }}
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="primaryProducts"
                label={fpoDetails.primaryProducts}
                variant="outlined"
                required
                onChange={handlePrimaryProductsChange}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="annualProduction"
                label={fpoDetails.annualProduction}
                variant="outlined"
                onChange={handleAnnualProductionChange}
                inputProps={{ min: 0 }}
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {fpoDetails.tonnes}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="annualRevenue"
                label={fpoDetails.annualRevenue}
                variant="outlined"
                onChange={handleAnnualRevenueChange}
                inputProps={{ min: 0 }}
                type="number"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="percentageGrowthProduction"
                label={fpoDetails.percentageGrowthProduction}
                variant="outlined"
                onChange={handlePercentageGrowthProductionChange}
                inputProps={{ min: 0 }}
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="percentageGrowthRevenue"
                label={fpoDetails.percentageGrowthRevenue}
                variant="outlined"
                onChange={handlePercentageGrowthRevenueChange}
                inputProps={{ min: 0, type: "number" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  {fpoDetails.facilitatingInstitutions}
                </FormLabel>
                <RadioGroup
                  aria-label="facilitatingInstitutions"
                  name="facilitatingInstitutions"
                  value={facilitatingInstitutions}
                  onChange={handleFacilitatingInstitutionsChange}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="POPI"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="CBBO"
                  />
                </RadioGroup>
                {(facilitatingInstitutions === "1" ||
                  facilitatingInstitutions === "2") && (
                  <TextField
                    fullWidth
                    value={otherFacilitatingInstitution}
                    onChange={(event) =>
                      setOtherFacilitatingInstitution(event.target.value)
                    }
                    placeholder={fpoDetails.specify}
                  />
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  {fpoDetails.registeredAs}
                </FormLabel>
                <RadioGroup
                  aria-label="Registered As"
                  name="registeredAs"
                  value={registeredAs}
                  onChange={handleRegisteredAsChange}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label={fpoDetails.society}
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label={fpoDetails.cooperative}
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label={fpoDetails.trust}
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio />}
                    label={fpoDetails.company}
                  />
                  <FormControlLabel
                    value="5"
                    control={<Radio />}
                    label={fpoDetails.other}
                  />
                </RadioGroup>
                {registeredAs === "5" && (
                  <TextField
                    fullWidth
                    value={otherRegisteredAs}
                    onChange={(event) =>
                      setOtherRegisteredAs(event.target.value)
                    }
                    placeholder={fpoDetails.otherRegisteredAs}
                  />
                )}
              </FormControl>
            </Grid>
          </Grid>

          {/* Conference Participation Reasons */}
          <Typography variant="h4" className="font-bold text-left text-xl p-5">
            {participationReasonsTitle}
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
              label={participationReasons.insights}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={reasons.connect}
                  onChange={handleChange}
                  name="connect"
                />
              }
              label={participationReasons.connect}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={reasons.learn}
                  onChange={handleChange}
                  name="learn"
                />
              }
              label={participationReasons.learn}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={reasons.opportunities}
                  onChange={handleChange}
                  name="opportunities"
                />
              }
              label={participationReasons.opportunities}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={reasons.empower}
                  onChange={handleChange}
                  name="empower"
                />
              }
              label={participationReasons.empower}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={reasons.other}
                  onChange={handleChange}
                  name="other"
                />
              }
              label={participationReasons.other}
            />
            {reasons.other && (
              <TextField
                fullWidth
                value={otherReason}
                onChange={handleOtherChange}
                placeholder={participationReasons.otherPlaceholder}
              />
            )}
          </div>
          <Typography variant="h4" className="font-bold text-left text-xl p-5">
            {conferenceAttendanceTitle}
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
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label={conferenceAttendance.yes}
              />
              <FormControlLabel
                value="no"
                control={<Radio />}
                label={conferenceAttendance.no}
              />
            </RadioGroup>
          </FormControl>
          {conferenceAttended === "yes" && (
            <TextField
              fullWidth
              value={conferenceDetails}
              onChange={handleConferenceDetailsChange}
              placeholder={conferenceAttendance.detailsPlaceholder}
            />
          )}
          <Typography variant="h4" className="font-bold text-left text-xl p-5">
            {challengesTitle}
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
                label={challengesPlaceholder}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
              />
            )}
          />
          <Typography variant="h4" className="font-bold text-left text-xl p-5">
            {supportNeededTitle}
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
                  label={supportNeededPlaceholder}
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
              {distributionChannelsTitle}
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
                    label={distributionChannelsPlaceholder}
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
              {innovationsTitle}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={innovations}
              onChange={(event) => setInnovations(event.target.value)}
              placeholder={innovationsPlaceholder}
            />
          </div>
          <Typography variant="h4" className="font-bold text-left text-xl p-5">
            {partnershipsTitle}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={partnerships}
            onChange={(event) => setPartnerships(event.target.value)}
            placeholder={partnershipsPlaceholder}
          />
          <Typography variant="h4" className="font-bold text-left text-xl p-5">
            {successStoriesTitle}{" "}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={successStories}
            onChange={(event) => setSuccessStories(event.target.value)}
            placeholder={successStoriesPlaceholder}
          />
          <Typography variant="h4" className="font-bold text-left text-xl p-5">
            {additionalInfoTitle}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={additionalInfo}
            onChange={(event) => setAdditionalInfo(event.target.value)}
            placeholder={additionalInfoPlaceholder}
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
            {submitButton}
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Fporegister;
