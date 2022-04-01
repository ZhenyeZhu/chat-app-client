import "./App.scss";
import React from "react";
import { Container } from "react-bootstrap";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import ApolloProvider from "./ApolloProvider";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <ApolloProvider>
      <BrowserRouter>
        <Container className="pt-5">
          <Routes>
            <Route exact path="/" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
