/* eslint-disable react-refresh/only-export-components */
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./main.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Spinner from "./components/Spinner.jsx";

const PrivateRoute = lazy(() => import("./components/PrivateRoute.jsx"));
const AuthProvider = lazy(() => import("./components/AuthProvider.jsx"));
const CssBaseline = lazy(() => import("@mui/material/CssBaseline"));
const DashboardRouter = lazy(() => import("./components/DashboardRouter.jsx"));

const MainLayout = lazy(() => import("./layouts/MainLayout.jsx"));
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout.jsx"));

const SignIn = lazy(() => import("./pages/SignIn.jsx"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const SignOut = lazy(() => import("./pages/SignOut.jsx"));

const MyProfile = lazy(() => import("./pages/MyProfile.jsx"));
const MyParcels = lazy(() => import("./pages/MyParcels.jsx"));
const BookParcel = lazy(() => import("./pages/BookParcel.jsx"));
const UpdateParcel = lazy(() => import("./pages/UpdateParcel.jsx"));
const AllParcel = lazy(() => import("./pages/AllParcel.jsx"));
const AllUsers = lazy(() => import("./pages/AllUsers.jsx"));
const AllDeliveryMan = lazy(() => import("./pages/AllDeliveryMan.jsx"));
const Statistics = lazy(() => import("./pages/Statistics.jsx"));
const MyDeliveryList = lazy(() => import("./pages/MyDeliveryList.jsx"));
const MyReviews = lazy(() => import("./pages/MyReviews.jsx"));

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
      { path: "/dashboard/update-parcel/:_id", element: <UpdateParcel /> },
      { path: "/dashboard/statistics", element: <Statistics /> },
      { path: "/dashboard/all-parcels", element: <AllParcel /> },
      { path: "/dashboard/all-users", element: <AllUsers /> },
      { path: "/dashboard/all-delivery-man", element: <AllDeliveryMan /> },
      { path: "/dashboard/my-delivery-list", element: <MyDeliveryList /> },
      { path: "/dashboard/my-reviews", element: <MyReviews /> },
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
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Suspense fallback={<Spinner />}>
            <RouterProvider router={router}></RouterProvider>
            <CssBaseline />
          </Suspense>
        </LocalizationProvider>
      </AuthProvider>
    </QueryClientProvider>
    <Toaster />
  </React.StrictMode>
);
