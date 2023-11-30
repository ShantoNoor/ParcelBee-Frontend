import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashboardRouter = () => {
  const { user } = useAuth();

  if (user.status === "admin") {
    return <Navigate to="/dashboard/my-profile" replace={true} />;
  } else if (user.status === "delivery_man") {
    return <Navigate to="/dashboard/my-profile" replace={true} />;
  } else {
    return <Navigate to="/dashboard/book-parcel" replace={true} />;
  }
};

export default DashboardRouter;
