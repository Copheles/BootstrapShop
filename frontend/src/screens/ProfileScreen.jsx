import { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col, FormGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { FaTimes } from "react-icons/fa";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/orderApiSlice";
import Meta from "./../components/Meta";
import PaginationCustom from "../components/PaginationCustom";
import { Link } from "react-router-dom";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { pageNumber } = useSelector(
    (state) => state.filter
  );

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data, isLoading, error } = useGetMyOrdersQuery({ pageNumber });

  console.log("myorders", data);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (error) {
        toast.error(error?.data.message || error.error);
      }
    }
  };

  return (
    <>
      <Meta title={userInfo.name} />
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="name" className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="email" className="my-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="password" className="my-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="confirmPassword" className="my-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormGroup>
            <Button
              type="submit"
              variant="dark"
              className="my-3"
              disabled={loadingUpdateProfile}
            >
              Update
            </Button>
            {loadingUpdateProfile && <Loader />}
          </Form>
        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <>
              {data.orders.length !== 0 ? (
                <>
                  <Table striped hover responsive className="table-sm mt-3">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.createdAt.substring(0, 10)}</td>
                          <td>{order.totalPrice} $</td>
                          <td>
                            {order.isPaid ? (
                              order.paidAt.substring(0, 10)
                            ) : (
                              <FaTimes style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            {order.isDelivered ? (
                              order.deliveredAt.substring(0, 10)
                            ) : (
                              <FaTimes style={{ color: "red" }} />
                            )}
                          </td>
                          <td>
                            <LinkContainer to={`/order/${order._id}`}>
                              <Button className="btn-sm" variant="info">
                                Details
                              </Button>
                            </LinkContainer>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <PaginationCustom
                    page={data.page}
                    pages={data.pages}
                  />
                </>
              ) : (
                <Message>
                  No orders yet! <Link to="/products">Go to Shopping.</Link>
                </Message>
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
