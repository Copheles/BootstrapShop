import { Outlet, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setBrands,
  setCategories,
  setKeyword,
  setPageNumber,
  setMaxPrice,
  setRating,
  setSort,
  setPrice,
} from "./slices/filterSlice";
import { setNotiCount } from "./slices/authSlice";
import { useSocket } from "./hooks/useSocket";
import { orderApiSlice } from "./slices/orderApiSlice";
import { useGetProductMaxPriceQuery } from "./slices/productsApiSlice";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { maxPrice } = useSelector((state) => state.filter);
  const { userInfo, notiCount } = useSelector((state) => state.auth);
  const { listenToEvent, cleanupListeners } = useSocket();

  const { data } = useGetProductMaxPriceQuery();

  useEffect(() => {
    dispatch(setMaxPrice(Math.ceil(data?.maxPrice)));
    if (maxPrice > 0) {
      dispatch(setPrice(maxPrice));
    }
  }, [data, dispatch, maxPrice]);

  useEffect(() => {
    listenToEvent("setOrder", (data) => {
      console.log("ordered");
      if (userInfo) {
        if (data.userId === userInfo._id) {
          dispatch(setNotiCount(notiCount + 1));
        }
      }
    });
    listenToEvent("setDelivery", (data) => {
      console.log("delivery");
      if (userInfo) {
        if (data.userId === userInfo._id) {
          dispatch(setNotiCount(notiCount + 1));
          dispatch(
            orderApiSlice.util.updateQueryData(
              "getOrderDetails",
              data.orderId,
              (existingOrder) => {
                return {
                  ...existingOrder,
                  isDelivered: true, // Update the isDelivered property to indicate delivery
                  deliveredAt: data.serverDeliveredAt, // Use the server's timestamp for deliveredAt
                };
              }
            )
          );
        }
      }
    });

    listenToEvent("setPaid", (data) => {
      console.log("paid");
      if (userInfo) {
        if (data.userId === userInfo._id) {
          dispatch(setNotiCount(notiCount + 1));
          dispatch(
            orderApiSlice.util.updateQueryData(
              "getOrderDetails",
              data.orderId,
              (existingOrder) => {
                return {
                  ...existingOrder,
                  isPaid: true, // Update the isPaid property to indicate payment
                  paidAt: data.serverPaidAt, // Use the server's timestamp for paidAt
                };
              }
            )
          );
        }
      }
    });

    listenToEvent("productDiscount", (data) => {
      console.log("discount ");
      if (userInfo) {
        dispatch(setNotiCount(notiCount + 1));
      }
    });
    return () => cleanupListeners();
  }, []);

  useEffect(() => {
    // Check if the URL contains the query parameter 'redirect=/products'
    const isExcludedRoute =
      location.pathname === "/products" ||
      location.search.includes("redirect=/products") ||
      location.search.includes("redirect=/brand");

    // Dispatch action to update Redux state with the current route
    if (!isExcludedRoute) {
      dispatch(setPageNumber(1));
      dispatch(setSort("-createdAt"));
      dispatch(setRating(""));
      dispatch(setBrands(""));
      dispatch(setKeyword(""));
      dispatch(setCategories(""));
      dispatch(setPrice(Math.ceil(data?.maxPrice)));
    }
  }, [location.pathname, dispatch, location.search]);

  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
