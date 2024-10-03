import Login from "./pages/Login"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import OverallLeaderBoard from "./pages/OverallLeaderBoard";
import { UserContext, UserProvider } from "./utils/UserContext";
import { useState } from "react";

function App() {
  // console.log("Passcode :" + process.env.REACT_APP_PASSCODE);
  // console.log("Base URL :" + process.env.REACT_APP_BASE_URL);

  const [passcode, setPasscode] = useState(process.env.REACT_APP_PASSCODE);
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login passcode={passcode} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leader" element={<OverallLeaderBoard />} />
        
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
