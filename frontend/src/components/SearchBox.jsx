import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setKeyword } from "../slices/filterSlice";

const SearchBox = () => {
  const { keyword } = useSelector((state) => state.filter);
  console.log("keyword: ", keyword);

  const [searchText, setSearchText] = useState("");

  console.log("searchText", searchText);
  const dispatch = useDispatch();

  const handleChangeSearch = (e) => {
    setSearchText(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setKeyword(searchText));
  };

  useEffect(() => {
    if(keyword === ""){
      setSearchText("");
    }
  }, [keyword])

  return (
    <>
      <Form onSubmit={submitHandler} className="d-flex mb-4">
        <InputGroup>
          <Form.Control
            type="text"
            name="q"
            onChange={handleChangeSearch}
            value={searchText}
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
