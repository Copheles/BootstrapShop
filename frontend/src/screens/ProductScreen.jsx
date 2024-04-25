import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import {
  useGetProductQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useEffect, useState } from "react";
import { addToCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ItemCountChange from "../components/ItemCountChange";
import Meta from "../components/Meta";
import {
  FaEdit,
  FaStar,
  FaRegFrown,
  FaFrown,
  FaMeh,
  FaSmile,
  FaRegSmile,
} from "react-icons/fa";
import { setBrand, setCategory } from "../slices/filterSlice";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    error,
    refetch,
    isLoading,
  } = useGetProductQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  let icon;
  switch (rating) {
    case 1:
      icon = <FaRegFrown color="#ffc107" size={36} />;
      break;
    case 2:
      icon = <FaFrown color="#ffc107" size={36} />;
      break;
    case 3:
      icon = <FaMeh color="#ffc107" size={36} />;
      break;
    case 4:
      icon = <FaRegSmile color="#ffc107" size={36} />;
      break;
    case 5:
      icon = <FaSmile color="#ffc107" size={36} />;
      break;
    default:
      icon = null;
      break;
  }

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const backHandler = () => {
    navigate(redirect);
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleBrandClick = (brand) => {
    dispatch(setBrand(brand));
    navigate("/products");
  };

  const handleCategoryClick = (category) => {
    dispatch(setCategory(category));
    navigate("/products");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (comment === "" || rating === 0) {
      toast.error("Add Comment or go rate before submit review");
      return;
    }
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      toast.success("Review Submitted");
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
      setRating(0);
      setComment("");
    }
  };


  return (
    <>
      <Meta title={product?.name} />
      <div className="d-flex align-items-center justify-content-between">
        <Button className="btn btn-light my-3" onClick={backHandler}>
          <MdOutlineKeyboardBackspace size={30} />
        </Button>
        {userInfo && userInfo.isAdmin && (
          <Link to={`/admin/product/${product?._id}/edit`}>
            <FaEdit />
          </Link>
        )}
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data?.message || error.error}</Message>
      ) : (
        <>
          <Row>
            <Col lg={4} className="mb-3">
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col lg={5}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} ${
                      product.numReviews > 1 ? "reviews" : "review"
                    }`}
                    clsName="date-text"
                  />
                </ListGroup.Item>
                <ListGroup.Item onClick={() => handleBrandClick(product.brand)}>
                  <strong>Brand: </strong>{" "}
                  <span className="product-text cursor-pointer hover-line-effect">
                    {product.brand}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item
                  onClick={() => handleCategoryClick(product.category)}
                >
                  <strong>Category: </strong>{" "}
                  <span className="product-text cursor-pointer hover-line-effect">
                    {product.category}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Description: </strong>{" "}
                  <span className="product-text">{product.description}</span>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col lg={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0 ? (
                            <>
                              <span className="instock-text">In Stock</span>
                            </>
                          ) : (
                            <span className="outofstock-text">
                              Sorry we're temporarily out of stock!
                            </span>
                          )}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <>
                      <ListGroup.Item>
                        <Row>
                          <Col>Amount :</Col>
                          <Col>
                            <strong>{product.countInStock}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <ItemCountChange
                              qty={qty}
                              setQty={setQty}
                              item={product}
                            />
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-dark"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={6}>
              <h4>Reviews</h4>
              {product.reviews.length === 0 && <Message>No Review</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong className="review-name">{review.name}</strong>
                    <div className="rating-box">
                      <Rating value={review.rating} />
                      <span className="review-date-text">
                        {review.createdAt.substring(0, 10)}
                      </span>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h5>Write a customer review</h5>
                  {loadingProductReview && <Loader />}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlid="rating" className="my-3">
                        <Form.Label>Rating</Form.Label>
                        <div
                          className="d-flex align-items-center"
                          style={{ height: "36px" }}
                        >
                          <>
                            {[...Array(5)].map((star, i) => {
                              const ratingValue = i + 1;
                              return (
                                <label key={i}>
                                  <input
                                    type="radio"
                                    name="rating"
                                    style={{ display: "none" }}
                                    value={ratingValue}
                                    onClick={() => handleStarClick(ratingValue)}
                                  />
                                  <FaStar
                                    color={
                                      ratingValue <= rating
                                        ? "#ffc107"
                                        : "#e4e5e9"
                                    }
                                    className="star"
                                    size={24}
                                  />
                                </label>
                              );
                            })}
                          </>
                          <div>
                            {icon && <div className="mx-3">{icon}</div>}
                          </div>
                        </div>
                      </Form.Group>
                      <Form.Group controlId="comment" className="my-3">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </Form.Group>
                      <Button type="submit" variant="dark">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
