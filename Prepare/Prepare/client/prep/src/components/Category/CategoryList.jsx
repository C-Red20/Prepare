import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../Managers/CategoryManager.jsx";
import { Category } from "./Category.jsx";
import { Button, Container, Row, Col } from "reactstrap"; // Import Container for layout
import { Link } from "react-router-dom";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    getAllCategories().then((allCategories) => setCategories(allCategories));
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Container className="mt-4">
      {/* Main container for categories */}
      <Row className="mb-3 align-items-center justify-content-between">
        <Col xs="auto">
          <h2>Categories</h2> {/* Title for the list */}
        </Col>
        <Col xs="auto" className="text-end">
          <Link to="/category/add">
            <Button color="info">Add New Category</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        {/* Row for displaying categories */}
        {categories.map((category) => (
          <Col key={category.id} xs="12" md="6" lg="4">
            <Category getCategories={getCategories} category={category} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
