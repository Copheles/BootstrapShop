import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col, Row, Image } from "react-bootstrap";
import FormContainer from "./../components/FormContainer";
import CheckOutSteps from "../components/CheckOutSteps";
import { savePaymentMethod } from "../slices/cartSlice";
import Meta from "../components/Meta";

import { FaCcPaypal } from "react-icons/fa";
import payment from "../assets/payment.svg";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <>
      <Meta title="Payment Details" />

      <FormContainer>
        <CheckOutSteps step1={1} step2={2} step3 />
        <h2 className="my-4">Payment Method</h2>
        <Row>
          <Col>
            <Image src={payment} fluid />
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <Form onSubmit={submitHandler}>
              <Form.Group>
                <Form.Label as="legend">Select Method</Form.Label>
                <Col>
                  <Form.Check
                    type="radio"
                    className="my-2"
                    label="PayPal or Credit Card"
                    id="PayPal"
                    name="paymentMethod"
                    value="PayPal"
                    checked={paymentMethod === "PayPal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                </Col>
                <Col>
                  <Form.Check
                    type="radio"
                    className="my-2"
                    label="Test Payment"
                    id="test"
                    name="test"
                    value="Test"
                    checked={paymentMethod === "Test"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                </Col>
              </Form.Group>
              <Button type="submit" variant="info">
                Continue
              </Button>
            </Form>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
