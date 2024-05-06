import React, { useState, useEffect } from "react";

const Translator = () => {
  const languages = [
    { code: "en", name: "English" },
    { code: "as", name: "Assamese" },
    { code: "brx", name: "Bodo" },
    { code: "hi", name: "Hindi" },
    { code: "mai", name: "Maithili" },
    { code: "mr", name: "Marathi" },
    { code: "ks", name: "Khasi" },
    { code: "grt", name: "Garo" },
    { code: "ta", name: "Tamil" },
    { code: "bn", name: "Bengali" },
    { code: "gu", name: "Gujarati" },
    { code: "ny", name: "Nissi/Dafla" },
    { code: "adl", name: "Adi" },
    { code: "te", name: "Telugu" },
    { code: "or", name: "Odia" },
    { code: "kn", name: "Kannada" },
    { code: "kok", name: "Konkani" },
    { code: "mni", name: "Manipuri" },
    { code: "ml", name: "Malayalam" },
    { code: "pa", name: "Punjabi" },
    { code: "lus", name: "Lushai/Mizo" },
    { code: "ne", name: "Nepali" },
    { code: "kac", name: "Konyak" },
    { code: "aom", name: "Ao" },
    { code: "sey", name: "Sema" },
  ];

  // State to store the selected language
  const [language, setLanguage] = useState("");

  // Function to handle language change
  const handleLanguageChange = (event: { target: { value: any } }) => {
    console.log("translotir :", event.target.value);
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    // Save the selected language in local storage
    localStorage.setItem("preferredLanguage", selectedLanguage);
    console.log(localStorage.getItem("preferredLanguage"));
  };

  // Function to initialize the language based on local storage or region
  const initializeLanguage = () => {
    // Get the preferred language from local storage
    const storedLanguage = localStorage.getItem("preferredLanguage");
    if (storedLanguage) {
      // Use stored language if it exists
      setLanguage(storedLanguage);
    } else {
      // Otherwise, use the browser's language as default
      const defaultLanguage = navigator.language.slice(0, 2); // e.g. 'en', 'es', 'fr'
      setLanguage(defaultLanguage);
      // Save the default language in local storage
      localStorage.setItem("preferredLanguage", defaultLanguage);
    }
  };

  // Initialize the language when the component mounts
  useEffect(() => {
    initializeLanguage();
  }, []);

  return (
    <div>
      {/* Language selection dropdown */}
      <label htmlFor="language-select">Language: </label>
      <select
        id="language-select"
        value={language}
        onChange={handleLanguageChange}
      >
        {/* Render each language option */}
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Translator;
