/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ReqFieldItem from "./ReqFieldItem";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useContext } from "react";
import { UserContext } from "../context/userContext";


const ProgressBar = ({ steps, request, setRequestUpdate}) => {

  const {user} = useContext(UserContext);

  const cancelRequest = async () => {
    const res = await axios.get(`/deny/${request['booking_id']}`, { headers: { "X-CSRFToken": user && user["X-CSRFToken"].csrftoken} });

    if(res.status === 200){
      enqueueSnackbar("Request Cancelled", { variant: "success" });
      setRequestUpdate((prev) => !prev);
    }else{
      enqueueSnackbar(res.data.message, { variant: "error" });
    }
  }

  return (
    <div className="flex flex-col gap-6  items-start justify-center max-sm:w-[100%] md:w-[80%] sm:max-md:w-[100%]  mx-auto bg-gray-100 rounded-2xl  py-8 px-4 " >
        <div className="mx-auto w-[80%] justify-between flex gap-4">
          <div className="flex gap-4 h-[60px]">
              <ReqFieldItem label={"Resource"} value={request["Resource"]} />
              <ReqFieldItem label={"Date"} value={request["Date"]}/>
              <ReqFieldItem label={"Timing"} value={request["Timing"]}/>
          </div>
          <button 
          className={"text-md my-auto transition-all duration-300 text-center hover:scale-105 font-semibold text-white   border border-white px-4 py-2 cursor-pointer rounded-xl " + ((request.index === (request.length-1)) ? " bg-green-600 " : " bg-red-500 ")}
            onClick={ ((request.index !== (request.length-1)) && cancelRequest )}
          >

          {((request.index !== (request.length-1)) ? " Cancel Request " : " Completed ")}

          </button>
        </div>
        <div className="w-full mx-auto border-t pt-8 mt-4" >
        <Box sx={{ width: "100%"}} >
          <Stepper activeStep={request.index + 1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel  >{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        </div>
      </div>
  );
};

export default ProgressBar;
