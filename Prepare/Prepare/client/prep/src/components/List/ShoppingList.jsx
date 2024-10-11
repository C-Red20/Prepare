import React, { useEffect, useState } from "react";
import { getAllItems } from "../../Managers/ItemManager.jsx"; // Adjust import based on your structure
import { Container, Row, Col } from "reactstrap";

export const ShoppingList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getAllItems().then(allItems => {
            const shoppingItems = allItems.filter(item => !item.have); // Adjust based on your logic
            setItems(shoppingItems);
        });
    }, []);

    return (
        <Container>
            <h2>Shopping List</h2>
            <Row>
                {items.map(item => (
                    <Col key={item.id} xs="12">
                        <div>
                            <strong>{item.name}</strong>
                            <p>Belongs to Lists: {/* Logic to show associated lists */}</p>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
