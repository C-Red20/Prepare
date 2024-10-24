import React from "react";

export const ListItem = ({ item }) => {
  // Check if item has the necessary properties

  return !item || !item.itemName || !item.amount ? (
    <div>Loading item details...</div>
  ) : (
    <div>
      <h3>{item.itemName}</h3> {/* Using item.itemName instead of item.name */}
      {/* Category might not be available in your current structure, so this can be removed or conditionally added */}
      {/* <p>Category: {item.category.name}</p> */}
      <p>Amount: {item.amount}</p>
    </div>
  );
};
