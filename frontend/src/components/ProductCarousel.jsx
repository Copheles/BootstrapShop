import { Link } from "react-router-dom";
import { Carousel, Image, Placeholder } from "react-bootstrap";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <Placeholder
      as="div"
      animation="glow"
      className="mb-3 carousel-placeholder"
    >
      <Placeholder xs={12} className="h-100" />
    </Placeholder>
  ) : error ? (
    <Message>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-light mb-3">
      {products.map((product) => (
        <Carousel.Item key={product._id} className="carousel-item">
          <Link to={`/products/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              {product.name} (${product.price})
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
