import SelectRating from "./SelectRating";
import { Accordion, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setRating, clearAll } from "../slices/filterSlice";
import { useGetBrandsAndCategoriesQuery } from "../slices/productsApiSlice";
import SelectBrand from "./SelectBrand";

const FilteringBox = () => {
  const { keyword } = useParams();

  const { rating, brands } = useSelector((state) => state.filter);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useGetBrandsAndCategoriesQuery();

  const filterClickHandler = (e) => {
    e.preventDefault();
    if (rating > 0 && brands.length === 0) {
      if (keyword) {
        navigate(`/products/search/${keyword}?rating=${rating ? rating : ""}`);
      } else {
        navigate(`/products?rating=${rating ? rating : ""}`);
      }
    } else if (rating > 0 && brands.length > 0) {
      if (keyword) {
        navigate(
          `/products/search/${keyword}?rating=${
            rating ? rating : ""
          }&brands=${brands}`
        );
      } else {
        navigate(`/products?rating=${rating ? rating : ""}&brands=${brands}`);
      }
    } else if (rating === null && brands.length > 0) {
      if (keyword) {
        navigate(`products/search/${keyword}?brands=${brands}`);
      } else {
        navigate(`/products?brands=${brands}`);
      }
    } else {
      if (keyword) {
        navigate(`products/search/${keyword}`);
      } else {
        navigate("/products");
      }
    }
  };

  const clearClickHandler = (e) => {
    e.preventDefault();
    dispatch(clearAll());
    navigate(keyword ? `/products/search/${keyword}` : `/products`);
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
          variant="dark"
          className="btn-sm"
          onClick={filterClickHandler}
        >
          Filter
        </Button>
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
