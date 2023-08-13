import React from "react";
import { Box, Flex, Grid, Button, Heading } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Profile = ({ props }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const handleLogout = async () =>
    logout(() => {
      navigate("/");
    });
  return (
    <div>
      <Heading>Profile</Heading>
      <code>{JSON.stringify(user)}</code>

      <Button colorScheme="pink" variant={"solid"} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};
