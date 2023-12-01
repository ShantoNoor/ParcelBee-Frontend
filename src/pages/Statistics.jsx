import { useState } from "react";
import Spinner from "../components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { axiosn } from "../hooks/useAxios";
import Chart from "react-apexcharts";

const Statistics = () => {
  const {
    data: stats,
    isPending,
    error,
  } = useQuery({
    queryKey: ["/graph_stats"],
    queryFn: async () => (await axiosn.get("/graph_stats")).data,
  });

  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      title: {
        text: "Dates (MM-DD-YYYY)",
      },
    },
    yaxis: {
      title: {
        text: "Counts",
      },
    },
  });

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={[{ data: stats }]}
            type="bar"
            width="90%"
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
