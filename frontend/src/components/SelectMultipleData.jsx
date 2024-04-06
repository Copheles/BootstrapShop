import React, { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

const SelectMultipleData = ({ items, dispatch, stateItem, setData }) => {
  const [showAllItems, setShowAllItems] = useState(items.length < 5);

  const visibleItems = showAllItems ? items : items.slice(0, 5);

  return (
    <div>
      {visibleItems.map((item, index) => (
        <div
          className={`form-check mb-2 ${
            !showAllItems && index === 4 ? "fade-color" : ""
          }`}
          key={item}
        >
          <input
            type="checkbox"
            className="form-check-input"
            id={item}
            value={item}
            checked={stateItem.includes(item)}
            onChange={() => dispatch(setData(item))}
          />
          <label htmlFor={item} className="form-check-label order_summary_text">
            {item}
          </label>
        </div>
      ))}
      {items.length > 4 && (
        <button
          onClick={() => setShowAllItems(!showAllItems)}
          className="mt-2 see-more-selectItems"
        >
          {showAllItems ? "Show less" : "See more"}
          {showAllItems ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
        </button>
      )}
    </div>
  );
};

export default SelectMultipleData;
