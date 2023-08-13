import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";
export const Navbar = () => {
  const { loggedIn, user } = useAuth();
  const { items } = useBasket();
  // console.log("loggedIn", loggedIn);
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/">eCommerce</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/">Products</Link>
          </li>
          {user?.role === "admin" && (
            <>
              <li>
                <Link to="/admin">Admin Menu</Link>
              </li>
              <li>
                <Link to="/admin/products">Products</Link>
              </li>
              <li>
                <Link to="/admin/orders">Orders</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className={styles.right}>
        {!loggedIn && (
          <>
            <Link to="/signin">
              <Button colorScheme="purple">Login</Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="pink">Register</Button>
            </Link>
          </>
        )}
        {loggedIn && (
          <>
            {items.length > 0 && (
              <Link to="/basket">
                <Button colorScheme="pink" variant={"outline"}>
                  Basket {items.length}
                </Button>
              </Link>
            )}
            {user?.role === "admin" && (
              <Link to="/admin">
                <Button colorScheme="pink" variant={"ghost"}>
                  Admin
                </Button>
              </Link>
            )}

            <Link to="/profile">
              <Button colorScheme="gray">Profile</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
