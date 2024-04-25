import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliveredOrderMutation,
} from "../slices/orderApiSlice";
import Meta from "../components/Meta";
import { changeTimeFormat } from "../utils/timesFormat";
import CopyButton from "../components/CopyButton";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliveredOrderMutation();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order delivered");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        const res = await payOrder({ orderId, details }).unwrap();
        refetch();
        toast.success(res);
      } catch (error) {
        toast.error(error?.data.message || error.error);
      }
    });
  };

  const onError = (err) => {
    toast.error(err.message);
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  // useEffect(() => {
  //   listenToEvent("setOrder", (data) => {
  //     console.log("ordered");
  //     if (userInfo) {
  //       if (data.userId === userInfo._id) {
  //         dispatch(setNotiCount(notiCount + 1));
  //       }
  //     }
  //   });
  //   return () => cleanupListeners();
  // }, [listenToEvent, refetch, cleanupListeners, dispatch, notiCount, userInfo]);

  // useEffect(() => {
  //   listenToEvent("setPaid", (data) => {
  //     console.log("paid");
  //     if (userInfo) {
  //       if (data.userId === userInfo._id) {
  //         refetch();
  //       }
  //     }
  //   });
  //   return () => cleanupListeners();
  // }, [listenToEvent, refetch, cleanupListeners, dispatch, notiCount, userInfo]);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            clientId: paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: "pending",
        });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data?.message || error.error}</Message>
  ) : (
    <>
      <Meta title="Order Details" />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p className="mt-3">
                <strong>Order id: </strong> {order._id}
                <CopyButton textToCopy={order._id} />
              </p>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>
              <p>
                <strong>Address: </strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              <p>
                <strong>
                  Ordered At:{" "}
                  <span className="date-text">
                    {changeTimeFormat(order.createdAt)}
                  </span>
                </strong>
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on{" "}
                  <span className="date-text">
                    {changeTimeFormat(order.deliveredAt)}
                  </span>
                </Message>
              ) : (
                <Message variant="danger">Not Deliverd</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid on{" "}
                  <span className="date-text">
                    {changeTimeFormat(order.paidAt)}
                  </span>
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col xs={2} sm={2} md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col xs={10} sm={10} md={6}>
                      <Link
                        to={`/products/${item.product}?redirect=/order/${orderId}`}
                      >
                        <p className="custom_card_text">{item.name}</p>
                      </Link>
                    </Col>
                    <Col xs={12} sm={12} md={4}>
                      <span className="price_text">
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </span>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="order_summary_text mb-1">
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row className="order_summary_text mb-1">
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row className="order_summary_text mb-1">
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row className="text_total mb-3">
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* PAY ORDER PLACEHOLDER */}
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      {/* <Button
                        onClick={onApproveTest}
                        style={{
                          marginBottom: "10px",
                        }}
                        variant="dark"
                      >
                        Test Pay Order
                      </Button> */}

                      {userInfo && !userInfo.isAdmin && (
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      )}
                    </div>
                  )}
                </ListGroup.Item>
              )}
              {/* MARK AS DELIVERED PLACEHOLDER */}

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverOrderHandler}
                      variant="dark"
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
