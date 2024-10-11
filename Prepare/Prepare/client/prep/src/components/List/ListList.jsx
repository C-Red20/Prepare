import React, { useEffect, useState } from "react";
import { getAllLists, deleteList } from "../../Managers/ListManager.jsx"; // Import deleteList function
import { List } from "./List.jsx";
import { Button, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

// ListList component to display all lists
export const ListList = () => {
    const [lists, setLists] = useState([]);

    // Fetch lists from the server on component mount
    useEffect(() => {
        getAllLists().then(setLists);
    }, []);

    // Function to handle list deletion
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this list?")) {
            deleteList(id).then(() => {
                setLists(lists.filter(list => list.id !== id)); // Update state after deletion
            });
        }
    };

    return (
        <Container>
            <h2>My Lists</h2>
            <Row className="mb-3">
                <Col>
                    <Link to="/list/add">
                        <Button color="info">Create New List</Button> {/* Button to create a new list */}
                    </Link>
                </Col>
            </Row>
            <Row>
                {lists.length > 0 ? (
                    lists.map(list => (
                        <List key={list.id} list={list} onDelete={handleDelete} /> // Pass handleDelete to List
                    ))
                ) : (
                    <p>No lists available.</p> // Message if no lists are present
                )}
            </Row>
        </Container>
    );
};
