const apiUrl = "https://localhost:7254/api/Item";

export const getAllItems = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const getItemById = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch item with id ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching item by id:", error);
    throw error;
  }
};

export const addItem = async (item, userProfileId) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...item, userProfileId }),
    });
    if (!response.ok) {
      throw new Error("Failed to create item");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete item with id ${id}`);
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};

export const updateItem = async (item) => {
  try {
    const response = await fetch(`${apiUrl}/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error("Failed to update item");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};
