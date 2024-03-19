import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

import { GiIceCube } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { GiTempleGate } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";

const Header = () => {
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
              <GiIceCube size={40} className="bouncing-icon" /> 
              <span className="logo_text">Shopee</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart />
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
                    <FaUser />
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
