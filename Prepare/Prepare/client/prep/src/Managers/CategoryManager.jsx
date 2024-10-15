const apiUrl = "https://localhost:7254/api/Category";

export const getAllCategories = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch category with id ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching category by id:", error);
    throw error;
  }
};

export const addCategory = async (category) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    if (!response.ok) {
      throw new Error("Failed to add category");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete category with id ${id}`);
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
  //fetch to handle the Edit
  export const updateCategory = (category) => {
    return fetch(`${apiUrl}/${category.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
  };