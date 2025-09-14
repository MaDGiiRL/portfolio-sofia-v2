import { Routes, Route } from "react-router";
import Layout from "../layout/Layout.jsx";
import Home from "../pages/Home.jsx";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}
