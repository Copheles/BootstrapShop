import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  ButtonGroup,
} from "react-bootstrap";
import { FaTrash, FaPlus } from "react-icons/fa";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi2";
import Meta from "../components/Meta";
import { useEffect } from "react";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = (product) => {
    dispatch(addToCart({ ...product }));
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  useEffect(() => {}, []);

  return (
    <>
      <Meta title="Cart Details" />
      <Row>
        <Col lg={8}>
          <h2 style={{ marginBottom: "20px" }}>Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <Message variant="primary">
              Your cart is empty. <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((cartItem) => (
                <ListGroup.Item key={cartItem._id} className="listGroupItem">
                  <Row className="d-flex justify-content-center align-items-center">
                    <Col xs={2} sm={2} md={2}>
                      <Image
                        src={cartItem.image}
                        alt={cartItem.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col xs={10} sm={10} md={6}>
                      <Link to={`/product/${cartItem._id}`}>
                        <p className="custom_card_text">{cartItem.name}</p>
                      </Link>
                    </Col>
                    <Col xs={6} sm={6} md={1}>
                      <span className="price_text">${cartItem.price}</span>
                    </Col>
                    <Col xs={6} sm={6} md={3}>
                      <ButtonGroup>
                        <Button
                          variant="light"
                          onClick={() =>
                            addToCartHandler({
                              ...cartItem,
                              qty: cartItem.qty <= 1 ? 1 : cartItem.qty - 1,
                            })
                          }
                        >
                          <HiOutlineMinus className="icons" />
                        </Button>
                        <Button
                          variant="light"
                          className="custom_card_text"
                          disabled
                          color="primary"
                        >
                          {cartItem.qty}
                        </Button>
                        <Button
                          variant="light"
                          onClick={() =>
                            addToCartHandler({
                              ...cartItem,
                              qty:
                                cartItem.qty >= cartItem.countInStock
                                  ? cartItem.countInStock
                                  : cartItem.qty + 1,
                            })
                          }
                        >
                          <HiOutlinePlus className="icons" />
                        </Button>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeCartItemHandler(cartItem._id)}
                        >
                          <FaTrash className="icons" />
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              <ListGroup.Item className="mb-3">
                <Link to="/products" className="add-more-items ">
                  <FaPlus className="icons" /> Add more items
                </Link>
              </ListGroup.Item>
            </ListGroup>
          )}
        </Col>
        {cartItems.length !== 0 && (
          <Col lg={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h2>
                  <span className="text_total">
                    ${" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block btn-dark"
                    disabled={cartItems.length === 0}
                    onClick={checkOutHandler}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
};

export default CartScreen;
