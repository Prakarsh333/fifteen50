import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { UserContext } from '../utils/UserContext'
import Loading from '../components/Loading'

function UserCard({user, index}){
    return (
        <div className={`w-auto border-2 border-black h-16 my-5 grid gap-2 grid-cols-5 items-center rounded-full p-2 text-lg hover:text-xl font-mono hover:font-light cursor-pointer ${index === 0 ? " bg-gradient-to-r from-fuchsia-200 to-cyan-500" : (index === 1) ? " bg-gradient-to-r from-teal-200 to-yellow-200": (index === 2) ? "bg-gradient-to-r from-blue-200 to-cyan-300" : ""}`}>
            <p className='flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap'>{user.username}</p>
            <p className='flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap'>Problems Solved: {user.problemsolved_latest - user.problemsolved}</p>
            <p className='flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap'>Easy: {user.solvedEasy_latest - user.solvedEasy}</p>
            <p className='flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap'>Medium: {user.solvedMedium_latest - user.solvedMedium}</p>
            <p className='flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap'>Hard: {user.solvedHard_latest - user.solvedHard}</p>
        </div>
        
    )
}

function Dashboard() {
  const { data } = useContext(UserContext);
  // const [ sortedData, setSortedData ] = useState(null);

  // useEffect(() => {
  //   if(data){
  //     setSortedData(data);
  //     setSortedData((prevData) => prevData.sort((a, b) => (b.problemsolved_latest - b.problemsolved) - (a.problemsolved_latest - a.problemsolved)));
  //   }
  // }, []);
  
  // if(data){
  //   setSortedData(data);
  //   setSortedData((prevData) => prevData.sort((a, b) => (b.problemsolved_latest - b.problemsolved) - (a.problemsolved_latest - a.problemsolved)));
  // }

  return (
    <div className='bg-gradient-to-r from-cyan-200 to-white w-full h-full'>
      <Navbar title={"15 Days 50 Questions Challenge"} />
      <div className='mx-20 py-10'>
        LeaderBoard ...
        {data
          ? data.map((user, index) => (
              <UserCard key={index} user={user} index={index} />
            ))
          : <div className='flex items-center justify-center'><Loading /></div>}
      </div>
    </div>
  );
}

export default Dashboard