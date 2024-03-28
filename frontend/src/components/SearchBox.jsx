import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";


const SearchBox = () => {
  const { keyword: urlKeyword } = useParams();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword) {
      navigate(`/products/search/${keyword}`);
      // setRating(0);
    } else {
      navigate("/products");
    }
  };

  return (
    <>
      <Form onSubmit={submitHandler} className="d-flex mb-4">
        <InputGroup>
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            placeholder="Search Products..."
            className="mr-sm-2 ml-sm-5"
          />
          <InputGroup.Text id="basic-addon2">
            <FaSearch />
          </InputGroup.Text>
        </InputGroup>
      </Form>
    </>
  );
};

export default SearchBox;
