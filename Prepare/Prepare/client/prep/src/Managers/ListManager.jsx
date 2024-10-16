const apiUrl = "https://localhost:7254/api/List";

export const getAllLists = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch lists");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching lists:", error);
    throw error;
  }
};

export const getListById = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch list with id ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching list by id:", error);
    throw error;
  }
};

export const addList = async (list) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    });
    if (!response.ok) {
      throw new Error("Failed to add list");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding list:", error);
    throw error;
  }
};

export const updateList = async (list) => {
  const response = await fetch(`${apiUrl}/${list.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  });

  // Only attempt to parse the response if there's content
  if (response.ok) {
    const text = await response.text(); // Read the response as text
    return text ? JSON.parse(text) : null; // Parse only if there is content
  }
  
  throw new Error("Failed to update list");
};




export const deleteList = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete list with id ${id}`);
    }
  } catch (error) {
    console.error("Error deleting list:", error);
    throw error;
  }
};

export const updateListDate = async (listId, date) => {
  try {
    const response = await fetch(`${apiUrl}/${listId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Checked: date }),
    });
    if (!response.ok) {
      throw new Error(`Failed to update list date for list id ${listId}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating list date:", error);
    throw error;
  }
};

export const getItemsByListId = async (listId) => {
  try {
    const response = await fetch(`${apiUrl}/${listId}/items`);
    if (!response.ok) {
      throw new Error(`Failed to fetch items for list id ${listId}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching items by list id:", error);
    throw error;
  }
};
