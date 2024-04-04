import SelectRating from "./SelectRating";
import { Accordion, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  setRating,
  clearAll,
  setBrands,
  setCategories,
} from "../slices/filterSlice";
import { useGetBrandsAndCategoriesQuery } from "../slices/productsApiSlice";
import SelectMultipleData from "./SelectMultipleData";

const FilteringBox = () => {
  const dispatch = useDispatch();
  const {
    rating: stateRating,
    brands: stateBrands,
    category: stateCategory,
  } = useSelector((state) => state.filter);

  const { data } = useGetBrandsAndCategoriesQuery();

  const clearClickHandler = (e) => {
    e.preventDefault();
    dispatch(clearAll());
  };

  return (
    <>
      <Accordion defaultActiveKey={["1", "2"]} alwaysOpen>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Rating</Accordion.Header>
          <Accordion.Body>
            <SelectRating
              rating={stateRating}
              setRating={setRating}
              dispatch={dispatch}
            />
          </Accordion.Body>
        </Accordion.Item>
        {data &&
          data.brands &&
          data.categories && (
            <>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Brands</Accordion.Header>
                <Accordion.Body>
                  <SelectMultipleData
                    items={data.brands}
                    dispatch={dispatch}
                    stateItem={stateBrands}
                    setData={setBrands}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Categories</Accordion.Header>
                <Accordion.Body>
                  <SelectMultipleData
                    items={data.categories}
                    dispatch={dispatch}
                    stateItem={stateCategory}
                    setData={setCategories}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </>
          )}
      </Accordion>

      <div className="w-100 py-5 d-flex gap-2">
        <Button
          type="submit"
          variant="danger"
          className="btn-sm"
          onClick={clearClickHandler}
        >
          Clear
        </Button>
      </div>
    </>
  );
};

export default FilteringBox;
