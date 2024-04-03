import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../slices/orderApiSlice";
import PaginationCustom from "../../components/PaginationCustom";
import { useSelector } from "react-redux";
import EmptyRows from "../../components/EmptyRows";

const OrderListScreen = () => {
  const { pageNumber } = useSelector((state) => state.filter);

  const { data, isLoading, error } = useGetOrdersQuery({ pageNumber });

  return (
    <>
      <h2>Orders</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* Render orders data */}
              {data.orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
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
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
              {/* Render empty rows if the number of orders is less than 8 */}
              {data.orders.length < 8 && (
                <EmptyRows count={8 - data.orders.length}  colSpan={7}/>
              )}
            </tbody>
          </Table>
          {/* Render pagination with total pages */}
          <PaginationCustom
            pages={data.pages}
            page={data.page}
            link={`/admin/orderList/page`}
          />
        </>
      )}
    </>
  );
};

export default OrderListScreen;
