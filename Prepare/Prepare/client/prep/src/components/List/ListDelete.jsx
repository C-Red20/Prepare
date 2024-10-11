import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { deleteList, getAllLists } from "../../Managers/ListManager.jsx";

export const ListDelete = () => {
    const [list, setList] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getAllLists().then((lists) => {
            const listToDelete = lists.find((list) => list.id === parseInt(id));
            if (listToDelete) {
                setList(listToDelete);
            }
        });
    }, [id]);

    const handleDelete = () => {
        deleteList(id).then(() => {
            navigate("/lists");
        });
    };

    if (!list) return <p>Loading...</p>;

    return (
        <div>
            <h1>Delete List</h1>
            <p>Are you sure you want to delete the list: <strong>{list.name}</strong>?</p>
            <Button color="danger" onClick={handleDelete}>Confirm Delete</Button>
            <Button color="secondary" onClick={() => navigate("/lists")}>Cancel</Button>
        </div>
    );
};
