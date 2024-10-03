import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import { UserContext } from '../utils/UserContext'
import Loading from '../components/Loading'

function UserCard({user, index}){
    return (
        <div className={`w-auto border-2 border-black h-16 my-5 grid gap-2 grid-cols-5 items-center rounded-full p-2 text-lg hover:text-xl font-mono hover:font-light cursor-pointer ${index === 0 ? " bg-gradient-to-r from-fuchsia-200 to-cyan-500" : (index === 1) ? " bg-gradient-to-r from-teal-200 to-yellow-200": (index === 2) ? "bg-gradient-to-r from-blue-200 to-cyan-300" : ""}`}>
            <p className='flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap'>{user.username}</p>
            <p className='flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap'>Problems Solved: {user.problemsolved_latest}</p>
            <p className='flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap'>Easy: {user.solvedEasy_latest}</p>
            <p className='flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap'>Medium: {user.solvedMedium_latest}</p>
            <p className='flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap'>Hard: {user.solvedHard_latest}</p>
        </div>
        
    )
}

function OverallLeaderBoard() {

  const { data } = useContext(UserContext);

  return (
    <div className='bg-gradient-to-r from-cyan-200 to-white w-full h-full'>
        <Navbar title={"Overall Leader ..."} />
        <div className='mx-20 py-10'>
        Overall LeaderBoard ...
        {data
          ? data.map((user, index) => (
              <UserCard key={index} user={user} index={index} />
            ))
          : <div className='flex items-center justify-center'><Loading /></div>}
      </div>
        
    </div>
  )
}

export default OverallLeaderBoard;