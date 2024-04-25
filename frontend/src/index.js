import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { HelmetProvider } from "react-helmet-async";
// import "bootswatch/dist/cosmo/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderListScreen from "./screens/Admin/OrderListScreen";
import ProductListScreen from "./screens/Admin/ProductListScreen";
import ProductEditScreen from "./screens/Admin/ProductEditScreen";
import UserListScreen from "./screens/Admin/UserListScreen";
import UserEditScreen from "./screens/Admin/UserEditScreen";
import ProductsScreen from "./screens/ProductsScreen";
import NotificationScreen from "./screens/NotificationScreen";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/products" element={<ProductsScreen />} />
      <Route path="/products/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/notifications" element={<NotificationScreen />} />
        <Route
          path="/profile/orders/page/:pageNumber"
          element={<ProfileScreen />}
        />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderList" element={<OrderListScreen />} />
        <Route
          path="/admin/orderList/page/:pageNumber"
          element={<OrderListScreen />}
        />
        <Route path="/admin/productList" element={<ProductListScreen />} />
        <Route
          path="/admin/productList/page/:pageNumber"
          element={<ProductListScreen />}
        />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="/admin/userList" element={<UserListScreen />} />
        <Route
          path="/admin/userList/page/:pageNumber"
          element={<UserListScreen />}
        />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HelmetProvider>
    <PayPalScriptProvider deferLoading={true}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </PayPalScriptProvider>
  </HelmetProvider>
);

reportWebVitals();
