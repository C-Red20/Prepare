import { Route, Routes } from "react-router-dom";
import Hello from "./Hello.jsx";
import { useState } from "react";
import { CategoryList } from "./Category/CategoryList.jsx";
import { CategoryCreate } from "./Category/CategoryCreate.jsx";
import { ItemList } from "./Item/ItemList.jsx";
import { ItemCreate } from "./Item/ItemCreate.jsx";
import { CategoryEdit } from "./Category/CategoryEdit.jsx";
import { CategoryDelete } from "./Category/CategoryDelete.jsx";



export default function ApplicationViews() {
  const [currentUser, setCurrentUser] = useState({})

 return(
      <Routes>
        <Route path="/login" element={<Hello />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/category/add" element={<CategoryCreate />} />
        <Route path="/category/edit/:id" element={<CategoryEdit />} />
        <Route path="/category/delete/:id" element={<CategoryDelete />} />
        <Route path="/items" element={<ItemList />} />
        <Route path="/item/add" element={<ItemCreate />} />
      </Routes>
   )};
