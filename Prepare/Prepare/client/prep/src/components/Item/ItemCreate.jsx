import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addItem } from "../../Managers/ItemManager.jsx"; 
import { getAllCategories } from "../../Managers/CategoryManager.jsx"; 
import { getCurrentUserProfile } from "../../Managers/UserProfileManager.jsx"; 
import { Button, Row, Form, Input, Col } from "reactstrap";

export const ItemCreate = () => {
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [userProfileId, setUserProfileId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await getAllCategories();
            setCategories(fetchedCategories);
        };

        const fetchUserProfile = async () => {
            const profile = await getCurrentUserProfile();
            if (profile) {
                setUserProfileId(profile.id);
            }
        };

        fetchCategories();
        fetchUserProfile();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            name,
            categoryId: parseInt(categoryId),
            have: true,
            userProfileId: userProfileId
        };

        addItem(newItem, userProfileId)
            .then(() => {
                navigate("/items");
            });
    };

    return (
        <div className="create-container">
            <h1>Add Item</h1>
            <Form onSubmit={handleSubmit}>
                <Row className="row-cols-lg-auto g-3 align-items-center">
                    <Col>
                        <Input
                            type="text"
                            placeholder="Item Name Here"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required // Make input required
                        />
                    </Col>
                    <Col>
                        <Input
                            type="select"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required // Make select required
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
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};
