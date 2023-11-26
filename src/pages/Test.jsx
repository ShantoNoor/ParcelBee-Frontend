import { useEffect } from "react";
import { axiosn } from "../hooks/useAxios";

const Test = () => {
  useEffect(() => {
    // axiosn
    //   .post("/users", {data: 'hi'})
    //   .then((response) => {
    //     console.log("Response data:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });
  }, []);
  return <div>Test</div>;
};

export default Test;
