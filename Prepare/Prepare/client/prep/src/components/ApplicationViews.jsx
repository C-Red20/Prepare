import { Route, Routes } from "react-router-dom";
import Hello from "./Hello.jsx";
import { useState } from "react";
import { CategoryList } from "./Category/CategoryList.jsx";
import { CategoryCreate } from "./Category/CategoryCreate.jsx";



export default function ApplicationViews() {
  const [currentUser, setCurrentUser] = useState({})

 return(
      <Routes>
        <Route path="/login" element={<Hello />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/category/add" element={<CategoryCreate />} />
      </Routes>
   )};
