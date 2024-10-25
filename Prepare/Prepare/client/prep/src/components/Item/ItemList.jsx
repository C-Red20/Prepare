import React, { useEffect, useState } from "react"; // Import React and hooks
import { getAllItems } from "../../Managers/ItemManager.jsx"; // Import function to fetch all items
import { getAllCategories } from "../../Managers/CategoryManager.jsx"; // Import function to fetch all categories
import { Item } from "./Item.jsx"; // Import Item component
import { Button, Container, Row, Col } from "reactstrap"; // Import layout components from Reactstrap
import { Link } from "react-router-dom"; // Import Link for navigation

// Component for rendering a list of items
export const ItemList = () => {
  const [items, setItems] = useState([]); // State to store items
  const [categories, setCategories] = useState([]); // State to store categories

  // Function to fetch all items
  const fetchItems = () => {
    getAllItems().then((allItems) => setItems(allItems)); // Update state with fetched items
  };

  // Function to fetch all categories
  const fetchCategories = () => {
    getAllCategories().then((allCategories) => setCategories(allCategories)); // Update state with fetched categories
  };

  // Fetch items and categories on component mount
  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  return (
    <Container className="mt-4">
      {" "}
      {/* Main container for the list */}
      <Row className="mb-3 align-items-center justify-content-center">
        {" "}
        {/* Center the title */}
        <Col xs="auto">
          {" "}
          {/* Center title column */}
          <h2>Items</h2> {/* Title for the list */}
        </Col>
        <Col xs="6" className="text-end">
          {" "}
          {/* Align button to the right */}
          <Link to="/item/add">
            {" "}
            {/* Link to add new item */}
            <Button color="info">Add New Item</Button>{" "}
            {/* Button to add item */}
          </Link>
        </Col>
      </Row>
      <Row>
        {" "}
        {/* Row for displaying items */}
        {items.map((item) => {
          const category = categories.find(
            (category) => category.id === item.categoryId
          ); // Find category for the item
          const categoryName = category ? category.name : "Unknown"; // Get category name or default to 'Unknown'

          return (
            <Col key={item.id} xs="12" md="6" lg="4">
              {" "}
              {/* Responsive column sizes for items */}
              <Item item={item} categoryName={categoryName} />{" "}
              {/* Render Item component */}
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
