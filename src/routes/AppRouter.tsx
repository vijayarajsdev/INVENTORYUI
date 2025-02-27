import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Items from "../pages/Items";
import Customers from "../pages/Customers";
import Invoice from "../pages/Invoice";
import Quotes from "../pages/Quotes";
import Settings from "../pages/Settings";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "/items", element: <Items /> },
      { path: "/customers", element: <Customers /> },
      { path: "/invoice", element: <Invoice /> },
      { path: "/quotes", element: <Quotes /> },
      { path: "/settings", element: <Settings /> },
    ],
  },
]);
const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
