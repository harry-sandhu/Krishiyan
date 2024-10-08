const appFarmer = require("../models/appFarmer");
const CropCultivation = require("../models/appCropCultivation");
const CropData = require("../models/appInsightData");
// Register a new farmer
exports.registerFarmer = async (req, res) => {
  try {
    const {
      dealerNumber,
      name,
      whatsappNumber,
      totalOwnedFarm,
      geoLocationOwnedFarm,
      totalLeaseFarm,
      geoLocationLeaseFarm,
      pincode,
      village,
      district,
      state,
      address,
      typeOfCultivationPractice,
      bankName,
      accountName,
      accountNumber,
      ifscCode,
      pan,
      aadhaarNumber,
    } = req.body;

    const newFarmer = new appFarmer({
      dealerNumber,
      name,
      whatsappNumber,
      totalOwnedFarm,
      geoLocationOwnedFarm,
      totalLeaseFarm,
      geoLocationLeaseFarm,
      pincode,
      village,
      district,
      state,
      address,
      typeOfCultivationPractice,
      bankName,
      accountName,
      accountNumber,
      ifscCode,
      pan,
      aadhaarNumber,
    });

    await newFarmer.save();

    res.status(201).send({
      success: true,
      message: "Farmer registered successfully",
      data: { farmer: newFarmer },
    });
  } catch (error) {
    console.error("Error registering farmer:", error);
    res.status(400).send({
      success: false,
      message: "Error registering farmer",
      error: {
        code: "FARMER_REGISTRATION_ERROR",
        description: error.message,
      },
    });
  }
};

// Get all registered farmers
exports.getFarmers = async (req, res) => {
  try {
    const appfarmers = await appFarmer.find();
    res.status(200).send({
      success: true,
      message: "Farmers retrieved successfully",
      data: appfarmers,
    });
  } catch (error) {
    console.error("Error retrieving farmers:", error);
    res.status(400).send({
      success: false,
      message: "Error retrieving farmers",
      error: {
        code: "FARMERS_RETRIEVAL_ERROR",
        description: error.message,
      },
    });
  }
};

// Get farmers' names by dealer number
exports.getFarmerNamesByDealer = async (req, res) => {
  try {
    const { dealerNumber } = req.params;
    const farmers = await appFarmer.find({ dealerNumber }, "name");

    if (!farmers.length) {
      return res.status(404).send({
        success: false,
        message: "No farmers found for this dealer number",
        error: {
          code: "FARMERS_NOT_FOUND",
          description: "No farmers associated with this dealer number.",
        },
      });
    }

    res.status(200).send({
      success: true,
      message: "Farmers' names retrieved successfully",
      data: farmers,
    });
  } catch (error) {
    console.error("Error retrieving farmers' names:", error);
    res.status(400).send({
      success: false,
      message: "Error retrieving farmers' names",
      error: {
        code: "FARMER_NAMES_RETRIEVAL_ERROR",
        description: error.message,
      },
    });
  }
};

// Get all farmer data by dealer number
// Controller to get farmer data by dealer number and optional filters
exports.getFarmerDataByDealer = async (req, res) => {
  try {
    // Extract the query parameters
    const { dealerNumber } = req.params;
    const { village, typeOfCultivationPractice, whatsappNumber } = req.query;

    // Build the query object based on the provided parameters
    let query = { dealerNumber };

    if (village) {
      query.village = village;
    }

    if (typeOfCultivationPractice) {
      query.typeOfCultivationPractice = typeOfCultivationPractice;
    }

    if (whatsappNumber) {
      query.whatsappNumber = whatsappNumber;
    }

    // Find farmers based on the query object
    const farmers = await appFarmer.find(query);

    // Check if farmers were found
    if (!farmers.length) {
      return res.status(404).send({
        success: false,
        message: "No farmers found for the given criteria",
        error: {
          code: "FARMERS_NOT_FOUND",
          description: "No farmers match the specified criteria.",
        },
      });
    }

    // Respond with the found farmers' data
    res.status(200).send({
      success: true,
      message: "Farmers' data retrieved successfully",
      data: farmers,
    });
  } catch (error) {
    console.error("Error retrieving farmers' data:", error);

    // Respond with an error if there is an issue retrieving data
    res.status(500).send({
      success: false,
      message: "Error retrieving farmers' data",
      error: {
        code: "FARMER_DATA_RETRIEVAL_ERROR",
        description: error.message,
      },
    });
  }
};
// Register crop cultivation data
exports.registerCropCultivation = async (req, res) => {
  try {
    const {
      dealerNumber,
      fid,
      farmerName,
      crops, // This is now a single string
      variety,
      dateOfSowing,
      geolocation,
      typeOfCultivationPractice,
      areaInAcres,
      geoLinkAreaOnMap,
    } = req.body;

    const newCropCultivation = new CropCultivation({
      dealerNumber,
      fid,
      farmerName,
      crops,
      variety,
      dateOfSowing,
      geolocation,
      typeOfCultivationPractice,
      areaInAcres,
      geoLinkAreaOnMap,
    });

    await newCropCultivation.save();

    res.status(201).send({
      success: true,
      message: "Crop cultivation data registered successfully",
      data: { cropCultivation: newCropCultivation },
    });
  } catch (error) {
    console.error("Error registering crop cultivation data:", error);
    res.status(400).send({
      success: false,
      message: "Error registering crop cultivation data",
      error: {
        code: "CROP_CULTIVATION_REGISTRATION_ERROR",
        description: error.message,
      },
    });
  }
};

// Get all crop cultivation data
exports.getCropCultivations = async (req, res) => {
  try {
    const cropCultivations = await CropCultivation.find();
    res.status(200).send({
      success: true,
      message: "Crop cultivation data retrieved successfully",
      data: cropCultivations,
    });
  } catch (error) {
    console.error("Error retrieving crop cultivation data:", error);
    res.status(400).send({
      success: false,
      message: "Error retrieving crop cultivation data",
      error: {
        code: "CROP_CULTIVATION_RETRIEVAL_ERROR",
        description: error.message,
      },
    });
  }
};

// Get crop cultivation data by Fid
exports.getCropCultivationByFid = async (req, res) => {
  try {
    const { fid } = req.params;
    const cropCultivation = await CropCultivation.findOne({ fid });

    if (!cropCultivation) {
      return res.status(404).send({
        success: false,
        message: "No crop cultivation data found for this Fid",
        error: {
          code: "CROP_CULTIVATION_NOT_FOUND",
          description: "No crop cultivation data associated with this Fid.",
        },
      });
    }

    res.status(200).send({
      success: true,
      message: "Crop cultivation data retrieved successfully",
      data: cropCultivation,
    });
  } catch (error) {
    console.error("Error retrieving crop cultivation data by Fid:", error);
    res.status(400).send({
      success: false,
      message: "Error retrieving crop cultivation data by Fid",
      error: {
        code: "CROP_CULTIVATION_BY_FID_RETRIEVAL_ERROR",
        description: error.message,
      },
    });
  }
};

// Get all unique village names by dealer number
exports.getVillagesByDealer = async (req, res) => {
  try {
    const { dealerNumber } = req.params;
    const villages = await appFarmer.distinct("village", { dealerNumber });

    if (!villages.length) {
      return res.status(404).send({
        success: false,
        message: "No villages found for this dealer number",
        error: {
          code: "VILLAGES_NOT_FOUND",
          description: "No villages associated with this dealer number.",
        },
      });
    }

    res.status(200).send({
      success: true,
      message: "Villages retrieved successfully",
      data: villages,
    });
  } catch (error) {
    console.error("Error retrieving villages:", error);
    res.status(400).send({
      success: false,
      message: "Error retrieving villages",
      error: {
        code: "VILLAGES_RETRIEVAL_ERROR",
        description: error.message,
      },
    });
  }
};

// Get farmer data by dealer number and village name
exports.getFarmerDataByDealerAndVillage = async (req, res) => {
  try {
    const { dealerNumber, village } = req.params;
    const farmers = await appFarmer.find({ dealerNumber, village });

    if (!farmers.length) {
      return res.status(404).send({
        success: false,
        message: "No farmers found for this dealer number and village",
        error: {
          code: "FARMERS_NOT_FOUND",
          description:
            "No farmers associated with this dealer number and village.",
        },
      });
    }

    res.status(200).send({
      success: true,
      message: "Farmers' data retrieved successfully",
      data: farmers,
    });
  } catch (error) {
    console.error("Error retrieving farmers' data:", error);
    res.status(400).send({
      success: false,
      message: "Error retrieving farmers' data",
      error: {
        code: "FARMER_DATA_RETRIEVAL_ERROR",
        description: error.message,
      },
    });
  }
};

// Controller method to get all crops under a specific dealer number
exports.getCropsByDealerNumber = async (req, res) => {
  try {
    const { dealerNumber } = req.params;

    // Query the database for distinct crops under the given dealer number
    const crops = await CropCultivation.find({ dealerNumber }).distinct(
      "crops"
    );

    if (crops.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No crops found for the given dealer number",
      });
    }

    res.status(200).send({
      success: true,
      message: "Crops retrieved successfully",
      data: crops,
    });
  } catch (error) {
    console.error("Error retrieving crops:", error);
    res.status(500).send({
      success: false,
      message: "Error retrieving crops",
      error: {
        code: "CROP_RETRIEVAL_ERROR",
        description: error.message,
      },
    });
  }
};

// Controller method to get farmers based on dealer number, village, and crop
exports.getFarmersByCriteria = async (req, res) => {
  try {
    const { dealerNumber, village, crop, sort } = req.query;

    if (!dealerNumber) {
      return res.status(400).send({
        success: false,
        message: "Dealer number is required",
      });
    }

    // Step 1: Find farmers based on dealerNumber and optionally village
    const farmersQuery = { dealerNumber };
    if (village) {
      farmersQuery.village = village;
    }

    const farmers = await appFarmer.find(farmersQuery).exec();
    const farmerIds = farmers.map((farmer) => farmer._id.toString());

    if (farmerIds.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No farmers found for the given dealer number and village",
      });
    }

    // Step 2: Find crop cultivation data based on dealerNumber and crop
    const cropCultivations = await CropCultivation.find({
      dealerNumber,
      crops: crop,
    }).exec();

    const cropCultivationFids = cropCultivations.map((cultivation) =>
      cultivation.fid.toString()
    );

    if (cropCultivationFids.length === 0) {
      return res.status(404).send({
        success: false,
        message:
          "No crop cultivation data found for the given dealer number and crop",
      });
    }

    // Step 3: Intersect farmers based on _id and fid
    const intersectedFarmerIds = farmerIds.filter((id) =>
      cropCultivationFids.includes(id)
    );
    const intersectedFarmers = farmers.filter((farmer) =>
      intersectedFarmerIds.includes(farmer._id.toString())
    );

    if (intersectedFarmers.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No intersecting farmers found for the given criteria",
      });
    }

    // Step 4: Calculate expected yield and sort
    let totalAreaInAcres = 0;
    const farmerDetails = [];

    for (const farmer of intersectedFarmers) {
      const farmerCultivations = cropCultivations.filter(
        (cultivation) => cultivation.fid.toString() === farmer._id.toString()
      );

      let expectedYield = 0;

      for (const cultivation of farmerCultivations) {
        const cropData = await CropData.findOne({
          cropName: cultivation.crops,
        }).exec();

        if (cropData) {
          expectedYield += cultivation.areaInAcres * cropData.value;
        }
      }

      totalAreaInAcres += farmerCultivations.reduce(
        (total, cultivation) => total + cultivation.areaInAcres,
        0
      );

      farmerDetails.push({
        name: farmer.name,
        whatsappNumber: farmer.whatsappNumber,
        expectedYield,
      });
    }

    // Step 5: Sort the farmer details
    if (sort) {
      if (sort === "highToLow") {
        farmerDetails.sort((a, b) => b.expectedYield - a.expectedYield);
      } else if (sort === "lowToHigh") {
        farmerDetails.sort((a, b) => a.expectedYield - b.expectedYield);
      } else {
        return res.status(400).send({
          success: false,
          message: "Invalid sort parameter",
        });
      }
    } else {
      // Default sorting: low to high
      farmerDetails.sort((a, b) => a.expectedYield - b.expectedYield);
    }

    res.status(200).send({
      success: true,
      message: "Intersected farmers' data retrieved successfully",
      data: {
        farmers: farmerDetails,
        totalAreaInAcres,
        numberOfFarmers: intersectedFarmers.length,
      },
    });
  } catch (error) {
    console.error("Error retrieving farmers' data by criteria:", error);
    res.status(500).send({
      success: false,
      message: "Error retrieving farmers' data",
      error: {
        code: "FARMERS_DATA_RETRIEVAL_ERROR",
        description: error.message,
      },
    });
  }
};

exports.getFarmersByCultivationAndDealer = async (req, res) => {
  try {
    const { typeOfCultivationPractice, dealerNumber } = req.params;

    // Find farmers based on typeOfCultivationPractice and dealerNumber
    const farmers = await appFarmer
      .find({
        typeOfCultivationPractice,
        dealerNumber,
      })
      .exec();

    if (farmers.length === 0) {
      return res.status(404).send({
        success: false,
        message:
          "No farmers found for the given type of cultivation practice and dealer number",
      });
    }

    res.status(200).send({
      success: true,
      message: "Farmers' data retrieved successfully",
      data: farmers,
    });
  } catch (error) {
    console.error(
      "Error retrieving farmers' data by cultivation practice and dealer number:",
      error
    );
    res.status(500).send({
      success: false,
      message: "Error retrieving farmers' data",
      error: {
        code: "FARMERS_DATA_RETRIEVAL_ERROR",
        description: error.message,
      },
    });
  }
};

// Controller function to search farmers by dealer number and WhatsApp number
exports.searchFarmersByDealerAndWhatsApp = async (req, res) => {
  try {
    const { dealerNumber, whatsappNumber } = req.query;

    // Build the query object based on provided parameters
    const query = {};
    if (dealerNumber) {
      query.dealerNumber = dealerNumber;
    }
    if (whatsappNumber) {
      query.whatsappNumber = whatsappNumber;
    }

    // Perform the search in the appFarmer collection
    const farmers = await appFarmer.find(query);

    if (farmers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No farmers found for the given criteria",
      });
    }

    res.status(200).json({
      success: true,
      message: "Farmers retrieved successfully",
      data: farmers,
    });
  } catch (error) {
    console.error("Error searching farmers:", error);
    res.status(500).json({
      success: false,
      message: "Error searching farmers",
      error: {
        code: "FARMER_SEARCH_ERROR",
        description: error.message,
      },
    });
  }
};
