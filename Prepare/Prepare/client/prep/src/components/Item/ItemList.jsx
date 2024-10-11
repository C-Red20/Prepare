import React, { useEffect, useState } from "react";
import { getAllItems } from "../../Managers/ItemManager.jsx";
import { getAllCategories } from "../../Managers/CategoryManager.jsx";
import { Item } from "./Item.jsx";
import { Button, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

export const ItemList = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);

    const fetchItems = () => {
        getAllItems().then((allItems) => setItems(allItems));
    };

    const fetchCategories = () => {
        getAllCategories().then((allCategories) => setCategories(allCategories));
    };

    useEffect(() => {
        fetchItems();
        fetchCategories();
    }, []);

    return (
        <Container className="mt-4">
            <h2>Items</h2>
            <Row className="mb-3">
                <Col>
                    <Link to="/item/add">
                        <Button color="info">Add New Item</Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                {items.map((item) => {
                    const category = categories.find(category => category.id === item.categoryId);
                    const categoryName = category ? category.name : 'Unknown';

                    return (
                        <Col key={item.id} xs="12" md="6" lg="4"> {/* Responsive column sizes */}
                            <Item item={item} categoryName={categoryName} />
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
};
