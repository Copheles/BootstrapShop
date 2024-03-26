import { Form, Button } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";

const SearchBox = ({ keyword , setKeyword}) => {
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      setKeyword("");
      navigate(`/products/search/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex mb-4">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button
        type="submit"
        variant="outline-success"
        className="p-2 mx-2 btn-sm"
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
