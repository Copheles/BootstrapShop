import { Card, CardBody } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  console.log(product.image);
  return (
    <Card className="my-3 p-3 rounded" style={{ height: "100%" }}>
      <Link to={`/products/${product._id}`}>
        <div className="aspect-ratio-wrapper">
          <Card.Img variant="top" src={product.image} className="card-img" />
        </div>
      </Link>
      <CardBody>
        <Link to={`/products/${product._id}`}>
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
