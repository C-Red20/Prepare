import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../Managers/CategoryManager.jsx";
import { Category } from "./Category.jsx";
import { Button, Container, Row, Col } from "reactstrap";
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
      {" "}
      {/* Matches ItemList container spacing */}
      <Row className="mb-3 align-items-center justify-content-between">
        <Col xs="auto">
          <h2>Categories</h2> {/* Title aligned similarly to ItemList */}
        </Col>
        <Col xs="auto" className="text-end">
          {" "}
          {/* Button aligned to the right */}
          <Link to="/category/add">
            <Button color="info">Add New Category</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        {categories.map((category) => (
          <Col key={category.id} xs="12" md="6" lg="4">
            {" "}
            {/* Responsive column sizes */}
            <Category category={category} />{" "}
            {/* Category cards with hex color */}
          </Col>
        ))}
      </Row>
    </Container>
  );
};
