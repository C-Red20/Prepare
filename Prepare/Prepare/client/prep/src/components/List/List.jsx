import React from "react";
import { Col, Button, Card, CardBody, Row } from "reactstrap";
import { Link } from "react-router-dom";

// List component to display individual list details
export const List = ({ list, onDelete }) => {
    return (
        <Col xs="12" md="6" lg="4" className="mb-3"> {/* Responsive column for list display */}
            <Card> {/* Card for styling */}
                <CardBody>
                    <strong>{list.name}</strong> {/* Display list name */}
                    <p>Last Updated: {list.lastUpdated ? new Date(list.lastUpdated).toLocaleDateString() : 'Never'}</p> {/* Last updated info */}

                    {/* Display up to three items in the list */}
                    <ul>
                        {list.items && list.items.slice(0, 3).map(item => (
                            <li key={item.id}>{item.name} (Category: {item.categoryName})</li>
                        ))}
                    </ul>

                    <Row className="mt-2"> {/* Action buttons */}
                        <Col className="text-end">
                            <Link to={`/list/details/${list.id}`}>
                                <Button color="primary" size="sm" className="me-2">Details</Button> {/* View details */}
                            </Link>
                            <Link to={`/list/edit/${list.id}`}>
                                <Button color="warning" size="sm" className="me-2">Edit</Button> {/* Edit list */}
                            </Link>
                            <Button color="danger" size="sm" onClick={() => onDelete(list.id)}>Delete</Button> {/* Delete list */}
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Col>
    );
};
