import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";

const HomeScreen = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error.data.message || error.error}</div>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} key={product._id} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
