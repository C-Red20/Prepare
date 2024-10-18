import React from "react";
import { Button, Card, CardBody, Row, Col } from "reactstrap"; // Import necessary components from Reactstrap
import { Link } from "react-router-dom"; // Import Link for navigation
import { EditPencil, TrashcanDelete } from "../Icons.jsx"; // Import custom icons

// Component for rendering individual items
export const Item = ({ item, categoryName }) => {
    return (
        <Card className="mb-3"> {/* Card to display item details with bottom margin */}
            <CardBody>
                <Row className="align-items-center"> {/* Align items vertically centered */}
                    <Col xs="8"> {/* Column for item details */}
                        <strong>{item.name}</strong> {/* Display item name */}
                        <span style={{ marginLeft: '10px' }}>(Category: {item.category.name})</span> {/* Display category name */}
                    </Col>
                    <Col xs="4" className="text-end"> {/* Column for action buttons aligned to the right */}
                        <Link to={`/item/edit/${item.id}`}> {/* Link to edit item */}
                            <Button color="primary" outline size="sm" className="me-2"> {/* Edit button */}
                                <EditPencil color="blue" size={16} /> {/* Icon for edit */}
                            </Button>
                        </Link>
                        <Link to={`/item/delete/${item.id}`}> {/* Link to delete item */}
                            <Button color="danger" outline size="sm"> {/* Delete button */}
                                <TrashcanDelete color="red" size={20} /> {/* Icon for delete */}
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};
