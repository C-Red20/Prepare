import React from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { EditPencil, TrashcanDelete } from "../Icons.jsx";


export const Category = ({ category }) => {
  return (
    <Card>
      <CardBody>
        <p>
          {category.name}
          <Link to={`/category/edit/${category.id}`}>
            {" "}
            <Button color="primary" outline size="sm">
                <EditPencil color="blue" size={16} /> {/* Use the edit icon */}
            </Button>
          </Link>
          <Link to={`/category/delete/${category.id}`}>
            <Button color="success" outline size="sm">
                <TrashcanDelete color="red" size={20} /> {/* Use the delete icon */}
            </Button>
          </Link>
        </p>
      </CardBody>
    </Card>
  );
};