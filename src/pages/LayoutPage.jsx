import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

export default function LayoutPage() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
