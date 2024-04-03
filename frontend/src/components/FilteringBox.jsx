import SelectRating from "./SelectRating";
import { Accordion, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setRating, clearAll } from "../slices/filterSlice";
import { useGetBrandsAndCategoriesQuery } from "../slices/productsApiSlice";
import SelectBrand from "./SelectBrand";

const FilteringBox = () => {
  const dispatch = useDispatch();
  const { rating, brands } = useSelector((state) => state.filter);

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
              rating={rating}
              setRating={setRating}
              dispatch={dispatch}
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Brands</Accordion.Header>
          <Accordion.Body>
            <SelectBrand dispatch={dispatch} brands={data?.brands} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="w-100 py-2 d-flex gap-2">
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
