import { Card, CardBody } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <CardBody>
        <Link to={`/product/${product._id}`}>
          <Card.Title
            as="div"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <h6>{product.name}</h6>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} ${
              product.numReviews > 1 ? "reviews" : "review"
            }`}
          />
        </Card.Text>
        <Card.Text as="h5">${product.price}</Card.Text>
      </CardBody>
    </Card>
  );
};

export default Product;
