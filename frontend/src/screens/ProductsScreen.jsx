import { Button, Col, Row, Offcanvas } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import SearchBox from "../components/SearchBox";
import PaginationCustom from "../components/PaginationCustom";
import FilteringBox from "../components/FilteringBox";
import { useDispatch, useSelector } from "react-redux";
import { IoFilterOutline } from "react-icons/io5";
import SelectData from "../components/SelectData";
import { useState } from "react";
import { clearAll } from "../slices/filterSlice";
import getFilterListAmount from "../utils/getFIlterListAmount";

const ProductsScreen = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { keyword, pageNumber, rating, brands, category, sort } = useSelector(
    (state) => state.filter
  );

  const filterAmount = getFilterListAmount({
    keyword,
    rating,
    brands,
    category,
  });

  const dispatch = useDispatch();

  const showClearFiler = !(keyword || rating || brands || category) && true;

  const { data, error, isLoading } = useGetProductsQuery({
    keyword,
    pageNumber,
    rating,
    brands,
    category,
    sort,
  });


  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Message variant="danger">{error.data?.message || error.error}</Message>
    );
  }
  // Check if there are no products found

  // Render search results if available
  return (
    <>
      <Meta />
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h2>
              {" "}
              {`${data.total} ${data.total <= 1 ? "result" : "results"}`}
            </h2>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FilteringBox />
        </Offcanvas.Body>
      </Offcanvas>

      <Row>
        <Col lg={3} className="filter-box">
          <FilteringBox />
        </Col>
        <Col lg={9}>
          <SearchBox />
          <div className="filter-container">
            <div className="wrapper">
              <div className="top-box">
                <div className="filter-amount-box">
                  <Button
                    variant="outline-dark"
                    onClick={handleShow}
                    className="filter-button btn-sm"
                  >
                    <IoFilterOutline />
                  </Button>
                  {filterAmount > 0 && (
                    <div className="filter-amount">
                      <span>{filterAmount > 9 ? "9+": filterAmount}</span>
                    </div>
                  )}
                </div>
                <div className="bottom-box">
                  <SelectData />
                </div>
              </div>
              {!showClearFiler && (
                <button
                  className="filter-btn"
                  onClick={() => dispatch(clearAll())}
                >
                  Clear filters
                </button>
              )}
            </div>
            {data && (
              <p className="results-text">{`${data.total} ${
                data.total <= 1 ? "result" : "results"
              }`}</p>
            )}
          </div>

          <Row>
            {data.products.map((product) => (
              <Col xs={6} sm={6} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} key={product._id} />
              </Col>
            ))}
          </Row>
          <PaginationCustom pages={data.pages} page={data.page} />
        </Col>
      </Row>
    </>
  );
};

export default ProductsScreen;
