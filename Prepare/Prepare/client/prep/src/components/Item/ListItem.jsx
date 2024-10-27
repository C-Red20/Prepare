import React from "react";
import { Card, CardBody } from "reactstrap";

export const ListItem = ({ item }) => {
  return !item || !item.itemName || !item.amount ? (
    <div>Loading item details...</div>
  ) : (
    <Card className="mb-2">
      <CardBody>
        <h3>{item.itemName}</h3>
        <p>Amount: {item.amount}</p>
      </CardBody>
    </Card>
  );
};
