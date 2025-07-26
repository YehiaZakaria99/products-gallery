import { useState } from "react";
import "./App.css";
import { createBrowserRouter } from "react-router";
import LayoutPage from "./pages/LayoutPage";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { RouterProvider } from "react-router/dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <LayoutPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "products", element: <ProductsPage /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
