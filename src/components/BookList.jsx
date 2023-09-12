import SingleBook from "./SingleBook";
import { Col, Form, Row } from "react-bootstrap";
import { useState } from "react";

const BookList = (props) => {
  /* state = {
    searchQuery: ""
  }; */
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchquery = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Search a book</Form.Label>
            <Form.Control type="text" placeholder="Search here" value={searchQuery} onChange={handleSearchquery} />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        {props.books
          .filter((b) => b.title.toLowerCase().includes(searchQuery))
          .map((b) => (
            <Col xs={12} md={4} key={b.asin}>
              <SingleBook book={b} setNewAsin={props.setNewAsin} selectedAsin={props.selectedAsin} />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default BookList;
