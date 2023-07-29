import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { FunctionalApp } from "./Functional/FunctionalApp";
import { Home } from "./Home";
import "./App.css";
import "./index.css";
import { ClassApp } from "./Class/ClassApp";
import { Toaster } from "react-hot-toast";
import { Playground } from "./Playground";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/functional",
    element: <FunctionalApp />,
  },
  {
    path: "/class",
    element: <ClassApp />,
  },
  {
    path: "/playground",
    element: <Playground />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>
);