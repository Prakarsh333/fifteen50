import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../utils/UserContext";
import { useNavigate } from "react-router-dom";
import { RefreshIcon } from '@heroicons/react/outline';

function Navbar({title}) {

   const {data, RefreshData} = useContext(UserContext);
   const navigate = useNavigate();
   const [time, setTime] = useState(10); // Initialize time state with 10 seconds
  const [isRunning, setIsRunning] = useState(false); // Flag to track if timer is running

  function toggleisRunning(){
    setIsRunning(!isRunning);
  }

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => {
          if (prevTime === 1) {
            // Reset to 10 seconds when reaching 0
            setIsRunning(false);
            return 10;
          }
          return prevTime - 1; // Decrease time by 1 second
        });
      }, 1000); // Update every second

      return () => clearInterval(intervalId); // Cleanup interval on unmount or when timer stops
    }
  }, [isRunning]);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true); // Start timer by setting flag to true
    }
  };

   function handleNavigatetoLogin(){
    navigate('/');
   }

   function handleNavigetetoOverallLeaderboard(){
    navigate('/leader');
   }

   function handleNavigetetofifteen(){
    navigate('/dashboard');
   }

  return (
    <div className="w-full h-16 border-b border-black flex justify-between px-20 items-center">
        <div>
            <h1 className=" text-transparent sm:text-3xl xl:text-4xl bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-transparent h-full">
              {title}
            </h1>
        </div>          
        <div className="flex">
        {/* <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 rounded-full" onClick={GetUsers}>Refresh</button> */}
        <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:border-2 hover:border-cyan-500" onClick={handleNavigatetoLogin}>Register Here</button>
        <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:border-2 hover:border-cyan-500" onClick={handleNavigetetoOverallLeaderboard}>OVERALL LEADERBOARD</button>
        <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleNavigetetofifteen}>15 Days 50 Question</button>
        <button type="button" class={`text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:border-2 hover:border-cyan-500`} onClick={RefreshData}>
           <RefreshIcon className="w-6 h-6 text-gray-800 dark:text-white" />
           {/* {(isRunning) && <div>{time} {isRunning ? '.' : '..'}</div>}
           {(!isRunning) && <RefreshIcon className="w-6 h-6 text-gray-800 dark:text-white" onClick={startTimer()}/>} */}
        </button>
        {}


        </div>

      
    </div>
  );
}

export default Navbar;
