import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addItem } from "../../Managers/ItemManager.jsx"; // Adjust the import path
import { getAllCategories } from "../../Managers/CategoryManager.jsx"; // Adjust the import path
import { Button, Row, Form, Input, Col } from "reactstrap";

export const ItemCreate = () => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState(""); // Store selected category ID
  const [have, setHave] = useState(false); // Adjust based on your requirements
  const [categories, setCategories] = useState([]); // For storing category options

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories when the component mounts
    getAllCategories().then(setCategories);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name,
      categoryId
    };
    addItem(newItem).then(() => {
      navigate("/items"); // Adjust the path as necessary
    });
  };

  return (
    <div className="create-container">
      <h1>Add Item</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="row-cols-lg-auto g-3 align-items-center">
          <Col>
            <Input
              id="itemName"
              type="text"
              placeholder="Item Name Here"
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col>
            <Input
              id="categoryId"
              type="select" // Use select for dropdown
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select a category</option> {/* Placeholder option */}
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Input>
          </Col>
          <Col>
            <Button color="info" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
