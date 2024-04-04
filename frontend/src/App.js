import { Outlet, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setBrands,
  setCategories,
  setKeyword,
  setPageNumber,
  setRating,
  setSort,
} from "./slices/filterSlice";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // Dispatch action to update Redux state with the current route
    dispatch(setPageNumber(1));
    dispatch(setSort("-createdAt"));
    dispatch(setRating(""));
    dispatch(setBrands(""));
    dispatch(setKeyword(""));
    dispatch(setCategories(""));
  }, [location.pathname, dispatch]);
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
