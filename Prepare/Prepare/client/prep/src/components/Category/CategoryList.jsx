import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../Managers/CategoryManager.jsx";
import { Category } from "./Category.jsx";
import { Button, Col, Row } from "reactstrap";
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
        <div>
            <h2>Categories</h2>
            <Row className="mb-3">
                <Col>
                    <Link to="/category/add">
                        <Button color="info">Add New Category</Button>
                    </Link>
                </Col>
            </Row>
            <div>
                {categories.map((category) => (
                    <Category 
                        key={category.id} 
                        getCategories={getCategories} 
                        category={category} 
                    />
                ))}
            </div>
        </div>
    );
};
