import React from "react";
import ReactDOM from "react-dom/client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./main.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import AuthProvider from "./components/AuthProvider.jsx";
import SignOut from "./pages/SignOut.jsx";
import { Toaster } from "react-hot-toast";
import Test from "./pages/Test.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import PrivateRoute from "./components/PrivateRoute.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import MyParcels from "./pages/MyParcels.jsx";
import BookParcel from "./pages/BookParcel.jsx";
import DashboardRouter from "./components/DashboardRouter.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

// TODO: Design a error page

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "/dashboard", element: <DashboardRouter /> },
      { path: "/dashboard/my-profile", element: <MyProfile /> },
      { path: "/dashboard/my-parcels", element: <MyParcels /> },
      { path: "/dashboard/book-parcel", element: <BookParcel /> },
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/sign-out",
    element: <SignOut />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <RouterProvider router={router}></RouterProvider>
      </LocalizationProvider>
    </AuthProvider>
    <CssBaseline />
    <Toaster />
  </React.StrictMode>
);
