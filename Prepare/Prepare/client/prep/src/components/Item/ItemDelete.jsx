import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { deleteItem, getAllItems } from "../../Managers/ItemManager.jsx"; // Adjust the import path

export const ItemDelete = () => {
    const [item, setItem] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getAllItems().then((items) => {
            const itemToDelete = items.find((item) => item.id === parseInt(id));
            if (itemToDelete) {
                setItem(itemToDelete);
            }
        });
    }, [id]);

    const handleDelete = () => {
        deleteItem(id).then(() => {
            navigate("/items");
        })
    };

    if (!item) return <p>Loading...</p>;

    return (
        <div className="delete-container">
            <h1>Delete Item</h1>
            <p>
                Are you sure you want to delete the item: <strong>{item.name}</strong>?
            </p>
            <Button color="danger" onClick={handleDelete}>
                Confirm Delete
            </Button>
            <Button color="secondary" onClick={() => navigate("/items")}>
                Cancel
            </Button>
        </div>
    );
};

