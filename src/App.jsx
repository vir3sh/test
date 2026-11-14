import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/contact" element={<Contact />} />

        <Route
          path="*"
          element={
            <div className="flex min-h-[60vh] items-center justify-center">
              <h1 className="text-2xl font-semibold text-gray-700">
                404 - Page Not Found
              </h1>
            </div>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
