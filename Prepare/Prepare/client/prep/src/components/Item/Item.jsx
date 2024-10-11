import React from "react";
import { Button, Card, CardBody, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { EditPencil, TrashcanDelete } from "../Icons.jsx";

export const Item = ({ item, categoryName }) => {
    return (
        <Card className="mb-3"> {/* Margin bottom for spacing */}
            <CardBody>
                <Row className="align-items-center"> {/* Align items vertically centered */}
                    <Col xs="8"> {/* Adjust width as needed */}
                        <strong>{item.name}</strong>
                        <span style={{ marginLeft: '10px' }}>(Category: {categoryName})</span>
                    </Col>
                    <Col xs="4" className="text-end"> {/* Align buttons to the right */}
                        <Link to={`/item/edit/${item.id}`}>
                            <Button color="primary" outline size="sm" className="me-2">
                                <EditPencil color="blue" size={16} />
                            </Button>
                        </Link>
                        <Link to={`/item/delete/${item.id}`}>
                            <Button color="danger" outline size="sm">
                                <TrashcanDelete color="red" size={20} />
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};
