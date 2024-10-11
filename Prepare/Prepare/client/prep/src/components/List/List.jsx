import React from "react";
import { Col } from "reactstrap";

export const List = ({ list }) => {
    return (
        <Col key={list.id} xs="12">
            <div>
                <strong>{list.name}</strong>
                <p>Last Updated: {list.Checked ? new Date(list.Checked).toLocaleDateString() : 'Never'}</p>
            </div>
        </Col>
    );
};
