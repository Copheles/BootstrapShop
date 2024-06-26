import {
  Navbar,
  Nav,
  Container,
  Badge,
  NavDropdown,
  Button,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { FaShopify } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { GiTempleGate } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { BsList, BsX } from "react-icons/bs";
import { useState } from "react";
import { resetCart } from "../slices/cartSlice";
import NotificationIcon from "./NotificationIcon";

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLinkClick = () => {
    setExpanded(false); // Close navbar when link is clicked
  };

  const handleDropdownSelect = (eventKey, event) => {
    if (eventKey === "logout") {
      logoutHandler();
      setExpanded(false); // Close navbar after logging out
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/" onClick={handleLinkClick}>
            <Navbar.Brand className="icon-container">
              <span className="logo_text">
                <span className="animated-letter">
                  <FaShopify />
                </span>
                <span>BShop</span>
              </span>
            </Navbar.Brand>
          </LinkContainer>
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <LinkContainer to="/cart" className="cart-1 mx-1">
                <Nav.Link>
                  <FaShoppingCart
                    className="cart-btn"
                    onClick={handleLinkClick}
                  />
                  {cartItems.length > 0 && (
                    <Badge pill bg="info" className="mx-auto">
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo && (
                <NotificationIcon handleLinkClick={handleLinkClick} cart={1} />
              )}
            </div>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <BsX size={30} className="close-btn" />
              ) : (
                <BsList size={30} className="menu-btn" />
              )}
            </Navbar.Toggle>
          </div>
          <Navbar.Collapse id="basic-navbar-nav" in={expanded}>
            <Nav className="ms-auto">
              <LinkContainer to="/cart" className="cart-2">
                <Nav.Link>
                  <FaShoppingCart
                    className="cart-btn"
                    onClick={handleLinkClick}
                  />
                  {cartItems.length > 0 && (
                    <Badge pill bg="info" className="mx-auto">
                      {cartItems.reduce((acc, item) => acc + item.qty, 0) > 9
                        ? 9
                        : cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo && (
                <NotificationIcon handleLinkClick={handleLinkClick} cart={2} />
              )}
              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id={userInfo.name}
                  onSelect={handleDropdownSelect}
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item onClick={handleLinkClick}>
                      <CgProfile size={22} className="mx-1 mb-1" />
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  {userInfo.isAdmin && (
                    <>
                      <LinkContainer to="/admin/productList">
                        <NavDropdown.Item onClick={handleLinkClick}>
                          <GiTempleGate size={22} className="mx-1 mb-1" />
                          Products
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/userList">
                        <NavDropdown.Item onClick={handleLinkClick}>
                          <FaUsers size={22} className="mx-1 mb-1" />
                          Users
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orderList">
                        <NavDropdown.Item onClick={handleLinkClick}>
                          <TbTruckDelivery size={22} className="mx-1 mb-1" />
                          Orders
                        </NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="logout" className="logout-menu">
                    <MdLogout size={22} className="mx-1" />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login" onClick={handleLinkClick}>
                  <Nav.Link>
                    <Button variant="outline-light" className="btn-sm">
                      Sign In
                    </Button>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
