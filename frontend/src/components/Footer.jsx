import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>
              BootStrap Shopee &copy;{" "}
              <i>
                <Link to="https://github.com/Copheles">copheles</Link>
              </i>{" "}
              {currentYear}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
