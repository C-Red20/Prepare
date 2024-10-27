import React from "react";
import { Col, Button, Card, CardBody, Row } from "reactstrap";
import { Link } from "react-router-dom";

export const List = ({ list, onDelete }) => {
  return (
    <Col className="d-flex">
      <Card
        style={{ backgroundColor: "#a1b3a5", height: "200px", width: "200px" }}
        className="w-100"
      >
        <CardBody className="d-flex flex-column justify-content-between">
          {/* Using flex column to stack items */}
          <div className="text-center">
            <strong>{list.name}</strong>
            <p>Location: {list.location}</p>
            <p>
              Last Updated:{" "}
              {list.lastUpdated
                ? new Date(list.lastUpdated).toLocaleDateString()
                : "Never"}
            </p>
          </div>
          <Row className="mt-2" style={{ marginBottom: "0.2" }}>
            {" "}
            {/* Prevent extra space */}
            <Col className="text-end" style={{ marginBottom: "0.2" }}>
              <Link to={`/list/details/${list.id}`}>
                <Button color="primary" size="sm" className="me-2">
                  Details
                </Button>
              </Link>
              <Link to={`/list/edit/${list.id}`}>
                <Button color="warning" size="sm" className="me-2">
                  Edit
                </Button>
              </Link>
              <Button
                color="danger"
                size="sm"
                onClick={() => onDelete(list.id)}
              >
                Delete
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};
