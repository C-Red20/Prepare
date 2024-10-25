import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header.jsx";
import ApplicationViews from "./components/ApplicationViews.jsx";
import { useEffect } from "react";
import Authorize from "./components/Authorize.jsx";
import { Container } from "reactstrap"; // Import Container from Reactstrap

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("userProfile")) {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Container className="mt-5">
        {" "}
        {/* Add margin-top to create space for the fixed navbar */}
        {isLoggedIn ? (
          <ApplicationViews />
        ) : (
          <Authorize setIsLoggedIn={setIsLoggedIn} />
        )}
      </Container>
    </Router>
  );
}

export default App;
