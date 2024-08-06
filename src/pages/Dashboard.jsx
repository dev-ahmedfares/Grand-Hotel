import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Filter from "../ui/Filter";

function Dashboard() {
  return (
    <>
      <Row type={"horizontal"}>
        <Heading as="h1">Dashboard</Heading>
        <Filter
          fieldFilter="last"
          options={[
            { value: "7", label: "Last 7 days" },
            { value: "30", label: "Last 30 days" },
            { value: "90", label: "Last 90 days" },
          ]}
        />
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
