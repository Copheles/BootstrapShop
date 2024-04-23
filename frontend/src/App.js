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
  setRating,
  setSort,
} from "./slices/filterSlice";
import { useSocket } from "./hooks/useSocket";
import { useGetProfileQuery } from "./slices/usersApiSlice";
import { setCredentials } from "./slices/authSlice";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  const { listenToEvent, cleanupListeners } = useSocket();

  const { data: userData, refetch } = useGetProfileQuery();
  console.log("getProfileData: ", userData);

  useEffect(() => {
    listenToEvent("setDelivery", (data) => {
      console.log("delivery");
      if (userInfo) {
        if (data.userId === userInfo._id) {
          refetch();
        }
      }
    });

    listenToEvent("setPaid", (data) => {
      console.log("paid");
      if (userInfo) {
        if (data.userId === userInfo._id) {
          refetch();
        }
      }
    });

    listenToEvent("setOrder", (data) => {
      console.log("ordered");
      if (userInfo) {
        if (data.userId === userInfo._id) {
          refetch();
        }
      }
    });

    return () => cleanupListeners();
  }, [cleanupListeners, listenToEvent, refetch, userInfo, dispatch]);

  useEffect(() => {
    if (userData && userInfo) {
      dispatch(setCredentials(userData));
    }
  }, [dispatch, userData, refetch, listenToEvent, userInfo]);

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
