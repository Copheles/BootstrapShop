import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import SearchBox from "../components/SearchBox";
import PaginationCustom from "../components/PaginationCustom";
import FilteringBox from "../components/FilteringBox";
import { useSelector } from "react-redux";

const ProductsScreen = () => {
  const { keyword, pageNumber, rating, brands } = useSelector(
    (state) => state.filter
  );

  const { data, error, isLoading } = useGetProductsQuery({
    keyword,
    pageNumber,
    rating,
    brands,
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
      <Row>
        <Col lg={3}>
          <FilteringBox />
        </Col>
        <Col lg={9}>
          <SearchBox />
          {data && `${data.total} ${data.total <= 1 ? "result" : "results"}`}
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
