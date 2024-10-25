import React from "react";
import { Button, Card, CardBody, Row, Col } from "reactstrap"; // Import necessary components from Reactstrap
import { Link } from "react-router-dom"; // Import Link for navigation
import { EditPencil, TrashcanDelete } from "../Icons.jsx"; // Import custom icons

// Component for rendering individual items
export const Item = ({ item, categoryName }) => {
  return (
    <Card className="mb-3" style={{ backgroundColor: "#f8f9fa" }}>
      {" "}
      {/* Light gray background for item box */}
      <CardBody>
        <Row className="align-items-center">
          <Col xs="8">
            <strong>{item.name}</strong>
            <span style={{ marginLeft: "10px" }}>
              (Category: {categoryName})
            </span>
          </Col>
          <Col xs="4" className="text-end">
            <Link to={`/item/edit/${item.id}`}>
              <Button
                color="primary"
                outline
                size="sm"
                style={{ border: "none" }}
                className="me-2"
              >
                {" "}
                {/* Remove outline from edit button */}
                <EditPencil color="blue" size={16} />
              </Button>
            </Link>
            <Link to={`/item/delete/${item.id}`}>
              <Button
                color="danger"
                outline
                size="sm"
                style={{ border: "none" }}
              >
                {" "}
                {/* Remove outline from delete button */}
                <TrashcanDelete color="red" size={16} />
              </Button>
            </Link>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};
