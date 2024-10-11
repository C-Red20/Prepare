const apiUrl = "https://localhost:7254/api/List";

export const getAllLists = () => {
    return fetch(apiUrl).then(res => res.json());
};

export const getListById = (id) => {
    return fetch(`${apiUrl}/${id}`)
        .then(res => res.json());
};

export const addList = (list) => {
    return fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(list),
    });
};

export const updateList = (list) => {
    return fetch(`${apiUrl}/${list.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(list),
    });
};

export const deleteList = (id) => {
    return fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
    });
};

export const updateListDate = (listId, date) => {
    return fetch(`${apiUrl}/${listId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ Checked: date }),
    });
};