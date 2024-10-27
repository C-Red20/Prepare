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
        setLists(lists.filter((list) => list.id !== id)); // Update state after deletion
      });
    }
  };

  return (
    <Container
      className="mt-4 text-center mx-auto"
      style={{ maxWidth: "800px" }}
    >
      {/* Centering container with fixed width */}
      <h2 className="mb-4">My Lists</h2>
      <Row className="mb-3 justify-content-center">
        <Col xs="auto">
          <Link to="/list/add">
            <Button color="info">Create New List</Button>{" "}
          </Link>
        </Col>
      </Row>
      <Row className="justify-content-center g-3">
        {lists.length > 0 ? (
          lists.map((list) => (
            <Col key={list.id} xs="12" sm="6" md="4" lg="3" className="mb-3">
              <List list={list} onDelete={handleDelete} />
            </Col>
          ))
        ) : (
          <Col>
            <p>No lists available.</p> {/* Message if no lists are present */}
          </Col>
        )}
      </Row>
    </Container>
  );
};
