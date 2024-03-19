import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { useParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import PaginationCustom from "../components/PaginationCustom";

const ProductsScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, error, isLoading } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const link = keyword ? `/products/search/${keyword}/page` : `/products/page`;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data?.message || error.error}</Message>
      ) : (
        <>
          <SearchBox />
          <Meta />
          <Row>
            {data.products.map((product) => (
              <Col xs={6} sm={6} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} key={product._id} />
              </Col>
            ))}
          </Row>
          <PaginationCustom pages={data.pages} page={data.page} link={link} />
        </>
      )}
    </>
  );
};

export default ProductsScreen;
