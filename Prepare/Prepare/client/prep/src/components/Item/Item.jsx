import React from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export const Item = ({ item }) => {
    return (
        <Card>
            <CardBody>
                <p>
                    {item.name}
                    <Link to={`/item/edit/${item.id}`}>
                        {" "}
                        <Button color="primary" outline size="sm">
                            Edit
                        </Button>
                    </Link>
                    <Link to={`/item/delete/${item.id}`}>
                        <Button color="success" outline size="sm">
                            Delete
                        </Button>
                    </Link>
                </p>
            </CardBody>
        </Card>
    );
};
