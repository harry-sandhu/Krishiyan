import React, { useState } from "react";

interface CropData {
  crop: string;
  [key: string]: number | string; // Add index signature
}

function Ferticalnew(): JSX.Element {
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  const [formData, setFormData] = useState<{ [key: string]: number }>({
    nitrogen: 0,
    phosphorous: 0,
    potassium: 0,
    pH: 0,
    rainfall: 0,
    temperature: 0,
    humidity: 0,
  });
  const [factorResults, setFactorResults] = useState<{
    [key: string]: string;
  } | null>(null);

  const cropsData: CropData[] = [
    {
      crop: "apple",
      nitrogen: 20.8,
      phosphorous: 134.22,
      potassium: 199.89,
      temperature: 22.630942,
      humidity: 92.333383,
      pH: 5.929663,
      rainfall: 112.654779,
    },
    {
      crop: "banana",
      nitrogen: 100.23,
      phosphorous: 82.01,
      potassium: 50.05,
      temperature: 27.376798,
      humidity: 80.358123,
      pH: 5.983893,
      rainfall: 104.62698,
    },
    {
      crop: "blackgram",
      nitrogen: 40.02,
      phosphorous: 67.47,
      potassium: 19.24,
      temperature: 29.97334,
      humidity: 65.118426,
      pH: 7.133952,
      rainfall: 67.884151,
    },
    {
      crop: "chickpea",
      nitrogen: 40.09,
      phosphorous: 67.79,
      potassium: 79.92,
      temperature: 18.872847,
      humidity: 16.860439,
      pH: 7.336957,
      rainfall: 80.058977,
    },
    {
      crop: "coconut",
      nitrogen: 21.98,
      phosphorous: 16.93,
      potassium: 30.59,
      temperature: 27.409892,
      humidity: 94.844272,
      pH: 5.976562,
      rainfall: 175.686646,
    },
    {
      crop: "coffee",
      nitrogen: 101.2,
      phosphorous: 28.74,
      potassium: 29.94,
      temperature: 25.540477,
      humidity: 58.869846,
      pH: 6.790308,
      rainfall: 158.066295,
    },
    {
      crop: "cotton",
      nitrogen: 117.77,
      phosphorous: 46.24,
      potassium: 19.56,
      temperature: 23.988958,
      humidity: 79.843474,
      pH: 6.912675,
      rainfall: 80.398043,
    },
    {
      crop: "grapes",
      nitrogen: 23.18,
      phosphorous: 132.53,
      potassium: 200.11,
      temperature: 23.849575,
      humidity: 81.875228,
      pH: 6.025937,
      rainfall: 69.611829,
    },
    {
      crop: "jute",
      nitrogen: 78.4,
      phosphorous: 46.86,
      potassium: 39.99,
      temperature: 24.958376,
      humidity: 79.639864,
      pH: 6.732778,
      rainfall: 174.792798,
    },
    {
      crop: "kidneybeans",
      nitrogen: 20.75,
      phosphorous: 67.54,
      potassium: 20.05,
      temperature: 20.115085,
      humidity: 21.605357,
      pH: 5.749411,
      rainfall: 105.919778,
    },
    {
      crop: "lentil",
      nitrogen: 18.77,
      phosphorous: 68.36,
      potassium: 19.41,
      temperature: 24.509052,
      humidity: 64.804785,
      pH: 6.927932,
      rainfall: 45.680454,
    },
    {
      crop: "maize",
      nitrogen: 77.76,
      phosphorous: 48.44,
      potassium: 19.79,
      temperature: 22.389204,
      humidity: 65.092249,
      pH: 6.24519,
      rainfall: 84.766988,
    },
    {
      crop: "mango",
      nitrogen: 20.07,
      phosphorous: 27.18,
      potassium: 29.92,
      temperature: 31.20877,
      humidity: 50.156573,
      pH: 5.766373,
      rainfall: 94.704515,
    },
    {
      crop: "mothbeans",
      nitrogen: 21.44,
      phosphorous: 48.01,
      potassium: 20.23,
      temperature: 28.19492,
      humidity: 53.160418,
      pH: 6.831174,
      rainfall: 51.198487,
    },
    {
      crop: "mungbean",
      nitrogen: 20.99,
      phosphorous: 47.28,
      potassium: 19.87,
      temperature: 28.525775,
      humidity: 85.499975,
      pH: 6.723957,
      rainfall: 48.403601,
    },
    {
      crop: "muskmelon",
      nitrogen: 100.32,
      phosphorous: 17.72,
      potassium: 50.08,
      temperature: 28.663066,
      humidity: 92.342802,
      pH: 6.358805,
      rainfall: 24.689952,
    },
    {
      crop: "orange",
      nitrogen: 19.58,
      phosphorous: 16.55,
      potassium: 10.01,
      temperature: 22.765725,
      humidity: 92.170209,
      pH: 7.016957,
      rainfall: 110.474969,
    },
    {
      crop: "papaya",
      nitrogen: 49.88,
      phosphorous: 59.05,
      potassium: 50.04,
      temperature: 33.723859,
      humidity: 92.403388,
      pH: 6.741442,
      rainfall: 142.627839,
    },
    {
      crop: "pigeonpeas",
      nitrogen: 20.73,
      phosphorous: 67.73,
      potassium: 20.29,
      temperature: 27.741762,
      humidity: 48.061633,
      pH: 5.794175,
      rainfall: 149.457564,
    },
    {
      crop: "pomegranate",
      nitrogen: 18.87,
      phosphorous: 18.75,
      potassium: 40.21,
      temperature: 21.837842,
      humidity: 90.125504,
      pH: 6.429172,
      rainfall: 107.528442,
    },
    {
      crop: "rice",
      nitrogen: 79.89,
      phosphorous: 47.58,
      potassium: 39.87,
      temperature: 23.689332,
      humidity: 82.272822,
      pH: 6.425471,
      rainfall: 236.181114,
    },
    {
      crop: "watermelon",
      nitrogen: 99.42,
      phosphorous: 17.0,
      potassium: 50.22,
      temperature: 25.591767,
      humidity: 85.160375,
      pH: 6.495778,
      rainfall: 50.786219,
    },
  ];

  const handleCropChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedCrop(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseFloat(value) });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Call a function to check the factors
    checkFactors();
  };

  const checkFactors = (): void => {
    // Retrieve the requirements for the selected crop
    const cropRequirements = getCropRequirements(selectedCrop);

    // Calculate the differences between the provided values and the crop requirements for each factor
    const factorDifferences: { [key: string]: number } = {};
    for (const factor in cropRequirements) {
      factorDifferences[factor] =
        formData[factor] - Number(cropRequirements[factor]);
    }

    // Determine which factors are deficient, surplus, or adequate
    const factorResults: { [key: string]: string } = {};
    for (const factor in factorDifferences) {
      if (factorDifferences[factor] > 0) {
        factorResults[factor] = `Surplus: +${factorDifferences[factor]}`;
      } else if (factorDifferences[factor] < 0) {
        factorResults[factor] = `Deficient: ${factorDifferences[factor]}`;
      } else {
        factorResults[factor] = "Adequate";
      }
    }

    // Update state to display results
    setFactorResults(factorResults);
  };

  const getCropRequirements = (crop: string): CropData => {
    // Find the crop in the dataset
    const selectedCropData = cropsData.find((item) => item.crop === crop);
    if (selectedCropData) {
      // Return the requirements for the selected crop
      return selectedCropData;
    } else {
      // If the crop is not found, return empty requirements
      return {
        crop: "",
        nitrogen: 0,
        phosphorous: 0,
        potassium: 0,
        pH: 0,
        rainfall: 0,
        temperature: 0,
        humidity: 0,
      };
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Crop Factor Checker</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="crop">
            Select Crop:
          </label>
          <select
            id="crop"
            name="crop"
            className="border border-gray-300 rounded p-2"
            value={selectedCrop}
            onChange={handleCropChange}
          >
            <option value="">Select a Crop</option>
            {cropsData.map((cropData, index) => (
              <option key={index} value={cropData.crop}>
                {cropData.crop}
              </option>
            ))}
          </select>
        </div>
        {selectedCrop && (
          <>
            {Object.keys(formData).map((factor, index) => (
              <div key={index} className="mb-4">
                <label className="block mb-2" htmlFor={factor}>
                  {factor.toUpperCase()}:
                </label>
                <input
                  id={factor}
                  name={factor}
                  type="number"
                  className="border border-gray-300 rounded p-2"
                  value={formData[factor]}
                  onChange={handleInputChange}
                />
              </div>
            ))}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Check Factors
            </button>
          </>
        )}
      </form>
      {factorResults && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Factor Results:</h2>
          <ul>
            {Object.keys(factorResults).map((factor, index) => (
              <li key={index}>
                {factor.toUpperCase()}: {factorResults[factor]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Ferticalnew;
