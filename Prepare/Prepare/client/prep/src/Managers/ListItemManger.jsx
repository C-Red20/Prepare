const apiUrl = "https://localhost:7254/api/ListItem";

export const updateListItem = async ({ itemId, amount }) => {
  const response = await fetch(`${apiUrl}/item/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  });
  return await response.json();
};

export const deleteListItem = async (itemId) => {
  const response = await fetch(`${apiUrl}/${itemId}`, {
    method: "DELETE",
  });
};

export const getListItemsByListId = async (listId) => {
  const response = await fetch(`${apiUrl}/list/${listId}`);
  return await response.json();
};

export const addItemToList = async (item) => {
  const response = await fetch(`${apiUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return await response.json();
};
