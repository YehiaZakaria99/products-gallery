import React from "react";
import { Outlet } from "react-router";
import Navbar from "./../components/Navbar";

export default function LayoutPage() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
