import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [{ path: "dashboard", element: <Dashboard /> }],
  },
]);
const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
