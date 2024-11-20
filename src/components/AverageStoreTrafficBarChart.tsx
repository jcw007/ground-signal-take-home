import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PlaceType } from "../types";
import { useMemo } from "react";

// A component that renders a bar chart based on daily store traffic data
function AverageStoreTrafficBarChart({
  data,
}: {
  data: NonNullable<PlaceType["details"]>["avgStoreTraffic"];
}) {
  const converted = useMemo(() => {
    return Object.entries(data || {}).map(([day, visitorCount]) => ({
      name: day,
      visitor: visitorCount || 0,
    }));
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={100}>
      <BarChart
        data={converted}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="visitor" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default AverageStoreTrafficBarChart;
