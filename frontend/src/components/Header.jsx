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
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="icon-container">
              {/* <GiIceCube size={30} className="bouncing-icon" /> */}
              <span className="logo_text">
                <span className="animated-letter">
                  <FaShopify />
                </span>
                <span>BShop</span>
              </span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <BsX size={30} className="close-btn" />
            ) : (
              <BsList size={30} className="menu-btn" />
            )}{" "}
            {/* Toggle between open and close icon */}
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart className="cart-btn" />
                  {cartItems.length > 0 && (
                    <Badge pill bg="info" className="mx-1">
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id={userInfo.name}>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      <CgProfile size={22} className="mx-1 mb-1" />
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  {userInfo && userInfo.isAdmin && (
                    <>
                      <LinkContainer to="/admin/productList">
                        <NavDropdown.Item>
                          <GiTempleGate size={22} className="mx-1 mb-1" />
                          Products
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/userList">
                        <NavDropdown.Item>
                          <FaUsers size={22} className="mx-1 mb-1" />
                          Users
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orderList">
                        <NavDropdown.Item>
                          <TbTruckDelivery size={22} className="mx-1 mb-1" />
                          Orders
                        </NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={logoutHandler}
                    className="logout-menu"
                  >
                    <MdLogout size={22} className="mx-1" />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
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
