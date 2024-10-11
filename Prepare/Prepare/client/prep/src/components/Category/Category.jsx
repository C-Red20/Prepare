import React from "react";
import { Button, Card, CardBody, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { EditPencil, TrashcanDelete } from "../Icons.jsx";


export const Category = ({ category }) => {
    return (
        <Card className="mb-3">
            <CardBody>
                <Row className="align-items-center">
                    <Col xs="8">
                        <strong>{category.name}</strong>
                    </Col>
                    <Col xs="4" className="text-end">
                        <Link to={`/category/edit/${category.id}`}>
                            <Button color="primary" outline size="sm" className="me-2">
                                <EditPencil color="blue" size={16} />
                            </Button>
                        </Link>
                        <Link to={`/category/delete/${category.id}`}>
                            <Button color="danger" outline size="sm" >
                                <TrashcanDelete color="red" size={20} />
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};