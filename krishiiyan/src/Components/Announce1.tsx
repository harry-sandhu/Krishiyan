import { useEffect } from "react";
import img from "../assets/Images/FPOimg.png";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function Announce1() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();

  function handleclick() {
    navigate("/FPOnational");
  }

  function handleregisterclick() {
    navigate("/fporegister");
  }

  return (
    <>
      <section>
        <div className="flex items-start  justify-start mt-10 min-h-screen container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl shadow-lg">
              <div className="p-2 flex flex-col">
                <div className="rounded-xl overflow:hidden">
                  <img src={img} alt="loading..." />
                </div>
                <h5 className="text-2xl md:text-3xl font-medium bg-green-500 p-5 text-white">
                  FPO National Conference-2024
                </h5>
                <p className="text-justify bg-green-300 p-5">
                  {" "}
                  FPO conference organized by Sahakar Bharati in Patna: Welcome
                  to the FPO Conference in Patna by Sahakar Bharati About the
                  Conference: Join us for an enriching and empowering experience
                  at the Farmer Producer Organization (FPO) Conference organized
                  by Sahakar Bharati. This conference aims to bring together
                  farmers, stakeholders, experts, and policymakers to explore
                  innovative solutions, share best practices, and foster
                  collaboration in the agricultural sector.
                </p>
                <div className="flex justify-between">
                  <div className="">
                    <Button className="w-25 m-5" onClick={handleregisterclick}>
                      Click to Register
                    </Button>
                  </div>
                  <div className="">
                    <Button className="w-25 m-5" onClick={handleclick}>
                      Read more👉
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Announce1;
