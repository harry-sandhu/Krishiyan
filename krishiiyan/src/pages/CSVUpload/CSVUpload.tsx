import React, { useState, CSSProperties } from "react";
// require('dotenv').config();
import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from "react-papaparse";
import { toast } from "react-toastify";

const GREY = "#CCC";
const GREY_LIGHT = "rgba(255, 255, 255, 0.4)";
const DEFAULT_REMOVE_HOVER_COLOR = "#A01919";
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);
const GREY_DIM = "#686868";

const styles = {
  zone: {
    alignItems: "center",
    border: `2px dashed ${GREY}`,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    padding: 20,
  } as CSSProperties,
  file: {
    background: "linear-gradient(to bottom, #EEE, #DDD)",
    borderRadius: 20,
    display: "flex",
    height: 120,
    width: 120,
    position: "relative",
    zIndex: 10,
    flexDirection: "column",
    justifyContent: "center",
  } as CSSProperties,
  info: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    paddingLeft: 10,
    paddingRight: 10,
  } as CSSProperties,
  size: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    marginBottom: "0.5em",
    justifyContent: "center",
    display: "flex",
  } as CSSProperties,
  name: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    fontSize: 12,
    marginBottom: "0.5em",
  } as CSSProperties,
  progressBar: {
    bottom: 14,
    position: "absolute",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  } as CSSProperties,
  zoneHover: {
    borderColor: GREY_DIM,
  } as CSSProperties,
  default: {
    borderColor: GREY,
  } as CSSProperties,
  remove: {
    height: 23,
    position: "absolute",
    right: 6,
    top: 6,
    width: 23,
  } as CSSProperties,
};

export default function CSVReader({ data, category }: any) {
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );
  const [csvData, setCSVData] = useState("");
  const [laoding, setLoading] = useState(false);

  const handleCSVDataChange = async (result: any) => {
    console.log(result);
    console.log(true);
    let apiRoute = "";
    if (data == "addcrop") {
      console.log("addcrop");
      apiRoute = "crop/role-admin/add";
      console.log(apiRoute);
    }
    if (data == "general") {
      console.log("general");
      apiRoute = "crop/role-admin/general/add";
    } else if (data == "addDetails") {
      console.log("add crop");
      apiRoute = "crop/role-admin/general/add";
    } else if (data == "variety") {
      console.log("variety");
      apiRoute = "crop/role-admin/variety/add";
    } else if (data == "irrigation") {
      console.log("irrigation");
      apiRoute = "crop/irrigation/role-admin/add";
    } else if (data == "pestManagment") {
      console.log("pestManagment");
      apiRoute = "crop/role-admin/pestManage/add";
    } else if (data == "presowing") {
      console.log("presowing");
      apiRoute = "crop/role-admin/preSowing";
    } else if (data == "nutrientManagement") {
      console.log("nutrientManagement");
      apiRoute = "crop/nutrient/role-admin/add";
    } else if (data == "harvest") {
      console.log("harvest");
      apiRoute = "crop/role-admin/harvest/add";
    } else if (data == "faq") {
      console.log("faq");
      apiRoute = "crop/role-admin/faq/add";
    } else if (data == "health") {
      console.log(data, category);
      if (category == "pest") {
        apiRoute = "/cropHealth/role-admin/pest";
      } else if (category == "disease") {
        apiRoute = "/cropHealth/role-admin/disease";
      } else {
        apiRoute = "/cropHealth/role-admin/weed";
      }
    } else if (data == "pestManage-disease") {
      apiRoute = "crop/protection/role-admin/disease/add";
    }
    try {
      const { window, ...resultWithoutWindow } = result; // Exclude the 'window' property
      console.log(csvData);
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/" + apiRoute,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("authToken"),
          },
          body: JSON.stringify({
            csv: csvData, // Use the modified object without the 'window' property
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.crop) {
        toast.success("Data added successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        console.log(data);
        toast.error(data.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CSVReader
      onUploadAccepted={(results: any) => {
        console.log("---------------------------");
        setCSVData(results);
        console.log("---------------------------");
        setZoneHover(false);
        console.log(csvData);
      }}
      onDragOver={(event: DragEvent) => {
        event.preventDefault();
        setZoneHover(true);
      }}
      onDragLeave={(event: DragEvent) => {
        event.preventDefault();
        setZoneHover(false);
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
        Remove,
      }: any) => (
        <>
          <div
            {...getRootProps()}
            style={Object.assign(
              {},
              styles.zone,
              zoneHover && styles.zoneHover
            )}
          >
            {acceptedFile ? (
              <>
                <div style={styles.file}>
                  <div style={styles.info}>
                    <span style={styles.size}>
                      {formatFileSize(acceptedFile.size)}
                    </span>
                    <span style={styles.name}>{acceptedFile.name}</span>
                  </div>
                  <div style={styles.progressBar}>
                    <ProgressBar />
                  </div>
                  <div
                    {...getRemoveFileProps()}
                    style={styles.remove}
                    onMouseOver={(event: Event) => {
                      event.preventDefault();
                      setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                    }}
                    onMouseOut={(event: Event) => {
                      event.preventDefault();
                      setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                    }}
                  >
                    <Remove color={removeHoverColor} />
                  </div>
                </div>
              </>
            ) : (
              "Drop CSV file here or click to upload"
            )}
          </div>
          {csvData && (
            <button
              onClick={handleCSVDataChange}
              className="bg-green-500 text-white p-2 rounded-md"
            >
              Add CSV Data
            </button>
          )}
        </>
      )}
    </CSVReader>
  );
}
