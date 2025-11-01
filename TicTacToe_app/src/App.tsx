import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
