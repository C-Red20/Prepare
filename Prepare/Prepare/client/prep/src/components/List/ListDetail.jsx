import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListItem } from "../Item/ListItem.jsx";
import {
  addItemToList,
  deleteListItem,
  getListItemsByListId,
  updateListItem,
} from "../../Managers/ListItemManger.jsx";
import { getListById } from "../../Managers/ListManager.jsx";
import { getAllItems } from "../../Managers/ItemManager.jsx";
import { Container, Card, CardBody, Row, Col, Button } from "reactstrap";

const ListDetail = () => {
  const { id } = useParams(); // Get list ID from URL
  const [list, setList] = useState({});
  const [listItems, setListItems] = useState([]); // Store ListItems
  const [allItems, setAllItems] = useState([]);

  // Fetch the list details and the items within the list
  const fetchList = async () => {
    const listData = await getListById(id);
    setList(listData); // Set the list details

    const listItemsData = await getListItemsByListId(id);
    setListItems(listItemsData); // Fetch and set ListItems

    // Fetch all items first, then filter out items already in the list
    const allItemsData = await getAllItems();
    const filteredItems = allItemsData.filter(
      (item) => !listItemsData.some((listItem) => listItem.itemId === item.id)
    );

    setAllItems(filteredItems); // Set available items that are not already in the list
  };

  useEffect(() => {
    fetchList();
  }, [id]);

  // Update amount for a ListItem
  const handleAmountChange = async (itemId, newAmount) => {
    setListItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, amount: Number(newAmount) } : item
      )
    );

    await updateListItem(itemId, newAmount); // Call with itemId and new amount
  };

  // Delete ListItem (remove from the list, not the database)
  const handleDeleteItem = async (itemId) => {
    setListItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    await deleteListItem(itemId);
    fetchList(); // Call the fetchList function to update the component state
  };

  // Add item to the list
  const handleAddItem = async (item) => {
    const newItem = {
      itemId: item.id,
      listId: id,
      amount: 1,
    };
    await addItemToList(newItem); // Get the response of the added item

    const listItemsData = await getListItemsByListId(id);
    setListItems(listItemsData); // Fetch and set ListItems
    setAllItems((prevItems) => prevItems.filter((i) => i.id !== item.id)); // Remove from available items
  };

  return (
    <Container>
      <h2 className="text-center">{list.name}</h2>
      <Card className="mb-3">
        <CardBody>
          <Row>
            <Col>
              <strong>Location: {list.location}</strong>
              <div>
                Last Updated:{" "}
                {list.lastUpdated
                  ? new Date(list.lastUpdated)
                      .toLocaleDateString("en-GB")
                      .split("/")
                      .join("-")
                  : "N/A"}
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <div className="item-list">
        {listItems.map((item) => (
          <Card key={item.id} className="mb-2">
            <CardBody>
              <ListItem item={item} />
              <Row>
                <Col xs="auto">
                  <div>Amount:</div>
                  <input
                    type="number"
                    value={item.amount}
                    onChange={(e) =>
                      handleAmountChange(item.id, e.target.value)
                    }
                    style={{ width: "70px" }} // Set a fixed width for the input
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    color="danger"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    🗑️
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Scrollable box for available items */}
      <div
        className="available-items-box"
        style={{
          overflowY: "scroll",
          height: "200px",
          border: "1px solid gray",
          padding: "10px",
        }}
      >
        {allItems.map((item) => (
          <Row key={item.id} className="mb-2">
            <Col>
              <span>{item.name}</span>
            </Col>
            <Col xs="auto">
              <Button onClick={() => handleAddItem(item)}>Add</Button>
            </Col>
          </Row>
        ))}
      </div>
    </Container>
  );
};

export default ListDetail;
