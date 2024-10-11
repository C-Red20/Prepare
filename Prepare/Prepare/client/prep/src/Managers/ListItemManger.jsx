const apiUrl = "https://localhost:7254/api/ListItem";

export const updateListItem = async ({ itemId, amount }) => {
  try {
    const response = await fetch(`${apiUrl}/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });
    if (!response.ok) {
      throw new Error("Failed to update list item");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating list item:", error);
    throw error;
  }
};

export const deleteListItem = async (itemId) => {
  try {
    const response = await fetch(`${apiUrl}/${itemId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete list item with id ${itemId}`);
    }
  } catch (error) {
    console.error("Error deleting list item:", error);
    throw error;
  }
};
