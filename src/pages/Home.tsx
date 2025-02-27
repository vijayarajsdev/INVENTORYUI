import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px", marginLeft: "190px" }}>
        <h1>HOME</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
