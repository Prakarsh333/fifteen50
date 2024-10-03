import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

// Create a provider component
const UserProvider = ({ children }) => {
  const [data, setData] = useState(null);

  function GetUsers() {
    axios
      .get(`http://localhost:5000/users`)
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error:", error));
  }

  function PostUser(user) {
    axios
      .post(`http://localhost:5000/user`, user)
      .then((response) => {
        // Optionally, you can update the local state with the new user
        setData((prevData) => [...prevData, response.data]);
      })
      .catch((error) => console.error("Error:", error));
  }

  const sortDataDescending = (data) => {
    const sortedData = [...data].sort(
      (a, b) => b.problemsolved_latest - a.problemsolved_latest
    );
    setData(sortedData); // Update the state with the sorted data
  };

  async function handleUpdatingUserData(data, user) {
    console.log("data:", JSON.stringify(data, null, 2));
    console.log("user:", JSON.stringify(user, null, 2));

    const updatedUserData = {
        _id: user._id,
        username: user.username,
        problemsolved: user.problemsolved,
        solvedEasy: user.solvedEasy,
        solvedMedium: user.solvedMedium,
        solvedHard: user.solvedHard,
        problemsolved_latest: data.solvedProblem,
        solvedEasy_latest: data.easySolved,
        solvedMedium_latest: data.mediumSolved,
        solvedHard_latest: data.hardSolved,
    };

    try {
        const response = await axios.put(`http://localhost:5000/updateuser`, updatedUserData);
        
        // Optionally, you can update the local state with the new user
        setData((prevData) => 
            prevData.map((item) => 
                item._id === user._id ? { ...item, ...updatedUserData } : item
            )
        );

        console.log('User updated successfully:', response.data);
    } catch (error) {
        console.error("Error:", error);
    }
  }

  async function currentUserInfo(user) {
    console.log("inside fetching current solved problems");
    try {
      const response = await fetch(
        `https://alfa-leetcode-api.onrender.com/${user.username}/solved`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const received_data = await response.json();
      console.log("Success:", data);

      await handleUpdatingUserData(received_data, user); // sending user data to Mongodb
    } catch (error) {
      console.error("Error checking username:", error);
      // Return false on any error, including network errors
    }
  }

  async function RefreshData() {
    console.log("inside Refresh data ...")
    console.log("Data before sorting:", data);
    if (!data) return; // Add this check to ensure data is not null

    // for(var i = 0; i < 1; i++){
    //     await currentUserInfo(data[i]);
    // }

    await Promise.all(
      data.map(async (user, index) => {
        const newuserdata = await currentUserInfo(user);
      })
    );
    sortDataDescending(data);
    console.log("Data after sorting:", data);
  }

  useEffect(() => {
    GetUsers();
    console.log(process.env.REACT_APP_API_URL);
  }, []);

  return (
    <UserContext.Provider
      value={{ data, GetUsers, PostUser, RefreshData }}  
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
