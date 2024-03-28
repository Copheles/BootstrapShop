import React from "react";
import { setBrands } from "../slices/filterSlice";
import { useSelector } from "react-redux";

const SelectBrand = ({ brands, dispatch }) => {
  const { brands: stateBrands } = useSelector((state) => state.filter)  

  return (
    <div>
      {brands?.map((brand) => (
        <div key={brand} className="form-check mb-1">
          <input
            type="checkbox"
            className="form-check-input"
            id={brand}
            value={brand}
            checked={stateBrands.includes(brand)}
            onChange={() => dispatch(setBrands(brand))}
          />
          <label className="form-check-label" htmlFor={brand}>
            {brand}
          </label>
        </div>
      ))}
    </div>
  );
};

export default SelectBrand;
