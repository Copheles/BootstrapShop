import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { Link, useLocation, useParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import PaginationCustom from "../components/PaginationCustom";
import FilteringBox from "../components/FilteringBox";

const ProductsScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  let rating = queryParams.get("rating");
  let brands = queryParams.get("brands");

  if (rating === null) {
    rating = "";
  }

  if (brands === null) {
    brands = "";
  }

  console.log(rating);

  const { data, error, isLoading } = useGetProductsQuery({
    keyword,
    pageNumber,
    rating,
    brands,
  });

  const link = keyword ? `/products/search/${keyword}/page` : `/products/page`;

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Message variant="danger">{error.data?.message || error.error}</Message>
    );
  }

  // Check if there are no products found
  if (!data || (data.products && data.products.length === 0)) {
    return (
      <>
        <Meta />
        <Row>
          <Col lg={3}>
            <FilteringBox />
          </Col>
          <Col lg={9}>
            {keyword && (
              <Message variant="warning">
                There are no products with the name: "{keyword}"{" "}
                <Link to="/products">Go Back</Link>
              </Message>
            )}
            {!keyword && <Message variant="info">No results found.</Message>}
          </Col>
        </Row>
      </>
    );
  }

  // Render search results if available
  return (
    <>
      <Meta />
      <Row>
        <Col lg={3}>
          <FilteringBox />
        </Col>
        <Col lg={9}>
          {(keyword || rating) && (
            <p>{`${data.total} ${data.total === 1 ? "result" : "results"}`}</p>
          )}
          <SearchBox />
          <Row>
            {data.products.map((product) => (
              <Col xs={6} sm={6} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} key={product._id} />
              </Col>
            ))}
          </Row>
          <PaginationCustom pages={data.pages} page={data.page} link={link} />
        </Col>
      </Row>
    </>
  );
};

export default ProductsScreen;
