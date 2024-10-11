import { Route, Routes } from "react-router-dom";
import Hello from "./Hello.jsx";
import { useState } from "react";
import { CategoryList } from "./Category/CategoryList.jsx";
import { CategoryCreate } from "./Category/CategoryCreate.jsx";
import { ItemList } from "./Item/ItemList.jsx";
import { ItemCreate } from "./Item/ItemCreate.jsx";
import { CategoryEdit } from "./Category/CategoryEdit.jsx";
import { CategoryDelete } from "./Category/CategoryDelete.jsx";
import { ItemEdit } from "./Item/ItemEdit.jsx";
import { ItemDelete } from "./Item/ItemDelete.jsx";
import { ListList } from "./List/ListList.jsx";
import { ListCreate } from "./List/ListCreate.jsx";
import { ListEdit } from "./List/ListEdit.jsx";
import { ListDelete } from "./List/ListDelete.jsx";
import { ShoppingList } from "./List/ShoppingList.jsx";






export default function ApplicationViews() {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <Routes>
      <Route path="/login" element={<Hello />} />
      <Route path="/categories" element={<CategoryList />} />
      <Route path="/category/add" element={<CategoryCreate />} />
      <Route path="/category/edit/:id" element={<CategoryEdit />} />
      <Route path="/category/delete/:id" element={<CategoryDelete />} />
      <Route path="/items" element={<ItemList />} />
      <Route path="/item/add" element={<ItemCreate />} />
      <Route path="/item/edit/:id" element={<ItemEdit />} />
      <Route path="/item/delete/:id" element={<ItemDelete />} />
      <Route path="/lists" element={<ListList />} /> {/* New route for lists */}
      <Route path="/list/add" element={<ListCreate />} /> {/* New route for creating a list */}
      <Route path="/list/edit/:id" element={<ListEdit />} /> {/* New route for editing a list */}
      <Route path="/list/delete/:id" element={<ListDelete />} /> {/* New route for deleting a list */}
      <Route path="/shopping" element={<ShoppingList />} />
    </Routes>
  );
}
