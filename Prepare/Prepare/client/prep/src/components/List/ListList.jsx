import React, { useEffect, useState } from "react";
import { getAllLists } from "../../Managers/ListManager.jsx";
import { List } from "./List.jsx";
import { Button, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

export const ListList = () => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        getAllLists().then(setLists);
    }, []);

    return (
        <Container>
            <h2>My Lists</h2>
            <Row className="mb-3">
                <Col>
                    <Link to="/list/add">
                        <Button color="info">Create New List</Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                {lists.length > 0 ? (
                    lists.map(list => (
                        <Col key={list.id} xs="12">
                            <List list={list} />
                        </Col>
                    ))
                ) : (
                    <p>No lists available.</p>
                )}
            </Row>
        </Container>
    );
};
