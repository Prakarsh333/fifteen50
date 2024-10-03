import React, { useContext, useState } from "react";
import Loading from "../components/Loading"
import { useNavigate } from 'react-router-dom'; 
import { UserContext } from "../utils/UserContext";


function Login({passcode}) {
  const [username, setUsername] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [invalidCredential, setInvalidCredential] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {PostUser} = useContext(UserContext);

  const navigate = useNavigate();
 
  const handleUserNameChange = (event) => {
    // setInvalidCredential(false);
    setUsername(event.target.value);
    console.log(event.target.value); 
  };
  const handlePassCodeChange = (event) => {
    // setInvalidCredential(false);
    setInputCode(event.target.value);
    console.log(event.target.value); 
  };

  function handlenavigate(){
    navigate('leader');
  }

  function handlePostingUser(data){
    const user = {
      "username": username,
      "problemsolved": data.solvedProblem,
      "solvedEasy": data.easySolved,
      "solvedMedium": data.mediumSolved,
      "solvedHard": data.hardSolved,
      "problemsolved_latest": data.solvedProblem, 
      "solvedEasy_latest": data.easySolved, 
      "solvedMedium_latest": data.mediumSolved, 
      "solvedHard_latest": data.hardSolved
    }
    PostUser(user);
  }

  async function checkSolvedLeetCodeProblems(){
    console.log("inside number of problem solved");
    try{
      const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Success:', data);

      if(data.solvedProblem)handlePostingUser(data) // sending user data to Mongodb
      
      return data.solvedProblem ? true : false;
    }
    catch(error){
      console.error('Error checking username:', error);
      // Return false on any error, including network errors
      setError(true);
      return false;
    }
  }

  async function checkValidLeetCodeUsername(){
    console.log("inside username validation");
    try {
        const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Success:', data);

        handlePostingUser(data) // sending user data to Mongodb
        return data.username ? true : false;
      } 
      catch (error) {
        console.error('Error checking username:', error);
        // Return false on any error, including network errors
        return false;
      }
  }

  async function handleUserLogin() {
    // navigate('dashboard')
    console.log(passcode);
    try {
        setLoading(true);
        if(inputCode !== passcode){
            setInvalidCredential(true);
            console.log('Unsuccessful login attempt... check your credentials');
        }
        else{
            const validUser = await checkSolvedLeetCodeProblems();

            if (!validUser) {
                setInvalidCredential(true);
                console.log('Unsuccessful login attempt... check your credentials');
              } else {
                console.log("logged in successfully ...");

                // // Post user data to MongoDB
                // const userData = {
                //     username: username,
                //     loginTime: new Date()
                // };
          
                // try {
                //     const insertedId = await postDataToMongoDB(userData);
                //     console.log(`User data posted to MongoDB with ID: ${insertedId}`);
                // } catch (mongoError) {
                //     console.error('Error posting user data to MongoDB:', mongoError);
                //     // You may want to handle this error, e.g., show a warning to the user
                // }

                handlenavigate();
              }
              console.log("User is trying to log in: " + username + " " + inputCode);
        }
        setLoading(false);
      } 
    catch (error) { 
        console.error("Error during login:", error);
        setInvalidCredential(true);
    }

  }

  return (
    <div>
      <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div class="max-w-md mx-auto">
              <div>
                <h1 class="text-2xl font-semibold">Login </h1>
              </div>
              <div class="divide-y divide-gray-200">
                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div class="relative">
                    <input
                      autocomplete="off"
                      id="email"
                      name="email"
                      type="text"
                      class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                      value={username}
                      onChange={handleUserNameChange}
                    />
                    <label
                      for="email"
                      class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      LeetCode Username
                    </label>
                  </div>
                  <div class="relative">
                    <input
                      autocomplete="off"
                      id="password"
                      name="password"
                      type="password"
                      class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                      value={inputCode}
                      onChange={handlePassCodeChange}
                    />
                    <label
                      for="password"
                      class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      DD Secret Code
                    </label>
                  </div>
                  {(!error && invalidCredential)&& <div class="text-red-400">
                    invalid credentials !!!
                    </div>}

                  {(error)&& <div class="text-red-400"> 
                    {/* if server fail to respond, Please try after sometime !!! */}
                    Server not Responding, Please try after sometime !!! 
                  </div>}

                  {!loading && <div class="relative">
                    <button
                      class="bg-cyan-500 text-white rounded-md px-2 py-1 hover:shadow-lg"
                      onClick={handleUserLogin}
                    >
                      Submit
                    </button>
                  </div>}
                  {(loading) && <Loading />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
