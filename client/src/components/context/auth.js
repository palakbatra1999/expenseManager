import { useState, useContext, useEffect, createContext } from "react";

const AuthContext = createContext();

const isTokenExpired = (token) => {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.exp * 1000 < Date.now();
};

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // Load initial auth state from localStorage on mount
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      if (!isTokenExpired(parsedData.token)) {
        setAuth(parsedData);
      } else {
        localStorage.removeItem("auth");
      }
    }
  }, []);

  // Synchronize auth state with localStorage
  useEffect(() => {
    if (auth && auth.user) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { useAuth, AuthProvider };
