import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { Link, useParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import PaginationCustom from "../components/PaginationCustom";

const ProductsScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, error, isLoading } = useGetProductsQuery({
    keyword,
    pageNumber,
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

  if (data && data.products && data.products.length === 0) {
    return (
      <>
        <SearchBox />
        <Meta />
        {keyword !== "" ? (
          <Message variant="warning">
            There are no products with name: "{keyword}"{" "}
            <Link to="/products"> Go Back</Link>
          </Message>
        ) : (
          <Message variant="info">No results found.</Message>
        )}
      </>
    );
  }

  return (
    <>
      <SearchBox />
      <Meta />
      <p>
        {keyword &&
          `${data.total} ${
            data.total === 1 ? "result" : "results"
          } for ${keyword}`}
      </p>

      <Row>
        {data.products.map((product) => (
          <Col xs={6} sm={6} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} key={product._id} />
          </Col>
        ))}
      </Row>

      <PaginationCustom pages={data.pages} page={data.page} link={link} />
    </>
  );
};

export default ProductsScreen;
