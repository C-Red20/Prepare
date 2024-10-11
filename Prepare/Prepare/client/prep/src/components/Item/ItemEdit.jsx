import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row } from "reactstrap";
import { updateItem, getAllItems } from "../../Managers/ItemManager.jsx"; // Adjust the import path
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategories } from "../../Managers/CategoryManager.jsx";

export const ItemEdit = () => {
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState(""); // For storing selected category ID
    const [categories, setCategories] = useState([]); // For storing category options
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItem = async () => {
            const items = await getAllItems();
            const itemToEdit = items.find((item) => item.id === parseInt(id));
            if (itemToEdit) {
                setName(itemToEdit.name);
                setCategoryId(itemToEdit.categoryId); // Set the selected category
            }
        };

        const fetchCategories = async () => {
            const fetchedCategories = await getAllCategories();
            setCategories(fetchedCategories);
        };

        fetchItem();
        fetchCategories();
    }, [id]);

    const handleSave = (e) => {
        e.preventDefault();
        const editItem = {
            id: parseInt(id),
            name,
            categoryId: parseInt(categoryId), // Ensure categoryId is an integer
        };
        
        updateItem(editItem)
            .then(() => {
                navigate("/items");
            })
            .catch((error) => {
                console.error("Error updating item:", error);
                // Optionally show an error message
            });
    };

    return (
        <div className="item-container">
            <h1>Edit Item</h1>
            <Form onSubmit={handleSave}>
                <Row className="row-cols-lg-auto g-3 align-items-center">
                    <Col>
                        <Input
                            id="itemName"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Item Name"
                            required // Make this field required
                        />
                    </Col>
                    <Col>
                        <Input
                            id="categoryId"
                            type="select" // Use select for dropdown
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required // Make this field required
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Input>
                    </Col>
                    <Col>
                        <Button color="info" type="submit">
                            Update Item
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};
