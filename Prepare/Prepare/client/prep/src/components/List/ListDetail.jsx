import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListItem } from "../Item/ListItem.jsx";
import { getListById } from "../../Managers/ListManager.jsx";
import {
  addItemToList,
  deleteListItem,
  getListItemsByListId,
  updateListItem,
} from "../../Managers/ListItemManger.jsx";
import { getAllItems } from "../../Managers/ItemManager.jsx";

const ListDetail = () => {
  const { id } = useParams(); // Get list ID from URL
  const [list, setList] = useState({});
  const [listItems, setListItems] = useState([]); // Store ListItems
  const [allItems, setAllItems] = useState([]);

  // Fetch the list details and the items within the list
  const fetchList = async () => {
    const listData = await getListById(id);
    setList(listData); // Set the list details

    const listItemsData = await getListItemsByListId(id);
    setListItems(listItemsData); // Fetch and set ListItems

    // Fetch all items first, then filter out items already in the list
    const allItemsData = await getAllItems();
    const filteredItems = allItemsData.filter(
      (item) => !listItemsData.some((listItem) => listItem.itemId === item.id)
    );

    setAllItems(filteredItems); // Set available items that are not already in the list
  };

  useEffect(() => {
    fetchList();
  }, [id]);

  // Update amount for a ListItem
  const handleAmountChange = async (itemId, newAmount) => {
    console.log("Item ID:", itemId); // Should print the correct item ID
    console.log("New Amount:", newAmount); // Ensure this is also correct

    // Optimistically update local state
    setListItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, amount: Number(newAmount) } : item
      )
    );

    await updateListItem(itemId, newAmount); // Call with itemId and new amount
  };

  // Delete ListItem (remove from the list, not the database)
  const handleDeleteItem = async (itemId) => {
    // Optimistically remove item from local state
    setListItems((prevItems) => prevItems.filter((item) => item.id !== itemId));

    // Proceed with deleting the item from the database
    await deleteListItem(itemId);

    // Refetch list items to ensure the local state is in sync with the server
    fetchList(); // Call the fetchList function to update the component state
  };

  // Add item to the list
  const handleAddItem = async (item) => {
    const newItem = {
      itemId: item.id,
      listId: id,
      amount: 1,
    };
    const addedItem = await addItemToList(newItem); // Get the response of the added item

    const listItemsData = await getListItemsByListId(id);
    setListItems(listItemsData); // Fetch and set ListItems

    // Update local state to include the newly added item
    // setListItems((prevItems) => [
    //   ...prevItems,
    //   { ...addedItem, name: item.name },
    // ]); // Add to listItems
    setAllItems((prevItems) => prevItems.filter((i) => i.id !== item.id)); // Remove from available items
  };

  return (
    <div>
      <h2>{list.name}</h2>
      <h4>Location: {list.location}</h4>
      <div>
        Last Updated:{" "}
        {list.lastUpdated
          ? new Date(list.lastUpdated)
              .toLocaleDateString("en-GB")
              .split("/")
              .join("-")
          : "N/A"}
      </div>

      <div className="item-list">
        {listItems.map((item) => (
          <div key={item.id} className="item-container">
            <ListItem item={item} />{" "}
            {/* Ensure ListItem handles rendering correctly */}
            <div>Amount:</div>
            <input
              type="number"
              value={item.amount}
              onChange={(e) => handleAmountChange(item.id, e.target.value)}
            />
            <button onClick={() => handleDeleteItem(item.id)}>🗑️</button>
          </div>
        ))}
      </div>

      {/* Scrollable box for available items */}
      <div
        className="available-items-box"
        style={{
          overflowY: "scroll",
          height: "200px",
          border: "1px solid gray",
        }}
      >
        {allItems.map((item) => (
          <div key={item.id} className="addable-item">
            <span>{item.name}</span>
            <button onClick={() => handleAddItem(item)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListDetail;

// const handleAddItem = (item) => {
//   const newItem = {
//     itemId: item.id,
//     listId: id,
//     amount: 1,
//   };
//   addItemToList(newItem) // Get the response of the added item
//     .then((r) => {
//       // Update local state to include the newly added item
//       setListItems((prevItems) => [...prevItems, { ...r, name: item.name }]); // Add to listItems
//       setAllItems((prevItems) => prevItems.filter((i) => i.id !== item.id)); // Remove from available items
//     });
// };
