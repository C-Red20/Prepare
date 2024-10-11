import React, { useEffect, useState } from "react";
import { getAllItems } from "../../Managers/ItemManager.jsx"; // Adjust the import path
import { Item } from "./Item.jsx"; // Adjust the import path
import { Button, Col } from "reactstrap";
import { Link } from "react-router-dom";

export const ItemList = () => {
    const [items, setItems] = useState([]);

    const getItems = () => {
        getAllItems().then((allItems) => setItems(allItems));
    };

    useEffect(() => {
        getItems();
    }, []);

    return (
        <div>
            <h2>Items</h2>
            <div>
                <Link to="/item/add">
                    <Col>
                        <Button color="info">Add New Item</Button>
                    </Col>
                </Link>
            </div>
            <div>
                {items.map((item) => (
                    <Item key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};
