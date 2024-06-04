import React from "react";
import { extractCodeFromDriveLink } from "../../../handleImageCode";

const BasalStep = (props: any) => {
  console.log("props", props.cropDetails.disease_link);
  if (Object.keys(props.cropDetails).length === 0) {
    return <>Loading...</>;
  }

  return (
    <div
      className="mobile:absolute  mobile:flex-col mobile:flex mobile:gap-y-4  mobile:left-[5%] mobile:right-[5%]
    mobile:w-[90%] "
    >
      <div
        className="text-[#13490A] font-extrabold mt-4 mobile:w-[100%] "
        style={{
          display: "flex",
          textAlign: "left",
        }}
      >
        <div className="mobile:w-[100%]">
          <br />
          {props?.cropDetails?.date}
          <br />
          <br />
          <br />
          <div style={{ display: "Flex", justifyContent: "space-between" }}>
            <p>
              Name Of the Stage:
              <br />
              {props?.cropDetails?.name}
            </p>
            {props?.cropDetails?.images.map((img: any, index: any) => {
              return (
                <img
                  src={`https://drive.google.com/thumbnail?id=${extractCodeFromDriveLink(
                    img
                  )}&sz=w1000`}
                  //
                  style={{
                    marginTop: "20px",
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              );
            })}
          </div>

          {/* <p>
            Description:
            <br /> {props?.cropDetails?.cropStage[props.stage]?.Description}
          </p>
          <br /> */}
          {/* <p>NutrientContains: </p>
          <br /> */}
          <div
            className="text-[#13490A] font-extrabold mt-4 mobile:w-[100%]"
            style={{
              display: "flex",
              textAlign: "left",
            }}
          >
            {props.cropDetails.disease !== "0" && (
              <p>
                Disease Infection: <br />
                <ul>
                  {props?.cropDetails?.disease.map(
                    (disease: any, i: number) => {
                      return <li>{disease}</li>;
                    }
                  )}
                </ul>
                {props.cropDetails.disease_link !== "0" && (
                  <img
                    src={`https://drive.google.com/thumbnail?id=${extractCodeFromDriveLink(
                      props?.cropDetails?.disease_link
                    )}&sz=w1000`}
                    //https://lh3.googleusercontent.com/d/1XENFETTsb9kKx3tBmioU9T1YtKuTiNGg=w1000?authuser=0
                    //https://drive.google.com/thumbnail?id=1XENFETTsb9kKx3tBmioU9T1YtKuTiNGgsz=w1000
                    //<img src="https://drive.google.com/thumbnail?id=1XENFETTsb9kKx3tBmioU9T1YtKuTiNGgsz=w1000" style="margin-top: 20px; width: 200px; height: 200px; object-fit: cover;">
                    //src={`https://drive.google.com/thumbnail?id=${extractCodeFromDriveLink(
                    // image
                    // )}&sz=w1000`}
                    style={{
                      marginTop: "20px",
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </p>
            )}
            {/* <img
              style={{ width: "200px", height: "200px", marginRight: "20px" }}
              src={
                props?.cropDetails?.cropStage[props.stage]?.Disease_Infection
                  ?.image
              }
            /> */}
          </div>

          <br />
          <div
            className="text-[#13490A] font-extrabold mt-4 mobile:w-[100%]"
            style={{
              display: "flex",
              textAlign: "left",
            }}
          ></div>
          {props.cropDetails.pest !== "0" && (
            <p>
              Pest Infestation: <br />
              {props?.cropDetails?.pest}
            </p>
          )}
          {props.cropDetails.pest_link !== "0" && (
            <img
              src={`https://drive.google.com/thumbnail?id=${extractCodeFromDriveLink(
                props?.cropDetails?.pest_link
              )}&sz=w1000`}
              style={{
                marginTop: "20px",
                width: "200px",
                height: "200px",
                objectFit: "cover",
              }}
            />
          )}
          <br />
          <p>
            Fertilizer: <br />
            {props?.cropDetails?.Fertilizer.Dosage}
          </p>
          {props?.cropDetails?.Fertilizer.images.map((img: any, index: any) => {
            return (
              <img
                src={`https://drive.google.com/thumbnail?id=${extractCodeFromDriveLink(
                  img
                )}&sz=w1000`}
                style={{
                  marginTop: "20px",
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
            );
          })}

          <br />
          <p>
            Weed: <br />
            <ul>
              {props?.cropDetails?.weed.map((disease: any, i: number) => {
                return <li>{disease}</li>;
              })}
            </ul>
            {props.cropDetails.weed_link !== "0" && (
              <img
                src={`https://drive.google.com/thumbnail?id=${extractCodeFromDriveLink(
                  props?.cropDetails?.weed_link
                )}&sz=w1000`}
                style={{
                  marginTop: "20px",
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
            )}
          </p>
          <br />
          <p>
            Intercultutal operations: <br />
            {props?.cropDetails?.interculturalOperation}
          </p>
          {/*
          <p>
            Weed Mangement: <br />
            {props?.cropDetails?.weed.map((eachWeed : any, index:number) => {
              return (
                <div>{eachWeed}</div>
              )
            })
            }
          </p>
          <br />
          <p>
            DiseaseManagement:{" "}
            {props?.cropDetails?.cultivationStage?.basal?.diseaseManagement}
          </p>
          <p>
            InterculturalOperation:{" "}
            {
              props?.cropDetails?.interculturalOperation
            }
          </p> */}
          <br />
        </div>
      </div>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "start",
          flexDirection: "row",
        }}
      >
        <figure>
          <img
            src="/images/nirogen_deficiency.png"
            style={{ width: "250px", height: "190px", marginLeft: "40px" }}
          />
          <figcaption>Nitrogen Deficiency</figcaption>
        </figure>
        <figure>
          <img
            src="/images/phosporus_deficiency.png"
            style={{ width: "250px", height: "190px", marginLeft: "25px" }}
          />
          <figcaption>Phosphorus Deficiency</figcaption>
        </figure>

        <figure>
          <img
            src="/images/pottasium.png"
            style={{ width: "250px", height: "190px", marginLeft: "25px" }}
          />
          <figcaption>Potassium Deficiency</figcaption>
        </figure>

        <figure>
          <img
            src="/images/zinc.png"
            style={{ width: "250px", height: "190px", marginLeft: "25px" }}
          />
          <figcaption>Zinc Deficiency</figcaption>
        </figure>
      </div> */}
    </div>
  );
};

export default BasalStep;
