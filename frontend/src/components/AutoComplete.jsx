import React, { useState } from "react";
import { Form, Badge } from "react-bootstrap";

const AutoComplete = ({ item, setItem, data, label, controllIdText, placeholder }) => {
  const [filteredData, setFilteredData] = useState([]);
  
  const handleInputChange = (e) => {
    const searchText = e.target.value;
    setItem(searchText);

    if (searchText.length > 1) {
      const filtered = data.filter((name) =>
        name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  const handleSelection = (selectedItem) => {
    setItem(selectedItem);
    setFilteredData([]);
  };

  return (
    data && (
      <Form.Group controlId={controllIdText} className="my-3">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={item}
          onChange={handleInputChange}
        />
        {filteredData.length > 0 && (
          <div
            style={{
              maxHeight: "200px",
              overflowY: "auto",
              marginTop: "0.5rem",
            }}
          >
            {filteredData.map((name) => (
              <Badge
                key={name}
                className="autocomplete-badge"
                style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
                onClick={() => handleSelection(name)}
                pill
                bg="primary"
              >
                {name}
              </Badge>
            ))}
          </div>
        )}
      </Form.Group>
    )
  );
};

export default AutoComplete;
