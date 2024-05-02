import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPrice } from "../slices/filterSlice";

const SelectPriceRange = () => {
  const { price, maxPrice } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleChangeSlider = (e) => {
    dispatch(setPrice(e.target.value));
  };

  useEffect(() => {
    if (maxPrice > 0 && price === 0)  {
      dispatch(setPrice(maxPrice));
    }
  }, [dispatch, maxPrice, price]);

  return (
    <div>
      <input
        type="range"
        min={0}
        max={maxPrice}
        value={price}
        step={5}
        onChange={handleChangeSlider}
        className="w-100"
      />
      <p>${price}</p>
    </div>
  );
};

export default SelectPriceRange;
