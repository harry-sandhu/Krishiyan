import React, { useState, useEffect } from "react";

// Define an interface for the expected data structure
interface FpoRegistrationData {
  fullName: string;
  position: string;
  experience?: string; // '?' marks optional fields
  fpoName: string;
  fpoLocation: string;
  state: string;
  contactNumber: string;
  emailAddress: string;
  activeFarmerMembers: number;
  primaryProducts: string;
  operationalDuration: string;
  annualProduction?: number;
  annualRevenue?: number;
  percentageGrowthProduction?: number;
  percentageGrowthRevenue?: number;
  distributionChannels?: string[];
  selectedSupport?: string[];
  selectedChallenges?: string[];
  reasons: {
    insights: boolean;
    connect: boolean;
    learn: boolean;
    opportunities: boolean;
    empower: boolean;
    other: boolean;
  };
  otherReason?: string;
  conferenceAttended: string;
  conferenceDetails?: string;
  innovations?: string;
  partnerships?: string;
  successStories?: string;
  additionalInfo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Component definition
const ShowData: React.FC = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState<FpoRegistrationData[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  // Use environment variable or secure method for password
  const correctPassword = "WetAcre@2024";

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_BACKEND_URL}/show-data`
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       setData(data);
  //     } else {
  //       console.error("Failed to fetch data:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/show-data`);
      if (response.ok) {
        const data: FpoRegistrationData[] = await response.json();
        const csvContent = convertToCSV(data);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        setData(data);
        setDownloadUrl(url);
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  function convertToCSV(data: FpoRegistrationData[]): string {
    const replacer = (key: string, value: any) => value === null ? '' : value; // Adjust based on your needs
    const header = Object.keys(data[0]).join(',');

    let csv = `${header}\r\n`;

    data.forEach(row => {
      csv += Object.values(row).join(',') + '\r\n';
    });

    return csv;
  }

  return (
    <div className="container mx-auto p-4">
      {!isAuthenticated ? (
        <form onSubmit={handlePasswordSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </form>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">FPO Data:</h2>
          {downloadUrl && (
            <a href={downloadUrl} download className="bg-blue-500 text-white p-2 rounded mt-4">
              Download Data
            </a>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item, index) => (
              <div key={index} className="bg-white shadow-md p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{item.fpoName}</h3>
                <ul className="space-y-1">
                  {Object.entries(item).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {JSON.stringify(value)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
};

export default ShowData;