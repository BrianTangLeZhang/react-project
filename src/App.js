import "./reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddForm from "./pages/AddForm";
import Welcome from "./pages/Welcome";
import Product from "./pages/Product";
import EditForm from "./pages/EditForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<AddForm />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/edit/:productId" element={<EditForm />} />
      </Routes>
    </BrowserRouter>
  );
}
