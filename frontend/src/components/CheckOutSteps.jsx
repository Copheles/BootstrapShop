import { Breadcrumb } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item active={step1}>
        {step1 ? (
          <LinkContainer to="/login">
            <span className="breadcrumb-link">Sign In</span>
          </LinkContainer>
        ) : (
          <span className="breadcrumb-text">Sign In</span>
        )}
      </Breadcrumb.Item>

      <Breadcrumb.Item active={step2}>
        {step2 ? (
          <LinkContainer to="/shipping">
            <span className="breadcrumb-link">Shipping</span>
          </LinkContainer>
        ) : (
          <span className="breadcrumb-text">Shipping</span>
        )}
      </Breadcrumb.Item>

      <Breadcrumb.Item active={step3}>
        {step3 ? (
          <LinkContainer to="/payment">
            <span className="breadcrumb-link">Payment</span>
          </LinkContainer>
        ) : (
          <span className="breadcrumb-text">Payment</span>
        )}
      </Breadcrumb.Item>

      <Breadcrumb.Item active={step4}>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <span className="breadcrumb-link">Place Order</span>
          </LinkContainer>
        ) : (
          <span className="breadcrumb-text">Place Order</span>
        )}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default CheckOutSteps;
