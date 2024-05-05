import {
  Button,
  Col,
  Row,
  Offcanvas,
  Placeholder,
  Card,
} from "react-bootstrap";
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
import { Link } from "react-router-dom";

const ProductsScreen = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    keyword,
    pageNumber,
    rating,
    brands,
    category,
    sort,
    price,
    maxPrice,
  } = useSelector((state) => state.filter);

  const filterAmount = getFilterListAmount({
    keyword,
    rating,
    brands,
    category,
    price,
    maxPrice,
  });

  const dispatch = useDispatch();

  const showClearFiler =
    !(keyword || rating || brands || category || price < maxPrice) && true;

  const { data, error, isLoading } = useGetProductsQuery({
    keyword,
    pageNumber,
    rating,
    brands,
    category,
    sort,
    price,
    maxPrice,
  });

  // if (isLoading) {
  //   return <Loader />;
  // }

  if (isLoading) {
    return (
      <Placeholder animation="glow">
        <Placeholder xs={12} className="mb-5" style={{ height: "30px" }} />

        <Placeholder animation="glow" className="d-flex align-items-center">
          <Placeholder xs={1} style={{ height: "40px", marginRight: "10px" }} />
          <Placeholder xs={5} style={{ height: "30px" }} />
          <Placeholder xs={2} style={{ height: "20px", marginLeft: "auto" }} />
        </Placeholder>

        <Row>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((d) => (
            <Col xs={6} sm={6} md={6} lg={4} xl={3} key={d}>
              <Card
                className="my-3 p-3 rounded border-0"
                style={{ height: "100%" }}
              >
                <Placeholder>
                  <div className="aspect-ratio-wrapper">
                    <Card.Img variant="top" className="card-img" />
                  </div>
                </Placeholder>
                <Card.Body>
                  <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={10} />
                  </Placeholder>
                  <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                    <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                  </Placeholder>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Placeholder>
    );
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
                      <span>{filterAmount > 9 ? "9+" : filterAmount}</span>
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

          {data.products.length === 0 ? (
            <Message variant="warning">
              There are no products
            </Message>
          ) : (
            <>
              {" "}
              <Row>
                {data.products.map((product) => (
                  <Col xs={6} sm={6} md={6} lg={4} xl={3} key={product._id}>
                    <Product product={product} key={product._id} />
                  </Col>
                ))}
              </Row>
              <PaginationCustom pages={data.pages} page={data.page} />
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProductsScreen;
