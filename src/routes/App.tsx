import React from 'react';
import './App.css';
import Navbar from "../components/Navbar"

import { Outlet,} from "react-router-dom"

import { Container } from "@mui/material"

export default function App() {
  return (
    <>
      <Navbar />
      <Container className="card-on">
        <Outlet/>
      </Container>
    </>
  );
}
