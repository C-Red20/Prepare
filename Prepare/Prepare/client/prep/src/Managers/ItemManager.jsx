const apiUrl = "https://localhost:7254/api/Item";

export const getAllItems = () => {
    return fetch(apiUrl)
        .then((res) => res.json());
};

export const getItemById = (id) => {
    return fetch(`${apiUrl}/${id}`)
        .then((res) => res.json());
};

export const addItem = (item) => {
    return fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item)
    });
};

export const deleteItem = (id) => {
    return fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
    });
};

export const updateItem = (item) => {
    return fetch(`${apiUrl}/${item.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });
};
