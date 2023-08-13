import { createContext, useContext, useState, useEffect } from "react";
import { fetchLogout, fetchMe } from "../api";
import { Center, Flex, Spinner } from "@chakra-ui/react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const me = await fetchMe();
        setLoggedIn(true);
        setUser(me);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, []);

  const logout = async (callback) => {
    setLoggedIn(false);
    setUser(null);
    await fetchLogout();
    localStorage.removeItem("refresh-token-React");
    localStorage.removeItem("access-token-React");
    callback();
  };

  const login = (data) => {
    setLoggedIn(true);
    setUser(data.user);

    localStorage.setItem("access-token-React", data.accessToken);
    localStorage.setItem("refresh-token-React", data.refreshToken);
  };

  const values = {
    loggedIn,
    user,
    login,
    logout,
  };
  if (loading)
    return (
      <Flex justifyContent={"center"} alignItems={"center"} height={"100vh"}>
        <Spinner
          thickness="4px"
          speed="0.065s"
          emptyColor="gray.200"
          size={"xl"}
        ></Spinner>
      </Flex>
    );
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
