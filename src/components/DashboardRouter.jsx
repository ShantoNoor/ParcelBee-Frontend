import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const DashboardRouter = () => {
  const {user} = useAuth()
  
  if(user.status === 'admin') {
    return 
  } else if(user.status === 'delivery_man') {
    return 
  } else {
    return <Navigate to='/dashboard/book-parcel' replace={true} />
  }
}

export default DashboardRouter
