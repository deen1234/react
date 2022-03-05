import React from "react";
import Home from "./Home";
import About from "./About";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <nav>
          <ul>
            <Link to="/about">
              <li>aboxxxxxxxxxxxxxxxut</li>
            </Link>
            <Link to="/">
              <li>Home</li>
            </Link>
          </ul>
        </nav>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
