import { Route, Routes } from "react-router-dom";
import Hello from "./Hello.jsx";

import { useState } from "react";



export default function ApplicationViews() {
  const [currentUser, setCurrentUser] = useState({})

 return(
      <Routes>
        <Route path="/login" element={<Hello />} />
        
      </Routes>
   )};
