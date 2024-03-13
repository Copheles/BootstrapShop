import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { ProgressBar } from "react-bootstrap";

const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <>
      <Nav className="justify-content-between mb-4">
        <Nav.Item>
          {step1 ? (
            <LinkContainer to="/login" className="link-in-steps">
              <Nav.Link>Sign In</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Sign In</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step2 ? (
            <LinkContainer to="/shipping" className="link-in-steps">
              <Nav.Link>Shipping</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Shipping</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step3 ? (
            <LinkContainer to="/payment" className="link-in-steps">
              <Nav.Link>Payment</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Payment</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step4 ? (
            <LinkContainer to="/placeorder" className="link-in-steps">
              <Nav.Link>Place Order</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Place Order</Nav.Link>
          )}
        </Nav.Item>
      </Nav>
      {/* 12 38 66 100 */}
      <ProgressBar
        style={{ height: "12px" }}
        now={100}
        variant="info"
        animated
      />
    </>
  );
};

export default CheckOutSteps;
