import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  NavLink,
  useMatch,
} from "react-router-dom";
import "./style.css";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Button,
  Input,
  Alert,
} from "@chakra-ui/react";
import { Home } from "./Home";

export const Admin = () => {
  return (
    <div>
      <nav>
        <ul className="admin-menu">
          <li>
            <Link to="/admin">Home</Link>
          </li>
          <li>
            <Link to="/admin/orders">Orders</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
